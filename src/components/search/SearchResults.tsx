import React from 'react'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Highlight } from '@/utils/highlight'
import { SearchResult } from '@/hooks/useSearch'
import { FileText, Edit, Package } from 'lucide-react'

interface SearchResultsProps {
  results: SearchResult[]
  query: string
  mode?: 'compact' | 'full'
  onResultClick?: () => void
}

export function SearchResults({ 
  results, 
  query, 
  mode = 'full',
  onResultClick 
}: SearchResultsProps) {
  const router = useRouter()

  const handleResultClick = (url: string) => {
    onResultClick?.()
    router.push(url)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'docs':
        return <FileText className="h-4 w-4 text-[rgb(var(--info-color))]" />
      case 'blog':
        return <Edit className="h-4 w-4 text-[rgb(var(--success-color))]" />
      case 'release':
        return <Package className="h-4 w-4 text-[rgb(var(--tag-accent-text))]" />
      default:
        return null
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'docs': return 'bg-[rgb(var(--info-bg))] text-[rgb(var(--info-color))] border-[rgb(var(--info-color))]'
      case 'blog': return 'bg-[rgb(var(--success-bg))] text-[rgb(var(--success-color))] border-[rgb(var(--success-color))]'
      case 'release': return 'bg-[rgb(var(--tag-accent-bg))] text-[rgb(var(--tag-accent-text))] border-[rgb(var(--tag-accent-text))]'
      default: return 'bg-[rgb(var(--tag-neutral-bg))] text-[rgb(var(--tag-neutral-text))] border-[rgb(var(--border-primary))]'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'docs': return 'ドキュメント'
      case 'blog': return 'ブログ'
      case 'release': return 'リリース'
      default: return type
    }
  }

  if (mode === 'compact') {
    return (
      <div className="space-y-2">
        {results.map((result) => (
          <button
            key={result.id}
            onClick={() => handleResultClick(result.url)}
            className="flex items-start gap-4 w-full p-4 rounded-lg hover:bg-[rgb(var(--bg-secondary))] transition-colors text-left border border-[rgb(var(--border-primary))]"
          >
            <div className="mt-0.5">
              {getTypeIcon(result.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-[rgb(var(--text-primary))] truncate">
                <Highlight text={result.title} query={query} />
              </div>
              <div className="text-xs text-[rgb(var(--text-tertiary))] mt-0.5 line-clamp-2">
                <Highlight text={result.description} query={query} />
              </div>
            </div>
            <Badge variant="outline" className="text-xs px-2 py-1">
              {getTypeLabel(result.type)}
            </Badge>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <div key={result.id} className="border rounded-lg p-6 bg-[rgb(var(--bg-primary))] hover:shadow-md transition-shadow border-[rgb(var(--border-primary))]"> 
          <div className="flex items-start gap-4 mb-3">
            {getTypeIcon(result.type)}
            <div className="flex-1 min-w-0">
              <button 
                onClick={() => handleResultClick(result.url)}
                className="text-lg font-medium text-[rgb(var(--link-color))] hover:text-[rgb(var(--link-hover))] hover:underline block truncate text-left w-full"
              >
                <Highlight text={result.title} query={query} />
              </button>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant="outline" 
                  className={`text-xs px-2 py-1 ${getTypeBadgeColor(result.type)}`}
                >
                  {getTypeLabel(result.type)}
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
            <button 
              onClick={() => handleResultClick(result.url)}
              className="text-xs text-[rgb(var(--link-color))] hover:text-[rgb(var(--link-hover))] font-medium"
            >
              詳細を見る →
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}