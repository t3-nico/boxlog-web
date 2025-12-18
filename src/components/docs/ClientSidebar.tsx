'use client'

import { type NavigationItem, type NavigationSection } from '@/lib/navigation'
import {
  BarChart3,
  Bell,
  Book,
  BookOpen,
  Building,
  Code,
  CreditCard,
  ExternalLink,
  FileText,
  Home,
  Key,
  Puzzle,
  Radio,
  Rocket,
  Search,
  Settings,
  Shield,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function getPageIcon(href: string, _title: string) {
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

function NavigationItemComponent({ item, level, currentPath }: NavigationItemProps) {
  const hasChildren = item.items && item.items.length > 0
  const hasHref = Boolean(item.href)
  const paddingLeft = `${(level + 1) * 8}px`
  const isActive = item.href === currentPath

  return (
    <div>
      <div className="group flex items-center">
        {hasHref ? (
          <Link
            href={item.href!}
            className={`flex flex-1 items-center rounded-md text-sm transition-colors ${
              isActive
                ? 'bg-blue-50 font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200'
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
                  <IconComponent className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="flex-1">{item.title}</span>
                </>
              )
            })()}
            {item.badge && (
              <span className="ml-2 rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                {item.badge}
              </span>
            )}
            {item.external && <ExternalLink className="ml-1 h-3 w-3" />}
          </Link>
        ) : (
          <span
            className="flex flex-1 items-center text-sm font-medium text-gray-900 dark:text-gray-100"
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
                  <IconComponent className="mr-2 h-4 w-4 flex-shrink-0" />
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
    <div className="flex h-full flex-col">
      {/* Navigation */}
      <nav className="flex-1 space-y-6 overflow-y-auto">
        {navigation.map((section) => (
          <div key={section.title}>
            <div className="cursor-default py-2 pr-3 pl-2 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
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
