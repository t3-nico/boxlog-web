"use client"

import React from "react"
import clsx from "clsx"

interface SidebarLayoutProps {
  sidebar: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function SidebarLayout({ sidebar, children, className }: SidebarLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950 p-2">
      {sidebar}
      <main className="flex-1 flex flex-col h-full min-h-0">
        {children}
      </main>
    </div>
  )
} 