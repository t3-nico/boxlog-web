'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { type NavigationItem, type NavigationSection } from '@/lib/navigation'
import { SearchDialog } from './SearchDialog'

interface NavigationItemProps {
  item: NavigationItem
  level: number
  currentPath: string
}

function NavigationItemComponent({ item, level, currentPath }: NavigationItemProps) {
  const hasChildren = item.items && item.items.length > 0
  const hasHref = Boolean(item.href)
  const paddingLeft = `${(level + 1) * 12}px`
  const isActive = item.href === currentPath

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
      </div>

      {hasChildren && (
        <div className="mt-1">
          {item.items!.map((child, index) => (
            <NavigationItemComponent
              key={child.href || `${item.title}-${index}`}
              item={child}
              level={level + 1}
              currentPath={currentPath}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface ClientSidebarProps {
  navigation: NavigationSection[]
}

export function ClientSidebar({ navigation }: ClientSidebarProps) {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // キーボードショートカット
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="h-full flex flex-col">
      {/* Search Box */}
      <div className="mb-6">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-colors"
        >
          <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="flex-1 text-left">Search docs...</span>
          <div className="flex items-center space-x-1">
            <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
              {typeof navigator !== 'undefined' && navigator.platform?.toLowerCase().includes('mac') ? '⌘' : 'Ctrl'}
            </kbd>
            <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">K</kbd>
          </div>
        </button>
      </div>

      {/* Search Dialog */}
      <SearchDialog 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto space-y-6">
        {navigation.map((section) => (
          <div key={section.title}>
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-default">
              {section.title}
            </div>
            
            <div className="mt-2 space-y-1">
              {section.items.map((item, index) => (
                <NavigationItemComponent
                  key={item.href || `${section.title}-${index}`}
                  item={item}
                  level={0}
                  currentPath={pathname}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  )
}