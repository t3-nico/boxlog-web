'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, Input, Button, Badge } from '@/components/ui'
import { Highlight } from '@/utils/highlight'

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// モックデータ（実際の実装では外部から取得）
const RECENT_SEARCHES = [
  'API 認証',
  'リリース v2.1.0',
  'Next.js ガイド'
]

const QUICK_LINKS = [
  { title: 'クイックスタート', description: '5分でYourSaaSを始める', href: '/docs/quick-start', type: 'docs' },
  { title: 'API リファレンス', description: '認証とAPIの使い方', href: '/docs/api-reference', type: 'docs' },
  { title: '最新リリース', description: 'v2.1.0の新機能', href: '/releases/v2.1.0', type: 'release' },
  { title: 'SaaS戦略', description: '2024年のビジネス戦略', href: '/blog/saas-strategy-2024', type: 'blog' }
]

interface PopularTag {
  name: string
  count: number
  color: string
}

// タグの色を決める関数
const getTagColor = (index: number): string => {
  const colors = ['blue', 'cyan', 'indigo', 'purple', 'green', 'orange', 'red', 'yellow']
  return colors[index % colors.length]
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [popularTags, setPopularTags] = useState<PopularTag[]>([])
  const [previewResults, setPreviewResults] = useState<any[]>([])
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  // 人気タグを取得
  useEffect(() => {
    const fetchPopularTags = async () => {
      try {
        const response = await fetch('/api/tags')
        if (!response.ok) {
          throw new Error('Failed to fetch tags')
        }
        const allTags = await response.json()
        const topTags = allTags.slice(0, 8).map((tag: any, index: number) => ({
          name: tag.tag,
          count: tag.count,
          color: getTagColor(index)
        }))
        setPopularTags(topTags)
      } catch (error) {
        }
    }
    
    fetchPopularTags()
  }, [])

  // 検索プレビューを取得
  useEffect(() => {
    if (query.length > 2) {
      const timeoutId = setTimeout(() => {
        fetch(`/api/search?q=${encodeURIComponent(query)}`)
          .then(response => response.json())
          .then(data => {
            setPreviewResults((data.results || []).slice(0, 3))
          })
          .catch(error => {
            setPreviewResults([])
          })
      }, 300) // 300ms debounce

      return () => clearTimeout(timeoutId)
    } else {
      setPreviewResults([])
    }
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
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  const handleTagClick = (tagName: string) => {
    onOpenChange(false)
    router.push(`/tags/${encodeURIComponent(tagName.toLowerCase())}`)
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
        return (
          <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
    }
  }

  const getTagColorClass = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      cyan: 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200', 
      indigo: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
      purple: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
      green: 'bg-green-100 text-green-800 hover:bg-green-200',
      orange: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
      red: 'bg-red-100 text-red-800 hover:bg-red-200',
      yellow: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
    }
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-100 text-gray-800 hover:bg-gray-200'
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden bg-white shadow-2xl border-0 dark:bg-gray-900 dark:border dark:border-gray-700">
        {/* 検索ヘッダー */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-700">
          <svg className="h-5 w-5 text-gray-400 flex-shrink-0 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <Input
            ref={inputRef}
            placeholder="記事、タグ、ドキュメントを検索..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-0 shadow-none text-base text-gray-900 placeholder:text-gray-400 focus-visible:ring-0 focus:outline-none bg-transparent dark:text-gray-100 dark:placeholder:text-gray-500"
          />
          {query && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setQuery('')}
              className="h-6 w-6 p-0 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 border-0 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-400"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          )}
        </div>

        {/* 検索内容 */}
        <div className="max-h-96 overflow-y-auto">
          {!query ? (
            <div className="p-4 space-y-6">
              {/* 最近の検索 */}
              {RECENT_SEARCHES.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 dark:text-gray-500">
                    最近の検索
                  </h3>
                  <div className="space-y-1">
                    {RECENT_SEARCHES.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setQuery(search)}
                        className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors text-left dark:hover:bg-gray-800"
                      >
                        <svg className="h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 人気タグ */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 dark:text-gray-500">
                  人気タグ
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => handleTagClick(tag.name)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${getTagColorClass(tag.color)}`}
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span>{tag.name}</span>
                      <span className="text-xs opacity-75">({tag.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* クイックリンク */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 dark:text-gray-500">
                  人気のページ
                </h3>
                <div className="space-y-1">
                  {QUICK_LINKS.map((link, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        onOpenChange(false)
                        router.push(link.href)
                      }}
                      className={`flex items-start gap-3 w-full p-3 rounded-lg transition-colors text-left ${
                        selectedIndex === index ? 'bg-blue-50 border border-blue-200 dark:bg-blue-900/30 dark:border-blue-700' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="mt-0.5">
                        {getTypeIcon(link.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate dark:text-gray-100">
                          {link.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5 dark:text-gray-400">
                          {link.description}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className="text-xs px-2 py-0.5">
                          {link.type === 'docs' ? 'Docs' : link.type === 'blog' ? 'Blog' : 'Release'}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  「<span className="font-medium">{query}</span>」の検索結果
                </p>
                <Badge variant="outline" className="text-xs">
                  Enter で検索
                </Badge>
              </div>
              
              {/* 全文検索 */}
              <button
                onClick={() => handleSearch(query)}
                className="flex items-center gap-3 w-full p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/40 dark:border-blue-700"
              >
                <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <div className="text-left">
                  <div className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    「<Highlight text={query} query={query} />」を検索
                  </div>
                  <div className="text-xs text-blue-700 dark:text-blue-300">
                    すべてのコンテンツから検索結果を表示
                  </div>
                </div>
              </button>

              {/* プレビュー検索結果 */}
              {previewResults.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-2 dark:text-gray-400">プレビュー結果:</p>
                  <div className="space-y-2">
                    {previewResults.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          onOpenChange(false)
                          router.push(result.url)
                        }}
                        className="flex items-start gap-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-left border border-gray-100 dark:hover:bg-gray-800 dark:border-gray-700"
                      >
                        <div className="mt-0.5">
                          {getTypeIcon(result.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate dark:text-gray-100">
                            <Highlight text={result.title} query={query} />
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5 line-clamp-2 dark:text-gray-400">
                            <Highlight text={result.description} query={query} />
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs px-2 py-0.5">
                          {result.type === 'docs' ? 'Docs' : result.type === 'blog' ? 'Blog' : 'Release'}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* タグ検索候補 */}
              {(() => {
                const matchedTags = popularTags.filter(tag => 
                  tag.name.toLowerCase().includes(query.toLowerCase())
                )
                
                if (matchedTags.length > 0) {
                  return (
                    <div>
                      <p className="text-xs text-gray-500 mb-2 dark:text-gray-400">関連するタグ:</p>
                      <div className="flex flex-wrap gap-2">
                        {matchedTags.map((tag, index) => (
                          <button
                            key={index}
                            onClick={() => handleTagClick(tag.name)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${getTagColorClass(tag.color)}`}
                          >
                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 713 12V7a4 4 0 014-4z" />
                            </svg>
                            <span><Highlight text={tag.name} query={query} /></span>
                            <span className="text-xs opacity-75">({tag.count})</span>
                          </button>
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
        <div className="p-3 border-t bg-gray-50/50 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-xs font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                  Enter
                </kbd>
                <span>で選択</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-xs font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                  ↑↓
                </kbd>
                <span>で移動</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-xs font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                  Esc
                </kbd>
                <span>で閉じる</span>
              </div>
            </div>
            <span className="text-gray-400 dark:text-gray-500">Powered by YourSaaS Search</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}