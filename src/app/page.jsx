"use client";

// import { EventList } from "@/components/EventForm.jsx";
import { LoginForm } from "../components/LoginForm.jsx";
import RegistrationForm from "@/components/RegisterForm"; 

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Event Planner</h1>
      <div className="text-center mb-8">
        <p className="text-lg font-extrabold text-gray-700 border-2 border-gray-500 p-4 mb-4 rounded-md text-center">
          An event planner helps you stay organized, manage your time
          effectively, and ensure that you never miss an important date or
          deadline. Use our event planner to streamline your tasks and improve
          productivity.
        </p>
      </div>
      <div className="relative w-full flex flex-wrap justify-center gap-6 mb-8">
        <div className="card transform transition duration-300 hover:scale-125 p-4 border-2 border-gray-300 rounded-lg bg-white shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Create Events</h2>
          <p className="text-gray-700">
            Easily create events with our simple form and keep track of all your
            important dates.
          </p>
        </div>
        <div className="card transform transition duration-300 hover:scale-125 p-4 border-2 border-gray-300 rounded-lg bg-white shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Manage Events</h2>
          <p className="text-gray-700">
            Update or delete events as needed, and keep everything organized in
            one place.
          </p>
        </div>
        <div className="card transform transition duration-300 hover:scale-125 p-4 border-2 border-gray-300 rounded-lg bg-white shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Stay Organized</h2>
          <p className="text-gray-700">
            Never miss a deadline again with our easy-to-use event planner tool.
          </p>
        </div>
        </div>
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
        <div className="flex-1">
          <div className="card transform transition duration-300 hover:scale-125 p-4 border-2 border-gray-300 rounded-lg bg-white shadow-lg mx-auto w-full max-w-md">
            <LoginForm />
          </div>
        </div>
        <div className="flex-1">
          <div className="card transform transition duration-300 hover:scale-125 p-4 border-2 border-gray-300 rounded-lg bg-white shadow-lg mx-auto w-full max-w-md">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </main>
  );
}