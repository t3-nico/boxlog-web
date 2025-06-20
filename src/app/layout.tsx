// src/app/layout.tsx
"use client"

import { useEffect, useState } from "react";
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState("light");

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
    <html lang="ja" className="bg-zinc-900 text-zinc-100">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
