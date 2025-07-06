import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PerformanceProvider } from '@/components/performance/PerformanceProvider'
import { AccessibilityProvider } from '@/components/accessibility/AccessibilityProvider'
import { SkipLinks } from '@/components/accessibility/SkipLinks'
import { ThemeProvider } from '@/lib/theme-provider'
import { locales, type Locale } from '@/lib/i18n'
import './globals.css'

export const metadata: Metadata = {
  title: 'YourSaaS - Modern SaaS Platform',
  description: 'A modern SaaS platform built with Next.js and Tailwind CSS',
}

export function generateStaticParams() {
  return [
    { locale: 'jp' }, // Only generate for /jp, root paths will be handled as English
  ]
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-latin-400-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-latin-500-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-latin-600-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-latin-700-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SkipLinks />
            <AccessibilityProvider>
              <PerformanceProvider>
                <Header />
                <div id="main-content">
                  {children}
                </div>
                <Footer />
              </PerformanceProvider>
            </AccessibilityProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}