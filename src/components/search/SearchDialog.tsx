'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Highlight } from '@/utils/highlight'
import { 
  Search, 
  Clock, 
  Tag, 
  FileText, 
  Edit, 
  Package, 
  X 
} from 'lucide-react'

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock data (in actual implementation, fetch from external source)
const RECENT_SEARCHES = [
  'API Authentication',
  'Release v2.1.0',
  'Next.js Guide'
]

const QUICK_LINKS = [
  { title: 'Quick Start', description: 'Get started with YourSaaS in 5 minutes', href: '/docs/quick-start', type: 'docs' },
  { title: 'API Reference', description: 'Authentication and API usage', href: '/docs/api-reference', type: 'docs' },
  { title: 'Latest Release', description: 'New features in v2.1.0', href: '/releases/v2.1.0', type: 'release' },
  { title: 'SaaS Strategy', description: 'Business strategy for 2024', href: '/blog/saas-strategy-2024', type: 'blog' }
]

interface PopularTag {
  name: string
  count: number
  color: string
}

// タグの色を決める関数（neutral系のみ使用）
const getTagColor = (index: number): string => {
  const colors = ['neutral-100', 'neutral-200', 'neutral-300']
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
          .then(response => response.json())
          .then(data => {
            setPreviewResults((data.results || []).slice(0, 3))
          })
          .catch(error => {
            console.error('Failed to fetch search results:', error)
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
      'neutral-100': 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700',
      'neutral-200': 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600',
      'neutral-300': 'bg-neutral-300 text-neutral-800 hover:bg-neutral-400 dark:bg-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-500'
    }
    return colorMap[color as keyof typeof colorMap] || 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700'
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden bg-white shadow-2xl border-0 dark:bg-gray-900 dark:border dark:border-gray-700 [&>button]:hidden">
        {/* 検索ヘッダー */}
        <div className="flex items-center gap-4 p-4 border-b border-gray-100 dark:border-gray-700">
          <Search className="h-5 w-5 text-gray-400 flex-shrink-0 dark:text-gray-500" />
          <Input
            ref={inputRef}
            placeholder="Search articles, tags, documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-0 shadow-none text-base text-gray-900 placeholder:text-gray-400 focus-visible:ring-0 focus:outline-none bg-transparent dark:text-gray-100 dark:placeholder:text-gray-500 flex-1"
          />
          <button
            onClick={() => onOpenChange(false)}
            className="h-5 w-5 rounded-sm opacity-70 hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 flex items-center justify-center flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 検索内容 */}
        <div className="max-h-96 overflow-y-auto">
          {!query ? (
            <div className="p-4 space-y-6">
              {/* 最近の検索 */}
              {RECENT_SEARCHES.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 dark:text-gray-500">
                    Recent Searches
                  </h3>
                  <div className="space-y-1">
                    {RECENT_SEARCHES.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setQuery(search)}
                        className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors text-left dark:hover:bg-gray-800"
                      >
                        <Clock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 人気タグ */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 dark:text-gray-500">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => handleTagClick(tag.name)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${getTagColorClass(tag.color)}`}
                    >
                      <Tag className="h-3 w-3" />
                      <span>{tag.name}</span>
                      <span className="text-xs opacity-75">({tag.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* クイックリンク */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 dark:text-gray-500">
                  Popular Pages
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
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Search results for &ldquo;<span className="font-medium">{query}</span>&rdquo;
                </p>
                <Badge variant="outline" className="text-xs">
                  Press Enter to search
                </Badge>
              </div>
              
              {/* 全文検索 */}
              <button
                onClick={() => handleSearch(query)}
                className="flex items-center gap-3 w-full p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/40 dark:border-blue-700"
              >
                <Search className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <div className="text-left">
                  <div className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Search for &ldquo;<Highlight text={query} query={query} />&rdquo;
                  </div>
                  <div className="text-xs text-blue-700 dark:text-blue-300">
                    Find results across all content
                  </div>
                </div>
              </button>

              {/* プレビュー検索結果 */}
              {previewResults.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-2 dark:text-gray-400">Preview results:</p>
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
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide dark:text-gray-400">
                              {result.breadcrumbs?.[0] || (result.type === 'docs' ? 'Docs' : result.type === 'blog' ? 'Blog' : result.type === 'tags' ? 'Tags' : 'Release')}
                            </span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {result.breadcrumbs?.[1] || result.category || 'General'}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-gray-900 truncate dark:text-gray-100">
                            <Highlight text={result.title} query={query} />
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5 line-clamp-2 dark:text-gray-400">
                            <Highlight text={result.description} query={query} />
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs px-2 py-0.5 self-start">
                          {result.type === 'docs' ? 'Docs' : result.type === 'blog' ? 'Blog' : result.type === 'tags' ? 'Tags' : 'Release'}
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
                      <p className="text-xs text-gray-500 mb-2 dark:text-gray-400">Related tags:</p>
                      <div className="space-y-1">
                        {matchedTags.map((tag, index) => (
                          <button
                            key={index}
                            onClick={() => handleTagClick(tag.name)}
                            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors text-left dark:hover:bg-gray-800"
                          >
                            <div className="mt-0.5">
                              <Tag className="h-4 w-4 text-gray-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide dark:text-gray-400">
                                  Tags
                                </span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {tag.count} articles
                                </span>
                              </div>
                              <div className="text-sm font-medium text-gray-900 truncate dark:text-gray-100">
                                <Highlight text={tag.name} query={query} />
                              </div>
                            </div>
                            <Badge variant="outline" className="text-xs px-2 py-0.5 self-start">
                              Tag
                            </Badge>
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
                <span>to select</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-xs font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                  ↑↓
                </kbd>
                <span>to navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-xs font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                  Esc
                </kbd>
                <span>to close</span>
              </div>
            </div>
            <span className="text-gray-400 dark:text-gray-500">Powered by YourSaaS Search</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}