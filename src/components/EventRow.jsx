import React, { useState } from 'react';

const EventRow = ({ event, editable, onEdit, id, onAddEvent }) => {
  const [summary, setSummary] = useState(event.summary);
  const [description, setDescription] = useState(event.description);
  const [location, setLocation] = useState(event.location);
  const [startDateTime, setStartDateTime] = useState(event.start ? event.start.dateTime : null);
  const [endDateTime, setEndDateTime] = useState(event.end ? event.end.dateTime : null);

  const handleAddEvent = () => {
    const event = {
      summary,
      location,
      description,
      start: {
        dateTime: startDateTime,
        timeZone: 'Asia/Kolkata'
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'Asia/Kolkata'
      }
    };
    onAddEvent(event, id);
  };

  const handleTextAreaResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const createResizableTextarea = (value, setValue, editable, rows, resize = "both") => {
    return (
      <div className="custom-textarea">
        <textarea
          value={value}
          readOnly={!editable}
          className="border rounded-lg p-3 w-full text-ellipsis focus:ring-2 focus:ring-blue-500 shadow-sm"
          rows={rows}
          style={{ resize, fontFamily: 'Arial, sans-serif', fontSize: '14px' }}
          onChange={(e) => {
            setValue(e.target.value);
            handleTextAreaResize(e);
          }}
        />
      </div>
    );
  };

  return (
    <tr className="hover:bg-indigo-50 transition-colors duration-200">
      <td className="px-6 py-4 whitespace-nowrap">
        {createResizableTextarea(summary, setSummary, editable, 2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {createResizableTextarea(description, setDescription, editable, 2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {createResizableTextarea(location, setLocation, editable, 2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {createResizableTextarea(startDateTime, setStartDateTime, editable, 1, "none")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {createResizableTextarea(endDateTime, setEndDateTime, editable, 1, "none")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap flex flex-col space-y-2">
        <button 
          onClick={() => onEdit(id)} 
          className={`px-4 py-2 rounded text-white ${editable ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500 hover:bg-gray-700'}`}
        >
          {editable ? 'Save' : 'Edit'}
        </button>
        <button 
          onClick={handleAddEvent} 
          className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </td>
    </tr>
  );
};

export default EventRow;
 
