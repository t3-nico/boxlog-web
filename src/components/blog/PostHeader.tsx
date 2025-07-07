'use client'

import { Container, Heading } from '@/components/ui'
import { BlogPostFrontMatter } from '@/lib/blog'

interface PostHeaderProps {
  frontMatter: BlogPostFrontMatter
  slug: string
  locale?: string
}

export function PostHeader({ frontMatter, locale = 'en' }: PostHeaderProps) {
  const formattedDate = new Date(frontMatter.publishedAt).toLocaleDateString(locale === 'jp' ? 'ja-JP' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })


  return (
    <header className="py-16 bg-white dark:bg-gray-800">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Date */}
          <div className="mb-4">
            <div className="text-gray-600 dark:text-gray-400">
              <time dateTime={frontMatter.publishedAt}>
                {formattedDate}
              </time>
            </div>
          </div>

          {/* Title */}
          <Heading as="h1" size="4xl" className="mb-4 leading-tight">
            {frontMatter.title}
          </Heading>
        </div>
      </Container>
    </header>
  )
}