// components/EventList.js
"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
// import { eventItem } from "./event.jsx";

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
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Upcoming Events</h1>
      {events.length > 0 ? (
        events.map((event) => (
          <div
            key={event.id}
            className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-4"
          >
            <div className="md:flex">
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  {event.name}
                </div>
                <p className="block mt-1 text-lg leading-tight font-medium text-black">
                  {event.location}
                </p>
                <p className="mt-2 text-gray-500">
                  {new Date(event.dueDate.seconds * 1000).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No events available</p>
      )}
    </div>
  );
};

export default EventList;
