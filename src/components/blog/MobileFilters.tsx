'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { getTagFilterColor } from '@/lib/tags-client';
import { cn } from '@/lib/utils';
import { Calendar, Filter, Search, Tag, TrendingUp, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { BlogFilterState } from './BlogFilters';

interface MobileFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  tags: string[];
  filters: BlogFilterState;
  onFiltersChange: (filters: BlogFilterState) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
  locale: string;
}

export function MobileFilters({
  isOpen,
  onClose,
  tags,
  filters,
  onFiltersChange,
  onClearFilters,
  activeFiltersCount,
  locale: _locale,
}: MobileFiltersProps) {
  const t = useTranslations('blog.filters');
  const [localFilters, setLocalFilters] = useState<BlogFilterState>(filters);

  // フィルター適用
  const applyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  // タグの選択/選択解除
  const toggleTag = (tag: string) => {
    const newSelectedTags = localFilters.selectedTags.includes(tag)
      ? localFilters.selectedTags.filter((t) => t !== tag)
      : [...localFilters.selectedTags, tag];

    setLocalFilters({ ...localFilters, selectedTags: newSelectedTags });
  };

  // 検索クエリの更新
  const handleSearchChange = (query: string) => {
    setLocalFilters({ ...localFilters, searchQuery: query });
  };

  // ソート設定の更新
  const handleSortChange = (sortBy: BlogFilterState['sortBy']) => {
    setLocalFilters({ ...localFilters, sortBy });
  };

  // ソート順の切り替え
  const toggleSortOrder = () => {
    const newOrder = localFilters.sortOrder === 'asc' ? 'desc' : 'asc';
    setLocalFilters({ ...localFilters, sortOrder: newOrder });
  };

  // タグ演算子の切り替え
  const toggleTagOperator = () => {
    const newOperator = localFilters.tagOperator === 'AND' ? 'OR' : 'AND';
    setLocalFilters({ ...localFilters, tagOperator: newOperator });
  };

  // フィルターをクリア
  const clearAllFilters = () => {
    const defaultFilters: BlogFilterState = {
      selectedTags: [],
      searchQuery: '',
      sortBy: 'date',
      sortOrder: 'desc',
      tagOperator: 'OR',
    };
    setLocalFilters(defaultFilters);
    onClearFilters();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[90vh] p-0">
        <div className="flex h-full flex-col">
          {/* ヘッダー */}
          <SheetHeader className="flex-shrink-0 border-b p-6">
            <div className="flex items-center gap-4">
              <Filter className="text-muted-foreground size-5" />
              <SheetTitle className="text-lg font-bold">{t('title')}</SheetTitle>
              {activeFiltersCount > 0 && (
                <Badge variant="primary" className="ml-auto">
                  {activeFiltersCount}
                </Badge>
              )}
            </div>
          </SheetHeader>

          {/* コンテンツ */}
          <div className="flex-1 space-y-6 overflow-y-auto p-6">
            {/* 検索 */}
            <div>
              <label
                htmlFor="mobile-search"
                className="text-muted-foreground mb-2 block text-sm font-bold"
              >
                {t('searchArticles')}
              </label>
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2 transform" />
                <Input
                  id="mobile-search"
                  type="text"
                  value={localFilters.searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="pr-12 pl-12"
                />
                {localFilters.searchQuery && (
                  <Button
                    variant="ghost"
                    icon
                    className="absolute top-1/2 right-1 size-8 -translate-y-1/2 transform"
                    onClick={() => handleSearchChange('')}
                    aria-label={t('clearSearch')}
                  >
                    <X className="size-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* ソート */}
            <div>
              <span
                id="mobile-sort-label"
                className="text-muted-foreground mb-4 block text-sm font-bold"
              >
                {t('sortBy')}
              </span>
              <div className="space-y-2" role="group" aria-labelledby="mobile-sort-label">
                {[
                  { value: 'date', label: t('date'), icon: Calendar },
                  { value: 'popularity', label: t('popularity'), icon: TrendingUp },
                  { value: 'category', label: t('category'), icon: Tag },
                ].map(({ value, label, icon: Icon }) => (
                  <Button
                    key={value}
                    onClick={() => handleSortChange(value as BlogFilterState['sortBy'])}
                    variant={localFilters.sortBy === value ? 'primary' : 'outline'}
                    className="w-full justify-start gap-4"
                  >
                    <Icon className="size-4" />
                    <span className="font-bold">{label}</span>
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
                  <span className="font-bold">{t('order')}</span>
                  <span className="text-sm">
                    {localFilters.sortOrder === 'asc' ? t('orderAsc') : t('orderDesc')}
                  </span>
                </Button>
              </div>
            </div>

            {/* タグフィルター */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <span id="mobile-tags-label" className="text-muted-foreground text-sm font-bold">
                  {t('filterByTags')}
                </span>
                {localFilters.selectedTags.length > 1 && (
                  <Button onClick={toggleTagOperator} variant="outline" size="sm">
                    {localFilters.tagOperator}
                  </Button>
                )}
              </div>

              <div
                className="grid grid-cols-2 gap-2"
                role="group"
                aria-labelledby="mobile-tags-label"
              >
                {tags.map((tag) => {
                  const isSelected = localFilters.selectedTags.includes(tag);
                  return (
                    <Button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      variant="outline"
                      className={cn(
                        'justify-center gap-2 border',
                        getTagFilterColor(tag, isSelected),
                      )}
                      size="sm"
                    >
                      <span>#</span>
                      <span className="truncate">{tag}</span>
                      {isSelected && <X className="size-3 flex-shrink-0" />}
                    </Button>
                  );
                })}
              </div>

              {localFilters.selectedTags.length > 1 && (
                <p className="text-muted-foreground mt-2 text-xs">
                  {t('showingPostsMessage', {
                    match:
                      localFilters.tagOperator === 'AND'
                        ? t('showingPostsAll')
                        : t('showingPostsAny'),
                  })}
                </p>
              )}
            </div>
          </div>

          {/* フッター */}
          <div className="flex-shrink-0 space-y-4 border-t p-6">
            <div className="flex gap-4">
              <Button onClick={clearAllFilters} variant="outline" className="flex-1">
                {t('clearAll')}
              </Button>
              <Button onClick={applyFilters} className="flex-1">
                {t('applyFilters')}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
