'use client'

import { useState, useEffect } from 'react'
import { X, Filter, Search, Calendar, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BlogFilterState } from './BlogFilters'

interface MobileFiltersProps {
  isOpen: boolean
  onClose: () => void
  tags: string[]
  filters: BlogFilterState
  onFiltersChange: (filters: BlogFilterState) => void
  onClearFilters: () => void
  activeFiltersCount: number
}

export function MobileFilters({
  isOpen,
  onClose,
  tags,
  filters,
  onFiltersChange,
  onClearFilters,
  activeFiltersCount
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
        <div className="bg-white dark:bg-neutral-800 rounded-t-2xl shadow-xl transition-transform transform translate-y-0 flex flex-col max-h-[90vh]">
          {/* ヘッダー */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700 flex-shrink-0">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Filters
              </h2>
              {activeFiltersCount > 0 && (
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* コンテンツ */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* 検索 */}
            <div>
              <label htmlFor="mobile-search" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Search Articles
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  id="mobile-search"
                  type="text"
                  value={localFilters.searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search by title, content, or tags..."
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors text-base"
                />
                {localFilters.searchQuery && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* ソート */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                Sort By
              </label>
              <div className="space-y-2">
                {[
                  { value: 'date', label: 'Date', icon: Calendar },
                  { value: 'title', label: 'Title', icon: Filter },
                  { value: 'readingTime', label: 'Reading Time', icon: Clock }
                ].map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => handleSortChange(value as BlogFilterState['sortBy'])}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg border transition-colors',
                      localFilters.sortBy === value
                        ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200'
                        : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-600'
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
                  className="w-full flex items-center justify-between px-4 py-3 text-left rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-600 transition-colors"
                >
                  <span className="font-medium">Order</span>
                  <span className="text-sm">
                    {localFilters.sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
                  </span>
                </button>
              </div>
            </div>

            {/* タグフィルター */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Filter by Tags
                </label>
                {localFilters.selectedTags.length > 1 && (
                  <button
                    onClick={toggleTagOperator}
                    className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                    title={`Currently using ${localFilters.tagOperator} logic`}
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
                          ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200'
                          : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-600'
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
                <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                  Showing posts that match {localFilters.tagOperator === 'AND' ? 'all' : 'any'} of the selected tags
                </p>
              )}
            </div>
          </div>

          {/* フッター */}
          <div className="p-6 border-t border-neutral-200 dark:border-neutral-700 space-y-3 flex-shrink-0">
            <div className="flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 px-4 py-3 text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-700 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors font-medium"
              >
                Clear All
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}