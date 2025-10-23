'use client'

import { useState, useEffect } from 'react'
import { X, Filter, Search, Calendar, TrendingUp, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BlogFilterState } from './BlogFilters'
import type { Dictionary } from '@/lib/i18n'

interface MobileFiltersProps {
  isOpen: boolean
  onClose: () => void
  tags: string[]
  filters: BlogFilterState
  onFiltersChange: (filters: BlogFilterState) => void
  onClearFilters: () => void
  activeFiltersCount: number
  dict: Dictionary
  locale: string
}

export function MobileFilters({
  isOpen,
  onClose,
  tags,
  filters,
  onFiltersChange,
  onClearFilters,
  activeFiltersCount,
  dict,
  locale
}: MobileFiltersProps) {
  const [localFilters, setLocalFilters] = useState<BlogFilterState>(filters)

  // フィルター適用
  const applyFilters = () => {
    onFiltersChange(localFilters)
    onClose()
  }

  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // タグの選択/選択解除
  const toggleTag = (tag: string) => {
    const newSelectedTags = localFilters.selectedTags.includes(tag)
      ? localFilters.selectedTags.filter(t => t !== tag)
      : [...localFilters.selectedTags, tag]
    
    setLocalFilters({ ...localFilters, selectedTags: newSelectedTags })
  }

  // 検索クエリの更新
  const handleSearchChange = (query: string) => {
    setLocalFilters({ ...localFilters, searchQuery: query })
  }

  // ソート設定の更新
  const handleSortChange = (sortBy: BlogFilterState['sortBy']) => {
    setLocalFilters({ ...localFilters, sortBy })
  }

  // ソート順の切り替え
  const toggleSortOrder = () => {
    const newOrder = localFilters.sortOrder === 'asc' ? 'desc' : 'asc'
    setLocalFilters({ ...localFilters, sortOrder: newOrder })
  }

  // タグ演算子の切り替え
  const toggleTagOperator = () => {
    const newOperator = localFilters.tagOperator === 'AND' ? 'OR' : 'AND'
    setLocalFilters({ ...localFilters, tagOperator: newOperator })
  }

  // フィルターをクリア
  const clearAllFilters = () => {
    const defaultFilters: BlogFilterState = {
      selectedTags: [],
      searchQuery: '',
      sortBy: 'date',
      sortOrder: 'desc',
      tagOperator: 'OR'
    }
    setLocalFilters(defaultFilters)
    onClearFilters()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* オーバーレイ */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* モーダル */}
      <div className="fixed inset-x-0 bottom-0 max-h-[90vh] overflow-hidden">
        <div className="bg-[rgb(var(--bg-primary))] rounded-t-2xl shadow-xl transition-transform transform translate-y-0 flex flex-col max-h-[90vh]">
          {/* ヘッダー */}
          <div className="flex items-center justify-between p-6 border-b border-[rgb(var(--border-primary))] flex-shrink-0">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-[rgb(var(--text-tertiary))]" />
              <h2 className="text-lg font-semibold text-[rgb(var(--text-primary))]"> 
                {dict.pages.blog.filters.title}
              </h2>
              {activeFiltersCount > 0 && (
                <span className="px-2 py-1 text-xs font-medium bg-[rgb(var(--info-bg))] text-[rgb(var(--info-color))] rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))] transition-colors"
              aria-label={dict.pages.blog.filters.closeFilters}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* コンテンツ */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* 検索 */}
            <div>
              <label htmlFor="mobile-search" className="block text-sm font-medium text-[rgb(var(--text-secondary))] mb-2">
                {dict.pages.blog.filters.searchArticles}
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgb(var(--text-tertiary))]" />
                <input
                  id="mobile-search"
                  type="text"
                  value={localFilters.searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder={dict.pages.blog.filters.searchPlaceholder}
                  className="w-full pl-10 pr-4 py-3 border border-[rgb(var(--border-primary))] rounded-lg bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))] placeholder-[rgb(var(--text-tertiary))] focus:ring-2 focus:ring-[rgb(var(--focus-ring))] focus:border-[rgb(var(--focus-ring))] transition-colors text-base"
                />
                {localFilters.searchQuery && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))] transition-colors"
                    aria-label={dict.pages.blog.filters.clearSearch}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* ソート */}
            <div>
              <label className="block text-sm font-medium text-[rgb(var(--text-secondary))] mb-3">
                {dict.pages.blog.filters.sortBy}
              </label>
              <div className="space-y-2">
                {[
                  { value: 'date', label: dict.pages.blog.filters.date, icon: Calendar },
                  { value: 'popularity', label: dict.pages.blog.filters.popularity, icon: TrendingUp },
                  { value: 'category', label: dict.pages.blog.filters.category, icon: Tag }
                ].map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => handleSortChange(value as BlogFilterState['sortBy'])}
                    className={cn(
                      'w-full flex items-center gap-4 px-4 py-3 text-left rounded-lg border transition-colors',
                      localFilters.sortBy === value
                        ? 'bg-[rgb(var(--info-bg))] border-[rgb(var(--info-color))] text-[rgb(var(--info-color))]'
                        : 'bg-[rgb(var(--bg-primary))] border-[rgb(var(--border-primary))] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-secondary))] hover:text-[rgb(var(--text-primary))]'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{label}</span>
                    {localFilters.sortBy === value && (
                      <span className="ml-auto text-sm">
                        {localFilters.sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                ))}
                
                {/* ソート順切り替え */}
                <button
                  onClick={toggleSortOrder}
                  className="w-full flex items-center justify-between px-4 py-3 text-left rounded-lg border border-[rgb(var(--border-primary))] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-secondary))] hover:text-[rgb(var(--text-primary))] bg-[rgb(var(--bg-primary))] transition-colors"
                >
                  <span className="font-medium">{dict.pages.blog.filters.order}</span>
                  <span className="text-sm">
                    {localFilters.sortOrder === 'asc' ? dict.pages.blog.filters.orderAsc : dict.pages.blog.filters.orderDesc}
                  </span>
                </button>
              </div>
            </div>

            {/* タグフィルター */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-[rgb(var(--text-secondary))]"> 
                  {dict.pages.blog.filters.filterByTags}
                </label>
                {localFilters.selectedTags.length > 1 && (
                  <button
                    onClick={toggleTagOperator}
                    className="px-3 py-1 text-xs font-medium bg-[rgb(var(--tag-neutral-bg))] text-[rgb(var(--tag-neutral-text))] rounded-full hover:bg-[rgb(var(--tag-neutral-hover))] hover:text-[rgb(var(--text-primary))] transition-colors"
                    title={`${dict.pages.blog.filters.currentlyUsing} ${localFilters.tagOperator} ${dict.pages.blog.filters.logic}`}
                  >
                    {localFilters.tagOperator}
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {tags.map((tag) => {
                  const isSelected = localFilters.selectedTags.includes(tag)
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        'flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-colors',
                        isSelected
                          ? 'bg-[rgb(var(--info-bg))] border-[rgb(var(--info-color))] text-[rgb(var(--info-color))]'
                          : 'bg-[rgb(var(--bg-primary))] border-[rgb(var(--border-primary))] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-secondary))] hover:text-[rgb(var(--text-primary))]'
                      )}
                    >
                      <span>#</span>
                      <span className="truncate">{tag}</span>
                      {isSelected && <X className="w-3 h-3 flex-shrink-0" />}
                    </button>
                  )
                })}
              </div>
              
              {localFilters.selectedTags.length > 1 && (
                <p className="mt-2 text-xs text-[rgb(var(--text-tertiary))]"> 
                  {dict.pages.blog.filters.showingPosts} {localFilters.tagOperator === 'AND' ? dict.pages.blog.filters.showingPostsAll : dict.pages.blog.filters.showingPostsAny} of the selected tags
                </p>
              )}
            </div>
          </div>

          {/* フッター */}
          <div className="p-6 border-t border-[rgb(var(--border-primary))] space-y-3 flex-shrink-0">
            <div className="flex gap-4">
              <button
                onClick={clearAllFilters}
                className="flex-1 px-4 py-3 text-[rgb(var(--text-secondary))] bg-[rgb(var(--tag-neutral-bg))] rounded-lg hover:bg-[rgb(var(--tag-neutral-hover))] hover:text-[rgb(var(--text-primary))] transition-colors font-medium"
              >
{dict.pages.blog.filters.clearAll}
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 px-4 py-3 bg-[rgb(var(--info-color))] text-white rounded-lg hover:bg-[rgb(var(--link-hover))] transition-colors font-medium"
              >
{dict.pages.blog.filters.applyFilters}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}