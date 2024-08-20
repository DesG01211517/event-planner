"use Client";
import { useState, useEffect } from "react";
import { db } from "../../firebase.config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const EventForm = ({ fetchEvents, currentEvent, setCurrentEvent }) => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (currentEvent) {
      setDescription(currentEvent.description);
      setLocation(currentEvent.location);
      setDueDate(currentEvent.dueDate);
    } else {
      setDescription("");
      setLocation("");
      setDueDate("");
    }
  }, [currentEvent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (description && location && dueDate) {
      try {
      if (currentEvent) {
        const eventDoc = doc(db, "events", currentEvent.id);
        await updateDoc(eventDoc, {
          description,
          location,
          dueDate,
          timestamp: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "events"), {
          description,
          location,
          dueDate,
          timestamp: serverTimestamp(),
        });
      }
      fetchEvents();
      setDescription("");
      setLocation("");
      setDueDate("");
      setCurrentEvent(null);
    } catch (error) {
      // console.log("Error adding/updating event:", error);
    } 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mb-4">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Due Date
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        {currentEvent ? "Update Event" : "Add Event"}
      </button>
    </form>
  );
};

export default EventForm;
