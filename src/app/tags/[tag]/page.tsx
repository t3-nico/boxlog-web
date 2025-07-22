import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { getContentByTag, getRelatedTags, getAllTags } from '@/lib/tags-server'
import { UnifiedTagContent } from '@/components/tags/UnifiedTagContent'
import { RelatedTags } from '@/components/tags/RelatedTags'

interface TagPageProps {
  params: {
    tag: string
  }
}

export async function generateStaticParams() {
  const allTags = await getAllTags()
  return allTags.slice(0, 50).map((tagData) => ({
    tag: tagData.tag,
  }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag)
  
  return {
    title: `${decodedTag} タグの記事 | YourSaaS`,
    description: `${decodedTag} に関連するブログ記事、リリースノート、ドキュメントの一覧です。`,
    keywords: `${decodedTag}, タグ, ブログ, リリースノート, ドキュメント`,
    openGraph: {
      title: `${decodedTag} タグの記事 | YourSaaS`,
      description: `${decodedTag} に関連するコンテンツの一覧です。`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${decodedTag} タグの記事 | YourSaaS`,
      description: `${decodedTag} に関連するコンテンツの一覧です。`,
    }
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const decodedTag = decodeURIComponent(params.tag)
  
  const [tagData, relatedTags] = await Promise.all([
    getContentByTag(decodedTag),
    getRelatedTags(decodedTag)
  ])

  if (tagData.totalCount === 0) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="パンくず">
              <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <a href="/" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    ホーム
                  </a>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li>
                  <a href="/tags" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    タグ一覧
                  </a>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li className="text-gray-900 dark:text-gray-100 font-medium">
                  #{decodedTag}
                </li>
              </ol>
            </nav>

            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[rgb(var(--icon-bg-secondary))] rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
              </div>

              <Heading as="h1" size="4xl" className="mb-4">
                #{decodedTag}
              </Heading>
              
              <Text size="lg" variant="muted" className="mb-8">
                {tagData.totalCount}件のコンテンツが見つかりました
              </Text>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 dark:border-gray-700/50 shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {tagData.blog.length}
                  </div>
                  <Text size="sm" className="font-medium">ブログ記事</Text>
                </div>
                
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 dark:border-gray-700/50 shadow-sm">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {tagData.releases.length}
                  </div>
                  <Text size="sm" className="font-medium">リリースノート</Text>
                </div>
                
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 dark:border-gray-700/50 shadow-sm">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {tagData.docs.length}
                  </div>
                  <Text size="sm" className="font-medium">ドキュメント</Text>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <RelatedTags currentTag={decodedTag} relatedTags={relatedTags} />
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <UnifiedTagContent tagData={tagData} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}