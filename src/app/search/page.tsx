'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Container, Heading, Text, Input, Button, Badge } from '@/components/ui'

// モックデータ - 実際の実装では検索APIから取得
const MOCK_RESULTS = [
  {
    id: '1',
    title: 'Authentication API - YourSaaS Docs',
    description: 'Complete guide to YourSaaS authentication system. Learn how to implement secure user authentication, session management, and access control.',
    url: '/docs/api-reference/authentication',
    type: 'docs',
    breadcrumbs: ['ドキュメント', 'API リファレンス', '認証'],
    lastModified: '2024-01-25'
  },
  {
    id: '2',
    title: '5-Minute Quickstart Guide',
    description: 'Build your first YourSaaS application in just 5 minutes. This quickstart guide will have you creating users, handling authentication, and making API calls.',
    url: '/docs/guides/quick-start',
    type: 'docs',
    breadcrumbs: ['ドキュメント', 'ガイド', 'クイックスタート'],
    lastModified: '2024-01-28'
  },
  {
    id: '3',
    title: 'Next.js 14でSaaSアプリケーションを構築する完全ガイド',
    description: 'Next.js 14は、SaaSアプリケーション開発において革新的な機能を多数提供しています。実際のプロダクション環境で使用できるSaaSアプリケーションを構築する方法を解説。',
    url: '/blog/nextjs-saas-guide',
    type: 'blog',
    breadcrumbs: ['ブログ', 'チュートリアル'],
    lastModified: '2024-01-20'
  },
  {
    id: '4',
    title: 'Release v2.1.0 - Enhanced Security Features',
    description: 'New security enhancements including MFA support, advanced audit logging, and improved API rate limiting.',
    url: '/releases/v2.1.0',
    type: 'release',
    breadcrumbs: ['リリース', 'v2.1.0'],
    lastModified: '2024-01-15'
  }
]

function SearchResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<typeof MOCK_RESULTS>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'docs' | 'blog' | 'release'>('all')

  useEffect(() => {
    const q = searchParams.get('q') || ''
    setQuery(q)
    
    if (q) {
      setIsLoading(true)
      // モック検索 - 実際の実装では API 呼び出し
      setTimeout(() => {
        const filtered = MOCK_RESULTS.filter(result => 
          result.title.toLowerCase().includes(q.toLowerCase()) ||
          result.description.toLowerCase().includes(q.toLowerCase())
        )
        setResults(filtered)
        setIsLoading(false)
      }, 500)
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

  const filteredResults = selectedFilter === 'all' 
    ? results 
    : results.filter(result => result.type === selectedFilter)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'docs':
        return (
          <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      case 'blog':
        return (
          <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        )
      case 'release':
        return (
          <svg className="h-4 w-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m3 6V8a1 1 0 00-1-1H5a1 1 0 00-1 1v2m14 0v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8m14 0H4" />
          </svg>
        )
      default:
        return null
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'docs': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'blog': return 'bg-green-50 text-green-700 border-green-200'
      case 'release': return 'bg-purple-50 text-purple-700 border-purple-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  return (
    <Container className="py-8">
      <div className="max-w-4xl mx-auto">
        {/* 検索ヘッダー */}
        <div className="mb-8">
          <Heading as="h1" size="3xl" className="mb-6">
            検索結果
          </Heading>
          
          {/* 検索ボックス */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <Input
                type="text"
                placeholder="検索キーワードを入力..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                className="pl-10 pr-4 py-3 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Button 
              onClick={() => handleSearch(query)}
              className="px-6 py-3"
            >
              検索
            </Button>
          </div>

          {/* フィルター */}
          {query && (
            <div className="flex items-center gap-3 mb-6">
              <Text className="text-sm text-gray-600 mr-2">フィルター:</Text>
              <div className="flex gap-2">
                {[
                  { key: 'all', label: 'すべて', count: results.length },
                  { key: 'docs', label: 'ドキュメント', count: results.filter(r => r.type === 'docs').length },
                  { key: 'blog', label: 'ブログ', count: results.filter(r => r.type === 'blog').length },
                  { key: 'release', label: 'リリース', count: results.filter(r => r.type === 'release').length }
                ].map(filter => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedFilter(filter.key as any)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedFilter === filter.key
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent'
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
              <Text className="text-gray-600">
                「<span className="font-medium">{query}</span>」の検索結果: {filteredResults.length}件
              </Text>
              {isLoading && (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <Text className="text-sm text-gray-500">検索中...</Text>
                </div>
              )}
            </div>
            
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="border rounded-lg p-6 bg-white animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="space-y-4">
                {filteredResults.map((result) => (
                  <div key={result.id} className="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3 mb-3">
                      {getTypeIcon(result.type)}
                      <div className="flex-1 min-w-0">
                        <a 
                          href={result.url}
                          className="text-lg font-medium text-blue-600 hover:text-blue-800 hover:underline block truncate"
                        >
                          {result.title}
                        </a>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant="outline" 
                            className={`text-xs px-2 py-0.5 ${getTypeBadgeColor(result.type)}`}
                          >
                            {result.type === 'docs' ? 'ドキュメント' : 
                             result.type === 'blog' ? 'ブログ' : 'リリース'}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {result.breadcrumbs.join(' › ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {result.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        最終更新: {result.lastModified}
                      </span>
                      <a 
                        href={result.url}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        詳細を見る →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
            <svg className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Heading as="h3" size="lg" className="mb-2">
              検索を開始してください
            </Heading>
            <Text variant="muted" className="mb-6">
              ドキュメント、ブログ記事、リリースノートを横断検索できます。
            </Text>
            <div className="flex justify-center gap-2">
              <Badge variant="outline" className="text-sm px-3 py-1">ドキュメント</Badge>
              <Badge variant="outline" className="text-sm px-3 py-1">ブログ</Badge>
              <Badge variant="outline" className="text-sm px-3 py-1">リリース</Badge>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={
        <Container className="py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </Container>
      }>
        <SearchResults />
      </Suspense>
    </div>
  )
}