import Link from 'next/link'
import { ContentData } from '@/types/content'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PageNavigationProps {
  previousPage?: ContentData
  nextPage?: ContentData
}

export function PageNavigation({
  previousPage,
  nextPage,
}: PageNavigationProps) {
  if (!previousPage && !nextPage) {
    return null
  }

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Previous Page */}
        <div className="flex justify-start">
          {previousPage && (
            <Link
              href={`/docs/${previousPage.slug}`}
              className="group flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors max-w-sm"
            >
              <div className="flex items-center">
                <ChevronLeft className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 mr-3" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Previous
                  </div>
                  <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
              className="group flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors max-w-sm"
            >
              <div className="flex items-center text-right">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Next
                  </div>
                  <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {nextPage.frontMatter.title}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 ml-3" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
