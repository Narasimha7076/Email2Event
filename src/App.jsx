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
