import Link from 'next/link'
import { generateBreadcrumbs } from '@/lib/mdx'

interface BreadcrumbsProps {
  slug: string
  title?: string
}

export function Breadcrumbs({ slug, title }: BreadcrumbsProps) {
  const breadcrumbs = generateBreadcrumbs(slug)
  
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
      {breadcrumbs.map((crumb, index) => (
        <div key={`${crumb.href}-${index}`} className="flex items-center">
          {index > 0 && (
            <svg 
              className="w-4 h-4 mx-2 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
          
          {index === breadcrumbs.length - 1 ? (
            <span className="text-gray-900 font-medium">
              {title || crumb.title}
            </span>
          ) : crumb.clickable === false ? (
            <span className="text-gray-600">
              {crumb.title}
            </span>
          ) : (
            <Link 
              href={crumb.href}
              className="hover:text-gray-700 transition-colors"
            >
              {crumb.title}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}