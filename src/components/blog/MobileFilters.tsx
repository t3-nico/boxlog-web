'use client'

import { useState } from 'react'
import { X, Filter, Search, Calendar, TrendingUp, Tag } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useTranslations } from 'next-intl'
import type { BlogFilterState } from './BlogFilters'

interface MobileFiltersProps {
  isOpen: boolean
  onClose: () => void
  tags: string[]
  filters: BlogFilterState
  onFiltersChange: (filters: BlogFilterState) => void
  onClearFilters: () => void
  activeFiltersCount: number
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
  locale: _locale
}: MobileFiltersProps) {
  const t = useTranslations('blog.filters')
  const [localFilters, setLocalFilters] = useState<BlogFilterState>(filters)

  // フィルター適用
  const applyFilters = () => {
    onFiltersChange(localFilters)
    onClose()
  }

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
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[90vh] p-0">
        <div className="flex flex-col h-full">
          {/* ヘッダー */}
          <SheetHeader className="p-6 border-b flex-shrink-0">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <SheetTitle className="text-lg font-semibold">
                {t('title')}
              </SheetTitle>
              {activeFiltersCount > 0 && (
                <Badge variant="default" className="ml-auto">
                  {activeFiltersCount}
                </Badge>
              )}
            </div>
          </SheetHeader>

          {/* コンテンツ */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* 検索 */}
            <div>
              <label htmlFor="mobile-search" className="block text-sm font-medium text-muted-foreground mb-2">
                {t('searchArticles')}
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="mobile-search"
                  type="text"
                  value={localFilters.searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="pl-10 pr-10"
                />
                {localFilters.searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => handleSearchChange('')}
                    aria-label={t('clearSearch')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* ソート */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-3">
                {t('sortBy')}
              </label>
              <div className="space-y-2">
                {[
                  { value: 'date', label: t('date'), icon: Calendar },
                  { value: 'popularity', label: t('popularity'), icon: TrendingUp },
                  { value: 'category', label: t('category'), icon: Tag }
                ].map(({ value, label, icon: Icon }) => (
                  <Button
                    key={value}
                    onClick={() => handleSortChange(value as BlogFilterState['sortBy'])}
                    variant={localFilters.sortBy === value ? 'default' : 'outline'}
                    className="w-full justify-start gap-4"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{label}</span>
                    {localFilters.sortBy === value && (
                      <span className="ml-auto text-sm">
                        {localFilters.sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </Button>
                ))}

                {/* ソート順切り替え */}
                <Button
                  onClick={toggleSortOrder}
                  variant="outline"
                  className="w-full justify-between"
                >
                  <span className="font-medium">{t('order')}</span>
                  <span className="text-sm">
                    {localFilters.sortOrder === 'asc' ? t('orderAsc') : t('orderDesc')}
                  </span>
                </Button>
              </div>
            </div>

            {/* タグフィルター */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-muted-foreground">
                  {t('filterByTags')}
                </label>
                {localFilters.selectedTags.length > 1 && (
                  <Button
                    onClick={toggleTagOperator}
                    variant="secondary"
                    size="sm"
                  >
                    {localFilters.tagOperator}
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {tags.map((tag) => {
                  const isSelected = localFilters.selectedTags.includes(tag)
                  return (
                    <Button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      variant={isSelected ? 'default' : 'outline'}
                      className="justify-center gap-2"
                      size="sm"
                    >
                      <span>#</span>
                      <span className="truncate">{tag}</span>
                      {isSelected && <X className="w-3 h-3 flex-shrink-0" />}
                    </Button>
                  )
                })}
              </div>

              {localFilters.selectedTags.length > 1 && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {t('showingPostsMessage', { match: localFilters.tagOperator === 'AND' ? t('showingPostsAll') : t('showingPostsAny') })}
                </p>
              )}
            </div>
          </div>

          {/* フッター */}
          <div className="p-6 border-t space-y-3 flex-shrink-0">
            <div className="flex gap-4">
              <Button
                onClick={clearAllFilters}
                variant="outline"
                className="flex-1"
              >
                {t('clearAll')}
              </Button>
              <Button
                onClick={applyFilters}
                className="flex-1"
              >
                {t('applyFilters')}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
