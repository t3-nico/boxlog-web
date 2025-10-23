'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heading, Text } from '@/components/ui/typography'
import { Tag as TagIcon, ChevronUp, ChevronDown } from 'lucide-react'
import { getTagColor } from '@/lib/tags-client'

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
          <span className="ml-2 text-sm font-normal text-[rgb(var(--text-tertiary))]">
            ({tags.length} total)
          </span>
        </Heading>
        
        {currentTag && (
          <Link
            href="/blog"
            className="text-sm text-[rgb(var(--link-color))] hover:text-[rgb(var(--link-hover))] font-medium"
          >
            View all articles
          </Link>
        )}
      </div>

      {/* 現在のタグ表示 */}
      {currentTag && (
        <div className="bg-[rgb(var(--info-bg))] border border-[rgb(var(--border-secondary))] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TagIcon className="w-5 h-5 text-[rgb(var(--info-color))]" />
            <Text className="font-semibold text-[rgb(var(--text-primary))]">
              Current Tag
            </Text>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[rgb(var(--link-color))] text-white">
              #{currentTag}
            </span>
            <Text size="sm" className="text-[rgb(var(--text-secondary))]">
              {tags.find(t => t.tag === currentTag)?.count || 0} articles
            </Text>
          </div>
        </div>
      )}

      {/* タグクラウド */}
      <div className="flex flex-wrap gap-2">
        {displayTags.map((tagItem, index) => {
          const isActive = currentTag === tagItem.tag
          
          return (
            <Link
              key={tagItem.tag}
              href={`/blog/tag/${encodeURIComponent(tagItem.tag)}`}
              className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-[rgb(var(--link-color))] text-white shadow-lg ring-2 ring-[rgb(var(--link-color))]/30' 
                  : `${getTagColor(tagItem.tag)} hover:scale-105 hover:shadow-md`
              }`}
            >
              <span className="mr-2">#</span>
              <span>{tagItem.tag}</span>
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                isActive 
                  ? 'bg-[rgb(var(--link-hover))] text-white' 
                  : 'bg-[rgb(var(--bg-primary))]/80 text-[rgb(var(--text-secondary))]'
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
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="outline"
            size="sm"
            className="inline-flex items-center"
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
          </Button>
        </div>
      )}

    </div>
  )
}