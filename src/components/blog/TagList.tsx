'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Heading, Text } from '@/components/ui/typography'
import { Tag as TagIcon, ChevronUp, ChevronDown } from 'lucide-react'

interface Tag {
  tag: string
  count: number
}

interface TagListProps {
  tags: Tag[]
  currentTag?: string
  showAll?: boolean
  maxDisplay?: number
}

export function TagList({ 
  tags, 
  currentTag, 
  showAll = false, 
  maxDisplay = 20 
}: TagListProps) {
  const [isExpanded, setIsExpanded] = useState(showAll)
  
  const displayTags = isExpanded ? tags : tags.slice(0, maxDisplay)
  const hasMoreTags = tags.length > maxDisplay

  const getTagColor = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800',
      'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800',
      'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:hover:bg-purple-800',
      'bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-pink-900 dark:text-pink-200 dark:hover:bg-pink-800',
      'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:bg-yellow-800',
      'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800',
      'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800',
      'bg-teal-100 text-teal-800 hover:bg-teal-200 dark:bg-teal-900 dark:text-teal-200 dark:hover:bg-teal-800',
    ]
    return colors[index % colors.length]
  }

  if (tags.length === 0) {
    return (
      <div className="text-center py-8">
        <Text variant="muted">
          No tags found
        </Text>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <Heading as="h2" size="lg">
          Tags
          <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
            ({tags.length} total)
          </span>
        </Heading>
        
        {currentTag && (
          <Link
            href="/blog"
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            View all articles
          </Link>
        )}
      </div>

      {/* 現在のタグ表示 */}
      {currentTag && (
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TagIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <Text className="font-semibold text-blue-900 dark:text-blue-200">
              Current Tag
            </Text>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 dark:bg-blue-600 text-white">
              #{currentTag}
            </span>
            <Text size="sm" className="text-blue-700 dark:text-blue-300">
              {tags.find(t => t.tag === currentTag)?.count || 0} articles
            </Text>
          </div>
        </div>
      )}

      {/* タグクラウド */}
      <div className="flex flex-wrap gap-3">
        {displayTags.map((tagItem, index) => {
          const isActive = currentTag === tagItem.tag
          
          return (
            <Link
              key={tagItem.tag}
              href={`/blog/tag/${encodeURIComponent(tagItem.tag)}`}
              className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-200 dark:ring-blue-700' 
                  : `${getTagColor(index)} hover:scale-105 hover:shadow-md`
              }`}
            >
              <span className="mr-2">#</span>
              <span>{tagItem.tag}</span>
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                isActive 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300'
              }`}>
                {tagItem.count}
              </span>
            </Link>
          )
        })}
      </div>

      {/* 展開/縮小ボタン */}
      {hasMoreTags && (
        <div className="text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Show more (+{tags.length - maxDisplay})
              </>
            )}
          </button>
        </div>
      )}

    </div>
  )
}