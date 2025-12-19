import { ReleasesClient } from '@/components/releases/ReleasesClient'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { routing } from '@/i18n/routing'
import { generateSEOMetadata } from '@/lib/metadata'
import { getAllReleaseMetas, getAllReleaseTags } from '@/lib/releases'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

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
    description: locale === 'ja' ? '最新のリリースノートと更新情報' : 'Latest release notes and updates',
    url: `/${locale}/releases`,
    locale: locale,
    keywords:
      locale === 'ja'
        ? ['リリースノート', '更新', '新機能', 'バグ修正', 'BoxLog']
        : ['release notes', 'updates', 'new features', 'bug fixes', 'BoxLog'],
    type: 'website',
  })
}

export default async function ReleasesPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'common' })

  // Fetch data server-side
  const [allReleases, allTags] = await Promise.all([getAllReleaseMetas(), getAllReleaseTags()])

  const isJa = locale === 'ja'

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
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
      <ReleasesClient initialReleases={allReleases} initialTags={allTags} upcomingReleases={[]} locale={locale} />
    </div>
  )
}
