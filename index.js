import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import session from 'express-session';
import env from 'dotenv';
import { google } from 'googleapis';
import { Buffer } from 'buffer'; // Required to decode base64
import { htmlToText } from 'html-to-text';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';

env.config();

const app = express();
const port = 3000;
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const impEvents = [];
let userDetails = [];
let oauth2Client = {}

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, // Allow credentials (cookies) to be sent
  }));
  

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, 
        httpOnly: false, // Allows the client to access the cookie
      },
}));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

db.connect();

// app.get('/', (req, res) => {
//     res.render('index.ejs');
// });

app.get('/auth/google-signin', passport.authenticate('google-signin', {
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/calendar.events'],
    accessType: 'offline',
    prompt: 'consent'
}));

app.get('/auth/google-signup', passport.authenticate('google-signup', {
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/calendar.events'],
    accessType: 'offline',
    prompt: 'consent'
}));

app.get('/auth/google/Email2Event1', passport.authenticate('google-signin', {
    failureRedirect: '/?error=signin',
}), (req, res) => {
    res.redirect('/starred');
});

app.get('/auth/google/Email2Event2', passport.authenticate('google-signup', {
    failureRedirect: '/?error=signup',
}), (req, res) => {
    res.redirect('/starred');
});

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  };
  
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
  });
  
  app.get('/events', ensureAuthenticated, (req, res) => {
    res.json({ events: impEvents,userDetails: userDetails });
  });
  
  app.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error('Error logging out:', err);
        return res.status(500).send('Failed to log out');
      }
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).send('Failed to destroy session');
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).send('Logged out'); 
      });
    });
  });
    
app.get('/starred', async (req, res) => {
    try {
        if (!req.user || !req.user.tokens) {
            console.log('No user or tokens found');
            return res.redirect('/');
        }

        const { accessToken, refreshToken } = req.user.tokens;

        // Setup OAuth2 client
        oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: accessToken, refresh_token: refreshToken });

        // Fetch starred messages from Gmail
        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
        const response = await gmail.users.messages.list({
            userId: 'me',
            q: 'is:starred',
        });

        const messages = response.data.messages || [];
        const retrievedMessages = [];

        for (const message of messages) {
            const messageDetail = await gmail.users.messages.get({
                userId: 'me',
                id: message.id,
            });

            const headers = messageDetail.data.payload.headers;
            const parts = messageDetail.data.payload.parts;
            let emailBody = '';

            if (parts) {
                emailBody = getMessageBody(parts);
            } else if (messageDetail.data.payload.mimeType === 'text/html' && messageDetail.data.payload.body.data) {
                const htmlContent = Buffer.from(messageDetail.data.payload.body.data, 'base64').toString('utf-8');
                emailBody = htmlToText(htmlContent).replace(/(\r\n|\n|\r){2,}/g, '\n').trim();
            } else if (messageDetail.data.payload.mimeType === 'text/plain' && messageDetail.data.payload.body.data) {
                emailBody = Buffer.from(messageDetail.data.payload.body.data, 'base64').toString('utf-8').replace(/(\r\n|\n|\r){2,}/g, '\n').trim();
            }

            const subject = getHeader(headers, 'Subject');
            const from = getHeader(headers, 'From');
            const to = getHeader(headers, 'To');

            // Format the email body
            const formattedMessage = `
Subject: ${subject}

From: ${from}

To: ${to}

Message Content:

${emailBody}`;

            retrievedMessages.push(formattedMessage);
        }

        const batchSize = 4; // batch size
        for (let i = 0; i < retrievedMessages.length; i += batchSize) {
            const batch = retrievedMessages.slice(i, i + batchSize);
            const events = await parseEventDetailsUsingGemini(batch);
            //console.log(events);
            for (const event of events) {
                if (event) {
                    //console.log(event);
                    event.id = Date.now() + event.summary.length;
                    impEvents.push(event);
                }
            }
        }

        res.redirect("http://localhost:5173/eventTable");

    } catch (error) {
        console.error('Error retrieving starred messages:', error);
        res.status(500).send('Error retrieving starred messages');
    }
});

app.post('/addevent', async (req, res) => {
  const event = req.body;
  console.log(event);
  if (!event) {
    return res.status(400).send('Event data not provided');
  }

  try {
    // Insert event into Google Calendar
    const calendar = google.calendar({ version: 'v3', oauth2Client });
    const response = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      resource: event,
    });

    console.log('Event added to Google Calendar:', response.data);

    res.status(200).send('Event added successfully');
  } catch (error) {
    console.error('Error adding event to Google Calendar:', error.message);
    res.status(500).send('Failed to add event');
  }
});

// Function to parse event details using Gemini
async function parseEventDetailsUsingGemini(messages) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // the prompt
        const prompt = `
          Analyze the following emails carefully to extract the event details. 

            1. The event details should include:
            - Summary (title of the event)
            - Location (venue of the event)
            - Description (description of the event, including any deadline information if mentioned)
            - Start (start date and time of the event, it can be a deadline) if it is null replace it with End details
            - End (end date and time of the event, it can be a deadline ) if it is null replace it with Start details

            2. If a deadline is mentioned in the email, include the information about the deadline in the description.
            3. If no event details can be found in a message, return an empty JSON object {} for that message.
           

          Format:
          [
              {
                  "summary": "Event Title",
                  "location": "Event Location",
                  "description": "Event Description",
                  "start": {
                      "dateTime": "YYYY-MM-DDTHH:MM:SS+05:30",
                      "timeZone": "Asia/Kolkata"
                  },
                  "end": {
                      "dateTime": "YYYY-MM-DDTHH:MM:SS+05:30",
                      "timeZone": "Asia/Kolkata"
                  }
              },
          ]
          Email Contents:
          ${messages.map((message, index) => `Message ${index + 1}: ${message}`).join('\n\n')}`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        const cleanText = text.replace(/```json\n|```/g, '').trim();
        const eventDetails = JSON.parse(cleanText);
        //console.log(eventDetails);
        return eventDetails.filter(event => event && event.summary && ( event.start || event.end));
    } catch (error) {
        console.error('Error parsing event details:', error);
        return [];
    }
}

// Function to get the message body from parts
function getMessageBody(parts) {
    let emailBody = '';
    let htmlBody = '';
    let textBody = '';

    function traverseParts(parts) {
        for (const part of parts) {
            if (part.mimeType === 'text/plain' && part.body.data) {
                textBody += Buffer.from(part.body.data, 'base64').toString('utf-8');
            } else if (part.mimeType === 'text/html' && part.body.data) {
                htmlBody += Buffer.from(part.body.data, 'base64').toString('utf-8');
            } else if (part.mimeType.startsWith('multipart/')) {
                traverseParts(part.parts);
            }
        }
    }

    traverseParts(parts);

    if (htmlBody) {
        emailBody = htmlToText(htmlBody);
    } else if (textBody) {
        emailBody = textBody;
    }

    emailBody = emailBody.replace(/(\r\n|\n|\r){2,}/g, '\n').trim();

    return emailBody;
}

// Function to get specific header value
function getHeader(headers, name) {
    const header = headers.find(h => h.name.toLowerCase() === name.toLowerCase());
    return header ? header.value : '';
}

passport.use("google-signin", new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/Email2Event1",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    accessType: "offline",
    prompt: "consent"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
        //console.log(profile);
        const {displayName, email, picture} = profile;
        userDetails = [displayName, email, picture]
        const user = await db.query("SELECT * FROM users WHERE email = $1", [profile.emails[0].value]);
        if (user.rows.length === 0) {
            return done(null, false, { message: "Please sign up before you login." });
        }
  
        // Store tokens in session
        user.rows[0].tokens = { accessToken, refreshToken };
        return done(null, user.rows[0]);
    } catch (err) {
        return done(err);
    }
  }));
  
  passport.use("google-signup", new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/Email2Event2",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    accessType: "offline",
    prompt: "consent"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
        const {displayName, email, picture} = profile;
        userDetails = [displayName, email, picture]
        const user = await db.query("SELECT * FROM users WHERE email = $1", [profile.emails[0].value]);
        if (user.rows.length > 0) {
            return done(null, false, { message: "User already exists. Please log in." });
        }
  
        const newUser = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *", [profile.emails[0].value, profile.id]);
  
        // Store tokens in session
        newUser.rows[0].tokens = { accessToken, refreshToken };
        return done(null, newUser.rows[0]);
    } catch (err) {
        return done(err);
    }
  }));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
