// src/app/layout.tsx
"use client"

import { useEffect, useState } from "react";
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from 'next'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://boxlog.vercel.app'),
  title: {
    default: 'BoxLog',
    template: '%s | BoxLog',
  },
  description: 'BoxLogは、あなたのタスク管理をシンプルで直感的にする最新のソリューションです。',
  openGraph: {
    title: 'BoxLog - シンプルでモダンなタスク管理アプリ',
    description: 'BoxLogは、あなたのタスク管理をシンプルで直感的にする最新のソリューションです。',
    url: 'https://boxlog.vercel.app',
    siteName: 'BoxLog',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BoxLog - シンプルでモダンなタスク管理アプリ',
    description: 'BoxLogは、あなたのタスク管理をシンプルで直感的にする最新のソリューションです。',
    // creator: '@your_twitter_handle', // 運営者のTwitterアカウントがあれば追加
    images: ['/og-image.png'],
  },
}

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
      <head>
        <meta name="description" content="BoxLogは、あなたのタスク管理をシンプルで直感的にする最新のソリューションです。" />
        <meta property="og:title" content="BoxLog - シンプルでモダンなタスク管理アプリ" />
        <meta property="og:description" content="BoxLogは、あなたのタスク管理をシンプルで直感的にする最新のソリューションです。" />
        <meta property="og:url" content="https://boxlog.vercel.app" />
        <meta property="og:site_name" content="BoxLog" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BoxLog - シンプルでモダンなタスク管理アプリ" />
        <meta name="twitter:description" content="BoxLogは、あなたのタスク管理をシンプルで直感的にする最新のソリューションです。" />
        <meta name="twitter:image" content="/og-image.png" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
