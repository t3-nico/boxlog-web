'use client'

import { Container, Heading, Text } from '@/components/ui'
import { BlogPostMeta } from '@/lib/blog'
import { PostCard } from './PostCard'
import Link from 'next/link'

interface RelatedPostsProps {
  posts: BlogPostMeta[]
  currentSlug: string
  locale?: string
}

export function RelatedPosts({ posts, currentSlug, locale = 'en' }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Heading as="h2" size="2xl" className="mb-4">
              {locale === 'jp' ? '関連記事' : 'Related Articles'}
            </Heading>
            <Text size="lg" variant="muted">
              {locale === 'jp' ? 'この記事に関連するおすすめの記事をご紹介します' : 'Here are some recommended articles related to this post'}
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post, index) => (
              <PostCard 
                key={post.slug} 
                post={post} 
                priority={index === 0}
                layout="vertical"
                locale={locale}
              />
            ))}
          </div>

          {/* View all articles link */}
          <div className="text-center mt-12">
            <Link
              href={locale === 'jp' ? '/jp/blog' : '/blog'}
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
            >
              {locale === 'jp' ? 'すべての記事を見る' : 'View All Articles'}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}