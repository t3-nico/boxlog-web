import { Metadata } from 'next'

export interface SEOData {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  section?: string
  tags?: string[]
  locale?: string
  alternateLocales?: string[]
  noindex?: boolean
  hreflang?: Record<string, string>
}

export interface SiteConfig {
  name: string
  title: string
  description: string
  url: string
  ogImage: string
  creator: string
  twitterHandle: string
  keywords: string[]
  locale: string
  alternateLocales: string[]
}

export const siteConfig: SiteConfig = {
  name: 'YourSaaS',
  title: 'YourSaaS - Modern SaaS Platform for Scalable Applications',
  description: 'Build, deploy, and scale your SaaS applications with YourSaaS. Comprehensive tools for authentication, user management, billing, and more.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursaas.com',
  ogImage: '/og-image.png',
  creator: 'YourSaaS Team',
  twitterHandle: '@yoursaas',
  keywords: [
    'SaaS',
    'Software as a Service',
    'API',
    'Authentication',
    'User Management',
    'Billing',
    'React',
    'Next.js',
    'TypeScript',
    'Modern Development'
  ],
  locale: 'ja',
  alternateLocales: ['en', 'ja']
}

/**
 * Generate comprehensive metadata for pages
 */
export function generateSEOMetadata(data: SEOData = {}): Metadata {
  const {
    title,
    description = siteConfig.description,
    keywords = [],
    image,
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags = [],
    locale = siteConfig.locale,
    alternateLocales = siteConfig.alternateLocales,
    noindex = false
  } = data

  const pageTitle = title 
    ? `${title} | ${siteConfig.name}`
    : siteConfig.title

  const pageUrl = url ? `${siteConfig.url}${url}` : siteConfig.url
  const pageImage = image 
    ? `${siteConfig.url}${image}`
    : `${siteConfig.url}/api/og?title=${encodeURIComponent(title || siteConfig.title)}`

  const allKeywords = [...siteConfig.keywords, ...keywords, ...tags].filter(Boolean)

  return {
    title: pageTitle,
    description,
    keywords: allKeywords.join(', '),
    authors: authors?.map(name => ({ name })) || [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    publisher: siteConfig.name,
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'en-US': `${siteConfig.url}/en${url || ''}`,
        'ja-JP': `${siteConfig.url}/ja${url || ''}`,
        'x-default': pageUrl,
        ...Object.fromEntries(
          alternateLocales.map(loc => [loc, `${siteConfig.url}/${loc}${url || ''}`])
        ),
      },
    },
    openGraph: {
      type: type as any,
      locale,
      url: pageUrl,
      title: pageTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.title,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: authors || [siteConfig.creator],
        section,
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [pageImage],
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION,
    },
  }
}

/**
 * Generate metadata for article pages (blog, releases, docs)
 */
export function generateArticleMetadata(data: {
  title: string
  description: string
  slug: string
  publishedAt: string
  updatedAt?: string
  authors?: string[]
  tags?: string[]
  category?: string
  type: 'blog' | 'docs' | 'release'
}): Metadata {
  const { type, slug, publishedAt, updatedAt, authors, tags, category } = data
  
  const urlPath = `/${type}/${slug}`
  const section = category || type
  
  return generateSEOMetadata({
    ...data,
    url: urlPath,
    type: 'article',
    publishedTime: publishedAt,
    modifiedTime: updatedAt || publishedAt,
    authors,
    section,
    tags,
    keywords: tags,
  })
}

/**
 * Generate structured data (JSON-LD)
 */
export function generateStructuredData(type: string, data: any) {
  const baseUrl = siteConfig.url
  
  switch (type) {
    case 'organization':
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteConfig.name,
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description: siteConfig.description,
        sameAs: [
          'https://twitter.com/yoursaas',
          'https://github.com/yoursaas',
          'https://linkedin.com/company/yoursaas',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-555-0123',
          contactType: 'Customer Service',
          email: 'support@yoursaas.com',
        },
      }

    case 'website':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        description: siteConfig.description,
        url: baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      }

    case 'article':
      return {
        '@context': 'https://schema.org',
        '@type': data.articleType || 'Article',
        headline: data.title,
        description: data.description,
        image: data.image ? `${baseUrl}${data.image}` : `${baseUrl}/api/og?title=${encodeURIComponent(data.title)}`,
        datePublished: data.publishedAt,
        dateModified: data.updatedAt || data.publishedAt,
        author: {
          '@type': 'Person',
          name: data.author || siteConfig.creator,
        },
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${baseUrl}${data.url}`,
        },
        keywords: data.tags?.join(', '),
        articleSection: data.category,
      }

    case 'techArticle':
      return {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: data.title,
        description: data.description,
        image: data.image ? `${baseUrl}${data.image}` : `${baseUrl}/api/og?title=${encodeURIComponent(data.title)}`,
        datePublished: data.publishedAt,
        dateModified: data.updatedAt || data.publishedAt,
        author: {
          '@type': 'Organization',
          name: siteConfig.name,
        },
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${baseUrl}${data.url}`,
        },
        proficiencyLevel: 'Beginner',
        dependencies: data.dependencies || [],
        applicationCategory: 'DeveloperApplication',
      }

    case 'breadcrumb':
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.items.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${baseUrl}${item.url}`,
        })),
      }

    default:
      return null
  }
}

// Note: StructuredData component moved to /components/seo/StructuredData.tsx

/**
 * Generate breadcrumb data
 */
export function generateBreadcrumbs(items: Array<{ name: string; url: string }>) {
  return [
    { name: 'ホーム', url: '/' },
    ...items,
  ]
}