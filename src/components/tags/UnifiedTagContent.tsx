'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heading, Text } from '@/components/ui'
import { UnifiedTagData, getTagColor } from '@/lib/tags-client'

interface UnifiedTagContentProps {
  tagData: UnifiedTagData
}

type ContentType = 'all' | 'blog' | 'releases' | 'docs'

export function UnifiedTagContent({ tagData }: UnifiedTagContentProps) {
  const [activeTab, setActiveTab] = useState<ContentType>('all')

  const tabs = [
    { id: 'all' as const, label: 'すべて', count: tagData.totalCount },
    { id: 'blog' as const, label: 'ブログ', count: tagData.blog.length },
    { id: 'releases' as const, label: 'リリース', count: tagData.releases.length },
    { id: 'docs' as const, label: 'ドキュメント', count: tagData.docs.length },
  ]

  const getDisplayContent = () => {
    switch (activeTab) {
      case 'blog':
        return tagData.blog
      case 'releases':
        return tagData.releases
      case 'docs':
        return tagData.docs
      default:
        return [...tagData.blog, ...tagData.releases, ...tagData.docs]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }
  }

  const displayContent = getDisplayContent()

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'blog':
        return (
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        )
      case 'release':
        return (
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      case 'doc':
        return (
          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
      default:
        return null
    }
  }

  const getContentLink = (content: any) => {
    switch (content.type) {
      case 'blog':
        return `/blog/${content.slug}`
      case 'release':
        return `/releases/${content.slug}`
      case 'doc':
        return `/docs/${content.slug}`
      default:
        return '#'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div>
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {displayContent.length > 0 ? (
        <div className="space-y-6">
          {displayContent.map((content, index) => (
            <article
              key={`${content.type}-${content.slug}`}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-300"
            >
              <Link href={getContentLink(content)} className="block">
                <div className="p-6">
                  {/* Content Type & Meta */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      {getContentTypeIcon(content.type)}
                      <span className="text-sm font-medium text-gray-600 capitalize">
                        {content.type === 'release' ? 'リリース' : content.type === 'blog' ? 'ブログ' : 'ドキュメント'}
                      </span>
                    </div>

                    {content.version && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                        v{content.version}
                      </span>
                    )}

                    {content.featured && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                        ✨ Featured
                      </span>
                    )}

                    {content.breaking && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800">
                        ⚠️ Breaking
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <Heading 
                    as="h3" 
                    size="lg" 
                    className="mb-3 group-hover:text-blue-600 transition-colors line-clamp-2"
                  >
                    {content.title}
                  </Heading>

                  {/* Description */}
                  <Text variant="muted" className="mb-4 line-clamp-2">
                    {content.description}
                  </Text>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {content.tags.slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium transition-colors ${getTagColor(tag)}`}
                      >
                        #{tag}
                      </span>
                    ))}
                    {content.tags.length > 5 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                        +{content.tags.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Date */}
                  <div className="text-sm text-gray-500">
                    <time dateTime={content.date}>
                      {formatDate(content.date)}
                    </time>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <Heading as="h3" size="lg" className="mb-2">
            コンテンツが見つかりませんでした
          </Heading>
          <Text variant="muted">
            このカテゴリにはまだコンテンツがありません。
          </Text>
        </div>
      )}
    </div>
  )
}