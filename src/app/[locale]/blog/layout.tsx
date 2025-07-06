import type { Metadata } from 'next'

interface BlogLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export async function generateMetadata({ params }: BlogLayoutProps): Promise<Metadata> {
  const { locale } = params
  
  if (locale === 'jp') {
    return {
      title: {
        template: '%s | YourSaaS ブログ',
        default: 'ブログ | YourSaaS プラットフォーム'
      },
      description: 'SaaS開発、テクノロジー、ビジネス戦略に関する最新の記事をお届けします。',
      keywords: 'SaaS, ブログ, テクノロジー, 開発, ビジネス, スタートアップ',
      authors: [{ name: 'YourSaaS Team' }],
      openGraph: {
        title: 'ブログ | YourSaaS プラットフォーム',
        description: 'SaaS開発、テクノロジー、ビジネス戦略に関する最新の記事をお届けします。',
        type: 'website',
        siteName: 'YourSaaS Platform',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'ブログ | YourSaaS プラットフォーム',
        description: 'SaaS開発、テクノロジー、ビジネス戦略に関する最新の記事をお届けします。',
      },
      alternates: {
        canonical: '/jp/blog',
      }
    }
  }
  
  return {
    title: {
      template: '%s | YourSaaS Blog',
      default: 'Blog | YourSaaS Platform'
    },
    description: 'Latest articles on SaaS development, technology, and business strategy.',
    keywords: 'SaaS, blog, technology, development, business, startup',
    authors: [{ name: 'YourSaaS Team' }],
    openGraph: {
      title: 'Blog | YourSaaS Platform',
      description: 'Latest articles on SaaS development, technology, and business strategy.',
      type: 'website',
      siteName: 'YourSaaS Platform',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog | YourSaaS Platform',
      description: 'Latest articles on SaaS development, technology, and business strategy.',
    },
    alternates: {
      canonical: '/blog',
    }
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