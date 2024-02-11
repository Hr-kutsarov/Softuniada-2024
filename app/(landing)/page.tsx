import React from "react";
import Link from "next/link";
export default function Home() {
  
  // TODO security check 
  // TODO redirect to security page if user is not logged in

  return (
    // child of <main>
    <span className="flex bg-slate-500 min-h-screen flex-col items-center justify-between p-24">
        {/* TODO display components */}
        <Link href='/welcome'>Enter</Link>
    </span>
  );
}
 