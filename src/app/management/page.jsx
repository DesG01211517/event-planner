"use client";

import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import EventForm from '@/components/EventForm.jsx';
import EventList from '@/components/EventList.jsx';
import LogOutButton from '@/components/LogOutButton.jsx';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs } from "@/utils/firebaseUtils.js";
import { db } from '../../../firebase.config';
import { 
  getAllDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
} from "@/utils/firebaseUtils";



const ManagementPage = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState(null);
    // const [loading, setLoading] = useState(true);
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
          const eventList = await getAllDocuments(db, "events");
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
        await deleteDocument(db, "events", id);
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    };

    // if (loading) {
    //   return <div>Please Wait...</div>;
    // }
  
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
            fetchEvents={async () => {
              const eventList = await getAllDocuments(db, "events");
              setEvents(eventList);
            }}
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

