"use client";

import LoginForm from "@/components/LoginForm";

export default function Home () {
    return (
 <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold mb-8">Event Planner</h1>
      <div>
      < LoginForm />
      < EventList /> 
      </div> 
      </main>
     )
  };
  
