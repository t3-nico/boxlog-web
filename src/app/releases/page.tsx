import React from 'react'
import type { Metadata } from 'next'
import { Container, Heading, Text } from '@/components/ui'
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
  title: 'リリースノート | YourSaaS',
  description: 'YourSaaSプラットフォームの最新機能、改善、バグ修正について。すべての変更は透明性を持って文書化され、お客様に迅速にお届けしています。',
  keywords: 'リリースノート, アップデート, 新機能, バグ修正, YourSaaS',
  openGraph: {
    title: 'リリースノート | YourSaaS',
    description: 'YourSaaSプラットフォームの最新機能、改善、バグ修正について。',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'リリースノート | YourSaaS',
    description: 'YourSaaSプラットフォームの最新機能、改善、バグ修正について。',
  }
}

export default async function ReleasesPage() {
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