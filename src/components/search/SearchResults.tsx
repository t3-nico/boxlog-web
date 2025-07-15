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
        return <FileText className="h-4 w-4 text-blue-500" />
      case 'blog':
        return <Edit className="h-4 w-4 text-green-500" />
      case 'release':
        return <Package className="h-4 w-4 text-purple-500" />
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
            className="flex items-start gap-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-left border border-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
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
        <div key={result.id} className="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-start gap-3 mb-3">
            {getTypeIcon(result.type)}
            <div className="flex-1 min-w-0">
              <button 
                onClick={() => handleResultClick(result.url)}
                className="text-lg font-medium text-blue-600 hover:text-blue-800 hover:underline block truncate text-left w-full dark:text-blue-400 dark:hover:text-blue-300"
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
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {result.breadcrumbs.join(' › ')}
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 dark:text-gray-300">
            <Highlight text={result.description} query={query} />
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              最終更新: {result.lastModified}
            </span>
            <button 
              onClick={() => handleResultClick(result.url)}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium dark:text-blue-400 dark:hover:text-blue-300"
            >
              詳細を見る →
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}