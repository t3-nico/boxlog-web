import { FilteredBlogClient } from '@/components/blog/FilteredBlogClient'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { routing } from '@/i18n/routing'
import { getAllBlogPostMetas, getAllTagNames } from '@/lib/blog'
import { generateSEOMetadata } from '@/lib/metadata'
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
    title: t('navigation.blog'),
    description: locale === 'ja' ? '最新の記事とチュートリアル' : 'Latest articles and tutorials',
    url: `/${locale}/blog`,
    locale: locale,
    keywords:
      locale === 'ja'
        ? ['ブログ', '記事', 'SaaS', '開発', '技術', 'Next.js', 'TypeScript']
        : ['blog', 'articles', 'SaaS', 'development', 'technology', 'Next.js', 'TypeScript'],
    type: 'website',
  })
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'common' })
  const [allPosts, allTags] = await Promise.all([getAllBlogPostMetas(), getAllTagNames()])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-neutral-50 to-white py-16 dark:from-neutral-800 dark:to-neutral-900">
        <Container>
          <div className="mx-auto max-w-6xl">
            <Heading as="h1" size="3xl" className="mb-4">
              {t('navigation.blog')}
            </Heading>
            <Text size="lg" variant="muted">
              {locale === 'ja' ? '最新の記事とチュートリアル' : 'Latest articles and tutorials'}
            </Text>
          </div>
        </Container>
      </section>

      {/* Main content */}
      <section className="bg-neutral-50 py-16 dark:bg-neutral-800">
        <Container>
          <div className="mx-auto max-w-6xl">
            <FilteredBlogClient initialPosts={allPosts} tags={allTags} locale={locale} />
          </div>
        </Container>
      </section>
    </div>
  )
}
