'use client'

import Link from 'next/link'
import { Heading, Text } from '@/components/ui/typography'
import { getTagColor } from '@/lib/tags-client'

interface RelatedTagsProps {
  currentTag: string
  relatedTags: string[]
}

export function RelatedTags({ currentTag, relatedTags }: RelatedTagsProps) {
  if (relatedTags.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center dark:bg-blue-900/30">
          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <Heading as="h3" size="md">
          関連タグ
        </Heading>
      </div>

      <div className="space-y-3">
        {relatedTags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group dark:hover:bg-gray-800"
          >
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 group-hover:scale-105 ${getTagColor(tag)}`}>
              #{tag}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
        <Link
          href="/tags"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors dark:text-blue-400 dark:hover:text-blue-300"
        >
          すべてのタグを見る
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}