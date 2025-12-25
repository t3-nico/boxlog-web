import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  canonical?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  category?: string;
  tags?: string[];
  url?: string; // Add URL as optional prop
}

export function generateEnhancedMetadata({
  title = 'BoxLog - モダンSaaSプラットフォーム',
  description = 'Next.jsとTailwind CSSで構築された、最適なパフォーマンスとユーザー体験を提供するモダンSaaSプラットフォーム。',
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
  url,
}: SEOProps): Metadata {
  // Get current URL for canonical and OG
  const baseUrl =
    process.env.NODE_ENV === 'production' ? 'https://boxlog.app' : 'http://localhost:3000';
  const currentUrl = canonical || url || baseUrl;

  const siteTitle = 'BoxLog';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : [{ name: 'BoxLog Team' }],
    creator: 'BoxLog Team',
    publisher: 'BoxLog',
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
        'max-snippet': -1,
      },
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
          type: 'image/jpeg',
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(tags && { tags }),
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@boxlog_app',
      site: '@boxlog_app',
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
      'msapplication-config': '/browserconfig.xml',
    },

    // Canonical URL
    alternates: {
      canonical: currentUrl,
    },

    // Verification
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION,
    },

    // Icons
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
      other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#171717' }],
    },

    // Manifest
    manifest: '/manifest.json',

    // App links
    appLinks: {
      web: {
        url: currentUrl,
        should_fallback: true,
      },
    },
  };
}

// JSON-LD 構造化データのコンポーネント
type SchemaValue =
  | string
  | number
  | boolean
  | null
  | SchemaValue[]
  | { [key: string]: SchemaValue };

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'Article' | 'Product' | 'SoftwareApplication';
  data: Record<string, SchemaValue>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const baseStructure: Record<string, SchemaValue> = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  // 組織の基本情報
  if (type === 'Organization') {
    baseStructure.name = 'BoxLog';
    baseStructure.url = 'https://boxlog.app';
    baseStructure.logo = 'https://boxlog.app/logo.png';
    baseStructure.sameAs = ['https://twitter.com/boxlog_app', 'https://github.com/boxlog'];
  }

  // ウェブサイトの情報
  if (type === 'WebSite') {
    baseStructure.name = 'BoxLog';
    baseStructure.url = 'https://boxlog.app';
    baseStructure.potentialAction = {
      '@type': 'SearchAction',
      target: 'https://boxlog.app/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(baseStructure) }}
    />
  );
}

// パンくずリスト用のコンポーネント
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbStructuredData({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  );
}

// FAQ用の構造化データ
interface FAQItem {
  question: string;
  answer: string;
}

export function FAQStructuredData({ faqs }: { faqs: FAQItem[] }) {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  );
}

// 記事用の構造化データ
interface ArticleStructuredDataProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  category?: string;
}

export function ArticleStructuredData({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  category,
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
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'BoxLog',
      logo: {
        '@type': 'ImageObject',
        url: 'https://boxlog.app/logo.png',
      },
    },
    ...(category && { category }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
    />
  );
}
