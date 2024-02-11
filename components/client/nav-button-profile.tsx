"use client"
 
import * as React from "react"
import Link from "next/link"
 
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { TbUserStar } from "react-icons/tb";
import { HiOutlineMenu } from "react-icons/hi";
import { Label } from "../ui/label"
 
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Example",
    href: "/",
    description:
      "Lorem ipsum dolor si amet",
  },
  {
    title: "Example 2",
    href: "/",
    description:
      "Consectetur adipisicing elit.",
  },
]
 
export function NavigationMenuComponent() {
    const labelStyles: string = 'uppercase text-lg font-semibold '
    const iconSize: number = 28;

    return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn('flex gap-2 text-zinc-700 hover:text-green-600')}>
            <span className={cn('flex md:hidden')}>
            <TbUserStar size={iconSize} />
            </span>
            <Label className={cn(labelStyles, 'hidden md:flex font-bold')}>Profile</Label>
            </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-4 p-6 w-[400px] group">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b from-transparent to-zinc-50 hover:from-zinc-50 hover:to-transparent p-4 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-4 mt-4 text-lg font-semibold group-hover:text-green-500">
                      Update order
                    </div>
                    <p className="text-sm leading-tight text-zinc-600">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem className={cn('rounded-lg text-zinc-500 hover:text-zinc-900')} href="#" title="Settings">
                E-mail recovery, avatar settings and more.
              </ListItem>
              <ListItem className={cn('rounded-lg text-zinc-500 hover:text-zinc-900')} href="#" title="Privileges">
                Manage user roles
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <NavigationMenuTrigger className={cn('flex gap-2 text-zinc-700 hover:text-green-600')}>
                <HiOutlineMenu size={28} />
                <Label className={cn(labelStyles)}>Menu</Label>
            </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[340px] lg:w-[460px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
 
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none shadow-zinc-200/50 shadow-sm space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors",
            className
          )}
          {...props}
        >
          <div className="text-lg font-semibold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-slate-500 hover:text-slate-700">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"