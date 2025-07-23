import type { Metadata } from 'next'
import { FeaturesHero } from '@/components/sections/FeaturesHero'
import { FeatureGrid } from '@/components/sections/FeatureGrid'
import { FeatureDetails } from '@/components/sections/FeatureDetails'
import { FeaturesCTA } from '@/components/sections/FeaturesCTA'

export const metadata: Metadata = {
  title: 'Features - YourSaaS Platform',
  description: 'Discover powerful features including API integration, real-time analytics, team collaboration, advanced security, custom workflows, and mobile apps.',
  keywords: 'SaaS features, API integration, analytics, security, workflows, collaboration, mobile app',
  openGraph: {
    title: 'Features - YourSaaS Platform',
    description: 'Everything you need to scale your business with powerful APIs, analytics, and collaboration tools.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Features - YourSaaS Platform',
    description: 'Everything you need to scale your business with powerful APIs, analytics, and collaboration tools.',
  }
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <FeaturesHero />
      <FeatureGrid />
      <FeatureDetails />
      <FeaturesCTA />
    </div>
  )
}