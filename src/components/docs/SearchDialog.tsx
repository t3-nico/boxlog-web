'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

// クライアントサイド用の型定義
interface SearchResult {
  id: string
  title: string
  description: string
  content: string
  slug: string
  category: string
  tags: string[]
  href: string
  score: number
  matches: {
    title?: string
    description?: string
    content?: string
  }
}

// 検索履歴管理（クライアントサイドのみ）
class SearchHistory {
  private static storageKey = 'docs-search-history'
  private static maxHistory = 10
  
  static add(query: string): void {
    if (!query.trim() || typeof window === 'undefined') return
    
    const history = this.get()
    const filtered = history.filter(item => item !== query)
    const newHistory = [query, ...filtered].slice(0, this.maxHistory)
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(newHistory))
    } catch (error) {
      console.warn('Failed to save search history:', error)
    }
  }
  
  static get(): string[] {
    if (typeof window === 'undefined') return []
    
    try {
      const stored = localStorage.getItem(this.storageKey)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.warn('Failed to load search history:', error)
      return []
    }
  }
}

// 人気検索キーワード
const getPopularSearches = (): string[] => {
  return [
    'authentication',
    'quickstart', 
    'API reference',
    'installation',
    'users',
    'real-time',
    'webhooks',
    'organizations'
  ]
}

interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [showHistory, setShowHistory] = useState(true)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // 検索履歴の読み込みとスクロール制御
  useEffect(() => {
    if (isOpen) {
      setSearchHistory(SearchHistory.get())
      setShowHistory(true)
      
      // 背景スクロールを無効化
      document.body.style.overflow = 'hidden'
      
      // フォーカスを検索ボックスに
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    } else {
      // 背景スクロールを復元
      document.body.style.overflow = 'unset'
    }

    // クリーンアップ
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // 検索実行（APIエンドポイント経由）
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      setShowHistory(true)
      return
    }

    setIsLoading(true)
    setShowHistory(false)
    
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&limit=10`)
      const data = await response.json()
      
      setResults(data.results || [])
      setSelectedIndex(0)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // デバウンス検索
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, performSearch])

  // キーボードナビゲーション
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const maxIndex = showHistory ? searchHistory.length - 1 : results.length - 1
      setSelectedIndex(prev => Math.min(prev + 1, maxIndex))
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      if (showHistory && searchHistory[selectedIndex]) {
        setQuery(searchHistory[selectedIndex])
        performSearch(searchHistory[selectedIndex])
      } else if (results[selectedIndex]) {
        handleResultSelect(results[selectedIndex])
      }
    }
  }

  // 検索結果選択
  const handleResultSelect = (result: SearchResult) => {
    SearchHistory.add(query)
    onClose()
    router.push(result.href)
  }

  // 検索履歴項目選択
  const handleHistorySelect = (historyItem: string) => {
    setQuery(historyItem)
    performSearch(historyItem)
  }

  // ハイライトされたテキストをレンダリング
  const renderHighlightedText = (text: string) => {
    return <span dangerouslySetInnerHTML={{ __html: text }} />
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 999999 }}>
      {/* オーバーレイ - ぼかし背景 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* ダイアログ */}
      <div 
        className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl border border-gray-200 z-10"
        onClick={(e) => e.stopPropagation()}
      >
          {/* 検索ボックス */}
          <div className="flex items-center px-4 py-3 border-b border-gray-200">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search documentation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 outline-none text-lg text-gray-900 placeholder-gray-500"
            />
            <div className="text-sm text-gray-400 ml-2">
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">ESC</kbd>
            </div>
          </div>

          {/* 結果エリア */}
          <div 
            ref={resultsRef}
            className="max-h-96 overflow-y-auto"
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Searching...</span>
              </div>
            ) : showHistory && searchHistory.length > 0 ? (
              // 検索履歴表示
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Recent searches
                </div>
                {searchHistory.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleHistorySelect(item)}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center ${
                      selectedIndex === index ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                    }`}
                  >
                    <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item}
                  </button>
                ))}
              </div>
            ) : query && !isLoading && results.length === 0 ? (
              // 検索結果なし
              <div className="py-8 text-center">
                <svg className="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H2.5A.5.5 0 012 11.5v-1A.5.5 0 012.5 10H4a7.962 7.962 0 0113.27 1.27m0 0A7.962 7.962 0 0120 12v2a.5.5 0 01-.5.5H19a7.962 7.962 0 01-2.27-1.27z" />
                </svg>
                <p className="text-gray-500 mb-2">No results found for "{query}"</p>
                <p className="text-sm text-gray-400">
                  Try adjusting your search terms or browse the{' '}
                  <button 
                    onClick={() => router.push('/docs')}
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    documentation
                  </button>
                </p>
              </div>
            ) : results.length > 0 ? (
              // 検索結果表示
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </div>
                {results.map((result, index) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultSelect(result)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 border-l-2 transition-colors ${
                      selectedIndex === index 
                        ? 'bg-blue-50 border-blue-500 text-blue-700' 
                        : 'border-transparent text-gray-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm mb-1">
                          {result.matches.title ? 
                            renderHighlightedText(result.matches.title) : 
                            result.title
                          }
                        </div>
                        
                        {result.matches.description && (
                          <div className="text-sm text-gray-600 mb-1">
                            {renderHighlightedText(result.matches.description)}
                          </div>
                        )}
                        
                        {result.matches.content && (
                          <div className="text-xs text-gray-500 mb-2">
                            ...{renderHighlightedText(result.matches.content)}...
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="capitalize">{result.category.replace('-', ' ')}</span>
                          {result.tags.length > 0 && (
                            <>
                              <span>•</span>
                              <span>{result.tags.slice(0, 2).join(', ')}</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="ml-4 flex-shrink-0">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : !query && (
              // 初期状態 - 人気検索表示
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Popular searches
                </div>
                {getPopularSearches().map((popularSearch, index) => (
                  <button
                    key={index}
                    onClick={() => handleHistorySelect(popularSearch)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center text-gray-700"
                  >
                    <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    {popularSearch}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* フッター */}
          <div className="px-4 py-3 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs mr-1">↑</kbd>
                <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs mr-2">↓</kbd>
                to navigate
              </div>
              <div className="flex items-center">
                <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs mr-2">↵</kbd>
                to select
              </div>
            </div>
            <div className="text-gray-400">
              Search powered by YourSaaS
            </div>
          </div>
        </div>
    </div>
  )
}