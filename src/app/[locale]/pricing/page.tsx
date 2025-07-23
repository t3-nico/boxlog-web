import type { Metadata } from 'next'
import { PricingPageClient } from '@/components/pricing/PricingPageClient'

export const metadata: Metadata = {
  title: 'Pricing - YourSaaS Platform',
  description: 'Simple, transparent pricing for teams of all sizes. Choose from Starter, Pro, or Enterprise plans with flexible monthly or annual billing.',
  keywords: 'pricing, plans, subscription, SaaS pricing, team plans, enterprise, starter plan, pro plan',
  openGraph: {
    title: 'Pricing - YourSaaS Platform',
    description: 'Simple, transparent pricing for teams of all sizes. Start your free trial today.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing - YourSaaS Platform',
    description: 'Simple, transparent pricing for teams of all sizes. Start your free trial today.',
  }
}

interface PageProps {
  params: {
    locale: string
  }
}

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'jp' }
  ]
}

export default function PricingPage({ params }: PageProps) {
  const { locale } = params
  return <PricingPageClient />
}