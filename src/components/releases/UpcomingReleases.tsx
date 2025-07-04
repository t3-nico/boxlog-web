interface UpcomingRelease {
  version: string
  expectedDate: string
  status: 'planning' | 'development' | 'testing' | 'review'
  description: string
  features: string[]
  progress: number
}

interface UpcomingReleasesProps {
  upcomingReleases?: UpcomingRelease[]
}

export function UpcomingReleases({ upcomingReleases = [] }: UpcomingReleasesProps = {}) {

  if (upcomingReleases.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden dark:bg-gray-900 dark:border-gray-700">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100 dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center dark:bg-blue-900/30">
            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              今後のリリース予定
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              開発中の新機能とリリース予定日
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Releases List */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {upcomingReleases.map((release, index) => (
          <UpcomingReleaseItem key={release.version} release={release} isFirst={index === 0} />
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            リリース予定は変更される場合があります
          </p>
          <a
            href="/roadmap"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors dark:text-blue-400 dark:hover:text-blue-300"
          >
            ロードマップを見る →
          </a>
        </div>
      </div>
    </div>
  )
}

interface UpcomingReleaseItemProps {
  release: {
    version: string
    expectedDate: string
    features: string[]
    status: 'planning' | 'development' | 'testing' | 'review'
  }
  isFirst: boolean
}

function UpcomingReleaseItem({ release, isFirst }: UpcomingReleaseItemProps) {
  const statusConfig = {
    planning: {
      label: '計画中',
      color: 'bg-gray-100 text-gray-800',
      icon: '📋',
      progress: 10
    },
    development: {
      label: '開発中',
      color: 'bg-blue-100 text-blue-800',
      icon: '🛠️',
      progress: 50
    },
    testing: {
      label: 'テスト中',
      color: 'bg-yellow-100 text-yellow-800',
      icon: '🧪',
      progress: 80
    },
    review: {
      label: 'レビュー中',
      color: 'bg-purple-100 text-purple-800',
      icon: '👀',
      progress: 90
    }
  }

  const config = statusConfig[release.status]
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isOverdue = new Date(release.expectedDate) < new Date()

  return (
    <div className={`p-6 ${isFirst ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        {/* Left Side */}
        <div className="flex-1 min-w-0">
          {/* Version and Status */}
          <div className="flex items-center gap-3 mb-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
              isFirst ? 'bg-blue-600 text-white dark:bg-blue-600 dark:text-white' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}>
              {release.version}
            </span>
            
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
              <span role="img" aria-label={config.label}>
                {config.icon}
              </span>
              {config.label}
            </span>

            {isFirst && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-1.5"></span>
                Next Release
              </span>
            )}
          </div>

          {/* Expected Date */}
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className={`text-sm ${isOverdue ? 'text-red-600 font-medium dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}>
              予定日: {formatDate(release.expectedDate)}
              {isOverdue && ' (予定より遅れています)'}
            </span>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2 dark:text-gray-100">主な新機能</h4>
            <ul className="space-y-1">
              {release.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 dark:bg-gray-500"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side - Progress */}
        <div className="flex-shrink-0 w-24">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1 dark:text-gray-100">
              {config.progress}%
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2 dark:bg-gray-700">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  config.progress >= 80 ? 'bg-green-500' :
                  config.progress >= 50 ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}
                style={{ width: `${config.progress}%` }}
              ></div>
            </div>
            
            <div className="text-xs text-gray-500 dark:text-gray-400">
              進捗
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info for First Item */}
      {isFirst && (
        <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            このリリースの詳細は開発ブログで随時更新されます
          </div>
        </div>
      )}
    </div>
  )
}

// Compact version for sidebar
export function UpcomingReleasesCompact({ upcomingReleases = [] }: UpcomingReleasesProps = {}) {

  if (upcomingReleases.length === 0) {
    return null
  }

  const nextRelease = upcomingReleases[0]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-blue-800">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center dark:bg-blue-600">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          次期リリース
        </h4>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {nextRelease.version}
          </span>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {formatDate(nextRelease.expectedDate)}
          </span>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          {nextRelease.features.slice(0, 2).map((feature, index) => (
            <div key={index} className="flex items-start gap-1">
              <span className="flex-shrink-0 w-1 h-1 bg-gray-400 rounded-full mt-2 dark:bg-gray-500"></span>
              <span className="text-xs">{feature}</span>
            </div>
          ))}
          {nextRelease.features.length > 2 && (
            <div className="text-xs text-blue-600 mt-1 dark:text-blue-400">
              +{nextRelease.features.length - 2} more features
            </div>
          )}
        </div>

        <a
          href="/releases"
          className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 font-medium mt-2 dark:text-blue-400 dark:hover:text-blue-300"
        >
          詳細を見る
          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  )
}

// Release Timeline Component
export function ReleaseTimeline() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 dark:bg-gray-900 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 dark:text-gray-100">
        リリースタイムライン
      </h3>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

        <div className="space-y-8">
          {/* Current Release */}
          <div className="relative flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm dark:bg-green-900/30 dark:border-gray-900">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">v2.1.0</span>
                <span className="text-xs text-green-600 font-medium dark:text-green-400">リリース済み</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Advanced Analytics & Team Collaboration
              </p>
              <p className="text-xs text-gray-500 mt-1">
                2024年1月15日
              </p>
            </div>
          </div>

          {/* Upcoming Releases */}
          <div className="relative flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm dark:bg-blue-900/30 dark:border-gray-900">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">v2.2.0</span>
                <span className="text-xs text-blue-600 font-medium dark:text-blue-400">開発中</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI-Powered Insights & Mobile Enhancements
              </p>
              <p className="text-xs text-gray-500 mt-1">
                予定: 2024年2月15日
              </p>
            </div>
          </div>

          <div className="relative flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm dark:bg-gray-700 dark:border-gray-900">
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">v2.3.0</span>
                <span className="text-xs text-gray-500 font-medium dark:text-gray-400">計画中</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Advanced Security & Enterprise Features
              </p>
              <p className="text-xs text-gray-500 mt-1">
                予定: 2024年3月20日
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}