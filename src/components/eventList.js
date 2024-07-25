// components/EventList.js
"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "../utils/firebaseUtils";
// import { db } from "firebase";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, "events");
      const eventSnapshot = await getDocs(eventsCollection);
      const eventList = eventSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventList);
    };

    fetchEvents();
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="mb-2 p-2 border-b border-gray-200">
            <div>
              <strong>Description:</strong> {event.description}
            </div>
            <div>
              <strong>Location:</strong> {event.location}
            </div>
            <div>
              <strong>Due Date:</strong> {event.dueDate}
            </div>
            <button
              onClick={() => setCurrentEvent(event)}
              className="mt-2 px-2 py-1 bg-yellow-500 text-white rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(event.id)}
              className="mt-2 ml-2 px-2 py-1 bg-red-500 text-white rounded-md"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
