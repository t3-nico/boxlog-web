'use client'

import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { Link } from '@/i18n/navigation'
import { BlogPostMeta } from '@/lib/blog'
import { useTranslations } from 'next-intl'
import { PostCard } from './PostCard'

interface RelatedPostsProps {
  posts: BlogPostMeta[]
  currentSlug: string
  locale?: string
}

export function RelatedPosts({ posts, currentSlug: _currentSlug, locale = 'en' }: RelatedPostsProps) {
  const t = useTranslations('blog.relatedPosts')

  if (posts.length === 0) {
    return null
  }

  return (
    <section className="bg-gray-50 py-16 dark:bg-gray-800">
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <Heading as="h2" size="2xl" className="mb-4">
              {t('title')}
            </Heading>
            <Text size="lg" variant="muted">
              {t('subtitle')}
            </Text>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post, index) => (
              <PostCard key={post.slug} post={post} priority={index === 0} layout="vertical" locale={locale} />
            ))}
          </div>

          {/* View all articles link */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-700"
            >
              {t('viewAll')}
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
