import type { Metadata } from 'next'
import { OptimizedLayout } from '@/components/layout/OptimizedLayout'
import './globals.css'

export const metadata: Metadata = {
  title: 'YourSaaS - Modern SaaS Platform',
  description: 'A modern SaaS platform built with Next.js and Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head></head>
      <body className="antialiased">
        <OptimizedLayout>
          {children}
        </OptimizedLayout>
      </body>
    </html>
  )
}