'use client'

import Link from 'next/link'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

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
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          {currentPage > 1 ? (
            <PaginationPrevious href={generatePageUrl(currentPage - 1)} />
          ) : (
            <PaginationPrevious 
              href="#" 
              className="pointer-events-none opacity-50" 
              aria-disabled="true"
            />
          )}
        </PaginationItem>

        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <PaginationItem key={`dots-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          const pageNumber = page as number
          const isCurrentPage = pageNumber === currentPage

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink 
                href={generatePageUrl(pageNumber)}
                isActive={isCurrentPage}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          {currentPage < totalPages ? (
            <PaginationNext href={generatePageUrl(currentPage + 1)} />
          ) : (
            <PaginationNext 
              href="#" 
              className="pointer-events-none opacity-50" 
              aria-disabled="true"
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}