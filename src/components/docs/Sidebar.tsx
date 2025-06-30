'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { docsNavigation, type NavigationItem } from '@/lib/navigation'

interface NavigationItemComponentProps {
  item: NavigationItem
  level: number
  isActive: boolean
  isExpanded: boolean
  onToggle: () => void
  currentPath: string
}

function NavigationItemComponent({ 
  item, 
  level, 
  isActive, 
  isExpanded, 
  onToggle,
  currentPath 
}: NavigationItemComponentProps) {
  const hasChildren = item.items && item.items.length > 0
  const hasHref = Boolean(item.href)
  const paddingLeft = `${(level + 1) * 12}px`

  // Check if any child is active
  const isChildActive = item.items?.some(child => 
    child.href === currentPath || 
    (child.items?.some(grandChild => grandChild.href === currentPath))
  ) || false

  const shouldExpand = isExpanded || isChildActive || isActive

  return (
    <div>
      <div className="flex items-center group">
        {hasHref ? (
          <Link
            href={item.href!}
            className={`flex items-center flex-1 px-3 py-1.5 text-sm rounded-md transition-colors ${
              isActive 
                ? 'text-blue-600 bg-blue-50 font-medium' 
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
            }`}
            style={{ paddingLeft }}
          >
            <span className="flex-1">{item.title}</span>
            {item.badge && (
              <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                {item.badge}
              </span>
            )}
            {item.external && (
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            )}
          </Link>
        ) : (
          <span
            className="flex items-center flex-1 px-3 py-1.5 text-sm text-gray-900 font-medium"
            style={{ paddingLeft }}
          >
            {item.title}
          </span>
        )}
        
        {hasChildren && (
          <button
            onClick={onToggle}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
          >
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${
                shouldExpand ? 'rotate-90' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {hasChildren && shouldExpand && (
        <div className="mt-1">
          {item.items!.map((child, index) => (
            <NavigationItemComponent
              key={child.href || `${item.title}-${index}`}
              item={child}
              level={level + 1}
              isActive={child.href === currentPath}
              isExpanded={false}
              onToggle={() => {}}
              currentPath={currentPath}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<string[]>(['Getting Started'])
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  const toggleItem = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Search Box */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search docs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto space-y-6">
        {docsNavigation.map((section) => (
          <div key={section.title}>
            <button
              onClick={() => toggleSection(section.title)}
              className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
            >
              <span>{section.title}</span>
              <svg
                className={`w-3 h-3 transition-transform ${
                  expandedSections.includes(section.title) ? 'rotate-90' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {expandedSections.includes(section.title) && (
              <div className="mt-2 space-y-1">
                {section.items.map((item, index) => (
                  <NavigationItemComponent
                    key={item.href || `${section.title}-${index}`}
                    item={item}
                    level={0}
                    isActive={item.href === pathname}
                    isExpanded={expandedItems.includes(item.title)}
                    onToggle={() => toggleItem(item.title)}
                    currentPath={pathname}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}