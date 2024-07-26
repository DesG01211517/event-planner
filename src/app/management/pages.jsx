import React from 'react'
import { useState, useEffect } from 'react';
import { EventForm } from "../components/EventForm.jsx";
import { EventList } from "../components/EventList.jsx";
import { LogOutButton } from "../components/LogOutButton.jsx";
import {
    getAllDocuments,
    addDocument,
    updateDocument,
    deleteDocument,
    collection,
    getDocs,
  } from "../utils/firebaseUtils.js";
  import { db, auth } from "../../../firebase.config.js";








export default function Management Page() {
  const [event, setEvents] = useState([]);
  
}

