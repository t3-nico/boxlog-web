import React from 'react'
import type { Metadata } from 'next'
import { Container, Heading, Text } from '@/components/ui'
import { getContentByTag, getRelatedTags } from '@/lib/tags-server'
import { UnifiedTagContent } from '@/components/tags/UnifiedTagContent'
import { RelatedTags } from '@/components/tags/RelatedTags'

export const metadata: Metadata = {
  title: 'React タグの記事 | YourSaaS',
  description: 'React に関連するブログ記事、リリースノート、ドキュメントの一覧です。'
}

export default async function ReactTagPage() {
  const tag = 'React'
  
  console.log('Static React page - Fetching content for tag:', tag)
  
  const [tagData, relatedTags] = await Promise.all([
    getContentByTag(tag),
    getRelatedTags(tag)
  ])

  console.log('Static React page - Tag data:', {
    tag: tagData.tag,
    totalCount: tagData.totalCount,
    blogCount: tagData.blog.length,
    releasesCount: tagData.releases.length,
    docsCount: tagData.docs.length
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="パンくず">
              <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li>
                  <a href="/" className="hover:text-gray-700 transition-colors">
                    ホーム
                  </a>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li>
                  <a href="/tags" className="hover:text-gray-700 transition-colors">
                    タグ一覧
                  </a>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li className="text-gray-900 font-medium">
                  #{tag}
                </li>
              </ol>
            </nav>

            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
              </div>

              <Heading as="h1" size="4xl" className="mb-4">
                #{tag}
              </Heading>
              
              <Text size="lg" variant="muted" className="mb-8">
                {tagData.totalCount}件のコンテンツが見つかりました
              </Text>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {tagData.blog.length}
                  </div>
                  <Text size="sm" className="font-medium">ブログ記事</Text>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {tagData.releases.length}
                  </div>
                  <Text size="sm" className="font-medium">リリースノート</Text>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
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
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <RelatedTags currentTag={tag} relatedTags={relatedTags} />
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