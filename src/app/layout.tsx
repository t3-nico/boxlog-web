// src/app/layout.tsx
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from 'next'
import ThemeProvider from "@/components/theme-provider";
import SiteLayout from "@/components/layout/site-layout";

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
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <ThemeProvider>
          <SiteLayout>{children}</SiteLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
