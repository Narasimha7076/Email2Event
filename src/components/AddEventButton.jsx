import React, { useState } from 'react';

const AddEventButton = ({ onaddNewEvent }) => {
  const [newEvent, setNewEvent] = useState({
    summary: '',
    description: '',
    location: '',
    start: { dateTime: '', timeZone: 'UTC' },
    end: { dateTime: '', timeZone: 'UTC' },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => {
      const [key, subKey] = name.split('.');
      if (subKey) {
        return {
          ...prev,
          [key]: {
            ...prev[key],
            [subKey]: value,
          },
        };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = () => {
    onaddNewEvent(newEvent);
    setNewEvent({
      summary: '',
      description: '',
      location: '',
      start: { dateTime: '', timeZone: 'UTC' },
      end: { dateTime: '', timeZone: 'UTC' },
    });
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium text-gray-900">Add New Event</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        <input
          type="text"
          name="summary"
          placeholder="Summary"
          value={newEvent.summary}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newEvent.description}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newEvent.location}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <input
          type="text"
          name="start.dateTime"
          placeholder="Start DateTime"
          value={newEvent.start.dateTime}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <input
          type="text"
          name="end.dateTime"
          placeholder="End DateTime"
          value={newEvent.end.dateTime}
          onChange={handleChange}
          className="border rounded p-2"
        />
      </div>
      <button onClick={handleSubmit} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
        Add Event
      </button>
    </div>
  );
};

export default AddEventButton;
