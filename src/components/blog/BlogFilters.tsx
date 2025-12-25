'use client';

import { Button } from '@/components/ui/button';
import { getTagFilterColor } from '@/lib/tags-client';
import { cn } from '@/lib/utils';
import { Calendar, Filter, Tag, TrendingUp, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { MobileFilters } from './MobileFilters';

interface BlogFiltersProps {
  tags: string[];
  className?: string;
  onFiltersChange?: (filters: BlogFilterState) => void;
  locale: string;
}

export interface BlogFilterState {
  selectedTags: string[];
  searchQuery: string;
  sortBy: 'date' | 'popularity' | 'category';
  sortOrder: 'asc' | 'desc';
  tagOperator: 'AND' | 'OR';
}

const defaultFilters: BlogFilterState = {
  selectedTags: [],
  searchQuery: '',
  sortBy: 'date',
  sortOrder: 'desc',
  tagOperator: 'OR',
};

export function BlogFilters({ tags, className, onFiltersChange, locale }: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(true); // 常に開いた状態に変更
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [filters, setFilters] = useState<BlogFilterState>(defaultFilters);
  const t = useTranslations('blog.filters');

  // URLパラメータから初期状態を復元
  useEffect(() => {
    const tagsParam = searchParams.get('tags');
    const searchParam = searchParams.get('search');
    const sortParam = searchParams.get('sort');
    const orderParam = searchParams.get('order');
    const operatorParam = searchParams.get('operator');

    const initialFilters: BlogFilterState = {
      selectedTags: tagsParam ? tagsParam.split(',') : [],
      searchQuery: searchParam || '',
      sortBy: (sortParam as BlogFilterState['sortBy']) || 'date',
      sortOrder: (orderParam as BlogFilterState['sortOrder']) || 'desc',
      tagOperator: (operatorParam as BlogFilterState['tagOperator']) || 'OR',
    };

    setFilters(initialFilters);
    // 常に開いた状態を維持（URLパラメータに関係なく）
    setIsExpanded(true);
  }, [searchParams]);

  // フィルター状態をURLに反映
  const updateURL = useCallback(
    (newFilters: BlogFilterState) => {
      const params = new URLSearchParams();

      if (newFilters.selectedTags.length > 0) {
        params.set('tags', newFilters.selectedTags.join(','));
      }
      if (newFilters.searchQuery) {
        params.set('search', newFilters.searchQuery);
      }
      if (newFilters.sortBy !== 'date') {
        params.set('sort', newFilters.sortBy);
      }
      if (newFilters.sortOrder !== 'desc') {
        params.set('order', newFilters.sortOrder);
      }
      if (newFilters.tagOperator !== 'OR') {
        params.set('operator', newFilters.tagOperator);
      }

      const paramString = params.toString();
      const newUrl = paramString ? `/blog?${paramString}` : '/blog';
      router.push(newUrl, { scroll: false });
    },
    [router],
  );

  // フィルター状態の更新
  const updateFilters = useCallback(
    (newFilters: BlogFilterState) => {
      setFilters(newFilters);
      updateURL(newFilters);
      onFiltersChange?.(newFilters);
    },
    [updateURL, onFiltersChange],
  );

  // タグの選択/選択解除
  const toggleTag = (tag: string) => {
    const newSelectedTags = filters.selectedTags.includes(tag)
      ? filters.selectedTags.filter((t) => t !== tag)
      : [...filters.selectedTags, tag];

    updateFilters({ ...filters, selectedTags: newSelectedTags });
  };

  // ソート設定の更新
  const handleSortChange = (sortBy: BlogFilterState['sortBy']) => {
    updateFilters({ ...filters, sortBy });
  };

  // ソート順の切り替え
  const toggleSortOrder = () => {
    const newOrder = filters.sortOrder === 'asc' ? 'desc' : 'asc';
    updateFilters({ ...filters, sortOrder: newOrder });
  };

  // タグ演算子の切り替え
  const toggleTagOperator = () => {
    const newOperator = filters.tagOperator === 'AND' ? 'OR' : 'AND';
    updateFilters({ ...filters, tagOperator: newOperator });
  };

  // フィルターをクリア
  const clearFilters = () => {
    updateFilters(defaultFilters);
    setIsExpanded(false);
  };

  // アクティブなフィルターの数
  const activeFiltersCount = filters.selectedTags.length + (filters.searchQuery ? 1 : 0);

  return (
    <>
      {/* デスクトップ版 */}
      <div
        className={cn('border-border bg-background hidden rounded-xl border lg:block', className)}
      >
        {/* フィルターヘッダー */}
        <div className="border-border border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="text-muted-foreground h-5 w-5" />
              <h3 className="text-foreground font-medium">{t('title')}</h3>
              {activeFiltersCount > 0 && (
                <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
                  {activeFiltersCount}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <Button
                  onClick={clearFilters}
                  variant="ghost"
                  size="sm"
                  className="h-auto p-1 text-xs"
                >
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
            {/* ソート */}
            <div>
              <span
                id="desktop-sort-label"
                className="text-muted-foreground mb-3 block text-sm font-medium"
              >
                {t('sortBy')}
              </span>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-labelledby="desktop-sort-label"
              >
                {[
                  { value: 'date', label: t('date'), icon: Calendar },
                  { value: 'popularity', label: t('popularity'), icon: TrendingUp },
                  { value: 'category', label: t('category'), icon: Tag },
                ].map(({ value, label, icon: Icon }) => (
                  <Button
                    key={value}
                    onClick={() => handleSortChange(value as BlogFilterState['sortBy'])}
                    variant={filters.sortBy === value ? 'primary' : 'outline'}
                    size="sm"
                    className={cn(
                      'inline-flex items-center gap-2',
                      filters.sortBy === value && 'bg-primary/10 text-primary border-primary',
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
                >
                  {filters.sortOrder === 'asc' ? '↑' : '↓'}
                  {filters.sortOrder === 'asc' ? t('orderAsc') : t('orderDesc')}
                </Button>
              </div>
            </div>

            {/* タグフィルター */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span id="desktop-tags-label" className="text-muted-foreground text-sm font-medium">
                  {t('filterByTags')}
                </span>
                {filters.selectedTags.length > 1 && (
                  <Button
                    onClick={toggleTagOperator}
                    variant="ghost"
                    size="sm"
                    className="bg-muted text-muted-foreground hover:bg-state-hover h-auto px-2 py-1 text-xs"
                  >
                    {filters.tagOperator}
                  </Button>
                )}
              </div>

              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-labelledby="desktop-tags-label"
              >
                {tags.map((tag) => {
                  const isSelected = filters.selectedTags.includes(tag);
                  return (
                    <Button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      variant="outline"
                      size="sm"
                      className={cn(
                        'inline-flex items-center gap-2 border',
                        getTagFilterColor(tag, isSelected),
                      )}
                    >
                      <span>#</span>
                      {tag}
                      {isSelected && <X className="h-3 w-3" />}
                    </Button>
                  );
                })}
              </div>

              {filters.selectedTags.length > 1 && (
                <p className="text-muted-foreground mt-2 text-xs">
                  {t('showingPostsMessage', {
                    match:
                      filters.tagOperator === 'AND' ? t('showingPostsAll') : t('showingPostsAny'),
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
          <Filter className="text-muted-foreground h-4 w-4" />
          <span className="text-foreground font-medium">{t('title')}</span>
          {activeFiltersCount > 0 && (
            <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
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
  );
}
