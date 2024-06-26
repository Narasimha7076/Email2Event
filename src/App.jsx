// import React, { useState } from 'react';
// import EventTable from './components/EventTable';

// const App = () => {
//   const [events, setEvents] = useState([
//     {
//       id: 0,
//       summary: 'Payment of Institute and Hostel Fees for July-Nov 2024 Semester',
//       location: null,
//       description: 'Timeline for Fee Payment: 18.06.2024 to 31.07.2024',
//       start: { dateTime: '2024-06-18T00:00:00Z', timeZone: 'UTC' },
//       end: { dateTime: '2024-07-31T00:00:00Z', timeZone: 'UTC' }
//     },
//     {
//       id: 1,
//       summary: '6-months Internship Opportunity at Intel India',
//       location: 'Hybrid/ Bangalore/ Hyderabad (based on Intel’s business needs)',
//       description: '6-months Internship Opportunity at Intel India for 2025 batch students. Internship duration - 6 months from July’ 2024 onwards. Eligibility - B.Tech / M.Tech students graduating in year 2025 with CGPA 7+ in last semester’s results. Stipend - Rs. 45K for M.Tech and Rs. 40K for B.Tech (as per Intel norms/ discretion). Selection process - Rounds of technical interviews. Last date to apply - 16th June 2024. Form Link - https://forms.gle/sFYgcfEDvMTN5w3eA',
//       start: { dateTime: '2024-07-01T00:00:00Z', timeZone: 'UTC' },
//       end: { dateTime: '2024-12-31T00:00:00Z', timeZone: 'UTC' }
//     },
//     {
//       id: 2,
//       summary: 'Internship at Atlas - IIITDM Kancheepuram',
//       location: 'Hyderabad, India',
//       description: "6-month Internship Program (Jan '25 - June '25) opportunity for B.Tech Computer Science and Engineering / Information Technology students at Atlas Consolidated Pte Ltd.",
//       start: { dateTime: '2025-01-01T00:00:00Z', timeZone: 'UTC' },
//       end: { dateTime: '2025-06-30T00:00:00Z', timeZone: 'UTC' }
//     },
//     {
//       id: 3,
//       summary: 'iamneo Internship cum Full time Placement',
//       location: 'iamneo office, 1205/A, 3rd Floor, SPA SRR Towers, Avinashi Rd, Pappanaickenpalayam, Coimbatore, Tamil Nadu 641037',
//       description: 'Internship opportunity for BTech/ MTech Software Engineering and BTech/ MTech Data Science students to join iamneo as Gen AI Engineer interns. Registration deadline: 1:00 PM on June 21, 2024.',
//       start: { dateTime: '2024-06-21T13:00:00Z', timeZone: 'UTC' },
//       end: { dateTime: '2024-06-21T13:00:00Z', timeZone: 'UTC' }
//     }
//   ]);
//   const [editable, setEditable] = useState({0: false, 1:false, 2: false, 3: false});


//   const handleEdit = (id) => {
//     console.log(id);
//     setEditable((prev) => {
//       console.log(prev[id]);
//       return { ...prev, [id]: !prev[id] }
//     });
//     console.log(editable[id]);
//   };

//   const handleAddEvent = (event, id) => {
//     console.log(event);
//     console.log(id);
//     // const calendar = google.calendar({ version: 'v3', auth });
//     // await calendar.events.insert({
//     //     auth: auth,
//     //     calendarId: 'primary',
//     //     resource: event,
//     //   }, function(err, event) {
//     //     if (err) {
//     //       console.log('There was an error contacting the Calendar service: ' + err);
//     //       return;
//     //     }
//     //     console.log('Event created');
//     //   });
//     setEvents((prev) => prev.filter((item) => (item.id !== id) ));
//   }

//   const addNewEvent = (event) => {
//     console.log(event);
//      // const calendar = google.calendar({ version: 'v3', auth });
//     // await calendar.events.insert({
//     //     auth: auth,
//     //     calendarId: 'primary',
//     //     resource: event,
//     //   }, function(err, event) {
//     //     if (err) {
//     //       console.log('There was an error contacting the Calendar service: ' + err);
//     //       return;
//     //     }
//     //     console.log('Event created');
//     //   });
//   }

//   return (

//     <div className="container mx-auto p-4">
//       <h1 className='bg-gray-600'>Hi</h1>
//       <EventTable events={events} editable={editable} onEdit={handleEdit} onAddEvent={handleAddEvent} onaddNewEvent={addNewEvent}/>
//     </div>
//   );
// };

// export default App;
// import React, { useState, useEffect } from 'react';
// import EventTable from './components/EventTable';
// // import { google } from 'googleapis';



// const App = () => {
//   const [events, setEvents] = useState([]);
//   const [editable, setEditable] = useState({});
//   let oauth2Client = {}

//   useEffect(() => {
//     // Fetch event details from the backend
//     const fetchEvents = async () => {
//       try {
//         console.log("hi");
//         const response = await fetch('http://localhost:3000/events');
//         const data = await response.json();
//         console.log(data.events);
//         setEvents(data.events);
        
//         console.log(data.tokens);

//         // oauth2Client = new google.auth.OAuth2();
//         // oauth2Client.setCredentials(data[tokens]);

//         // Initialize editable state for each event
//         let initialEditable = {};
//         data[events].forEach((item) => {
//           let index = item.id;
//           initialEditable[index] = false;
//         });
//         console.log(initialEditable);
//         setEditable(initialEditable);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const handleEdit = (id) => {
//     console.log(id);
//     setEditable((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const handleAddEvent = (event, id) => {
//     console.log(event);
//     console.log(id);
//     // Add your Google Calendar API call here
//     setEvents((prev) => prev.filter((item) => item.id !== id));
//   };

//   const addNewEvent = async (event) => {
//     console.log(event);
//     // Add your Google Calendar API call here
//     const calendar = google.calendar({ version: 'v3', oauth2Client });
//     await calendar.events.insert({
//         auth: oauth2Client,
//         calendarId: 'primary',
//         resource: event,
//       }, function(err, event) {
//         if (err) {
//           console.log('There was an error contacting the Calendar service: ' + err);
//           return;
//         }
//         console.log('Event created');
//       });
//   };

//   return (
    
//     <div className="container mx-auto p-4">
//       {events.length ? <EventTable
//         events={events}
//         editable={editable}
//         onEdit={handleEdit}
//         onAddEvent={handleAddEvent}
//         onaddNewEvent={addNewEvent}
//       /> : <h1 className='bg-gray-400'>Fetching Events</h1>}
      
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect } from 'react';
// import EventTable from './components/EventTable';

// const App = () => {
//   const [events, setEvents] = useState([]);
//   const [editable, setEditable] = useState({});
//   let gapi;

//   useEffect(() => {
//     // Load the Google API client library
//     const loadGapi = () => {
//       gapi = window.gapi;
//       gapi.load('client', initClient);
//     };

//     // Initialize the client
//     const initClient = async (tokens) => {
//       await gapi.client.init({
//         apiKey: 'AIzaSyAHJEB9ZSgU02eZMTAjtbA7oa5S56m2Ves',
//         discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
//       });

//       gapi.client.setToken({
//         access_token: tokens.access_token,
//         refresh_token: tokens.refresh_token
//       });

//       fetchEvents();
//     };

//     // Fetch event details from the backend
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/events');
//         const data = await response.json();
//         console.log(data);
//         setEvents(data[0]);

//         // Initialize the client with the tokens
//         initClient(data[1]);

//         // Initialize editable state for each event
//         let initialEditable = {};
//         data[0].forEach((item) => {
//           initialEditable[item.id] = false;
//         });
//         setEditable(initialEditable);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       }
//     };

//     // Load the gapi script and initialize the client
//     if (window.gapi) {
//       loadGapi();
//     } else {
//       const script = document.createElement('script');
//       script.src = 'https://apis.google.com/js/api.js';
//       script.onload = loadGapi;
//       document.body.appendChild(script);
//     }
//   }, []);

//   const handleEdit = (id) => {
//     setEditable((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const handleAddEvent = (event, id) => {
//     setEvents((prev) => prev.filter((item) => item.id !== id));
//   };

//   const addNewEvent = async (event) => {
//     const calendar = gapi.client.calendar;
//     try {
//       const response = await calendar.events.insert({
//         calendarId: 'primary',
//         resource: event,
//       });
//       console.log('Event created:', response.result);
//     } catch (err) {
//       console.error('There was an error contacting the Calendar service: ' + err);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {events.length ? (
//         <EventTable
//           events={events}
//           editable={editable}
//           onEdit={handleEdit}
//           onAddEvent={handleAddEvent}
//           onaddNewEvent={addNewEvent}
//         />
//       ) : (
//         <h1 className="bg-gray-400">Fetching Events</h1>
//       )}
//     </div>
//   );
// };

// export default App;


// import React, { useState, useEffect } from 'react';
// import EventTable from './components/EventTable';

// const App = () => {
//   const [events, setEvents] = useState([]);
//   const [editable, setEditable] = useState({});
//   const [tokens, setTokens] = useState({});
//   let gapi;

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         console.log("hi");
//         // Fetch user data including events and tokens from backend
//         const response = await fetch('http://localhost:3000/events');
//         const data = await response.json();
//         console.log(data);

//         // If tokens are not present, redirect to login (handle edge cases)
//         if (!data.tokens || !data.tokens.access_token || !data.tokens.refresh_token) {
//           window.location.href = 'http://localhost:3000/auth/google-signin'; // Adjust URL as needed
//           return;
//         }

//         // Initialize Google API client with fetched tokens
//         initClient(data.tokens);

//         // Set fetched events and tokens to state
//         setEvents(data.events);
//         setTokens(data.tokens);

//         // Initialize editable state for each event
//         let initialEditable = {};
//         data.events.forEach((item) => {
//           initialEditable[item.id] = false;
//         });
//         setEditable(initialEditable);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       }
//     };

//     // Function to initialize Google API client
//     const initClient = async (tokens) => {
//       try {
//         // Load Google API client library
//         await window.gapi.client.init({
//           apiKey: 'AIzaSyAHJEB9ZSgU02eZMTAjtbA7oa5S56m2Ves', // Replace with your API key if needed
//           discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
//         });

//         // Set access token and refresh token for Google API client
//         window.gapi.client.setToken({
//           access_token: tokens.access_token,
//           refresh_token: tokens.refresh_token,
//         });

//         // Fetch events after initializing client
//         fetchEvents();
//       } catch (error) {
//         console.error('Error initializing Google API client:', error);
//       }
//     };

//     fetchEvents()
//     // Load Google API script
//     const loadGapi = () => {
//       window.gapi.load('client', () => {
//         console.log('Google API client loaded');
//       });
//     };

//     // Check if gapi is already loaded, otherwise load the script
//     if (window.gapi) {
//       loadGapi();
//     } else {
//       const script = document.createElement('script');
//       script.src = 'https://apis.google.com/js/api.js';
//       script.onload = loadGapi;
//       document.body.appendChild(script);
//     }
//   }, []);

//   // Function to handle editing of events
//   const handleEdit = (id) => {
//     setEditable((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   // Function to handle adding new event
//   const handleAddEvent = (event, id) => {
//     setEvents((prev) => prev.filter((item) => item.id !== id));
//   };

//   // Function to add new event to Google Calendar
//   const addNewEvent = async (event) => {
//     const calendar = window.gapi.client.calendar;
//     try {
//       const response = await calendar.events.insert({
//         calendarId: 'primary',
//         resource: event,
//       });
//       console.log('Event created:', response.result);
//     } catch (err) {
//       console.error('There was an error contacting the Calendar service:', err);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {events.length ? (
//         <EventTable
//           events={events}
//           editable={editable}
//           onEdit={handleEdit}
//           onAddEvent={handleAddEvent}
//           onaddNewEvent={addNewEvent}
//         />
//       ) : (
//         <h1 className="bg-gray-400">Fetching Events</h1>
//       )}
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import EventTable from './components/EventTable';
import Information from "./components/Information"


const App = () => {
  const [events, setEvents] = useState([]);
  const [editable, setEditable] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/events');
        const data = await response.json();

        if (!data || !data.events) {
          console.error('No events data found');
          return;
        }

        setEvents(data.events);

        // Initialize editable state for each event
        let initialEditable = {};
        data.events.forEach((item) => {
          initialEditable[item.id] = false;
        });

        setEditable(initialEditable);

      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEdit = (id) => {
    setEditable((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddEvent = async (event, id) => {
    try {
      console.log(event);
      const response = await fetch('http://localhost:3000/addevent', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
      });
      if (!response.ok) {
        throw new Error('Failed to add event');
      }
      // Remove the event from the local state
      setEvents((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error adding event:', error.message);
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <Information />
      {events.length ? (
        <EventTable
          events={events}
          editable={editable}
          onEdit={handleEdit}
          onAddEvent={handleAddEvent}
        />
      ) : (
        <h1 className="bg-gray-400">Fetching Events</h1>
      )}
    </div>
  );
};

export default App;
