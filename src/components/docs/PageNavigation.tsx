import { ContentData } from '@/types/content'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface PageNavigationProps {
  previousPage?: ContentData
  nextPage?: ContentData
}

export function PageNavigation({ previousPage, nextPage }: PageNavigationProps) {
  if (!previousPage && !nextPage) {
    return null
  }

  return (
    <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Previous Page */}
        <div className="flex justify-start">
          {previousPage && (
            <Link
              href={`/docs/${previousPage.slug}`}
              className="group flex max-w-sm items-center rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800"
            >
              <div className="flex items-center">
                <ChevronLeft className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-400" />
                <div>
                  <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">Previous</div>
                  <div className="font-medium text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                    {previousPage.frontMatter.title}
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* Next Page */}
        <div className="flex justify-end">
          {nextPage && (
            <Link
              href={`/docs/${nextPage.slug}`}
              className="group flex max-w-sm items-center rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800"
            >
              <div className="flex items-center text-right">
                <div>
                  <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">Next</div>
                  <div className="font-medium text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                    {nextPage.frontMatter.title}
                  </div>
                </div>
                <ChevronRight className="ml-3 h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-400" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
