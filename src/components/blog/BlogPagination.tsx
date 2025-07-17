'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  className?: string
}

export function BlogPagination({ currentPage, totalPages, basePath, className }: BlogPaginationProps) {
  if (totalPages <= 1) return null

  const generatePageUrl = (page: number) => {
    if (page === 1) return basePath
    return `${basePath}?page=${page}`
  }

  const getVisiblePages = () => {
    const delta = 2
    const range: number[] = []
    const rangeWithDots: (number | string)[] = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const visiblePages = getVisiblePages()

  return (
    <nav 
      className={cn('flex items-center justify-center space-x-1', className)}
      aria-label="Blog pagination"
    >
      {/* Previous button */}
      {currentPage > 1 ? (
        <Link
          href={generatePageUrl(currentPage - 1)}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-neutral-500 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 hover:text-neutral-700 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Link>
      ) : (
        <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-neutral-300 bg-white border border-neutral-200 rounded-lg cursor-not-allowed dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-600">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </span>
      )}

      {/* Page numbers */}
      <div className="flex space-x-1">
        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`dots-${index}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-neutral-500 dark:text-neutral-400"
              >
                ...
              </span>
            )
          }

          const pageNumber = page as number
          const isCurrentPage = pageNumber === currentPage

          return (
            <Link
              key={pageNumber}
              href={generatePageUrl(pageNumber)}
              className={cn(
                'inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                isCurrentPage
                  ? 'text-white bg-blue-600 border border-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700'
                  : 'text-neutral-500 bg-white border border-neutral-300 hover:bg-neutral-50 hover:text-neutral-700 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200'
              )}
              aria-label={isCurrentPage ? `Current page ${pageNumber}` : `Go to page ${pageNumber}`}
              aria-current={isCurrentPage ? 'page' : undefined}
            >
              {pageNumber}
            </Link>
          )
        })}
      </div>

      {/* Next button */}
      {currentPage < totalPages ? (
        <Link
          href={generatePageUrl(currentPage + 1)}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-neutral-500 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 hover:text-neutral-700 dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 transition-colors"
          aria-label="Next page"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      ) : (
        <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-neutral-300 bg-white border border-neutral-200 rounded-lg cursor-not-allowed dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-600">
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </span>
      )}
    </nav>
  )
}