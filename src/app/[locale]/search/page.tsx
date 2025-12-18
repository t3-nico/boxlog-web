'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import { Heading, Text } from '@/components/ui/typography'
import { Highlight } from '@/lib/highlight'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

interface SearchResultItem {
  id: string
  title: string
  description: string
  url: string
  type: 'docs' | 'blog' | 'release'
  breadcrumbs: string[]
  lastModified: string
}

function SearchResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResultItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'docs' | 'blog' | 'release'>('all')

  useEffect(() => {
    const q = searchParams.get('q') || ''
    setQuery(q)

    if (q) {
      setIsLoading(true)
      // 実際の検索API呼び出し
      fetch(`/api/search?q=${encodeURIComponent(q)}`)
        .then((response) => response.json())
        .then((data) => {
          setResults(data.results || [])
          setIsLoading(false)
        })
        .catch((_error) => {
          setResults([])
          setIsLoading(false)
        })
    } else {
      setResults([])
    }
  }, [searchParams])

  const handleSearch = (newQuery: string) => {
    const trimmedQuery = newQuery.trim()
    if (trimmedQuery) {
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`)
    }
  }

  const filteredResults =
    selectedFilter === 'all' ? results : results.filter((result) => result.type === selectedFilter)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'docs':
        return (
          <svg className="h-4 w-4 text-[rgb(var(--info-color))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )
      case 'blog':
        return (
          <svg
            className="h-4 w-4 text-[rgb(var(--success-color))]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        )
      case 'release':
        return (
          <svg
            className="h-4 w-4 text-[rgb(var(--tag-accent-text))]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m3 6V8a1 1 0 00-1-1H5a1 1 0 00-1 1v2m14 0v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8m14 0H4"
            />
          </svg>
        )
      default:
        return null
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'docs':
        return 'bg-[rgb(var(--info-bg))] text-[rgb(var(--info-color))] border-[rgb(var(--info-color))]'
      case 'blog':
        return 'bg-[rgb(var(--success-bg))] text-[rgb(var(--success-color))] border-[rgb(var(--success-color))]'
      case 'release':
        return 'bg-[rgb(var(--tag-accent-bg))] text-[rgb(var(--tag-accent-text))] border-[rgb(var(--tag-accent-text))]'
      default:
        return 'bg-[rgb(var(--tag-neutral-bg))] text-[rgb(var(--tag-neutral-text))] border-[rgb(var(--border-primary))]'
    }
  }

  return (
    <Container className="py-8">
      <div className="mx-auto max-w-4xl">
        {/* 検索ヘッダー */}
        <div className="mb-8">
          <Heading as="h1" size="3xl" className="mb-6">
            Search Results
          </Heading>

          {/* 検索ボックス */}
          <div className="mb-6 flex items-center gap-4">
            <div className="relative flex-1">
              <svg
                className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-[rgb(var(--text-tertiary))]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <Input
                type="text"
                placeholder="Enter search keywords..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                className="border-[rgb(var(--border-primary))] py-3 pr-4 pl-10 text-base focus:border-[rgb(var(--focus-ring))] focus:ring-[rgb(var(--focus-ring))]"
              />
            </div>
            <Button onClick={() => handleSearch(query)} className="px-6 py-3">
              Search
            </Button>
          </div>

          {/* フィルター */}
          {query && (
            <div className="mb-6 flex items-center gap-4">
              <Text className="mr-2 text-sm text-[rgb(var(--text-secondary))]">フィルター:</Text>
              <div className="flex gap-2">
                {[
                  { key: 'all', label: 'すべて', count: results.length },
                  {
                    key: 'docs',
                    label: 'ドキュメント',
                    count: results.filter((r) => r.type === 'docs').length,
                  },
                  {
                    key: 'blog',
                    label: 'ブログ',
                    count: results.filter((r) => r.type === 'blog').length,
                  },
                  {
                    key: 'release',
                    label: 'リリース',
                    count: results.filter((r) => r.type === 'release').length,
                  },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedFilter(filter.key as typeof selectedFilter)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      selectedFilter === filter.key
                        ? 'border border-[rgb(var(--info-color))] bg-[rgb(var(--info-bg))] text-[rgb(var(--info-color))]'
                        : 'border border-transparent bg-[rgb(var(--tag-neutral-bg))] text-[rgb(var(--tag-neutral-text))] hover:bg-[rgb(var(--tag-neutral-hover))]'
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 検索結果表示エリア */}
        {query ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Text className="text-[rgb(var(--text-secondary))]">
                「<span className="font-medium">{query}</span>」の検索結果: {filteredResults.length}件
              </Text>
              {isLoading && (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-[rgb(var(--focus-ring))]"></div>
                  <Text className="text-sm text-[rgb(var(--text-tertiary))]">検索中...</Text>
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-lg border border-[rgb(var(--border-primary))] bg-[rgb(var(--bg-primary))] p-6"
                  >
                    <div className="mb-3 h-4 w-3/4 rounded bg-[rgb(var(--bg-secondary))]"></div>
                    <div className="mb-2 h-3 w-full rounded bg-[rgb(var(--bg-secondary))]"></div>
                    <div className="h-3 w-2/3 rounded bg-[rgb(var(--bg-secondary))]"></div>
                  </div>
                ))}
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="space-y-4">
                {filteredResults.map((result) => (
                  <div
                    key={result.id}
                    className="rounded-lg border border-[rgb(var(--border-primary))] bg-[rgb(var(--bg-primary))] p-6 transition-shadow hover:shadow-md"
                  >
                    <div className="mb-3 flex items-start gap-4">
                      {getTypeIcon(result.type)}
                      <div className="min-w-0 flex-1">
                        <Link
                          href={result.url}
                          className="block truncate text-lg font-medium text-[rgb(var(--link-color))] hover:text-[rgb(var(--link-hover))] hover:underline"
                        >
                          <Highlight text={result.title} query={query} />
                        </Link>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge variant="outline" className={`px-2 py-1 text-xs ${getTypeBadgeColor(result.type)}`}>
                            {result.type === 'docs' ? 'ドキュメント' : result.type === 'blog' ? 'ブログ' : 'リリース'}
                          </Badge>
                          <span className="text-xs text-[rgb(var(--text-tertiary))]">
                            {result.breadcrumbs.join(' › ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mb-3 line-clamp-2 text-sm text-[rgb(var(--text-secondary))]">
                      <Highlight text={result.description} query={query} />
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[rgb(var(--text-tertiary))]">最終更新: {result.lastModified}</span>
                      <Link
                        href={result.url}
                        className="text-xs font-medium text-[rgb(var(--link-color))] hover:text-[rgb(var(--link-hover))]"
                      >
                        詳細を見る →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <svg
                  className="mx-auto mb-4 h-16 w-16 text-[rgb(var(--text-tertiary))]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <Heading as="h3" size="lg" className="mb-2">
                  検索結果が見つかりませんでした
                </Heading>
                <Text variant="muted" className="mb-4">
                  別のキーワードで検索してみてください
                </Text>
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuery('')
                    router.push('/search')
                  }}
                >
                  検索をクリア
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-16 text-center">
            <svg
              className="mx-auto mb-4 h-16 w-16 text-[rgb(var(--text-tertiary))]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <Heading as="h3" size="lg" className="mb-2">
              検索を開始してください
            </Heading>
            <Text variant="muted" className="mb-6">
              ドキュメント、ブログ記事、リリースノートを横断検索できます。
            </Text>
            <div className="flex justify-center gap-2">
              <Badge variant="outline" className="px-3 py-1 text-sm">
                ドキュメント
              </Badge>
              <Badge variant="outline" className="px-3 py-1 text-sm">
                ブログ
              </Badge>
              <Badge variant="outline" className="px-3 py-1 text-sm">
                リリース
              </Badge>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[rgb(var(--bg-secondary))]">
      <Suspense
        fallback={
          <Container className="py-8">
            <div className="mx-auto max-w-4xl">
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[rgb(var(--focus-ring))]"></div>
              </div>
            </div>
          </Container>
        }
      >
        <SearchResults />
      </Suspense>
    </div>
  )
}
