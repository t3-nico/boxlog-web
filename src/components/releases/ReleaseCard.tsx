'use client'

import { Link } from '@/i18n/navigation'
import { getTagColor } from '@/lib/tags-client'
import { AlertTriangle, ChevronRight, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'

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
  return version.includes('beta') || version.includes('alpha') || version.includes('rc') || version.includes('pre')
}

function getVersionType(version: string): 'major' | 'minor' | 'patch' | 'prerelease' {
  if (isPrerelease(version)) {
    return 'prerelease'
  }

  const cleanVersion = version.replace(/^v/, '')
  const parts = cleanVersion.split('.').map(Number)

  if ((parts[2] ?? 0) > 0) return 'patch'
  if ((parts[1] ?? 0) > 0) return 'minor'
  return 'major'
}

interface ReleaseCardProps {
  release: ReleasePostMeta
  priority?: boolean
  compact?: boolean
  locale?: string
}

export function ReleaseCard({ release, priority: _priority = false, compact = false, locale }: ReleaseCardProps) {
  const t = useTranslations('releases')
  const { frontMatter } = release
  const versionType = getVersionType(frontMatter.version)

  const versionBadgeStyles = {
    major: 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/40',
    minor:
      'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/40',
    patch:
      'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40',
    prerelease:
      'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:hover:bg-yellow-900/40',
  }

  const formatDate = (dateString: string) => {
    const localeCode = locale === 'ja' ? 'ja-JP' : 'en-US'
    return new Date(dateString).toLocaleDateString(localeCode, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (compact) {
    return (
      <Link href={`/releases/${frontMatter.version}`} className="group block">
        <article className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-all duration-200 hover:border-blue-300 hover:shadow-sm dark:border-gray-700 dark:hover:border-blue-600">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${versionBadgeStyles[versionType]}`}
              >
                v{frontMatter.version}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                {frontMatter.title}
              </h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{formatDate(frontMatter.date)}</p>
            </div>
          </div>

          <div className="flex flex-shrink-0 items-center gap-2">
            {frontMatter.breaking && (
              <span className="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300">
                <AlertTriangle className="mr-1 h-3 w-3" />
                {t('breaking')}
              </span>
            )}

            {frontMatter.featured && (
              <span className="inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                <Star className="mr-1 h-3 w-3" />
                {t('featured')}
              </span>
            )}

            <ChevronRight className="h-4 w-4 text-gray-400 transition-colors group-hover:text-blue-600 dark:text-gray-500 dark:group-hover:text-blue-400" />
          </div>
        </article>
      </Link>
    )
  }

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-blue-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:hover:border-blue-600">
      <Link href={`/releases/${frontMatter.version}`} className="block">
        <div className="p-6">
          {/* Version Badge */}
          <div className="mb-3">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors ${versionBadgeStyles[versionType]}`}
            >
              v{frontMatter.version}
            </span>
          </div>

          {/* Title */}
          <h2 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
            {frontMatter.title}
          </h2>

          {/* Tags */}
          {frontMatter.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {frontMatter.tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium transition-colors ${getTagColor(
                    tag
                  )}`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Status Badges */}
          <div className="mb-4 flex flex-wrap gap-2">
            {frontMatter.featured && (
              <span className="inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                <Star className="mr-1 h-3 w-3" />
                {t('featured')}
              </span>
            )}

            {frontMatter.breaking && (
              <span className="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300">
                <AlertTriangle className="mr-1 h-3 w-3" />
                {t('breaking')}
              </span>
            )}
          </div>

          {/* Date */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={frontMatter.date}>{formatDate(frontMatter.date)}</time>
          </div>
        </div>
      </Link>
    </article>
  )
}
