'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Highlight } from '@/lib/highlight'
import { Clock, Edit, FileText, Package, Search, Tag, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  locale: string
}

// Mock data (in actual implementation, fetch from external source)
const RECENT_SEARCHES = ['API Authentication', 'Release v2.1.0', 'Next.js Guide']

const getQuickLinks = (locale: string) => [
  {
    title: 'Quick Start',
    description: 'Get started with YourSaaS in 5 minutes',
    href: `/${locale}/docs/quick-start`,
    type: 'docs',
  },
  {
    title: 'API Reference',
    description: 'Authentication and API usage',
    href: `/${locale}/docs/api-reference`,
    type: 'docs',
  },
  {
    title: 'Latest Release',
    description: 'New features in v2.1.0',
    href: `/${locale}/releases/v2.1.0`,
    type: 'release',
  },
  {
    title: 'SaaS Strategy',
    description: 'Business strategy for 2024',
    href: `/${locale}/blog/saas-strategy-2024`,
    type: 'blog',
  },
]

interface PopularTag {
  name: string
  count: number
  color: string
}

// タグの色を決める関数（neutral系のみ使用）
const getTagColor = (index: number): string => {
  const colors = ['neutral-100', 'neutral-200', 'neutral-300'] as const
  return colors[index % colors.length] ?? 'neutral-100'
}

export function SearchDialog({ open, onOpenChange, locale }: SearchDialogProps) {
  const t = useTranslations('search')
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  interface PreviewResult {
    url: string
    type: string
    title: string
    description: string
    breadcrumbs?: string[]
    category?: string
  }
  const [popularTags, setPopularTags] = useState<PopularTag[]>([])
  const [previewResults, setPreviewResults] = useState<PreviewResult[]>([])
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const QUICK_LINKS = getQuickLinks(locale)

  // 人気タグを取得
  useEffect(() => {
    const fetchPopularTags = async () => {
      try {
        const response = await fetch('/api/tags')
        if (!response.ok) {
          throw new Error('Failed to fetch tags')
        }
        const allTags = await response.json()
        const topTags = allTags.slice(0, 8).map((tag: { tag: string; count: number }, index: number) => ({
          name: tag.tag,
          count: tag.count,
          color: getTagColor(index),
        }))
        setPopularTags(topTags)
      } catch (error) {
        console.error('Failed to fetch tags:', error)
      }
    }

    fetchPopularTags()
  }, [])

  // 検索プレビューを取得
  useEffect(() => {
    if (query.length > 2) {
      const timeoutId = setTimeout(() => {
        fetch(`/api/search?q=${encodeURIComponent(query)}`)
          .then((response) => response.json())
          .then((data) => {
            setPreviewResults((data.results || []).slice(0, 3))
          })
          .catch((error) => {
            console.error('Failed to fetch search results:', error)
            setPreviewResults([])
          })
      }, 300) // 300ms debounce

      return () => clearTimeout(timeoutId)
    }
    setPreviewResults([])
    return
  }, [query])

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    } else {
      setQuery('')
      setSelectedIndex(0)
    }
  }, [open])

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return

    onOpenChange(false)
    router.push(`/${locale}/search?q=${encodeURIComponent(searchQuery)}`)
  }

  const handleTagClick = (tagName: string) => {
    onOpenChange(false)
    router.push(`/${locale}/tags/${encodeURIComponent(tagName.toLowerCase())}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onOpenChange(false)
      return
    }

    if (e.key === 'Enter') {
      if (query.trim()) {
        handleSearch(query)
      } else if (QUICK_LINKS[selectedIndex]) {
        onOpenChange(false)
        router.push(QUICK_LINKS[selectedIndex].href)
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, QUICK_LINKS.length - 1))
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'docs':
        return <FileText className="h-4 w-4 text-blue-500" />
      case 'blog':
        return <Edit className="h-4 w-4 text-green-500" />
      case 'release':
        return <Package className="h-4 w-4 text-purple-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const getTagColorClass = (color: string) => {
    const colorMap = {
      'neutral-100':
        'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700',
      'neutral-200':
        'bg-neutral-200 text-neutral-800 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600',
      'neutral-300':
        'bg-neutral-300 text-neutral-800 hover:bg-neutral-400 dark:bg-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-500',
    }
    return (
      colorMap[color as keyof typeof colorMap] ||
      'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700'
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl gap-0 overflow-hidden border-0 bg-white p-0 shadow-2xl dark:border dark:border-gray-700 dark:bg-gray-900 [&>button]:hidden">
        {/* 検索ヘッダー */}
        <div className="flex items-center gap-4 border-b border-gray-100 p-4 dark:border-gray-700">
          <Search className="h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-500" />
          <Input
            ref={inputRef}
            placeholder={t('placeholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border-0 bg-transparent text-base text-gray-900 shadow-none placeholder:text-gray-400 focus:outline-none focus-visible:ring-0 dark:text-gray-100 dark:placeholder:text-gray-500"
          />
          <Button onClick={() => onOpenChange(false)} variant="ghost" size="icon" className="h-5 w-5 flex-shrink-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* 検索内容 */}
        <div className="max-h-96 overflow-y-auto">
          {!query ? (
            <div className="space-y-6 p-4">
              {/* 最近の検索 */}
              {RECENT_SEARCHES.length > 0 && (
                <div>
                  <h3 className="mb-3 text-xs font-semibold tracking-wide text-gray-400 uppercase dark:text-gray-500">
                    {t('recentSearches')}
                  </h3>
                  <div className="space-y-1">
                    {RECENT_SEARCHES.map((search, index) => (
                      <Button
                        key={index}
                        onClick={() => setQuery(search)}
                        variant="ghost"
                        className="flex h-auto w-full items-center justify-start gap-4 p-2"
                      >
                        <Clock className="text-muted-foreground h-4 w-4" />
                        <span className="text-sm">{search}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* 人気タグ */}
              <div>
                <h3 className="mb-3 text-xs font-semibold tracking-wide text-gray-400 uppercase dark:text-gray-500">
                  {t('popularTags')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <Button
                      key={index}
                      onClick={() => handleTagClick(tag.name)}
                      variant="ghost"
                      size="sm"
                      className={`inline-flex items-center gap-2 rounded-full ${getTagColorClass(tag.color)}`}
                    >
                      <Tag className="h-3 w-3" />
                      <span>{tag.name}</span>
                      <span className="text-xs opacity-75">({tag.count})</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* クイックリンク */}
              <div>
                <h3 className="mb-3 text-xs font-semibold tracking-wide text-gray-400 uppercase dark:text-gray-500">
                  {t('popularPages')}
                </h3>
                <div className="space-y-1">
                  {QUICK_LINKS.map((link, index) => (
                    <Button
                      key={index}
                      onClick={() => {
                        onOpenChange(false)
                        router.push(link.href)
                      }}
                      variant="ghost"
                      className={`flex h-auto w-full items-start justify-start gap-4 p-4 ${
                        selectedIndex === index
                          ? 'border border-blue-200 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/30'
                          : ''
                      }`}
                    >
                      <div className="mt-0.5">{getTypeIcon(link.type)}</div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                          {link.title}
                        </div>
                        <div className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{link.description}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className="px-2 py-1 text-xs">
                          {link.type === 'docs' ? t('docs') : link.type === 'blog' ? t('blog') : t('release')}
                        </Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('searchResultsFor')} &ldquo;
                  <span className="font-medium">{query}</span>&rdquo;
                </p>
                <Badge variant="outline" className="text-xs">
                  {t('pressEnterToSearch')}
                </Badge>
              </div>

              {/* 全文検索 */}
              <Button
                onClick={() => handleSearch(query)}
                variant="ghost"
                className="flex h-auto w-full items-center justify-start gap-4 border border-blue-200 bg-blue-50 p-4 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-900/30 dark:hover:bg-blue-900/40"
              >
                <Search className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <div className="text-left">
                  <div className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    {t('searchFor')} &ldquo;
                    <Highlight text={query} query={query} />
                    &rdquo;
                  </div>
                  <div className="text-xs text-blue-700 dark:text-blue-300">{t('findResultsAcross')}</div>
                </div>
              </Button>

              {/* プレビュー検索結果 */}
              {previewResults.length > 0 && (
                <div>
                  <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">{t('previewResults')}</p>
                  <div className="space-y-2">
                    {previewResults.map((result, index) => (
                      <Button
                        key={index}
                        onClick={() => {
                          onOpenChange(false)
                          router.push(result.url)
                        }}
                        variant="ghost"
                        className="flex h-auto w-full items-start justify-start gap-4 border border-gray-100 p-4 dark:border-gray-700"
                      >
                        <div className="mt-0.5">{getTypeIcon(result.type)}</div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <span className="text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
                              {result.breadcrumbs?.[0] ||
                                (result.type === 'docs'
                                  ? t('docs')
                                  : result.type === 'blog'
                                    ? t('blog')
                                    : result.type === 'tags'
                                      ? t('tags')
                                      : t('release'))}
                            </span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {result.breadcrumbs?.[1] || result.category || 'General'}
                            </span>
                          </div>
                          <div className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                            <Highlight text={result.title} query={query} />
                          </div>
                          <div className="mt-0.5 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                            <Highlight text={result.description} query={query} />
                          </div>
                        </div>
                        <Badge variant="outline" className="self-start px-2 py-1 text-xs">
                          {result.type === 'docs'
                            ? t('docs')
                            : result.type === 'blog'
                              ? t('blog')
                              : result.type === 'tags'
                                ? t('tags')
                                : t('release')}
                        </Badge>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* タグ検索候補 */}
              {(() => {
                const matchedTags = popularTags.filter((tag) => tag.name.toLowerCase().includes(query.toLowerCase()))

                if (matchedTags.length > 0) {
                  return (
                    <div>
                      <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">{t('relatedTags')}</p>
                      <div className="space-y-1">
                        {matchedTags.map((tag, index) => (
                          <Button
                            key={index}
                            onClick={() => handleTagClick(tag.name)}
                            variant="ghost"
                            className="flex h-auto w-full items-center justify-start gap-4 p-2"
                          >
                            <div className="mt-0.5">
                              <Tag className="text-muted-foreground h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="mb-1 flex items-center gap-2">
                                <span className="text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
                                  {t('tags')}
                                </span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {tag.count} {t('articles')}
                                </span>
                              </div>
                              <div className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                                <Highlight text={tag.name} query={query} />
                              </div>
                            </div>
                            <Badge variant="outline" className="self-start px-2 py-1 text-xs">
                              {t('tags')}
                            </Badge>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )
                }
                return null
              })()}
            </div>
          )}
        </div>

        {/* フッター */}
        <div className="border-t bg-gray-50/50 p-4 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <kbd className="rounded border border-gray-200 bg-white px-2 py-1 font-mono text-xs dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  Enter
                </kbd>
                <span>{t('toSelect')}</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="rounded border border-gray-200 bg-white px-2 py-1 font-mono text-xs dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  ↑↓
                </kbd>
                <span>{t('toNavigate')}</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="rounded border border-gray-200 bg-white px-2 py-1 font-mono text-xs dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  Esc
                </kbd>
                <span>{t('toClose')}</span>
              </div>
            </div>
            <span className="text-gray-400 dark:text-gray-500">{t('poweredBy')}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
