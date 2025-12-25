import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | YourSaaS Blog',
    default: 'Blog | YourSaaS Platform',
  },
  description:
    'Latest insights on SaaS development, technology, and business strategy to help you build better products.',
  keywords: 'SaaS, blog, technology, development, business, startup, insights',
  authors: [{ name: 'YourSaaS Team' }],
  openGraph: {
    title: 'Blog | YourSaaS Platform',
    description: 'Latest insights on SaaS development, technology, and business strategy.',
    type: 'website',
    siteName: 'YourSaaS Platform',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | YourSaaS Platform',
    description: 'Latest insights on SaaS development, technology, and business strategy.',
  },
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-white dark:bg-gray-900">{children}</div>;
}
