'use client'

import Link from 'next/link'
import { Heading, Text } from '@/components/ui'
import { TagCount, getTagColor } from '@/lib/tags-client'

interface TagsByCategoryProps {
  tagsByCategory: Record<string, TagCount[]>
}

const categoryConfig = {
  blog: {
    title: 'ブログ記事',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    color: 'bg-blue-100 text-blue-600',
    borderColor: 'border-blue-200'
  },
  releases: {
    title: 'リリースノート',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: 'bg-green-100 text-green-600',
    borderColor: 'border-green-200'
  },
  docs: {
    title: 'ドキュメント',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: 'bg-purple-100 text-purple-600',
    borderColor: 'border-purple-200'
  }
}

export function TagsByCategory({ tagsByCategory }: TagsByCategoryProps) {
  const categories = Object.entries(tagsByCategory).filter(([_, tags]) => tags && tags.length > 0)

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-gray-700">
          <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400">カテゴリが見つかりませんでした</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {categories.map(([category, tags]) => {
        const config = categoryConfig[category as keyof typeof categoryConfig]
        if (!config) return null

        return (
          <div key={category} className={`bg-white rounded-2xl border-2 ${config.borderColor} overflow-hidden dark:bg-gray-900`}>
            {/* Header */}
            <div className={`${config.color} px-6 py-4 border-b ${config.borderColor} dark:bg-opacity-20`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center dark:bg-gray-800">
                  {config.icon}
                </div>
                <div>
                  <Heading as="h3" size="lg">
                    {config.title}
                  </Heading>
                  <Text size="sm" className="opacity-80">
                    {tags.length} tags
                  </Text>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="p-6">
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {tags.slice(0, 20).map((tagData) => (
                  <Link
                    key={tagData.tag}
                    href={`/tags/${encodeURIComponent(tagData.tag)}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group dark:hover:bg-gray-800"
                  >
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${getTagColor(tagData.tag)} group-hover:scale-105`}>
                      #{tagData.tag}
                    </span>
                    <span className="text-sm text-gray-500 font-medium dark:text-gray-400">
                      {tagData.count}
                    </span>
                  </Link>
                ))}
                
                {tags.length > 20 && (
                  <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                    <Text size="sm" variant="muted" className="text-center">
                      他 {tags.length - 20} 個のタグ
                    </Text>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}