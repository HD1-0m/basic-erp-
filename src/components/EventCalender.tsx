"use client"

import { useState } from "react";
import Calendar from "react-calendar";
// IMPORTANT: Make sure your custom CSS file is imported AFTER the default one
import 'react-calendar/dist/Calendar.css'; 
// import '../your-custom-styles.css'; // <--- Uncomment and use your CSS file

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// Corrected the array definition and named it 'events'
const events = [
    {
        id: 1,
        title: "Mahatma Gandhi Jayanti",
        time: "from 10:00 AM to 12:00 PM",
        description: "Celebrating the birth of Mahatma Gandhi"
    },
    {
        // Corrected 'ID' to 'id'
        id: 2, 
        title: "Independence Day",
        time: "from 10:00 AM to 12:00 PM",
        description: "Celebrating the independence of India",
    }
];

const EventCalender = () => {
    // Note: If you want to use the event list to highlight dates, you would typically 
    // add a 'date' field to the event objects and use the tileContent prop.
    const [value, onChange] = useState<Value>(new Date());

    return(
        // Corrected 'round' to a valid class like 'rounded-lg' and added shadow
        <div className='bg-white p-4 rounded-lg shadow-md'> 
            
            {/* Added className for custom styling from previous prompts */}
            <Calendar 
                onChange={onChange} 
                value={value} 
                className="react-calendar" 
            />

            <h2 className="text-xl font-semibold mt-6 mb-3 border-b pb-2">Upcoming Events</h2>
            
            <div className="flex flex-col gap-4">
                {/* Check if events is an array before mapping */}
                {events.map(event => (
                    // Removed the incomplete className and added basic styling
                    <div className='p-3 border rounded-md hover:bg-gray-50 transition' key={event.id}> 
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-medium">{event.title}</h1>
                            <span className="text-sm text-gray-500">{event.time}</span>
                        </div>
                        <p className="text-gray-600 mt-1">{event.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default EventCalender