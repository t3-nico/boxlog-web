import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { FilteredBlogClient } from '@/components/blog/FilteredBlogClient'
import { getAllBlogPostMetas, getAllTagNames } from '@/lib/blog'
import { getDictionary } from '@/lib/i18n'
import { generateSEOMetadata } from '@/lib/metadata'

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = params
  const dict = await getDictionary(locale as 'en' | 'jp')
  
  return generateSEOMetadata({
    title: dict.pages.blog.title,
    description: dict.pages.blog.subtitle,
    url: `/${locale}/blog`,
    locale: locale,
    keywords: locale === 'jp' 
      ? ['ブログ', '記事', 'SaaS', '開発', '技術', 'Next.js', 'TypeScript']
      : ['blog', 'articles', 'SaaS', 'development', 'technology', 'Next.js', 'TypeScript'],
    type: 'website'
  })
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = params
  const dict = await getDictionary(locale as 'en' | 'jp')
  const [allPosts, allTags] = await Promise.all([
    getAllBlogPostMetas(),
    getAllTagNames()
  ])

  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <section className="py-16 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900">
        <Container>
          <div className="max-w-6xl mx-auto">
            <Heading as="h1" size="3xl" className="mb-4">
              {dict.pages.blog.title}
            </Heading>
            <Text size="lg" variant="muted">
              {dict.pages.blog.subtitle}
            </Text>
          </div>
        </Container>
      </section>

      {/* メインコンテンツ */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800">
        <Container>
          <div className="max-w-6xl mx-auto">
            <FilteredBlogClient
              initialPosts={allPosts}
              tags={allTags}
              locale={locale}
              dict={dict}
            />
          </div>
        </Container>
      </section>
    </div>
  )
}