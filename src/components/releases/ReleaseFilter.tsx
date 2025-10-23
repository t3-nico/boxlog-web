'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Filter, ChevronDown, CheckCircle, Star, AlertTriangle, X } from 'lucide-react'
// Local type definition
interface TagCount {
  tag: string
  count: number
}
import { ChangeTypeList } from './ChangeTypeList'
import type { Dictionary } from '@/lib/i18n'

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
  dict: Dictionary
  locale: string
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
  dict,
  locale,
}: ReleaseFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const hasActiveFilters = selectedTags.length > 0 || 
                          selectedTypes.length > 0 || 
                          showBreakingOnly ||
                          showFeaturedOnly

  return (
    <div className="bg-[rgb(var(--bg-primary))] border border-[rgb(var(--border-primary))] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[rgb(var(--border-primary))]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-[rgb(var(--info-bg))] rounded-lg flex items-center justify-center">
              <Filter className="w-4 h-4 text-[rgb(var(--info-color))]" />
            </div>
            <h3 className="text-lg font-semibold text-[rgb(var(--text-primary))]"> 
              {dict.releases.filters.title}
            </h3>
            {hasActiveFilters && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[rgb(var(--info-bg))] text-[rgb(var(--info-color))]">
                {selectedTags.length + selectedTypes.length + (showBreakingOnly ? 1 : 0) + (showFeaturedOnly ? 1 : 0)} active
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                onClick={onClearFilters}
                variant="ghost"
                size="sm"
                className="text-sm h-auto p-1"
              >
                {dict.releases.filters.clearAll}
              </Button>
            )}

            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="ghost"
              size="icon"
              className="lg:hidden"
            >
              <ChevronDown
                className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              />
            </Button>
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
            dict={dict}
            locale={locale}
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-[rgb(var(--text-secondary))] mb-3">{dict.releases.filters.tags}</h4>
              <TagFilter
                tags={tags}
                selectedTags={selectedTags}
                onTagToggle={onTagToggle}
                dict={dict}
                locale={locale}
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
  dict: Dictionary
  locale: string
}

function TagFilter({ tags, selectedTags, onTagToggle, maxDisplay = 10, dict, locale }: TagFilterProps) {
  const [showAll, setShowAll] = useState(false)
  const displayTags = showAll ? tags : tags.slice(0, maxDisplay)

  return (
    <div className="space-y-4">
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
                className="w-4 h-4 text-[rgb(var(--info-color))] border-[rgb(var(--border-primary))] rounded focus:ring-[rgb(var(--focus-ring))] bg-[rgb(var(--bg-primary))]"
              />
              <span className={`ml-3 text-sm transition-colors ${
                selectedTags.includes(tagItem.tag) 
                  ? 'text-[rgb(var(--text-primary))] font-medium' 
                  : 'text-[rgb(var(--text-secondary))] group-hover:text-[rgb(var(--text-primary))]'
              }`}>
                #{tagItem.tag}
              </span>
            </div>
            <span className="text-xs text-[rgb(var(--text-tertiary))]"> 
              {tagItem.count}
            </span>
          </label>
        ))}
      </div>

      {tags.length > maxDisplay && (
        <Button
          onClick={() => setShowAll(!showAll)}
          variant="ghost"
          size="sm"
          className="text-sm text-[rgb(var(--link-color))] hover:text-[rgb(var(--link-hover))] h-auto p-1"
        >
          {showAll ? dict.releases.filters.showLess : dict.releases.filters.showMore.replace('{count}', String(tags.length - maxDisplay))}
        </Button>
      )}
    </div>
  )
}

// Compact Filter for Mobile
export function CompactReleaseFilter({
  hasActiveFilters,
  onOpenFilter,
  dict,
}: {
  hasActiveFilters: boolean
  onOpenFilter: () => void
  dict: Dictionary
}) {
  return (
    <Button
      onClick={onOpenFilter}
      variant="outline"
      size="sm"
      className="inline-flex items-center gap-2"
    >
      <Filter className="w-4 h-4" />
      {dict?.releases?.filters?.title || 'Filters'}
      {hasActiveFilters && (
        <span className="inline-flex items-center justify-center w-2 h-2 bg-[rgb(var(--info-color))] rounded-full"></span>
      )}
    </Button>
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
  dict: Dictionary
  locale: string
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
  dict,
  locale,
}: FilterSummaryProps) {
  const hasFilters = selectedTags.length > 0 || 
                    selectedTypes.length > 0 || 
                    showBreakingOnly ||
                    showFeaturedOnly

  if (!hasFilters) return null

  return (
    <div className="bg-[rgb(var(--info-bg))] border border-[rgb(var(--info-color))] rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[rgb(var(--info-color))]" />
          <span className="text-sm font-medium text-[rgb(var(--info-color))]"> 
            {dict.releases.filters.resultsFound.replace('{count}', String(resultCount)).replace('{total}', String(totalCount))}
          </span>
        </div>
        
        <Button
          onClick={onClearAll}
          variant="ghost"
          size="sm"
          className="text-sm text-[rgb(var(--info-color))] hover:text-[rgb(var(--link-hover))] h-auto p-1"
        >
          {dict.releases.filters.clearAll}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Quick Filters */}
        {showFeaturedOnly && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-[rgb(var(--bg-primary))] border border-[rgb(var(--info-color))] rounded-full text-sm">
            <Star className="w-4 h-4 mr-1" />
            {dict.releases.filters.featuredReleases}
            <Button
              onClick={onFeaturedToggle}
              variant="ghost"
              size="icon"
              className="ml-1 h-auto w-auto p-0"
            >
              <X className="w-3 h-3" />
            </Button>
          </span>
        )}

        {showBreakingOnly && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-[rgb(var(--bg-primary))] border border-[rgb(var(--info-color))] rounded-full text-sm">
            <AlertTriangle className="w-4 h-4 mr-1" />
            {dict.releases.filters.breakingChanges}
            <Button
              onClick={onBreakingToggle}
              variant="ghost"
              size="icon"
              className="ml-1 h-auto w-auto p-0"
            >
              <X className="w-3 h-3" />
            </Button>
          </span>
        )}

        {/* Selected Types */}
        {selectedTypes.map((type) => (
          <span
            key={type}
            className="inline-flex items-center gap-1 px-3 py-1 bg-[rgb(var(--bg-primary))] border border-[rgb(var(--info-color))] rounded-full text-sm"
          >
            {type}
            <Button
              onClick={() => onTypeRemove(type)}
              variant="ghost"
              size="icon"
              className="ml-1 h-auto w-auto p-0"
            >
              <X className="w-3 h-3" />
            </Button>
          </span>
        ))}

        {/* Selected Tags */}
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-3 py-1 bg-[rgb(var(--bg-primary))] border border-[rgb(var(--info-color))] rounded-full text-sm"
          >
            #{tag}
            <Button
              onClick={() => onTagRemove(tag)}
              variant="ghost"
              size="icon"
              className="ml-1 h-auto w-auto p-0"
            >
              <X className="w-3 h-3" />
            </Button>
          </span>
        ))}
      </div>
    </div>
  )
}