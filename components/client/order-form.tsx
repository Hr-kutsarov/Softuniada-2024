"use client";

import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  barcode: z
    .string()
    .min(10, { message: "too short" })
    .max(12, { message: "too long" })
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  phoneNumber: z.string().regex(phoneRegex, "Invalid Number!"),
  address: z.string().min(5).max(50),
  quantity: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  price: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  unit: z.enum(["m", "m2", "m3"]),
  description: z.string().min(10).max(300),
  drillHoles: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  hinges: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  express: z.enum(["regular", "express"]).optional(),
});

import { AnimatePresence, motion } from "framer-motion";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { toast } from "../ui/use-toast";

export default function OrderForm() {
  const [terms, setTerms] = useState<boolean>(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      barcode: "12345678",
      firstName: "First name",
      lastName: "Last name",
      phoneNumber: "+359123123123",
      address: "123 Str. Unknown",
      quantity: "1",
      price: "1",
      unit: "m",
      description: "description",
      drillHoles: "",
      hinges: "",
      express: "regular",
    },
  });

  const x = form.getValues();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const dateObj = new Date();
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    toast({
      title: "Form submitted",
      description: 
      (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(values, null, 2)}</code>
      </pre>
      )
    });
  }

  const formStyles =
    "flex flex-col gap-4 bg-zinc-500/5 p-8 w-full m-8 rounded-2xl md:max-w-[650px] lg:max-w-[960px]";

  const descriptionStyles =
    "hidden group-hover:flex min-w-[240px] absolute -top-2 left-0 text-green-500 font-semibold";

  return (
    <section
      className={cn(
        "flex w-full h-full items-center justify-center bg-slate-100"
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn(formStyles)}>
        {/* triangle playground */}
        {/* <span className='border-solid border-l-slate-700 border-l-[49px] transition-all rotate-[45deg] border-y-transparent border-y-[24px] border-r-0 absolute right-[50%] '></span> */}
          <span className={cn("flex w-full gap-4 items-end")}>
            <FormField
              control={form.control}
              name="barcode"
              render={({ field }) => (
                <FormItem className={cn("w-full")}>
                  <FormLabel>Barcode number</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Barcode" {...field} />
                  </FormControl>
                  <FormDescription className={cn(descriptionStyles)}>
                    Barcode number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </span>
          <span className={cn("grid grid-cols-1 md:grid-cols-2 gap-4 ")}>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className={cn("group relative")}>
                  <FormLabel className={cn("group-hover:opacity-0")}>
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription className={cn(descriptionStyles)}>
                    The client's first name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className={cn("group relative")}>
                  <FormLabel className={cn("group-hover:opacity-0")}>
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="..." {...field} />
                  </FormControl>
                  <FormDescription className={cn(descriptionStyles)}>
                    The client's last name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </span>
          <span className={cn("grid grid-cols-1 md:grid-cols-2 gap-4 ")}>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className={cn("group relative")}>
                  <FormLabel className={cn("group-hover:opacity-0")}>
                    Phone number
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="..." {...field} />
                  </FormControl>
                  <FormDescription className={cn(descriptionStyles)}>
                    The client's phone number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className={cn("group relative")}>
                  <FormLabel className={cn("group-hover:opacity-0")}>
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription className={cn(descriptionStyles)}>
                    The client's address for delivery.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </span>
          <span className="grid grid-cols-3 gap-4  w-full h-full">

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className={cn("group relative")}>
                  <FormLabel className={cn("group-hover:opacity-0")}>
                    Quantity
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription className={cn(descriptionStyles)}>
                    input something
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className={cn("group relative")}>
                  <FormLabel className={cn("group-hover:opacity-0")}>
                    Price
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription className={cn(descriptionStyles)}>
                    The client's address for delivery.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem className={cn("group relative")}>
                <FormLabel className={cn("group-hover:opacity-0")}>Units</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='className="w-full min-w-[180px]'>
                      <SelectValue placeholder="Select units" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m">Metres</SelectItem>
                    <SelectItem value="m2">Sq Meters</SelectItem>
                    <SelectItem value="m3">Cubic Meters</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className={cn(descriptionStyles)}>
                  Please select the units carefully.
                </FormDescription>
                <FormMessage />
              </FormItem>
              )}
            />
          </span>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className={cn("group relative ")}>
                <FormLabel className={cn("group-hover:opacity-0")}>
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} />
                </FormControl>
                <FormDescription className={cn(descriptionStyles)}>
                  Description
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className={cn("")} />
          <h5 className={cn("font-semibold")}>Additional</h5>
          <span className="grid grid-cols-3 gap-4  w-full h-full">
            <FormField
              control={form.control}
              name="drillHoles"
              render={({ field }) => (
                <FormItem className={cn("group relative")}>
                  <FormLabel className={cn("group-hover:opacity-0")}>
                    Drill holes
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription className={cn(descriptionStyles)}>
                    BGN 123 each*
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hinges"
              render={({ field }) => (
                <FormItem className={cn("group relative")}>
                  <FormLabel className={cn("group-hover:opacity-0")}>
                    Hinges
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription className={cn(descriptionStyles)}>
                    BGN 2 each*
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="express"
              render={({ field }) => (
                <FormItem className={cn("group relative")}>
                <FormLabel className={cn("group-hover:opacity-0")}>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='className="w-full min-w-[180px]'>
                      <SelectValue placeholder="Order type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="express">Express</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className={cn(descriptionStyles)}>
                  Please select the units carefully.
                </FormDescription>
                <FormMessage />
              </FormItem>
              )}
            />
          </span>

          <Separator />
          <span className={cn("bg-transparent gap-2 flex items-center")}>
            <Checkbox className="h-6 w-6" onClick={() => setTerms(!terms)} />I
            accept the terms and conditions.
          </span>

          <Separator />
          <span className={cn("grid grid-cols-3")}>
            <p>Price drilling: {Number(x.drillHoles) * 5}</p>
            <p>Adding hinges: {Number(x.hinges) * 1.25}</p>
            <h1 className={cn("font-semibold")}>
              Total price:{" "}
              {Number(x.drillHoles) * 2 +
                Number(x.hinges) * 1.25 +
                Number(x.price) * Number(x.quantity)}
            </h1>
          </span>

          <AnimatePresence mode="wait">
            {terms ? (
              <motion.span
                initial={{ x: 44, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 44, opacity: 0 }}
                transition={{ duration: 0.7, type: "spring" }}
              >
                <Button variant="default" className={cn("mt-4")} type="submit">
                  Submit
                </Button>
              </motion.span>
            ) : null}
          </AnimatePresence>
        </form>
      </Form>
    </section>
  );
}
