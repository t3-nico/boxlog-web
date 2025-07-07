import { getAllContent } from '@/lib/mdx'
import type { ContentData } from '@/types/content'

export interface SearchIndexItem {
  id: string
  title: string
  description: string
  content: string
  slug: string
  category: string
  tags: string[]
  href: string
}

export interface SearchResult extends SearchIndexItem {
  score: number
  matches: {
    title?: string
    description?: string
    content?: string
  }
}

let searchIndex: SearchIndexItem[] = []

/**
 * 検索インデックスを生成
 */
export async function generateSearchIndex(): Promise<SearchIndexItem[]> {
  try {
    const allContent = await getAllContent()
    
    const index: SearchIndexItem[] = allContent.map((content) => ({
      id: content.slug,
      title: content.frontMatter.title,
      description: content.frontMatter.description || '',
      content: stripMarkdown(content.content),
      slug: content.slug,
      category: content.frontMatter.category,
      tags: content.frontMatter.tags || [],
      href: `/docs/${content.slug}`
    }))
    
    searchIndex = index
    return index
  } catch (error) {
    return []
  }
}

/**
 * 検索インデックスを取得
 */
export function getSearchIndex(): SearchIndexItem[] {
  return searchIndex
}

/**
 * Markdownから装飾を除去してプレーンテキストにする
 */
function stripMarkdown(markdown: string): string {
  return markdown
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`[^`]*`/g, '')
    // Remove headers
    .replace(/#{1,6}\s+/g, '')
    // Remove emphasis
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    // Remove links
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    // Remove images
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    // Remove line breaks and normalize spaces
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * テキストをハイライト用に分割
 */
function highlightText(text: string, query: string): string {
  if (!query.trim()) return text
  
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

/**
 * 正規表現用にエスケープ
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * スコアリング関数
 */
function calculateScore(item: SearchIndexItem, query: string): number {
  const queryLower = query.toLowerCase()
  let score = 0
  
  // タイトルマッチ（最高スコア）
  if (item.title.toLowerCase().includes(queryLower)) {
    score += 100
    // 完全マッチはさらに高スコア
    if (item.title.toLowerCase() === queryLower) {
      score += 50
    }
  }
  
  // 説明文マッチ
  if (item.description.toLowerCase().includes(queryLower)) {
    score += 50
  }
  
  // タグマッチ
  const matchingTags = item.tags.filter(tag => 
    tag.toLowerCase().includes(queryLower)
  )
  score += matchingTags.length * 30
  
  // コンテンツマッチ（低スコア）
  const contentMatches = (item.content.toLowerCase().match(new RegExp(escapeRegExp(queryLower), 'g')) || []).length
  score += contentMatches * 5
  
  // カテゴリマッチ
  if (item.category.toLowerCase().includes(queryLower)) {
    score += 25
  }
  
  return score
}

/**
 * 検索実行
 */
export function searchContent(query: string, maxResults: number = 10): SearchResult[] {
  if (!query.trim() || searchIndex.length === 0) {
    return []
  }
  
  const queryLower = query.toLowerCase()
  const results: SearchResult[] = []
  
  for (const item of searchIndex) {
    const score = calculateScore(item, query)
    
    if (score > 0) {
      const matches: SearchResult['matches'] = {}
      
      // マッチした部分を記録
      if (item.title.toLowerCase().includes(queryLower)) {
        matches.title = highlightText(item.title, query)
      }
      
      if (item.description.toLowerCase().includes(queryLower)) {
        matches.description = highlightText(item.description, query)
      }
      
      if (item.content.toLowerCase().includes(queryLower)) {
        // コンテンツの一部を抽出
        const index = item.content.toLowerCase().indexOf(queryLower)
        const start = Math.max(0, index - 50)
        const end = Math.min(item.content.length, index + query.length + 50)
        const excerpt = item.content.substring(start, end)
        matches.content = highlightText(excerpt, query)
      }
      
      results.push({
        ...item,
        score,
        matches
      })
    }
  }
  
  // スコア順でソートして上位結果を返す
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
}

/**
 * カテゴリ別検索
 */
export function searchByCategory(query: string, category: string, maxResults: number = 5): SearchResult[] {
  const allResults = searchContent(query, 100)
  return allResults
    .filter(result => result.category === category)
    .slice(0, maxResults)
}

/**
 * 検索候補を取得
 */
export function getSearchSuggestions(query: string, maxSuggestions: number = 5): string[] {
  if (!query.trim() || searchIndex.length === 0) {
    return []
  }
  
  const queryLower = query.toLowerCase()
  const suggestions = new Set<string>()
  
  // タイトルから候補を抽出
  for (const item of searchIndex) {
    if (item.title.toLowerCase().includes(queryLower)) {
      suggestions.add(item.title)
    }
    
    // タグから候補を抽出
    for (const tag of item.tags) {
      if (tag.toLowerCase().includes(queryLower)) {
        suggestions.add(tag)
      }
    }
  }
  
  return Array.from(suggestions).slice(0, maxSuggestions)
}

/**
 * 人気検索キーワードを取得（模擬データ）
 */
export function getPopularSearches(): string[] {
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

/**
 * 検索履歴管理
 */
export class SearchHistory {
  private static storageKey = 'docs-search-history'
  private static maxHistory = 10
  
  static add(query: string): void {
    if (!query.trim()) return
    
    const history = this.get()
    const filtered = history.filter(item => item !== query)
    const newHistory = [query, ...filtered].slice(0, this.maxHistory)
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(newHistory))
    } catch (error) {
      }
  }
  
  static get(): string[] {
    try {
      const stored = localStorage.getItem(this.storageKey)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      return []
    }
  }
  
  static clear(): void {
    try {
      localStorage.removeItem(this.storageKey)
    } catch (error) {
      }
  }
}