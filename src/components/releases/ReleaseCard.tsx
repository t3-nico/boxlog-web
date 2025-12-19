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
    major: 'bg-release-breaking-bg text-release-breaking-text hover:opacity-90',
    minor: 'bg-release-improvement-bg text-release-improvement-text hover:opacity-90',
    patch: 'bg-release-new-bg text-release-new-text hover:opacity-90',
    prerelease: 'bg-release-bugfix-bg text-release-bugfix-text hover:opacity-90',
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
        <article className="border-border bg-card hover:border-primary/50 flex items-center justify-between rounded-lg border p-4 transition-all duration-200 hover:shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${versionBadgeStyles[versionType]}`}
              >
                v{frontMatter.version}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-foreground group-hover:text-primary text-sm font-medium transition-colors">
                {frontMatter.title}
              </h3>
              <p className="text-muted-foreground mt-1 text-xs">{formatDate(frontMatter.date)}</p>
            </div>
          </div>

          <div className="flex flex-shrink-0 items-center gap-2">
            {frontMatter.breaking && (
              <span className="bg-release-breaking-bg text-release-breaking-text inline-flex items-center rounded-md px-2 py-1 text-xs font-medium">
                <AlertTriangle className="mr-1 h-3 w-3" />
                {t('breaking')}
              </span>
            )}

            {frontMatter.featured && (
              <span className="bg-release-security-bg text-release-security-text inline-flex items-center rounded-md px-2 py-1 text-xs font-medium">
                <Star className="mr-1 h-3 w-3" />
                {t('featured')}
              </span>
            )}

            <ChevronRight className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors" />
          </div>
        </article>
      </Link>
    )
  }

  return (
    <article className="border-border bg-card hover:border-primary/50 group overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-lg">
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
          <h2 className="text-foreground group-hover:text-primary mb-3 line-clamp-2 text-xl font-bold transition-colors">
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
              <span className="bg-release-security-bg text-release-security-text inline-flex items-center rounded-md px-2 py-1 text-xs font-medium">
                <Star className="mr-1 h-3 w-3" />
                {t('featured')}
              </span>
            )}

            {frontMatter.breaking && (
              <span className="bg-release-breaking-bg text-release-breaking-text inline-flex items-center rounded-md px-2 py-1 text-xs font-medium">
                <AlertTriangle className="mr-1 h-3 w-3" />
                {t('breaking')}
              </span>
            )}
          </div>

          {/* Date */}
          <div className="text-muted-foreground text-sm">
            <time dateTime={frontMatter.date}>{formatDate(frontMatter.date)}</time>
          </div>
        </div>
      </Link>
    </article>
  )
}
