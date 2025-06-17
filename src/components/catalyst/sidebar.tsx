"use client"

import * as React from "react"
import clsx from "clsx"

interface SidebarProps extends React.ComponentPropsWithoutRef<"nav"> {
  children: React.ReactNode
}

export function Sidebar({ className, children, ...props }: SidebarProps) {
  return (
    <nav
      {...props}
      className={clsx(
        "w-64 flex-shrink-0 flex flex-col bg-zinc-900 text-zinc-200 min-h-screen",
        className
      )}
    >
      {children}
    </nav>
  )
}

export function SidebarHeader({ className, children, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        "flex flex-col border-b border-zinc-950/5 p-4 dark:border-white/5",
        className
      )}
    >
      {children}
    </div>
  )
}

export function SidebarBody({ className, children, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        "flex flex-1 flex-col overflow-y-auto p-4",
        className
      )}
    >
      {children}
    </div>
  )
}

export function SidebarFooter({ className, children, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        "flex flex-col border-t border-zinc-950/5 p-4 dark:border-white/5",
        className
      )}
    >
      {children}
    </div>
  )
}

export function SidebarSection({ className, children, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div {...props} className={clsx("flex flex-col gap-1", className)}>
      {children}
    </div>
  )
}

export function SidebarHeading({ className, children, ...props }: React.ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      {...props}
      className={clsx(
        "mb-1 px-2 text-xs/6 font-medium text-zinc-500 dark:text-zinc-400",
        className
      )}
    >
      {children}
    </h3>
  )
}

export function SidebarItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"a">) {
  return (
    <a
      {...props}
      className={clsx(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors w-full no-underline",
        className
      )}
      style={{ textDecoration: "none" }}
    >
      {children}
    </a>
  )
}

export function SidebarLabel({ className, children, ...props }: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span {...props} className={clsx("ml-2 text-zinc-200 text-base", className)}>
      {children}
    </span>
  )
}

export function SidebarSpacer({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div {...props} className={clsx("mt-8 flex-1", className)} />
} 