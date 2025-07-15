'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heading, Text } from '@/components/ui/Typography'
import { UnifiedTagData, getTagColor } from '@/lib/tags-client'
import { FileText, BookOpen, FileSpreadsheet, Star, AlertTriangle } from 'lucide-react'

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
        return <FileText className="w-4 h-4 text-blue-600" />
      case 'release':
        return <FileSpreadsheet className="w-4 h-4 text-green-600" />
      case 'doc':
        return <BookOpen className="w-4 h-4 text-purple-600" />
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
      <div className="border-b border-gray-200 mb-8 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs dark:bg-gray-700 dark:text-gray-100">
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
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-300 dark:bg-gray-900 dark:border-gray-700 dark:hover:border-blue-600"
            >
              <Link href={getContentLink(content)} className="block">
                <div className="p-6">
                  {/* Content Type & Meta */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      {getContentTypeIcon(content.type)}
                      <span className="text-sm font-medium text-gray-600 capitalize dark:text-gray-400">
                        {content.type === 'release' ? 'リリース' : content.type === 'blog' ? 'ブログ' : 'ドキュメント'}
                      </span>
                    </div>

                    {content.version && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        v{content.version}
                      </span>
                    )}

                    {content.featured && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </span>
                    )}

                    {content.breaking && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Breaking
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <Heading 
                    as="h3" 
                    size="lg" 
                    className="mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 dark:group-hover:text-blue-400"
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
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        +{content.tags.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Date */}
                  <div className="text-sm text-gray-500">
                    <time dateTime={content.date} className="dark:text-gray-400">
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
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-gray-700">
            <FileSpreadsheet className="w-8 h-8 text-gray-400 dark:text-gray-500" />
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