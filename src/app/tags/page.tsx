import React from 'react'
import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { getAllTags, getTagsByCategory } from '@/lib/tags-server'
import { TagCloud } from '@/components/tags/TagCloud'
import { TagsByCategory } from '@/components/tags/TagsByCategory'

export const metadata: Metadata = {
  title: 'Tags | YourSaaS',
  description: 'Browse all tags from blog posts, release notes, and documentation. Discover content by topic.',
  keywords: 'tags, blog, release notes, documentation, search, topics',
  openGraph: {
    title: 'Tags | YourSaaS',
    description: 'Browse all tags from blog posts, release notes, and documentation.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Tags | YourSaaS',
    description: 'Browse all tags from blog posts, release notes, and documentation.',
  }
}

export default async function TagsPage() {
  const [allTags, tagsByCategory] = await Promise.all([
    getAllTags(),
    getTagsByCategory()
  ])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
            </div>

            <Heading as="h1" size="4xl" className="mb-4">
              All Tags
            </Heading>
            
            <Text size="lg" variant="muted" className="mb-8">
              Browse all tags from blog posts, release notes, and documentation
            </Text>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 dark:border-gray-700/50 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <Text size="sm" className="font-medium">Blog Posts</Text>
                <Text size="xs" variant="muted">{tagsByCategory.blog?.length || 0} tags</Text>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 dark:border-gray-700/50 shadow-sm">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <Text size="sm" className="font-medium">Release Notes</Text>
                <Text size="xs" variant="muted">{tagsByCategory.releases?.length || 0} tags</Text>
              </div>
              
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 dark:border-gray-700/50 shadow-sm">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <Text size="sm" className="font-medium">Documentation</Text>
                <Text size="xs" variant="muted">{tagsByCategory.docs?.length || 0} tags</Text>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Tag Cloud Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-4">
                Popular Tags
              </Heading>
              <Text variant="muted">
                Frequently used tags displayed by size
              </Text>
            </div>

            <TagCloud tags={allTags} />
          </div>
        </Container>
      </section>

      {/* Tags by Category Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-4">
                Tags by Category
              </Heading>
              <Text variant="muted">
                Tag list organized by content type
              </Text>
            </div>

            <TagsByCategory tagsByCategory={tagsByCategory} />
          </div>
        </Container>
      </section>
    </div>
  )
}