import type { Metadata } from 'next'
import { generateEnhancedMetadata, StructuredData } from '@/components/seo/EnhancedSEO'
import { ThemeProvider } from '@/lib/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

export const metadata: Metadata = generateEnhancedMetadata({
  title: 'YourSaaS - Modern SaaS Platform',
  description: 'Powerful, scalable SaaS platform built with Next.js 14, React 18, and Tailwind CSS. Optimized for performance, accessibility, and SEO with 90+ Lighthouse scores.',
  keywords: ['SaaS platform', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Web application', 'Modern development', 'Performance optimization'],
  type: 'website'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData
          type="Organization"
          data={{
            name: 'YourSaaS',
            alternateName: 'YourSaaS Platform',
            description: 'Modern SaaS platform for businesses',
            foundingDate: '2024-01-01',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+1-555-123-4567',
              contactType: 'customer service',
              email: 'contact@yoursaas.com'
            }
          }}
        />
        <StructuredData
          type="WebSite"
          data={{
            name: 'YourSaaS Platform',
            alternateName: 'YourSaaS'
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}