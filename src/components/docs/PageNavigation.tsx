import Link from 'next/link'
import { ContentData } from '@/types/content'

interface PageNavigationProps {
  previousPage?: ContentData
  nextPage?: ContentData
}

export function PageNavigation({ previousPage, nextPage }: PageNavigationProps) {
  if (!previousPage && !nextPage) {
    return null
  }

  return (
    <div className="border-t border-gray-200 pt-8 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Previous Page */}
        <div className="flex justify-start">
          {previousPage && (
            <Link
              href={`/docs/${previousPage.slug}`}
              className="group flex items-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors max-w-sm"
            >
              <div className="flex items-center">
                <svg 
                  className="w-5 h-5 text-gray-400 group-hover:text-gray-600 mr-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Previous</div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
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
              className="group flex items-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors max-w-sm"
            >
              <div className="flex items-center text-right">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Next</div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {nextPage.frontMatter.title}
                  </div>
                </div>
                <svg 
                  className="w-5 h-5 text-gray-400 group-hover:text-gray-600 ml-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}