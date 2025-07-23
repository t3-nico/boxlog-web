import React from 'react'
import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { ReleaseCard } from '@/components/releases/ReleaseCard'
import { 
  getAllReleaseMetas, 
  getAllReleaseTags, 
  getFeaturedReleases,
  generateReleaseTimeline,
  ReleasePostMeta,
  TagCount
} from '@/lib/releases'
import { ReleasesClient } from '@/components/releases/ReleasesClient'

export const metadata: Metadata = {
  title: 'Release Notes | YourSaaS',
  description: 'Latest features, improvements, and bug fixes for the YourSaaS platform. All changes are transparently documented and delivered rapidly to our customers.',
  keywords: 'release notes, updates, new features, bug fixes, YourSaaS',
  openGraph: {
    title: 'Release Notes | YourSaaS',
    description: 'Latest features, improvements, and bug fixes for the YourSaaS platform.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Release Notes | YourSaaS',
    description: 'Latest features, improvements, and bug fixes for the YourSaaS platform.',
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

export default async function ReleasesPage({ params }: PageProps) {
  const { locale } = params
  // サーバーサイドでデータを取得
  const [allReleases, allTags, featuredReleases] = await Promise.all([
    getAllReleaseMetas(),
    getAllReleaseTags(),
    getFeaturedReleases()
  ])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h1" size="4xl" className="mb-4">
              リリースノート
            </Heading>
            
            <Text size="lg" variant="muted" className="mb-8">
              最新の機能、改善、修正について
            </Text>
          </div>
        </Container>
      </section>



      {/* Main Releases Section - Client Component */}
      <ReleasesClient 
        initialReleases={allReleases}
        initialTags={allTags}
        featuredReleases={featuredReleases}
        upcomingReleases={[]}
      />
    </div>
  )
}