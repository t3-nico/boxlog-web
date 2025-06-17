// src/app/layout.tsx
"use client"

import "./globals.css"
import { Inter } from "next/font/google"
import { SidebarLayout } from "@/components/catalyst/sidebar-layout"
import { Navbar, NavbarSection, NavbarItem } from "@/components/catalyst/navbar"
import { AppSidebar } from "@/components/catalyst/app-sidebar"
import { MagnifyingGlassIcon, InboxIcon } from "@heroicons/react/20/solid"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <SidebarLayout
          navbar={
            <Navbar>
              <NavbarSection>
                <NavbarItem href="/search" aria-label="検索">
                  <MagnifyingGlassIcon className="size-5" />
                </NavbarItem>
                <NavbarItem href="/inbox" aria-label="受信トレイ">
                  <InboxIcon className="size-5" />
                </NavbarItem>
              </NavbarSection>
            </Navbar>
          }
          sidebar={<AppSidebar />}
        >
          {children}
        </SidebarLayout>
      </body>
    </html>
  )
}
