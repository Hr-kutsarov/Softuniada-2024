import React from "react";

interface DataType {
  // TODO
}

// fetching data in server component (SSR rendering) for SEO and performance
async function getData() {
  // TODO fix url with proper data
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Home() {
  const data = await getData()
  
  // TODO security check 
  // TODO redirect to security page if user is not logged in

  return (
    // child of <main>
    <span className="flex bg-slate-500 min-h-screen flex-col items-center justify-between p-24">
      {/* Display a list of items */}
      <>
      {data?.map((el: any) => <span key={el.id}>{el.title}</span>)}
      </>
      {/* TODO display components */}
    </span>
  );
}
 