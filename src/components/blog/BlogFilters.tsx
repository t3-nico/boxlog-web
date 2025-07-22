'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X, Filter, ChevronDown, Calendar, TrendingUp, Tag, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MobileFilters } from './MobileFilters'

interface BlogFiltersProps {
  tags: string[]
  className?: string
  onFiltersChange?: (filters: BlogFilterState) => void
}

export interface BlogFilterState {
  selectedTags: string[]
  searchQuery: string
  sortBy: 'date' | 'popularity' | 'category'
  sortOrder: 'asc' | 'desc'
  tagOperator: 'AND' | 'OR'
}

const defaultFilters: BlogFilterState = {
  selectedTags: [],
  searchQuery: '',
  sortBy: 'date',
  sortOrder: 'desc',
  tagOperator: 'OR'
}

export function BlogFilters({ tags, className, onFiltersChange }: BlogFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isExpanded, setIsExpanded] = useState(true) // 常に開いた状態に変更
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [filters, setFilters] = useState<BlogFilterState>(defaultFilters)

  // URLパラメータから初期状態を復元
  useEffect(() => {
    const tagsParam = searchParams.get('tags')
    const searchParam = searchParams.get('search')
    const sortParam = searchParams.get('sort')
    const orderParam = searchParams.get('order')
    const operatorParam = searchParams.get('operator')

    const initialFilters: BlogFilterState = {
      selectedTags: tagsParam ? tagsParam.split(',') : [],
      searchQuery: searchParam || '',
      sortBy: (sortParam as BlogFilterState['sortBy']) || 'date',
      sortOrder: (orderParam as BlogFilterState['sortOrder']) || 'desc',
      tagOperator: (operatorParam as BlogFilterState['tagOperator']) || 'OR'
    }

    setFilters(initialFilters)
    // 常に開いた状態を維持（URLパラメータに関係なく）
    setIsExpanded(true)
  }, [searchParams])

  // フィルター状態をURLに反映
  const updateURL = useCallback((newFilters: BlogFilterState) => {
    const params = new URLSearchParams()
    
    if (newFilters.selectedTags.length > 0) {
      params.set('tags', newFilters.selectedTags.join(','))
    }
    if (newFilters.searchQuery) {
      params.set('search', newFilters.searchQuery)
    }
    if (newFilters.sortBy !== 'date') {
      params.set('sort', newFilters.sortBy)
    }
    if (newFilters.sortOrder !== 'desc') {
      params.set('order', newFilters.sortOrder)
    }
    if (newFilters.tagOperator !== 'OR') {
      params.set('operator', newFilters.tagOperator)
    }

    const paramString = params.toString()
    const newUrl = paramString ? `/blog?${paramString}` : '/blog'
    router.push(newUrl, { scroll: false })
  }, [router])

  // フィルター状態の更新
  const updateFilters = useCallback((newFilters: BlogFilterState) => {
    setFilters(newFilters)
    updateURL(newFilters)
    onFiltersChange?.(newFilters)
  }, [updateURL, onFiltersChange])

  // タグの選択/選択解除
  const toggleTag = (tag: string) => {
    const newSelectedTags = filters.selectedTags.includes(tag)
      ? filters.selectedTags.filter(t => t !== tag)
      : [...filters.selectedTags, tag]
    
    updateFilters({ ...filters, selectedTags: newSelectedTags })
  }

  // 検索クエリの更新
  const handleSearchChange = (query: string) => {
    updateFilters({ ...filters, searchQuery: query })
  }

  // ソート設定の更新
  const handleSortChange = (sortBy: BlogFilterState['sortBy']) => {
    updateFilters({ ...filters, sortBy })
  }

  // ソート順の切り替え
  const toggleSortOrder = () => {
    const newOrder = filters.sortOrder === 'asc' ? 'desc' : 'asc'
    updateFilters({ ...filters, sortOrder: newOrder })
  }

  // タグ演算子の切り替え
  const toggleTagOperator = () => {
    const newOperator = filters.tagOperator === 'AND' ? 'OR' : 'AND'
    updateFilters({ ...filters, tagOperator: newOperator })
  }

  // フィルターをクリア
  const clearFilters = () => {
    updateFilters(defaultFilters)
    setIsExpanded(false)
  }

  // アクティブなフィルターの数
  const activeFiltersCount = filters.selectedTags.length + (filters.searchQuery ? 1 : 0)

  return (
    <>
      {/* デスクトップ版 */}
      <div className={cn('hidden lg:block bg-[rgb(var(--bg-primary))] rounded-xl border border-[rgb(var(--border-primary))]', className)}>
        {/* フィルターヘッダー */}
        <div className="p-4 border-b border-[rgb(var(--border-primary))]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[rgb(var(--text-tertiary))]" />
              <h3 className="font-medium text-[rgb(var(--text-primary))]"> 
                Filters
              </h3>
              {activeFiltersCount > 0 && (
                <span className="px-2 py-1 text-xs font-medium bg-[rgb(var(--info-bg))] text-[rgb(var(--info-color))] rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-medium text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))] transition-colors"
                >
                  Clear all
                </button>
              )}
              {/* 常に開いているため、展開ボタンは非表示 */}
            </div>
          </div>
        </div>

      {/* フィルター内容 */}
      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* 検索 */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-[rgb(var(--text-secondary))] mb-2">
              Search Articles
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[rgb(var(--text-tertiary))]" />
              <input
                id="search"
                type="text"
                value={filters.searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search by title, content, or tags..."
                className="w-full pl-10 pr-4 py-2 border border-[rgb(var(--border-primary))] rounded-lg bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))] placeholder-[rgb(var(--text-tertiary))] focus:ring-2 focus:ring-[rgb(var(--focus-ring))] focus:border-[rgb(var(--focus-ring))] transition-colors"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-secondary))] transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* ソート */}
          <div>
            <label className="block text-sm font-medium text-[rgb(var(--text-secondary))] mb-3">
              Sort By
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'date', label: 'Date', icon: Calendar },
                { value: 'popularity', label: 'Popularity', icon: TrendingUp },
                { value: 'category', label: 'Category', icon: Tag }
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => handleSortChange(value as BlogFilterState['sortBy'])}
                  className={cn(
                    'inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-colors',
                    filters.sortBy === value
                      ? 'bg-[rgb(var(--info-bg))] border-[rgb(var(--info-color))] text-[rgb(var(--info-color))]'
                      : 'bg-[rgb(var(--bg-primary))] border-[rgb(var(--border-primary))] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-secondary))] hover:text-[rgb(var(--text-primary))]'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
              
              <button
                onClick={toggleSortOrder}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-[rgb(var(--border-primary))] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-secondary))] hover:text-[rgb(var(--text-primary))] bg-[rgb(var(--bg-primary))] transition-colors"
                aria-label={`Sort ${filters.sortOrder === 'asc' ? 'ascending' : 'descending'}`}
              >
                {filters.sortOrder === 'asc' ? '↑' : '↓'}
                {filters.sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
              </button>
            </div>
          </div>

          {/* タグフィルター */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-[rgb(var(--text-secondary))]"> 
                Filter by Tags
              </label>
              {filters.selectedTags.length > 1 && (
                <button
                  onClick={toggleTagOperator}
                  className="px-2 py-1 text-xs font-medium bg-[rgb(var(--tag-neutral-bg))] text-[rgb(var(--tag-neutral-text))] rounded hover:bg-[rgb(var(--tag-neutral-hover))] hover:text-[rgb(var(--text-primary))] transition-colors"
                  title={`Currently using ${filters.tagOperator} logic`}
                >
                  {filters.tagOperator}
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                const isSelected = filters.selectedTags.includes(tag)
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={cn(
                      'inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-colors',
                      isSelected
                        ? 'bg-[rgb(var(--info-bg))] border-[rgb(var(--info-color))] text-[rgb(var(--info-color))]'
                        : 'bg-[rgb(var(--bg-primary))] border-[rgb(var(--border-primary))] text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-secondary))] hover:text-[rgb(var(--text-primary))]'
                    )}
                  >
                    <span>#</span>
                    {tag}
                    {isSelected && <X className="w-3 h-3" />}
                  </button>
                )
              })}
            </div>
            
            {filters.selectedTags.length > 1 && (
              <p className="mt-2 text-xs text-[rgb(var(--text-tertiary))]">
                Showing posts that match {filters.tagOperator === 'AND' ? 'all' : 'any'} of the selected tags
              </p>
            )}
          </div>
        </div>
      )}
      </div>

      {/* モバイル版フィルターボタン */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[rgb(var(--bg-primary))] border border-[rgb(var(--border-primary))] rounded-lg hover:bg-[rgb(var(--bg-secondary))] transition-colors"
        >
          <Filter className="w-4 h-4 text-[rgb(var(--text-tertiary))]" />
          <span className="font-medium text-[rgb(var(--text-primary))]">
            Filters
          </span>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-1 text-xs font-medium bg-[rgb(var(--info-bg))] text-[rgb(var(--info-color))] rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* モバイルフィルターモーダル */}
      <MobileFilters
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        tags={tags}
        filters={filters}
        onFiltersChange={updateFilters}
        onClearFilters={clearFilters}
        activeFiltersCount={activeFiltersCount}
      />
    </>
  )
}