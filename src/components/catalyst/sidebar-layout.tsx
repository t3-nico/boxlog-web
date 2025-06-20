"use client"

import React from "react"

interface SidebarLayoutProps {
  sidebar: React.ReactNode
  children: React.ReactNode
}

export function SidebarLayout({ sidebar, children }: SidebarLayoutProps) {
  return (
    <div className="flex flex-row h-screen w-screen bg-zinc-950">
      <aside className="w-[260px] bg-zinc-950 border-r border-zinc-800">
        {sidebar}
      </aside>
      <main className="flex-1 bg-zinc-800">
        {children}
      </main>
    </div>
  )
} 