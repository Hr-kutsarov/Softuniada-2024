import React from "react";
import { cn } from "@/lib/utils";
import CompanyLogoComponent from "@/components/server/company-logo";
import { NavigationMenuComponent } from "@/components/client/nav-button-profile";

import OrderForm from "@/components/client/order-form";

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

export default async function Page() {
  const data = await getData()
  
  // TODO security check 
  // TODO redirect to security page if user is not logged in

  return (
    // child of <main>
    <span className="flex bg-slate-200 min-h-screen flex-col items-center">
      {/* Display a list of items */}<>
      {/* {data?.map((el: any) => <span key={el.id}>{el.title}</span>)} */}
      </>
      {/* HEADER */}
      <header className={cn('bg-slate-50 w-full h-full flex min-h-4 p-4')}>
        <CompanyLogoComponent />
        <NavigationMenuComponent />
      </header>
      {/* CONTENT */}
      <OrderForm />
    </span>
  );
}
 