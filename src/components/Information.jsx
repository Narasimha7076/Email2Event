import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const Instructions = ({user, handleLogout}) => {
    console.log(user);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleMouseEnter = () => {
    setShowInstructions(true);
  };

  const handleMouseLeave = () => {
    setShowInstructions(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-gray-800 text-white z-50">
      <div className="flex items-center space-x-4">
        <img src={user[2]} alt="Profile" className="w-10 h-10 rounded-full" />
        <div>
          <div className="font-bold">{user[0]}</div>
          <div className="text-sm">{user[1]}</div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div
          className="relative flex items-center justify-center bg-gray-800 text-white rounded-full cursor-pointer w-6 h-6"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <i className="fas fa-info-circle"></i>
          {showInstructions && (
          <div className="absolute top-12 right-0 w-80 md:w-96 p-4 bg-gray-100 text-black border border-gray-300 rounded-lg shadow-lg z-10">
          <p className="font-bold mb-2">Here are the instructions for using the site:</p>
          <ul className="list-disc pl-5 space-y-1">
              <li> Only events from starred emails are extracted, so ensure your email is starred.</li>
              <li> Events are displayed in a table format. Users can edit the attributes: summary, description, location, start date-time, and end date-time. Remember to save changes after editing.</li>
              <li> Click the add button to add the event to the Google Calendar of the registered email.</li>
              <li> Ensure the start time and end time are not null before adding an event.</li>
              <li> AI might make mistakes, so feel free to edit events before adding them.</li>
          </ul>
      </div>
          )}
        </div>

        <button 
          onClick={handleLogout}
          className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
  
};

export default Instructions;

