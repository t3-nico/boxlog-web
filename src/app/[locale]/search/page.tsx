'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Highlight } from '@/utils/highlight'

// Mock data - replace with actual search API in real implementation
const MOCK_RESULTS = [
  {
    id: '1',
    title: 'Authentication API - YourSaaS Docs',
    description:
      'Complete guide to YourSaaS authentication system. Learn how to implement secure user authentication, session management, and access control.',
    url: '/docs/api-reference/authentication',
    type: 'docs',
    breadcrumbs: ['Documentation', 'API Reference', 'Authentication'],
    lastModified: '2024-01-25',
  },
  {
    id: '2',
    title: '5-Minute Quickstart Guide',
    description:
      'Build your first YourSaaS application in just 5 minutes. This quickstart guide will have you creating users, handling authentication, and making API calls.',
    url: '/docs/guides/quick-start',
    type: 'docs',
    breadcrumbs: ['Documentation', 'Guides', 'Quick Start'],
    lastModified: '2024-01-28',
  },
  {
    id: '3',
    title: 'Complete Guide to Building SaaS Applications with Next.js 14',
    description:
      'Next.js 14 provides many innovative features for SaaS application development. Learn how to build production-ready SaaS applications.',
    url: '/blog/nextjs-saas-guide',
    type: 'blog',
    breadcrumbs: ['Blog', 'Tutorial'],
    lastModified: '2024-01-20',
  },
  {
    id: '4',
    title: 'Release v2.1.0 - Enhanced Security Features',
    description:
      'New security enhancements including MFA support, advanced audit logging, and improved API rate limiting.',
    url: '/releases/v2.1.0',
    type: 'release',
    breadcrumbs: ['Releases', 'v2.1.0'],
    lastModified: '2024-01-15',
  },
]

function SearchResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<typeof MOCK_RESULTS>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<
    'all' | 'docs' | 'blog' | 'release'
  >('all')

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
        .catch((error) => {
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
    selectedFilter === 'all'
      ? results
      : results.filter((result) => result.type === selectedFilter)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'docs':
        return (
          <svg
            className="h-4 w-4 text-[rgb(var(--info-color))]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
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
      <div className="max-w-4xl mx-auto">
        {/* 検索ヘッダー */}
        <div className="mb-8">
          <Heading as="h1" size="3xl" className="mb-6">
            Search Results
          </Heading>

          {/* 検索ボックス */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[rgb(var(--text-tertiary))]"
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
                className="pl-10 pr-4 py-3 text-base border-[rgb(var(--border-primary))] focus:border-[rgb(var(--focus-ring))] focus:ring-[rgb(var(--focus-ring))]"
              />
            </div>
            <Button onClick={() => handleSearch(query)} className="px-6 py-3">
              Search
            </Button>
          </div>

          {/* フィルター */}
          {query && (
            <div className="flex items-center gap-4 mb-6">
              <Text className="text-sm text-[rgb(var(--text-secondary))] mr-2">
                フィルター:
              </Text>
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
                    onClick={() => setSelectedFilter(filter.key as any)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedFilter === filter.key
                        ? 'bg-[rgb(var(--info-bg))] text-[rgb(var(--info-color))] border border-[rgb(var(--info-color))]'
                        : 'bg-[rgb(var(--tag-neutral-bg))] text-[rgb(var(--tag-neutral-text))] hover:bg-[rgb(var(--tag-neutral-hover))] border border-transparent'
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
                「<span className="font-medium">{query}</span>」の検索結果:{' '}
                {filteredResults.length}件
              </Text>
              {isLoading && (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[rgb(var(--focus-ring))]"></div>
                  <Text className="text-sm text-[rgb(var(--text-tertiary))]">
                    検索中...
                  </Text>
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="border border-[rgb(var(--border-primary))] rounded-lg p-6 bg-[rgb(var(--bg-primary))] animate-pulse"
                  >
                    <div className="h-4 bg-[rgb(var(--bg-secondary))] rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-[rgb(var(--bg-secondary))] rounded w-full mb-2"></div>
                    <div className="h-3 bg-[rgb(var(--bg-secondary))] rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="space-y-4">
                {filteredResults.map((result) => (
                  <div
                    key={result.id}
                    className="border border-[rgb(var(--border-primary))] rounded-lg p-6 bg-[rgb(var(--bg-primary))] hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4 mb-3">
                      {getTypeIcon(result.type)}
                      <div className="flex-1 min-w-0">
                        <a
                          href={result.url}
                          className="text-lg font-medium text-[rgb(var(--link-color))] hover:text-[rgb(var(--link-hover))] hover:underline block truncate"
                        >
                          <Highlight text={result.title} query={query} />
                        </a>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className={`text-xs px-2 py-1 ${getTypeBadgeColor(result.type)}`}
                          >
                            {result.type === 'docs'
                              ? 'ドキュメント'
                              : result.type === 'blog'
                                ? 'ブログ'
                                : 'リリース'}
                          </Badge>
                          <span className="text-xs text-[rgb(var(--text-tertiary))]">
                            {result.breadcrumbs.join(' › ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[rgb(var(--text-secondary))] text-sm mb-3 line-clamp-2">
                      <Highlight text={result.description} query={query} />
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[rgb(var(--text-tertiary))]">
                        最終更新: {result.lastModified}
                      </span>
                      <a
                        href={result.url}
                        className="text-xs text-[rgb(var(--link-color))] hover:text-[rgb(var(--link-hover))] font-medium"
                      >
                        詳細を見る →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg
                  className="h-16 w-16 text-[rgb(var(--text-tertiary))] mx-auto mb-4"
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
          <div className="text-center py-16">
            <svg
              className="h-16 w-16 text-[rgb(var(--text-tertiary))] mx-auto mb-4"
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
              <Badge variant="outline" className="text-sm px-3 py-1">
                ドキュメント
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1">
                ブログ
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1">
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
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(var(--focus-ring))]"></div>
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
