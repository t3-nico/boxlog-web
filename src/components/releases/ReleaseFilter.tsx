'use client';

import { Button } from '@/components/ui/button';
import { getTagFilterColor } from '@/lib/tags-client';
import { cn } from '@/lib/utils';
import { Filter, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

// Local type definition
interface TagCount {
  tag: string;
  count: number;
}

interface ReleaseFilterProps {
  tags: TagCount[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
}

export function ReleaseFilter({
  tags,
  selectedTags,
  onTagToggle,
  onClearFilters,
}: ReleaseFilterProps) {
  const t = useTranslations('releases.filters');
  const [isExpanded] = useState(true);

  const hasActiveFilters = selectedTags.length > 0;
  const activeFiltersCount = selectedTags.length;

  return (
    <>
      {/* デスクトップ版 */}
      <div className={cn('border-border bg-background hidden rounded-xl border lg:block')}>
        {/* フィルターヘッダー */}
        <div className="border-border border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="text-muted-foreground size-5" />
              <h3 className="text-foreground font-medium">{t('title')}</h3>
              {activeFiltersCount > 0 && (
                <span className="bg-muted text-primary border-primary rounded-full border px-2 py-1 text-xs font-medium">
                  {activeFiltersCount}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <Button
                  onClick={onClearFilters}
                  variant="ghost"
                  size="sm"
                  className="h-auto p-1 text-xs"
                >
                  {t('clearAll')}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* フィルター内容 */}
        {isExpanded && (
          <div className="space-y-6 p-4">
            {/* タグフィルター */}
            {tags.length > 0 && (
              <div>
                <span
                  id="release-tags-label"
                  className="text-muted-foreground mb-3 block text-sm font-medium"
                >
                  {t('tags')}
                </span>
                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-labelledby="release-tags-label"
                >
                  {tags.map((tagItem) => {
                    const isSelected = selectedTags.includes(tagItem.tag);
                    return (
                      <Button
                        key={tagItem.tag}
                        onClick={() => onTagToggle(tagItem.tag)}
                        variant="outline"
                        size="sm"
                        className={cn(
                          'inline-flex items-center gap-2 border',
                          getTagFilterColor(tagItem.tag, isSelected),
                        )}
                      >
                        <span>#</span>
                        {tagItem.tag}
                        <span className={cn('text-xs', isSelected ? 'text-white' : 'opacity-60')}>
                          ({tagItem.count})
                        </span>
                        {isSelected && <X className="size-3" />}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* モバイル版フィルターボタン */}
      <div className="lg:hidden">
        <Button variant="outline" className="flex w-full items-center justify-center gap-2">
          <Filter className="text-muted-foreground size-4" />
          <span className="text-foreground font-medium">{t('title')}</span>
          {activeFiltersCount > 0 && (
            <span className="bg-muted text-primary border-primary rounded-full border px-2 py-1 text-xs font-medium">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>
    </>
  );
}
