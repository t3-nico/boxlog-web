import React from 'react'
import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import {
  getAllReleaseMetas,
  getAllReleaseTags,
  getFeaturedReleases,
} from '@/lib/releases'
import { ReleasesClient } from '@/components/releases/ReleasesClient'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { generateSEOMetadata } from '@/lib/metadata'

interface PageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'common' })

  return generateSEOMetadata({
    title: t('navigation.releases'),
    description: locale === 'ja'
      ? '最新のリリースノートと更新情報'
      : 'Latest release notes and updates',
    url: `/${locale}/releases`,
    locale: locale,
    keywords: locale === 'ja'
      ? ['リリースノート', '更新', '新機能', 'バグ修正', 'BoxLog']
      : ['release notes', 'updates', 'new features', 'bug fixes', 'BoxLog'],
    type: 'website'
  })
}

export default async function ReleasesPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'common' })

  // Fetch data server-side
  const [allReleases, allTags, featuredReleases] = await Promise.all([
    getAllReleaseMetas(),
    getAllReleaseTags(),
    getFeaturedReleases()
  ])

  const isJa = locale === 'ja'

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h1" size="4xl" className="mb-4">
              {t('navigation.releases')}
            </Heading>

            <Text size="lg" variant="muted" className="mb-8">
              {isJa ? '最新のリリースノートと更新情報' : 'Latest release notes and updates'}
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
        locale={locale}
      />
    </div>
  )
}
