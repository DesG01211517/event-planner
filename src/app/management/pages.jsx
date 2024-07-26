"use client";

import React from 'react'
import { useState, useEffect } from 'react';
import { EventForm } from "../components/EventForm.jsx";
import { EventList } from "../components/EventList.jsx";
import { LogOutButton } from "../components/LogOutButton.jsx";
import { getAuth } from 'firebase.config.js';
import { useRouter } from "next/router";
import { collection, getDocs } from "@/utils/firebaseUtils.js";




const ManagementPage = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState(null);
    const auth = getAuth();
    const router = useRouter();
  
    useEffect(() => {
      const fetchUser = () => {
        const user = auth.currentUser;
        if (user) {
          setCurrentUser(user);
        } else {
          router.push("/");
        }
      };
  
      const fetchEvents = async () => {
        try {
          const eventsCollection = collection(db, "events");
          const eventSnapshot = await getDocs(eventsCollection);
          const eventList = eventSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setEvents(eventList);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };
  
      fetchUser();
      fetchEvents();
    }, [auth, router]);
  
    const handleDelete = async (id) => {
      try {
        // Add delete logic here
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    };
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-4xl font-bold mb-8">Management Page</h1>
        {currentUser && (
          <div className="mb-8">
            <p className="text-lg font-extrabold text-gray-700 border-2 border-gray-500 p-4 mb-4 rounded-md text-center">
              Logged in as {currentUser.email}
            </p>
          </div>
        )}
        <div className="w-full max-w-4xl">
          <EventForm
            fetchEvents={() => fetchEvents()}
            currentEvent={currentEvent}
            setCurrentEvent={setCurrentEvent}
          />
          <EventList
            events={events}
            setCurrentEvent={setCurrentEvent}
            handleDelete={handleDelete}
          />
        </div>
        <LogOutButton />
      </div>
    );
  };
  
  export default ManagementPage;

