import React from 'react'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui'
import { Highlight } from '@/utils/highlight'
import { SearchResult } from '@/hooks/useSearch'

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
            className="flex items-start gap-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-left border border-gray-100"
          >
            <div className="mt-0.5">
              {getTypeIcon(result.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                <Highlight text={result.title} query={query} />
              </div>
              <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                <Highlight text={result.description} query={query} />
              </div>
            </div>
            <Badge variant="outline" className="text-xs px-2 py-0.5">
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
        <div key={result.id} className="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3 mb-3">
            {getTypeIcon(result.type)}
            <div className="flex-1 min-w-0">
              <button 
                onClick={() => handleResultClick(result.url)}
                className="text-lg font-medium text-blue-600 hover:text-blue-800 hover:underline block truncate text-left w-full"
              >
                <Highlight text={result.title} query={query} />
              </button>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant="outline" 
                  className={`text-xs px-2 py-0.5 ${getTypeBadgeColor(result.type)}`}
                >
                  {getTypeLabel(result.type)}
                </Badge>
                <span className="text-xs text-gray-500">
                  {result.breadcrumbs.join(' › ')}
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            <Highlight text={result.description} query={query} />
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              最終更新: {result.lastModified}
            </span>
            <button 
              onClick={() => handleResultClick(result.url)}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              詳細を見る →
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}