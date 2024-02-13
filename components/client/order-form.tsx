"use client";

import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({

  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  phoneNumber: z.string().regex(phoneRegex, "Invalid Number!"),
  address: z.string().min(5).max(50),
  item: z
  .string()
  .min(2, { message: "too short" })
  .max(33, { message: "too long" }),
  orientation: z.enum(['L', 'C']).optional(),
  width: z.string(),
  height: z.string(),
  quantity: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  price: z
    .string(),
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

interface Material {
  sysId: string,
  color: string,
  price: string,
}

export default function OrderForm() {

  const materials: Material[] = [
    {
      sysId: 'qwe-123-123',
      color: 'red',
      price: '12'
    },
    {
      sysId: 'qwe-234-234',
      color: 'blue',
      price: '13'
    },
    {
      sysId: 'qwe-345-345',
      color: 'green',
      price: '14'
    }
  ]

  const [terms, setTerms] = useState<boolean>(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item: "12345678",
      firstName: "First name",
      lastName: "Last name",
      phoneNumber: "+359123123123",
      address: "123 Str. Unknown",
      width: "0",
      height: "0",
      quantity: "1",
      orientation: undefined,
      price: "1",
      description: "Description",
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
    console.log([dateObj, values]);
    toast({
      title: "Form submitted",
      description: 
      (
        <pre className="mt-2 w-full rounded-lg bg-slate-950  text-lg p-4">
        <code className="text-white">{JSON.stringify(values, null, 2)}</code>
      </pre>
      )
    });
  }

  const formStyles =
    "flex flex-col gap-4 bg-zinc-500/5 p-8 w-full m-8 rounded-2xl md:max-w-[650px] lg:max-w-[960px]";

  const descriptionStyles =
    "hidden group-hover:flex min-w-[240px] absolute -top-2 left-0 text-green-500 font-semibold";

    const calcPrice = (s : string) => {
      const material = materials.filter((el) => el.color === s)
      return material[0] ? Number(material[0].price).toFixed(2) : null
    }

    const calcArea = () => {
      const formValues = form.getValues()
      const area = Number(formValues.height) * Number(formValues.width)
      return area ? area.toFixed(2) : null
    }

    const calcTotalPrice = () => {
      const formValues = form.getValues();
      const x = calcPrice(formValues.item);
      const y = calcArea()
      return !!x && !!y ? Number(x) * Number(y) : null
    }

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
          <FormField
              control={form.control}
              name="item"
              render={({ field }) => (
                <FormItem className={cn("group relative")}>
                <FormLabel className={cn("group-hover:opacity-0")}>Item</FormLabel>
                <Select onValueChange={field.onChange} defaultValue='item name'>
                  <FormControl>
                    <SelectTrigger className='className="w-full min-w-[180px]'>
                      <SelectValue placeholder="Select units" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  {materials.map((m) => (
                    <SelectItem key={`select key-${m.sysId}`} value={m.color}>{m.color}</SelectItem>
                  ))}
                  </SelectContent>
                </Select>
                <FormDescription className={cn(descriptionStyles)}>
                  Value  $ {field.value }
                </FormDescription>
                <FormMessage />
              </FormItem>
              )}
            />
          <span className="grid grid-cols-4 gap-4  w-full h-full">


          <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem className={cn("group relative")}>
                  <FormLabel className={cn("group-hover:opacity-0")}>
                    Width
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription className={cn(descriptionStyles)}>
                    Item's width
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem className={cn("group relative")}>
                  <FormLabel className={cn("group-hover:opacity-0")}>
                    Height
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription className={cn(descriptionStyles)}>
                    Item's height
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    Item quantity
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="orientation"
              render={({ field }) => (
                <FormItem className={cn("group relative")}>
                <FormLabel className={cn("group-hover:opacity-0")}>Orientation</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='className="w-full min-w-[180px]'>
                      <SelectValue placeholder="Select units" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="L">Lengthwise</SelectItem>
                    <SelectItem value="C">Crosswise</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className={cn(descriptionStyles)}>
                  {field.value}
                </FormDescription>
                <FormMessage />
              </FormItem>
              )}
            />
          </span>

          <Separator />
          <span className={cn('grid grid-cols-1 gap-2 text-end')}>
                <h5>Area: {calcArea()} m2</h5>
                <h5>Price: {calcPrice(x.item)} BGN</h5>
                <h4>Total price: {calcTotalPrice()} BGN</h4>
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