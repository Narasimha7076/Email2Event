import React, { useState, useEffect } from 'react';
import EventTable from './components/EventTable';
import Information from './components/Information'

const App = () => {
  const [events, setEvents] = useState([]);
  const [editable, setEditable] = useState({});
  const [user, setUser] = useState([]);
        
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/events', {
          credentials: 'include', // Include credentials (cookies) in the request
        });
        console.log(response);
        const data = await response.json();

        if (!data || !data.events) {
          console.error('No events data found');
          return;
        }

        setEvents(data.events);
        setUser(data.userDetails) ;
        console.log(user[1]);

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
      // Remove the event 
      setEvents((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error adding event:', error.message);
    }
  };

    const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'GET',
        credentials: 'include', // Include credentials (cookies) in the request
      });

      if (response.ok) {
        // Redirect to the homepage
        window.location.href = '/';
      } else {
        console.error('Logout request failed');
      }
    } catch (error) {
      console.error('Logout request error:', error);
    }
  };


  return (
    <div>
      {events.length ? (
        <>
        <Information user={user} handleLogout={handleLogout}/>
        <div className='mt-20'>
          <EventTable
          events={events}
          editable={editable}
          onEdit={handleEdit}
          onAddEvent={handleAddEvent}
          />
        </div>
        
        </>
      ) : (
        <>
         <h1 className='bg-gray-500'>No events fetched</h1>
        </>
       
      )}
    </div>
  );
};

export default App;