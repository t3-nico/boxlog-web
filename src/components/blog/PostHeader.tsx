'use client'

import { Container, Heading } from '@/components/ui'
import { BlogPostFrontMatter } from '@/lib/blog'

interface PostHeaderProps {
  frontMatter: BlogPostFrontMatter
  slug: string
}

export function PostHeader({ frontMatter }: PostHeaderProps) {
  const formattedDate = new Date(frontMatter.publishedAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })


  return (
    <header className="py-16 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* 日付 */}
          <div className="mb-4">
            <div className="text-gray-600">
              <time dateTime={frontMatter.publishedAt}>
                {formattedDate}
              </time>
            </div>
          </div>

          {/* タイトル */}
          <Heading as="h1" size="4xl" className="mb-4 leading-tight">
            {frontMatter.title}
          </Heading>
        </div>
      </Container>
    </header>
  )
}