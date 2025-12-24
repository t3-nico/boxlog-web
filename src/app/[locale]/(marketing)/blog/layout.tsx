import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | BoxLog Blog',
    default: 'Blog | BoxLog',
  },
  description: 'SaaS開発、テクノロジー、ビジネス戦略に関する最新の知見をお届けします。',
  keywords: 'SaaS, blog, technology, development, business, startup, insights',
  authors: [{ name: 'BoxLog Team' }],
  openGraph: {
    title: 'Blog | BoxLog',
    description: 'SaaS開発、テクノロジー、ビジネス戦略に関する最新の知見。',
    type: 'website',
    siteName: 'BoxLog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | BoxLog',
    description: 'SaaS開発、テクノロジー、ビジネス戦略に関する最新の知見。',
  },
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-white dark:bg-gray-900">{children}</div>
}
