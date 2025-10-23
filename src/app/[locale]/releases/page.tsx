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
import { getDictionary } from '@/lib/i18n'
import { generateSEOMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = params
  const dict = await getDictionary(locale as 'en' | 'jp')
  
  return generateSEOMetadata({
    title: dict.pages.releases.title,
    description: dict.pages.releases.subtitle,
    url: `/${locale}/releases`,
    locale: locale,
    keywords: locale === 'jp' 
      ? ['リリースノート', '更新', '新機能', 'バグ修正', 'YourSaaS']
      : ['release notes', 'updates', 'new features', 'bug fixes', 'YourSaaS'],
    type: 'website'
  })
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
  const dict = await getDictionary(locale as 'en' | 'jp')
  
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
              {dict.pages.releases.title}
            </Heading>
            
            <Text size="lg" variant="muted" className="mb-8">
              {dict.pages.releases.subtitle}
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
        dict={dict}
        locale={locale}
      />
    </div>
  )
}