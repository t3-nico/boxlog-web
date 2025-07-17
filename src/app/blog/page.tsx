import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { FilteredBlogClient } from '@/components/blog/FilteredBlogClient'
import { getAllBlogPostMetas, getAllTagNames } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog Articles - Filter & Search',
  description: 'Find and filter blog articles using our advanced search system.',
}

export default async function BlogPage() {
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
              Blog Articles
            </Heading>
            <Text size="lg" variant="muted">
              Find articles using our advanced filtering system
            </Text>
          </div>
        </Container>
      </section>

      {/* メインコンテンツ */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-800">
        <Container>
          <div className="max-w-6xl mx-auto">
            <FilteredBlogClient initialPosts={allPosts} tags={allTags} />
          </div>
        </Container>
      </section>
    </div>
  )
}