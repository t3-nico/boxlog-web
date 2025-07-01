import Link from 'next/link'

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
  const { frontMatter, readingTime } = release
  const versionType = getVersionType(frontMatter.version)
  
  const versionBadgeStyles = {
    major: 'bg-red-100 text-red-800 border-red-200',
    minor: 'bg-blue-100 text-blue-800 border-blue-200', 
    patch: 'bg-green-100 text-green-800 border-green-200',
    prerelease: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  }

  const versionLabels = {
    major: 'Major',
    minor: 'Minor',
    patch: 'Patch',
    prerelease: 'Prerelease'
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
    <article className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-300">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Version and Type */}
            <div className="flex items-center gap-3 mb-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${versionBadgeStyles[versionType]}`}>
                v{frontMatter.version}
              </span>
              
              <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                {versionLabels[versionType]} Release
              </span>
              
              {frontMatter.prerelease && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
                  Beta
                </span>
              )}
            </div>

            {/* Title and Description */}
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              <Link href={`/releases/${frontMatter.version}`}>
                {frontMatter.title}
              </Link>
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-4">
              {frontMatter.description}
            </p>

            {/* Meta Information */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(frontMatter.date)}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{readingTime}分で読める</span>
              </div>

              {frontMatter.author && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{frontMatter.author}</span>
                </div>
              )}
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            {frontMatter.featured && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured
              </span>
            )}
            
            {frontMatter.breaking && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                ⚠️ Breaking Changes
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tags */}
      {frontMatter.tags.length > 0 && (
        <div className="px-6 pb-4">
          <div className="flex flex-wrap gap-2">
            {frontMatter.tags.slice(0, 4).map((tag) => (
              <Link
                key={tag}
                href={`/releases/tag/${encodeURIComponent(tag)}`}
                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors"
              >
                #{tag}
              </Link>
            ))}
            
            {frontMatter.tags.length > 4 && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                +{frontMatter.tags.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {frontMatter.coverImage && frontMatter.author && (
              <div className="flex items-center gap-2">
                <img
                  src={frontMatter.authorAvatar || '/avatars/default.jpg'}
                  alt={frontMatter.author}
                  className="w-6 h-6 rounded-full object-cover"
                  loading={priority ? 'eager' : 'lazy'}
                />
                <span className="text-sm text-gray-600">{frontMatter.author}</span>
              </div>
            )}
          </div>

          <Link
            href={`/releases/${frontMatter.version}`}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors group"
          >
            詳細を見る
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}