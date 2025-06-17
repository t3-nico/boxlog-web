"use client"

import * as React from "react"
import clsx from "clsx"

interface SidebarLayoutProps {
  navbar: React.ReactNode
  sidebar: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function SidebarLayout({ navbar, sidebar, children, className }: SidebarLayoutProps) {
  return (
    <div className={clsx("flex flex-col min-h-screen", className)}>
      {navbar}
      <div className="flex flex-1 min-h-0">
        {sidebar}
        <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
} 