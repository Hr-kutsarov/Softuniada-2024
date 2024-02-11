"use client";

import { z } from "zod";

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );

const formSchema = z.object({
    barcode: z.number().positive(),
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    phoneNumber: z.string().regex(phoneRegex, 'Invalid Number!'),
    address: z.string().min(5).max(50),
    quantity: z.number().positive().lte(10000).finite(),
    price: z.number().positive().safe().finite(),
    unit: z.enum(["m", "m2", "m3"]),
    description: z.string().min(10).max(300),
    drillHoles: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {message: 'Expected number, received a string'}),
    hinges: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {message: 'Expected number, received a string'}),
    express: z.enum(["true", "false"]).optional()
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
        barcode: 12345678,
        firstName: 'First name',
        lastName: 'Last name',
        phoneNumber: '+359123123123',
        address: '123 Str. Unknown',
        quantity: 1,
        price: 1,
        unit: 'm',
        description: 'description',
        drillHoles: '',
        hinges: '',
        express: 'false'
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
        description: `Created ${dateObj}`,
      })
  }

  const formStyles =
    "flex flex-col gap-4 bg-zinc-500/5 p-8 w-full m-8 rounded-2xl md:max-w-[650px] lg:max-w-[960px]";

  const descriptionStyles = "hidden group-hover:flex min-w-[240px] absolute -top-2 left-0 text-green-500 font-semibold"

  return (
    <section
      className={cn(
        "flex w-full h-full items-center justify-center bg-slate-100"
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn(formStyles)}>
          <span className={cn("flex w-full gap-4 items-end")}>
            <FormField
              control={form.control}
              name="barcode"
              render={({ field }) => (
                <FormItem className={cn("w-full")}>
                  <FormLabel>Barcode number</FormLabel>
                  <FormControl>
                    <Input placeholder="Barcode" {...field} />
                  </FormControl>
                  <FormDescription
                    className={cn(
                      descriptionStyles
                    )}
                  >
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
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription
                    className={cn(
                      descriptionStyles
                    )}
                  >
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
                    <Input placeholder="..." {...field} />
                  </FormControl>
                  <FormDescription
                    className={cn(
                      descriptionStyles
                    )}
                  >
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
                    <Input placeholder="..." {...field} />
                  </FormControl>
                  <FormDescription
                    className={cn(
                      descriptionStyles
                    )}
                  >
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
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription
                    className={cn(
                      descriptionStyles
                    )}
                  >
                    The client's address for delivery.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </span>
          <span className="grid grid-cols-3 gap-4  w-full h-full">
            {/* quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className={cn("group relative")}>
                  <FormLabel className={cn("group-hover:opacity-0")}>
                    Quantity
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription
                    className={cn(
                      descriptionStyles
                    )}
                  >
                    input something
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className={cn("group relative")}>
                  <FormLabel className={cn("group-hover:opacity-0")}>
                    Price
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription
                    className={cn(
                      descriptionStyles
                    )}
                  >
                    The client's address for delivery.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* unit */}
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem className={cn("group relative")}>
                  <FormLabel className={cn("group-hover:opacity-0")}>
                    Unit
                  </FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-full min-w-[180px]">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{field.name}</SelectLabel>
                          <SelectItem value="m">Metres</SelectItem>
                          <SelectItem value="m2">Square metres</SelectItem>
                          <SelectItem value="m3">Cubic metres</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription
                    className={cn(
                      descriptionStyles
                    )}
                  >
                    select
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </span>
          {/* description */}
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
                <FormDescription
                  className={cn(
                    descriptionStyles
                  )}
                >
                  Description
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className={cn("")} />
          <h5 className={cn("font-semibold")}>Additional</h5>
          <span className="grid grid-cols-3 gap-4  w-full h-full">
            {/* Drills */}
            <FormField
              control={form.control}
              name="drillHoles"
              render={({ field }) => (
                <FormItem className={cn("group relative")}>
                  <FormLabel className={cn("group-hover:opacity-0")}>
                    Drill holes
                  </FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormDescription
                    className={cn(
                      descriptionStyles
                    )}
                  >
                    BGN 123 each*
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* price */}
            <FormField
              control={form.control}
              name="hinges"
              render={({ field }) => (
                <FormItem className={cn("group relative")}>
                  <FormLabel className={cn("group-hover:opacity-0")}>
                    Hinges
                  </FormLabel>
                  <FormControl>
                    <Input type='number' placeholder="" {...field} />
                  </FormControl>
                  <FormDescription
                    className={cn(
                      descriptionStyles
                    )}
                  >
                    BGN 2 each*
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* unit */}
            <FormField
              control={form.control}
              name="express"
              render={({ field }) => (
                <FormItem className={cn("group relative")}>
                  <FormLabel className={cn("group-hover:opacity-0")}>
                    Express order
                  </FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="min-w-[180px] w-full">
                        <SelectValue placeholder="+25%" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{field.name}</SelectLabel>
                          <SelectItem value={'true'}>Yes</SelectItem>
                          <SelectItem value={'false'}>No</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription
                    className={cn(
                      descriptionStyles
                    )}
                  >
                    should be dropdown
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
          <span className={cn('grid grid-cols-3')}>
            <p>Price drilling: {Number(x.drillHoles)*5}</p>
            <p>Adding hinges: {Number(x.hinges)*1.25}</p>
            <h1 className={cn('font-semibold')}>Total price: {Number(x.drillHoles)*5 + Number(x.hinges)*1.25 + Number(x.price)*Number(x.quantity)}</h1>
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
