# Email to Calendar Event Parser

## Overview

This project is a web application that integrates with Google services to extract important event details from starred Gmail messages and add them to a Google Calendar. It uses modern web technologies and services, including Node.js, Express, React, Passport.js, Google APIs, PostgreSQL, and Google Generative AI.

## Features

1. **Google Authentication**: Users can sign up and log in using their Google accounts.
2. **Fetch Starred Emails**: Retrieve starred emails from the user's Gmail account.
3. **Parse Event Details**: Use Google's Gemini model to extract event details from email content.
4. **Display Events**: Show the parsed events in a table on the frontend.
5. **Add Events to Calendar**: Allow users to add parsed events to their Google Calendar.
6. **User Management**: Store user details and session management with PostgreSQL and Express sessions.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- Google Cloud Project with OAuth 2.0 Client IDs
- Google API Key for Generative AI

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/email-to-calendar-event-parser.git
    cd email-to-calendar-event-parser
    ```

2. **Install server dependencies**:
    ```bash
    cd server
    npm install
    ```

3. **Install client dependencies**:
    ```bash
    cd ../client
    npm install
    ```

4. **Create a `.env` file in the root directory with the following environment variables**:
    ```env
    GOOGLE_API_KEY=your_google_api_key
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    PG_USER=your_postgresql_username
    PG_HOST=your_postgresql_host
    PG_DATABASE=your_postgresql_database
    PG_PASSWORD=your_postgresql_password
    PG_PORT=your_postgresql_port
    SESSION_SECRET=your_session_secret
    ```

5. **Setup PostgreSQL Database**:
    ```sql
    CREATE DATABASE your_postgresql_database;
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    );
    ```

### Running the Application

1. **Start the server**:
    ```bash
    cd server
    npm start
    ```

2. **Start the client**:
    ```bash
    cd ../client
    npm start
    ```

### Usage

1. **Open your browser and navigate to**: `http://localhost:5173`
2. **Sign up or log in using your Google account**.
3. **View and manage your events** extracted from starred emails.

### Technologies Used

- **Backend**: Node.js, Express, Passport.js, PostgreSQL
- **Frontend**: React
- **APIs**: Google Gmail API, Google Calendar API, Google Generative AI
- **Authentication**: Google OAuth 2.0

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Contributing

If you would like to contribute, please fork the repository and submit a pull request.

### Acknowledgements

- [Google APIs](https://developers.google.com/)
- [Node.js](https://nodejs.org/)
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Passport.js](http://www.passportjs.org/)

### Contact

For any inquiries, please contact [Sai Narasimha](sainarasimhasomesula@gmail.com).
