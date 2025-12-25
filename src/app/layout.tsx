import { generateEnhancedMetadata, StructuredData } from '@/components/seo/EnhancedSEO';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/lib/theme-provider';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import './globals.css';

// next/font による最適化されたフォント読み込み（Variable Font: optical size軸有効）
// preload: true でLCP改善（デフォルトでtrueだが明示的に指定）
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  axes: ['opsz'],
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

// 日本語フォント（GAFA方針準拠: Google = Noto Sans JP）
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-jp',
  preload: true,
  fallback: ['Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'sans-serif'],
});

export const metadata: Metadata = generateEnhancedMetadata({
  title: 'BoxLog - Modern SaaS Platform',
  description:
    'Powerful, scalable SaaS platform built with Next.js, React, and Tailwind CSS. Optimized for performance, accessibility, and SEO.',
  keywords: [
    'SaaS platform',
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Web application',
    'Modern development',
    'Performance optimization',
  ],
  type: 'website',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${notoSansJP.variable}`}>
      <head>
        <StructuredData
          type="Organization"
          data={{
            name: 'BoxLog',
            alternateName: 'BoxLog Platform',
            description: 'Modern SaaS platform for businesses',
            foundingDate: '2024-01-01',
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer service',
              email: 'contact@boxlog.app',
            },
          }}
        />
        <StructuredData
          type="WebSite"
          data={{
            name: 'BoxLog Platform',
            alternateName: 'BoxLog',
          }}
        />
      </head>
      <body className={cn('bg-background antialiased')} suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
