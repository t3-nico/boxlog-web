"use client"

import * as React from "react"
import clsx from "clsx"

interface NavbarProps extends React.ComponentPropsWithoutRef<"nav"> {
  children: React.ReactNode
}

export function Navbar({ className, children, ...props }: NavbarProps) {
  return (
    <nav
      {...props}
      className={clsx(
        "flex items-center gap-x-4 border-b border-zinc-950/5 bg-white px-4 py-3 dark:border-white/5 dark:bg-zinc-900",
        className
      )}
    >
      {children}
    </nav>
  )
}

export function NavbarSection({ className, children, ...props }: NavbarProps) {
  return (
    <div {...props} className={clsx("flex items-center gap-x-4", className)}>
      {children}
    </div>
  )
}

export function NavbarItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"a">) {
  return (
    <a
      {...props}
      className={clsx(
        "flex items-center justify-center rounded-lg p-2 text-zinc-500 hover:bg-zinc-950/5 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white",
        className
      )}
    >
      {children}
    </a>
  )
}

export function NavbarSpacer({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div {...props} className={clsx("flex-1", className)} />
} 