import React from 'react';
import EventRow from './EventRow';

const EventTable = ({ events, editable, onEdit, onAddEvent, onaddNewEvent }) => {
  return (
    <div className='bg-gray-300'>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Summary</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {events.map((event) => (
        <EventRow key={event.id} event={event} editable={editable[event.id]} onEdit={onEdit} id={event.id} onAddEvent={onAddEvent} />
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;



