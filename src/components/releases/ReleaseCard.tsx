import Link from 'next/link'
import { getTagColor } from '@/lib/tags-client'

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
}

export function ReleaseCard({ release, priority = false, compact = false }: ReleaseCardProps) {
  const { frontMatter } = release
  const versionType = getVersionType(frontMatter.version)
  
  const versionBadgeStyles = {
    major: 'bg-red-100 text-red-800 hover:bg-red-200',
    minor: 'bg-blue-100 text-blue-800 hover:bg-blue-200', 
    patch: 'bg-green-100 text-green-800 hover:bg-green-200',
    prerelease: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
  }


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (compact) {
    return (
      <Link 
        href={`/releases/${frontMatter.version}`}
        className="group block"
      >
        <article className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all duration-200">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${versionBadgeStyles[versionType]}`}>
                v{frontMatter.version}
              </span>
            </div>
            
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {frontMatter.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(frontMatter.date)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {frontMatter.breaking && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800">
                ⚠️ Breaking
              </span>
            )}
            
            {frontMatter.featured && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                ✨ Featured
              </span>
            )}

            <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <article className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-300">
      <Link href={`/releases/${frontMatter.version}`} className="block">
        <div className="p-6">
          {/* Version Badge */}
          <div className="mb-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${versionBadgeStyles[versionType]}`}>
              v{frontMatter.version}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
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
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                ✨ Featured
              </span>
            )}
            
            {frontMatter.breaking && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800">
                ⚠️ Breaking
              </span>
            )}
          </div>

          {/* Date */}
          <div className="text-sm text-gray-500">
            <time dateTime={frontMatter.date}>
              {formatDate(frontMatter.date)}
            </time>
          </div>
        </div>
      </Link>
    </article>
  )
}