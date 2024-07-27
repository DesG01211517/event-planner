"use client";

import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { EventForm } from "../components/EventForm.jsx";
import { EventList } from "../components/EventList.jsx";
import { LogOutButton } from "../components/LogOutButton.jsx";
import { getAuth, onAuthChanged, signOut } from "firebase/auth";
import { collection, getDocs } from "@/utils/firebaseUtils.js";
import { db } from "../src/app/utils/firebaseUtils.js";
import { 
  getAllDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
} from "../src/app/utils/firebaseUtils";
import { deleteDoc } from 'firebase/firestore';


const ManagementPage = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const router = useRouter();
  
    useEffect(() => {
      const fetchUser = () => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user);
          fetchEvents(user.uid);
        } else {
          router.push("/");
        }
      });
    };
  
      const fetchEvents = async (userId) => {
        try {
          const eventLis = await getAllDocuments(db, "events");
          setEvents(eventList.filter(event => event.userId ===userId));
        } catch (error) {
          console.error("Error fetching events:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUser();
    }, [auth, router]);
  
    const handleDelete = async (id) => {
      try {
        await deleteDocument(db, "events", id);
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    };

    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-4xl font-bold mb-8">Management Page</h1>
        {currentUser && (
          <>
          <div className="mb-8">
            <p className="text-lg font-extrabold text-gray-700 border-2 border-gray-500 p-4 mb-4 rounded-md text-center">
              Logged in as {currentUser.email}
            </p>
          </div>
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
        </>
    )}
        <LogOutButton />
      </div>
    );
  };
  
  export default ManagementPage;

