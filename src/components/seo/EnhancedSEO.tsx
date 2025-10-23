import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  noIndex?: boolean
  canonical?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  category?: string
  tags?: string[]
  url?: string // Add URL as optional prop
}

export function generateEnhancedMetadata({
  title = 'YourSaaS - Modern SaaS Platform',
  description = 'A modern SaaS platform built with Next.js and Tailwind CSS for optimal performance and user experience.',
  keywords = ['SaaS', 'Next.js', 'Tailwind CSS', 'React', 'TypeScript', 'Modern Web'],
  image = '/images/og-default.jpg',
  noIndex = false,
  canonical,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  category,
  tags,
  url
}: SEOProps): Metadata {
  // Get current URL for canonical and OG
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://yoursaas.com' : 'http://localhost:3000'
  const currentUrl = canonical || url || baseUrl
  
  const siteTitle = 'YourSaaS'
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`
  
  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : [{ name: 'YourSaaS Team' }],
    creator: 'YourSaaS Team',
    publisher: 'YourSaaS',
    category: category || 'Technology',
    
    // Robots
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    
    // Open Graph
    openGraph: {
      type,
      locale: 'en_US',
      url: currentUrl,
      title: fullTitle,
      description,
      siteName: siteTitle,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/jpeg'
        }
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(tags && { tags })
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@yoursaas',
      site: '@yoursaas'
    },
    
    // Additional meta tags
    other: {
      'theme-color': '#171717',
      'color-scheme': 'light dark',
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': siteTitle,
      'application-name': siteTitle,
      'msapplication-TileColor': '#171717',
      'msapplication-config': '/browserconfig.xml'
    },
    
    // Canonical URL
    alternates: {
      canonical: currentUrl
    },
    
    // Verification
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION
    },
    
    // Icons
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon.ico', sizes: 'any' }
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
      ],
      other: [
        { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#171717' }
      ]
    },
    
    // Manifest
    manifest: '/manifest.json',
    
    // App links
    appLinks: {
      web: {
        url: currentUrl,
        should_fallback: true
      }
    }
  }
}

// JSON-LD 構造化データのコンポーネント
interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'Article' | 'Product' | 'SoftwareApplication'
  data: Record<string, any>
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const baseStructure: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  }
  
  // 組織の基本情報
  if (type === 'Organization') {
    baseStructure.name = 'YourSaaS'
    baseStructure.url = 'https://yoursaas.com'
    baseStructure.logo = 'https://yoursaas.com/logo.png'
    baseStructure.sameAs = [
      'https://twitter.com/yoursaas',
      'https://github.com/yoursaas',
      'https://linkedin.com/company/yoursaas'
    ]
  }
  
  // ウェブサイトの情報
  if (type === 'WebSite') {
    baseStructure.name = 'YourSaaS'
    baseStructure.url = 'https://yoursaas.com'
    baseStructure.potentialAction = {
      '@type': 'SearchAction',
      target: 'https://yoursaas.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(baseStructure) }}
    />
  )
}

// パンくずリスト用のコンポーネント
interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbStructuredData({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  )
}

// FAQ用の構造化データ
interface FAQItem {
  question: string
  answer: string
}

export function FAQStructuredData({ faqs }: { faqs: FAQItem[] }) {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  )
}

// 記事用の構造化データ
interface ArticleStructuredDataProps {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  author: string
  category?: string
}

export function ArticleStructuredData({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  category
}: ArticleStructuredDataProps) {
  const articleData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: 'YourSaaS',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yoursaas.com/logo.png'
      }
    },
    ...(category && { category })
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
    />
  )
}