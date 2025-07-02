'use client'

import { useState, useCallback } from 'react'
// Local type definition
interface TagCount {
  tag: string
  count: number
}
import { ChangeTypeList } from './ChangeTypeList'

interface ReleaseFilterProps {
  tags: TagCount[]
  selectedTags: string[]
  selectedTypes: string[]
  showBreakingOnly: boolean
  showFeaturedOnly: boolean
  onTagToggle: (tag: string) => void
  onTypeToggle: (type: string) => void
  onBreakingToggle: () => void
  onFeaturedToggle: () => void
  onClearFilters: () => void
}

export function ReleaseFilter({
  tags,
  selectedTags,
  selectedTypes,
  showBreakingOnly,
  showFeaturedOnly,
  onTagToggle,
  onTypeToggle,
  onBreakingToggle,
  onFeaturedToggle,
  onClearFilters,
}: ReleaseFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const hasActiveFilters = selectedTags.length > 0 || 
                          selectedTypes.length > 0 || 
                          showBreakingOnly ||
                          showFeaturedOnly

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              フィルター
            </h3>
            {hasActiveFilters && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {selectedTags.length + selectedTypes.length + (showBreakingOnly ? 1 : 0) + (showFeaturedOnly ? 1 : 0)} active
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 font-medium"
              >
                クリア
              </button>
            )}
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors lg:hidden"
            >
              <svg 
                className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Content */}
      <div className={`lg:block ${isExpanded ? 'block' : 'hidden'}`}>
        <div className="p-6 space-y-6">
          {/* Change Types */}
          <ChangeTypeList
            selectedTypes={selectedTypes}
            onTypeToggle={onTypeToggle}
            showAll={true}
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">タグ</h4>
              <TagFilter
                tags={tags}
                selectedTags={selectedTags}
                onTagToggle={onTagToggle}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface TagFilterProps {
  tags: TagCount[]
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  maxDisplay?: number
}

function TagFilter({ tags, selectedTags, onTagToggle, maxDisplay = 10 }: TagFilterProps) {
  const [showAll, setShowAll] = useState(false)
  const displayTags = showAll ? tags : tags.slice(0, maxDisplay)

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {displayTags.map((tagItem) => (
          <label
            key={tagItem.tag}
            className="flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedTags.includes(tagItem.tag)}
                onChange={() => onTagToggle(tagItem.tag)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className={`ml-3 text-sm transition-colors ${
                selectedTags.includes(tagItem.tag) 
                  ? 'text-gray-900 font-medium' 
                  : 'text-gray-600 group-hover:text-gray-900'
              }`}>
                #{tagItem.tag}
              </span>
            </div>
            <span className="text-xs text-gray-400">
              {tagItem.count}
            </span>
          </label>
        ))}
      </div>

      {tags.length > maxDisplay && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          {showAll ? '表示を減らす' : `他 ${tags.length - maxDisplay}個のタグを表示`}
        </button>
      )}
    </div>
  )
}

// Compact Filter for Mobile
export function CompactReleaseFilter({
  hasActiveFilters,
  onOpenFilter,
}: {
  hasActiveFilters: boolean
  onOpenFilter: () => void
}) {
  return (
    <button
      onClick={onOpenFilter}
      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
      </svg>
      フィルター
      {hasActiveFilters && (
        <span className="inline-flex items-center justify-center w-2 h-2 bg-blue-600 rounded-full"></span>
      )}
    </button>
  )
}

// Filter Summary
interface FilterSummaryProps {
  selectedTags: string[]
  selectedTypes: string[]
  showBreakingOnly: boolean
  showFeaturedOnly: boolean
  resultCount: number
  totalCount: number
  onTagRemove: (tag: string) => void
  onTypeRemove: (type: string) => void
  onBreakingToggle: () => void
  onFeaturedToggle: () => void
  onClearAll: () => void
}

export function FilterSummary({
  selectedTags,
  selectedTypes,
  showBreakingOnly,
  showFeaturedOnly,
  resultCount,
  totalCount,
  onTagRemove,
  onTypeRemove,
  onBreakingToggle,
  onFeaturedToggle,
  onClearAll,
}: FilterSummaryProps) {
  const hasFilters = selectedTags.length > 0 || 
                    selectedTypes.length > 0 || 
                    showBreakingOnly ||
                    showFeaturedOnly

  if (!hasFilters) return null

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          <span className="text-sm font-medium text-blue-900">
            {resultCount}件のリリースが見つかりました（全{totalCount}件中）
          </span>
        </div>
        
        <button
          onClick={onClearAll}
          className="text-sm text-blue-700 hover:text-blue-900 font-medium"
        >
          すべてクリア
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Quick Filters */}
        {showFeaturedOnly && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-blue-200 rounded-full text-sm">
            ✨ 注目リリース
            <button
              onClick={onFeaturedToggle}
              className="ml-1 text-blue-600 hover:text-blue-800"
            >
              ×
            </button>
          </span>
        )}

        {showBreakingOnly && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-blue-200 rounded-full text-sm">
            ⚠️ 破壊的変更
            <button
              onClick={onBreakingToggle}
              className="ml-1 text-blue-600 hover:text-blue-800"
            >
              ×
            </button>
          </span>
        )}

        {/* Selected Types */}
        {selectedTypes.map((type) => (
          <span
            key={type}
            className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-blue-200 rounded-full text-sm"
          >
            {type}
            <button
              onClick={() => onTypeRemove(type)}
              className="ml-1 text-blue-600 hover:text-blue-800"
            >
              ×
            </button>
          </span>
        ))}

        {/* Selected Tags */}
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-blue-200 rounded-full text-sm"
          >
            #{tag}
            <button
              onClick={() => onTagRemove(tag)}
              className="ml-1 text-blue-600 hover:text-blue-800"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}