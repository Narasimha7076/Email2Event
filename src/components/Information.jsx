import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const Instructions = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleMouseEnter = () => {
    setShowInstructions(true);
  };

  const handleMouseLeave = () => {
    setShowInstructions(false);
  };

  return (
    <div className="fixed top-4 right-4">
      <div
        className="relative flex items-center justify-center bg-gray-700 text-white rounded-full cursor-pointer w-7 h-7"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <i className="fas fa-info-circle text-lg"></i>
        {showInstructions && (
          <div className="absolute top-12 right-0 w-64 p-4 bg-white text-black border border-gray-300 rounded-lg shadow-lg z-10">
            <p className="font-bold">Here are the instructions for using the site:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Step 1: Do this...</li>
              <li>Step 2: Do that...</li>
              <li>Step 3: Finish with this...</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Instructions;