// import React, { useState } from 'react';

// const EventRow = ({ event, editable, onEdit, id, onAddEvent }) => {

//   const [summary, setSummary] = useState(event.summary);
//   const [description, setDescription] = useState(event.description);
//   const [location, setLocation] = useState(event.location);
//   const [startDateTime, setStartDateTime] = useState(event.start.dateTime);
//   const [endDateTime, setEndDateTime] = useState(event.end.dateTime);

//   const handleTextAreaResize = (e) => {
//     e.target.style.height = 'auto';
//     e.target.style.height = e.target.scrollHeight + 'px';
//   };

//   const handleAddEvent = () => {
//     const event = {
//         "summary": summary,
//         "location": location,
//         "description": description,
//         "start": {
//             "dateTime": startDateTime,
//             "timeZone": 'Asia/Kolkata'
//         },
//         "end": {
//             "dateTime": endDateTime,
//             "timeZone": 'Asia/Kolkata'
//         }
//     }
//     onAddEvent(event, id);
//   }

//   return (
//     <tr>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <textarea 
//           value={summary} 
//           readOnly={!editable} 
//           className="border rounded p-2 w-full text-ellipsis" 
//           onChange={(e) => {
//             setSummary(e.target.value);
//             handleTextAreaResize(e);
//           }}
//           rows={2}
//         />
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <textarea 
//           value={description} 
//           readOnly={!editable} 
//           className="border rounded p-2 w-full text-ellipsis" 
//           onChange={(e) => {
//             setDescription(e.target.value);
//             handleTextAreaResize(e);
//           }}
//           rows={2}
//         />
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <textarea 
//           value={location} 
//           readOnly={!editable} 
//           className="border rounded p-2 w-full text-ellipsis " 
//           onChange={(e) => {
//             setLocation(e.target.value);
//             handleTextAreaResize(e);
//           }}
//           rows={2}
//         />
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <textarea 
//           value={startDateTime} 
//           readOnly={!editable} 
//           className="border rounded p-2 w-full  text-ellipsis resize-none" 
//           onChange={(e) => {
//             setStartDateTime(e.target.value);
//             handleTextAreaResize(e);
//           }}
//           rows={1}
//         />
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <textarea 
//           value={endDateTime} 
//           readOnly={!editable} 
//           className="border rounded p-2 w-full text-ellipsis resize-none" 
//           onChange={(e) => {
//             setEndDateTime(e.target.value);
//             handleTextAreaResize(e);
//           }}
//           rows={1}
//         />
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap flex flex-col space-y-2">
//         <button 
//           onClick={() => {
//             onEdit(id)
//         }} 
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           {editable ? 'Save' : 'Edit'}
//         </button>
//         <button onClick={handleAddEvent} className="bg-green-500 text-white px-4 py-2 rounded">
//           Add
//         </button>
//       </td>
//     </tr>
//   );
// };

// export default EventRow;


import React, { useState } from 'react';

const EventRow = ({ event, editable, onEdit, id, onAddEvent }) => {
  const [summary, setSummary] = useState(event.summary);
  const [description, setDescription] = useState(event.description);
  const [location, setLocation] = useState(event.location);
  if(event.start && !event.end){
    event.start
  }
  const [startDateTime, setStartDateTime] = useState(event.start ? event.start.dateTime : null);
  const [endDateTime, setEndDateTime] = useState(event.end ? event.end.dateTime : null);

  const handleTextAreaResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

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

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <textarea 
          value={summary} 
          readOnly={!editable} 
          className="border rounded p-2 w-full text-ellipsis focus:ring-2 focus:ring-blue-500" 
          onChange={(e) => {
            setSummary(e.target.value);
            handleTextAreaResize(e);
          }}
          rows={2}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <textarea 
          value={description} 
          readOnly={!editable} 
          className="border rounded p-2 w-full text-ellipsis focus:ring-2 focus:ring-blue-500" 
          onChange={(e) => {
            setDescription(e.target.value);
            handleTextAreaResize(e);
          }}
          rows={2}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <textarea 
          value={location} 
          readOnly={!editable} 
          className="border rounded p-2 w-full text-ellipsis focus:ring-2 focus:ring-blue-500" 
          onChange={(e) => {
            setLocation(e.target.value);
            handleTextAreaResize(e);
          }}
          rows={2}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <textarea 
          value={startDateTime} 
          readOnly={!editable} 
          className="border rounded p-2 w-full text-ellipsis focus:ring-2 focus:ring-blue-500 resize-none" 
          onChange={(e) => {
            setStartDateTime(e.target.value);
            handleTextAreaResize(e);
          }}
          rows={1}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <textarea 
          value={endDateTime} 
          readOnly={!editable} 
          className="border rounded p-2 w-full text-ellipsis focus:ring-2 focus:ring-blue-500 resize-none" 
          onChange={(e) => {
            setEndDateTime(e.target.value);
            handleTextAreaResize(e);
          }}
          rows={1}
        />
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
