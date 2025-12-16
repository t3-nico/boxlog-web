'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { type NavigationItem, type NavigationSection } from '@/lib/navigation'
import {
  ExternalLink,
  Rocket,
  User,
  Building,
  BarChart3,
  FileText,
  Search,
  Bell,
  Puzzle,
  Code,
  Radio,
  BookOpen,
  Book,
  Home,
  Settings,
  Key,
  CreditCard,
  Shield,
} from 'lucide-react'

function getPageIcon(href: string, title: string) {
  // ホームページ
  if (href === '/docs' || href === '/docs/') return Home

  // Getting Started
  if (href.includes('/getting-started')) return Rocket

  // Account
  if (href.includes('/account/profile')) return User
  if (href.includes('/account/billing')) return CreditCard
  if (href.includes('/account/api-keys')) return Key
  if (href.includes('/account/security')) return Shield
  if (href.includes('/account/notifications')) return Bell
  if (href.includes('/account')) return Settings

  // Workspace
  if (href.includes('/workspace')) return Building

  // Dashboard
  if (href.includes('/dashboard')) return BarChart3

  // Logs
  if (href.includes('/logs')) return FileText

  // Search
  if (href.includes('/search')) return Search

  // Alerts
  if (href.includes('/alerts')) return Bell

  // Integrations
  if (href.includes('/integrations')) return Puzzle

  // SDKs
  if (href.includes('/sdks')) return Code

  // API
  if (href.includes('/api')) return Radio

  // Guides
  if (href.includes('/guides')) return BookOpen

  // Reference
  if (href.includes('/reference')) return Book

  // Default
  return FileText
}

interface NavigationItemProps {
  item: NavigationItem
  level: number
  currentPath: string
}

function NavigationItemComponent({
  item,
  level,
  currentPath,
}: NavigationItemProps) {
  const hasChildren = item.items && item.items.length > 0
  const hasHref = Boolean(item.href)
  const paddingLeft = `${(level + 1) * 8}px`
  const isActive = item.href === currentPath

  return (
    <div>
      <div className="flex items-center group">
        {hasHref ? (
          <Link
            href={item.href!}
            className={`flex items-center flex-1 text-sm rounded-md transition-colors ${
              isActive
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
            style={{
              paddingLeft,
              paddingRight: '8px',
              paddingTop: '6px',
              paddingBottom: '6px',
            }}
          >
            {(() => {
              const IconComponent = getPageIcon(item.href!, item.title)
              return (
                <>
                  <IconComponent className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="flex-1">{item.title}</span>
                </>
              )
            })()}
            {item.badge && (
              <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                {item.badge}
              </span>
            )}
            {item.external && <ExternalLink className="w-3 h-3 ml-1" />}
          </Link>
        ) : (
          <span
            className="flex items-center flex-1 text-sm text-gray-900 dark:text-gray-100 font-medium"
            style={{
              paddingLeft,
              paddingRight: '8px',
              paddingTop: '6px',
              paddingBottom: '6px',
            }}
          >
            {(() => {
              const IconComponent = getPageIcon('', item.title)
              return (
                <>
                  <IconComponent className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="flex-1">{item.title}</span>
                </>
              )
            })()}
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
            <div className="pl-2 pr-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-default">
              {section.title}
            </div>

            <div className="mt-0.5 space-y-0">
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
