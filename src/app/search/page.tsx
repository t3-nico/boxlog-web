'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Container, Heading, Text, Input, Button } from '@/components/ui'

function SearchResults() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const q = searchParams.get('q') || ''
    setQuery(q)
  }, [searchParams])

  return (
    <Container className="py-8">
      <div className="max-w-4xl mx-auto">
        {/* 検索ヘッダー */}
        <div className="mb-8">
          <Heading as="h1" size="3xl" className="mb-4">
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
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
            <Button size="lg">
              検索
            </Button>
          </div>
        </div>

        {/* 検索結果表示エリア */}
        {query ? (
          <div className="space-y-6">
            <Text className="text-gray-600">
              「{query}」の検索結果
            </Text>
            
            <div className="text-center py-16">
              <svg className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <Heading as="h3" size="lg" className="mb-2">
                検索機能は準備中です
              </Heading>
              <Text variant="muted">
                グローバル検索機能を実装中です。しばらくお待ちください。
              </Text>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Heading as="h3" size="lg" className="mb-2">
              検索を開始してください
            </Heading>
            <Text variant="muted">
              ドキュメント、ブログ記事、リリースノートを横断検索できます。
            </Text>
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