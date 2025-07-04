'use client'

import Link from 'next/link'
import { TagCount, getTagColor } from '@/lib/tags-client'

interface TagCloudProps {
  tags: TagCount[]
  maxTags?: number
}

export function TagCloud({ tags, maxTags = 50 }: TagCloudProps) {
  const displayTags = tags.slice(0, maxTags)
  
  // タグの使用回数に基づいてサイズを計算
  const maxCount = Math.max(...displayTags.map(t => t.count))
  const minCount = Math.min(...displayTags.map(t => t.count))
  
  const getSizeClass = (count: number) => {
    const ratio = (count - minCount) / (maxCount - minCount || 1)
    
    if (ratio > 0.8) return 'text-3xl'
    if (ratio > 0.6) return 'text-2xl'
    if (ratio > 0.4) return 'text-xl'
    if (ratio > 0.2) return 'text-lg'
    return 'text-base'
  }

  if (displayTags.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-gray-700">
          <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400">タグが見つかりませんでした</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {displayTags.map((tagData) => (
          <Link
            key={tagData.tag}
            href={`/tags/${encodeURIComponent(tagData.tag)}`}
            className={`inline-flex items-center px-4 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 hover:shadow-md ${getSizeClass(tagData.count)} ${getTagColor(tagData.tag)}`}
          >
            #{tagData.tag}
            <span className="ml-2 text-xs opacity-75">
              {tagData.count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}