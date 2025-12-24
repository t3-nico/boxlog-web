'use client'

import { Button } from '@/components/ui/button'
import { PillSwitcher } from '@/components/ui/pill-switcher'
import { Heading, Text } from '@/components/ui/typography'
import { Link } from '@/i18n/navigation'
import { getTagColor } from '@/lib/tags-client'
import { cn } from '@/lib/utils'
import { BookOpen, FileText, Grid3X3, Hash, List, Megaphone, Search, TrendingUp, X } from 'lucide-react'
import { useState } from 'react'

type ViewMode = 'list' | 'grid'
type CategoryFilter = 'all' | 'blog' | 'releases' | 'docs'

interface TagData {
  tag: string
  count: number
  blogCount: number
  releaseCount: number
  docsCount: number
}

interface FilteredTagsClientProps {
  allTags: TagData[]
  locale: string
}

export function FilteredTagsClient({ allTags, locale }: FilteredTagsClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')

  const isJa = locale === 'ja'

  // フィルタリング処理
  const filteredTags = allTags.filter((tag) => {
    // 検索クエリによるフィルタリング
    if (searchQuery && !tag.tag.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // カテゴリフィルター
    if (categoryFilter === 'blog' && tag.blogCount === 0) return false
    if (categoryFilter === 'releases' && tag.releaseCount === 0) return false
    if (categoryFilter === 'docs' && tag.docsCount === 0) return false

    return true
  })

  const popularTags = allTags.slice(0, 10)

  const categoryOptions: { value: CategoryFilter; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: isJa ? 'すべて' : 'All', icon: null },
    { value: 'blog', label: isJa ? 'ブログ' : 'Blog', icon: <FileText className="h-3 w-3" /> },
    { value: 'releases', label: isJa ? 'リリース' : 'Releases', icon: <Megaphone className="h-3 w-3" /> },
    { value: 'docs', label: isJa ? 'ドキュメント' : 'Docs', icon: <BookOpen className="h-3 w-3" /> },
  ]

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
      {/* 左サイドバー */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-8">
          {/* カテゴリフィルター */}
          <div className="border-border bg-card rounded-xl border p-6">
            <h3 className="text-foreground mb-4 text-sm font-semibold">{isJa ? 'カテゴリ' : 'Category'}</h3>
            <div className="space-y-2">
              {categoryOptions.map((option) => (
                <Button
                  key={option.value}
                  onClick={() => setCategoryFilter(option.value)}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'w-full justify-start gap-2',
                    categoryFilter === option.value && 'bg-muted text-foreground'
                  )}
                >
                  {option.icon}
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* 人気のタグ */}
          <div className="border-border bg-card rounded-xl border p-6">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="text-muted-foreground h-4 w-4" />
              <h3 className="text-foreground text-sm font-semibold">{isJa ? '人気のタグ' : 'Popular Tags'}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Link
                  key={tag.tag}
                  href={`/tags/${encodeURIComponent(tag.tag)}`}
                  className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium transition-colors ${getTagColor(tag.tag)}`}
                >
                  #{tag.tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 右側: タグ一覧 */}
      <div className="lg:col-span-3">
        {/* 検索ボックス + ビュー切り替え */}
        <div className="mb-8 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isJa ? 'タグを検索...' : 'Search tags...'}
              className="border-border bg-input text-foreground placeholder:text-muted-foreground focus:ring-ring h-10 w-full rounded-lg border pr-10 pl-10 transition-colors focus:ring-2 focus:outline-none"
            />
            {searchQuery && (
              <Button
                onClick={() => setSearchQuery('')}
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-2 h-7 w-7 -translate-y-1/2"
                aria-label={isJa ? '検索をクリア' : 'Clear search'}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <PillSwitcher
            options={[
              { value: 'grid', label: isJa ? 'グリッド' : 'Grid', icon: <Grid3X3 className="h-4 w-4" /> },
              { value: 'list', label: isJa ? 'リスト' : 'List', icon: <List className="h-4 w-4" /> },
            ]}
            value={viewMode}
            onValueChange={setViewMode}
          />
        </div>

        {/* 結果件数 */}
        <div className="text-muted-foreground mb-6 text-sm">
          {filteredTags.length} {isJa ? '件のタグ' : filteredTags.length === 1 ? 'tag' : 'tags'}
          {categoryFilter !== 'all' && (
            <span className="ml-2">
              (
              {categoryFilter === 'blog'
                ? isJa
                  ? 'ブログ'
                  : 'Blog'
                : categoryFilter === 'releases'
                  ? isJa
                    ? 'リリース'
                    : 'Releases'
                  : isJa
                    ? 'ドキュメント'
                    : 'Docs'}
              )
            </span>
          )}
        </div>

        {filteredTags.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTags.map((tag) => (
                <Link
                  key={tag.tag}
                  href={`/tags/${encodeURIComponent(tag.tag)}`}
                  className={`group flex items-center justify-between rounded-lg border px-4 py-3 transition-all ${getTagColor(tag.tag)}`}
                >
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    <span className="font-medium">{tag.tag}</span>
                  </div>
                  <span className="text-sm opacity-75">{tag.count}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="divide-border divide-y">
              {filteredTags.map((tag) => (
                <Link
                  key={tag.tag}
                  href={`/tags/${encodeURIComponent(tag.tag)}`}
                  className="group flex items-center justify-between py-4 transition-colors hover:opacity-80"
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${getTagColor(tag.tag)}`}>
                      <Hash className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-foreground font-medium">#{tag.tag}</div>
                      <div className="text-muted-foreground flex items-center gap-3 text-sm">
                        {tag.blogCount > 0 && (
                          <span className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {tag.blogCount}
                          </span>
                        )}
                        {tag.releaseCount > 0 && (
                          <span className="flex items-center gap-1">
                            <Megaphone className="h-3 w-3" />
                            {tag.releaseCount}
                          </span>
                        )}
                        {tag.docsCount > 0 && (
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {tag.docsCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted text-foreground flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold">
                    {tag.count}
                  </div>
                </Link>
              ))}
            </div>
          )
        ) : (
          <div className="py-16 text-center">
            <div className="bg-muted mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full">
              <Search className="text-muted-foreground h-12 w-12" />
            </div>
            <Heading as="h3" size="lg" className="mb-2">
              {isJa ? 'タグが見つかりません' : 'No tags found'}
            </Heading>
            <Text variant="muted" className="mb-4">
              {isJa ? '検索条件を変更してみてください' : 'Try adjusting your search or filters'}
            </Text>
            <button
              onClick={() => {
                setSearchQuery('')
                setCategoryFilter('all')
              }}
              className="bg-primary/10 text-primary hover:bg-state-hover inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              {isJa ? 'フィルターをクリア' : 'Clear filters'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
