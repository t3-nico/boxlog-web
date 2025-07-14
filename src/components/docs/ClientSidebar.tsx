'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { type NavigationItem, type NavigationSection } from '@/lib/navigation'
import { ExternalLink } from 'lucide-react'

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
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium' 
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
            style={{ paddingLeft }}
          >
            <span className="flex-1">{item.title}</span>
            {item.badge && (
              <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                {item.badge}
              </span>
            )}
            {item.external && (
              <ExternalLink className="w-3 h-3 ml-1" />
            )}
          </Link>
        ) : (
          <span
            className="flex items-center flex-1 px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 font-medium"
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

  return (
    <div className="h-full flex flex-col">

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto space-y-6">
        {navigation.map((section) => (
          <div key={section.title}>
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-default">
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