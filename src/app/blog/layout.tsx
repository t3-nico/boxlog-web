import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | YourSaaS Blog',
    default: 'Blog | YourSaaS Platform'
  },
  description: 'SaaS開発、テクノロジー、ビジネス戦略に関する最新の記事をお届けします。',
  keywords: 'SaaS, ブログ, テクノロジー, 開発, ビジネス, スタートアップ',
  authors: [{ name: 'YourSaaS Team' }],
  openGraph: {
    title: 'Blog | YourSaaS Platform',
    description: 'SaaS開発、テクノロジー、ビジネス戦略に関する最新の記事をお届けします。',
    type: 'website',
    siteName: 'YourSaaS Platform',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | YourSaaS Platform',
    description: 'SaaS開発、テクノロジー、ビジネス戦略に関する最新の記事をお届けします。',
  },
  alternates: {
    canonical: '/blog',
  }
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {children}
    </div>
  )
}