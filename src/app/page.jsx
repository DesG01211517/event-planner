import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import SignOut from '../components/SignOut';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Home() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);

  const fetchEvents = async () => {
    const querySnapshot = await getDocs(collection(db, 'events'));
    const fetchedEvents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setEvents(fetchedEvents);
  };

  useEffect(() => {
    fetchEvents();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Event Planner</title>
        <meta name="description" content="Event Planner App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center min-h-screen py-8">
        <h1 className="text-4xl font-bold mb-8">Event Planner</h1>
        {user ? (
          <>
            <EventForm fetchEvents={fetchEvents} currentEvent={currentEvent} setCurrentEvent={setCurrentEvent} />
            <EventList events={events} fetchEvents={fetchEvents} setCurrentEvent={setCurrentEvent} />
            <SignOut setUser={setUser} />
          </>
        ) : (
          <>
            <SignUp setUser={setUser} />
            <SignIn setUser={setUser} />
          </>
        )}
      </main>
    </div>
  );
}




