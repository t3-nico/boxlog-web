import Link from 'next/link'
import { generateBreadcrumbs } from '@/lib/mdx'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbsProps {
  slug: string
  title?: string
}

export function Breadcrumbs({ slug, title }: BreadcrumbsProps) {
  const breadcrumbs = generateBreadcrumbs(slug)
  
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
      {breadcrumbs.map((crumb, index) => (
        <div key={`${crumb.href}-${index}`} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400 dark:text-gray-500" />
          )}
          
          {index === breadcrumbs.length - 1 ? (
            <span className="text-gray-900 dark:text-gray-100 font-medium">
              {title || crumb.title}
            </span>
          ) : crumb.clickable === false ? (
            <span className="text-gray-600 dark:text-gray-400">
              {crumb.title}
            </span>
          ) : (
            <Link 
              href={crumb.href}
              className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              {crumb.title}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}