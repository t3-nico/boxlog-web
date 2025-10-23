import Link from 'next/link'
import { getTagColor } from '@/lib/tags-client'
import { ChevronRight, AlertTriangle, Star } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n'

// Local type definitions to avoid importing server-only lib
interface ReleaseFrontMatter {
  version: string
  date: string
  title: string
  description: string
  tags: string[]
  breaking: boolean
  featured: boolean
  prerelease?: boolean
  author?: string
  authorAvatar?: string
  coverImage?: string
}

interface ReleasePostMeta {
  frontMatter: ReleaseFrontMatter
  slug: string
  content: string
  readingTime: number
}

// Local utility functions
function isPrerelease(version: string): boolean {
  return version.includes('beta') || 
         version.includes('alpha') || 
         version.includes('rc') ||
         version.includes('pre')
}

function getVersionType(version: string): 'major' | 'minor' | 'patch' | 'prerelease' {
  if (isPrerelease(version)) {
    return 'prerelease'
  }

  const cleanVersion = version.replace(/^v/, '')
  const parts = cleanVersion.split('.').map(Number)
  
  if (parts[2] > 0) return 'patch'
  if (parts[1] > 0) return 'minor'
  return 'major'
}

interface ReleaseCardProps {
  release: ReleasePostMeta
  priority?: boolean
  compact?: boolean
  dict?: Dictionary
  locale?: string
}

export function ReleaseCard({ release, priority = false, compact = false, dict, locale }: ReleaseCardProps) {
  const { frontMatter } = release
  const versionType = getVersionType(frontMatter.version)
  
  const versionBadgeStyles = {
    major: 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/40',
    minor: 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/40', 
    patch: 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40',
    prerelease: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:hover:bg-yellow-900/40'
  }


  const formatDate = (dateString: string) => {
    const localeCode = locale === 'jp' ? 'ja-JP' : 'en-US'
    return new Date(dateString).toLocaleDateString(localeCode, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (compact) {
    return (
      <Link 
        href={`/${locale || 'en'}/releases/${frontMatter.version}`}
        className="group block"
      >
        <article className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all duration-200 dark:border-gray-700 dark:hover:border-blue-600">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${versionBadgeStyles[versionType]}`}>
                v{frontMatter.version}
              </span>
            </div>
            
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors dark:text-gray-100 dark:group-hover:text-blue-400">
                {frontMatter.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                {formatDate(frontMatter.date)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {frontMatter.breaking && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {dict?.releases.breaking || 'Breaking'}
              </span>
            )}
            
            {frontMatter.featured && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                <Star className="w-3 h-3 mr-1" />
                {dict?.releases.featured || 'Featured'}
              </span>
            )}

            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors dark:text-gray-500 dark:group-hover:text-blue-400" />
          </div>
        </article>
      </Link>
    )
  }

  return (
    <article className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-300 dark:bg-gray-900 dark:border-gray-700 dark:hover:border-blue-600">
      <Link href={`/${locale || 'en'}/releases/${frontMatter.version}`} className="block">
        <div className="p-6">
          {/* Version Badge */}
          <div className="mb-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${versionBadgeStyles[versionType]}`}>
              v{frontMatter.version}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 dark:text-gray-100 dark:group-hover:text-blue-400">
            {frontMatter.title}
          </h2>

          {/* Tags */}
          {frontMatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {frontMatter.tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                    getTagColor(tag)
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {frontMatter.featured && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                <Star className="w-3 h-3 mr-1" />
                {dict?.releases.featured || 'Featured'}
              </span>
            )}
            
            {frontMatter.breaking && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {dict?.releases.breaking || 'Breaking'}
              </span>
            )}
          </div>

          {/* Date */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={frontMatter.date}>
              {formatDate(frontMatter.date)}
            </time>
          </div>
        </div>
      </Link>
    </article>
  )
}