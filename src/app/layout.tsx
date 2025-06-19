// src/app/layout.tsx
"use client"

import { useEffect, useState } from "react";
import "./globals.css"
import { Inter } from "next/font/google"
import { AppSidebar } from "@/components/catalyst/app-sidebar"
import { SidebarLayout } from "@/components/catalyst/sidebar-layout";
import { MainContainer } from "@/components/catalyst/main-container";

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState("light");
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.className = theme;
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <html lang="ja" className="bg-zinc-950">
      <body className={inter.className}>
        <SidebarLayout
          sidebar={
            <div className={
              (isDesktopOpen ? "w-72 flex-shrink-0" : "w-16") +
              " transition-all duration-300 ease-in-out overflow-hidden bg-zinc-950 h-full"
            }>
              <AppSidebar isDesktopOpen={isDesktopOpen} setIsDesktopOpen={setIsDesktopOpen} theme={theme} />
            </div>
          }
        >
          <MainContainer className="w-full">
            {children}
          </MainContainer>
        </SidebarLayout>
      </body>
    </html>
  )
}
