'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Calendar, Filter, Search, Tag, TrendingUp, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { MobileFilters } from './MobileFilters'

interface BlogFiltersProps {
  tags: string[]
  className?: string
  onFiltersChange?: (filters: BlogFilterState) => void
  locale: string
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
  tagOperator: 'OR',
}

export function BlogFilters({ tags, className, onFiltersChange, locale }: BlogFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isExpanded, setIsExpanded] = useState(true) // 常に開いた状態に変更
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [filters, setFilters] = useState<BlogFilterState>(defaultFilters)
  const t = useTranslations('blog.filters')

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
      tagOperator: (operatorParam as BlogFilterState['tagOperator']) || 'OR',
    }

    setFilters(initialFilters)
    // 常に開いた状態を維持（URLパラメータに関係なく）
    setIsExpanded(true)
  }, [searchParams])

  // フィルター状態をURLに反映
  const updateURL = useCallback(
    (newFilters: BlogFilterState) => {
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
    },
    [router]
  )

  // フィルター状態の更新
  const updateFilters = useCallback(
    (newFilters: BlogFilterState) => {
      setFilters(newFilters)
      updateURL(newFilters)
      onFiltersChange?.(newFilters)
    },
    [updateURL, onFiltersChange]
  )

  // タグの選択/選択解除
  const toggleTag = (tag: string) => {
    const newSelectedTags = filters.selectedTags.includes(tag)
      ? filters.selectedTags.filter((t) => t !== tag)
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
      <div
        className={cn(
          'hidden rounded-xl border border-[rgb(var(--border-primary))] bg-[rgb(var(--bg-primary))] lg:block',
          className
        )}
      >
        {/* フィルターヘッダー */}
        <div className="border-b border-[rgb(var(--border-primary))] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-[rgb(var(--text-tertiary))]" />
              <h3 className="font-medium text-[rgb(var(--text-primary))]">{t('title')}</h3>
              {activeFiltersCount > 0 && (
                <span className="rounded-full bg-[rgb(var(--info-bg))] px-2 py-1 text-xs font-medium text-[rgb(var(--info-color))]">
                  {activeFiltersCount}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <Button onClick={clearFilters} variant="ghost" size="sm" className="h-auto p-1 text-xs">
                  {t('clearAll')}
                </Button>
              )}
              {/* 常に開いているため、展開ボタンは非表示 */}
            </div>
          </div>
        </div>

        {/* フィルター内容 */}
        {isExpanded && (
          <div className="space-y-6 p-4">
            {/* 検索 */}
            <div>
              <label htmlFor="search" className="mb-2 block text-sm font-medium text-[rgb(var(--text-secondary))]">
                {t('searchArticles')}
              </label>
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-[rgb(var(--text-tertiary))]" />
                <input
                  id="search"
                  type="text"
                  value={filters.searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full rounded-lg border border-[rgb(var(--border-primary))] bg-[rgb(var(--bg-primary))] py-2 pr-4 pl-10 text-[rgb(var(--text-primary))] placeholder-[rgb(var(--text-tertiary))] transition-colors focus:border-[rgb(var(--focus-ring))] focus:ring-2 focus:ring-[rgb(var(--focus-ring))]"
                />
                {filters.searchQuery && (
                  <Button
                    onClick={() => handleSearchChange('')}
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-3 h-auto w-auto -translate-y-1/2 transform p-0"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* ソート */}
            <div>
              <label className="mb-3 block text-sm font-medium text-[rgb(var(--text-secondary))]">{t('sortBy')}</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'date', label: t('date'), icon: Calendar },
                  { value: 'popularity', label: t('popularity'), icon: TrendingUp },
                  { value: 'category', label: t('category'), icon: Tag },
                ].map(({ value, label, icon: Icon }) => (
                  <Button
                    key={value}
                    onClick={() => handleSortChange(value as BlogFilterState['sortBy'])}
                    variant={filters.sortBy === value ? 'default' : 'outline'}
                    size="sm"
                    className={cn(
                      'inline-flex items-center gap-2',
                      filters.sortBy === value
                        ? 'border-[rgb(var(--info-color))] bg-[rgb(var(--info-bg))] text-[rgb(var(--info-color))]'
                        : ''
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Button>
                ))}

                <Button
                  onClick={toggleSortOrder}
                  variant="outline"
                  size="sm"
                  className="inline-flex items-center gap-2"
                  aria-label={`Sort ${filters.sortOrder === 'asc' ? 'ascending' : 'descending'}`}
                >
                  {filters.sortOrder === 'asc' ? '↑' : '↓'}
                  {filters.sortOrder === 'asc' ? t('orderAsc') : t('orderDesc')}
                </Button>
              </div>
            </div>

            {/* タグフィルター */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-medium text-[rgb(var(--text-secondary))]">{t('filterByTags')}</label>
                {filters.selectedTags.length > 1 && (
                  <Button
                    onClick={toggleTagOperator}
                    variant="ghost"
                    size="sm"
                    className="h-auto bg-[rgb(var(--tag-neutral-bg))] px-2 py-1 text-xs text-[rgb(var(--tag-neutral-text))] hover:bg-[rgb(var(--tag-neutral-hover))] hover:text-[rgb(var(--text-primary))]"
                    title={`Currently using ${filters.tagOperator} logic`}
                  >
                    {filters.tagOperator}
                  </Button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => {
                  const isSelected = filters.selectedTags.includes(tag)
                  return (
                    <Button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      className={cn(
                        'inline-flex items-center gap-2',
                        isSelected
                          ? 'border-[rgb(var(--info-color))] bg-[rgb(var(--info-bg))] text-[rgb(var(--info-color))]'
                          : ''
                      )}
                    >
                      <span>#</span>
                      {tag}
                      {isSelected && <X className="h-3 w-3" />}
                    </Button>
                  )
                })}
              </div>

              {filters.selectedTags.length > 1 && (
                <p className="mt-2 text-xs text-[rgb(var(--text-tertiary))]">
                  {t('showingPostsMessage', {
                    match: filters.tagOperator === 'AND' ? t('showingPostsAll') : t('showingPostsAny'),
                  })}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* モバイル版フィルターボタン */}
      <div className="lg:hidden">
        <Button
          onClick={() => setIsMobileOpen(true)}
          variant="outline"
          className="flex w-full items-center justify-center gap-2"
        >
          <Filter className="h-4 w-4 text-[rgb(var(--text-tertiary))]" />
          <span className="font-medium text-[rgb(var(--text-primary))]">{t('title')}</span>
          {activeFiltersCount > 0 && (
            <span className="rounded-full bg-[rgb(var(--info-bg))] px-2 py-1 text-xs font-medium text-[rgb(var(--info-color))]">
              {activeFiltersCount}
            </span>
          )}
        </Button>
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
        locale={locale}
      />
    </>
  )
}
