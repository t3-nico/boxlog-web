import { Calendar, Check, ChevronRight, Clipboard, Clock, Eye, Info, TestTube, Wrench } from 'lucide-react'
import Link from 'next/link'

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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 dark:border-gray-700 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="flex items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
            <svg
              className="h-4 w-4 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">今後のリリース予定</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">開発中の新機能とリリース予定日</p>
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
      <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">リリース予定は変更される場合があります</p>
          <Link
            href="/roadmap"
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ロードマップを見る →
          </Link>
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
      icon: Clipboard,
      progress: 10,
    },
    development: {
      label: '開発中',
      color: 'bg-blue-100 text-blue-800',
      icon: Wrench,
      progress: 50,
    },
    testing: {
      label: 'テスト中',
      color: 'bg-yellow-100 text-yellow-800',
      icon: TestTube,
      progress: 80,
    },
    review: {
      label: 'レビュー中',
      color: 'bg-purple-100 text-purple-800',
      icon: Eye,
      progress: 90,
    },
  }

  const config = statusConfig[release.status]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const isOverdue = new Date(release.expectedDate) < new Date()

  return (
    <div className={`p-6 ${isFirst ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        {/* Left Side */}
        <div className="min-w-0 flex-1">
          {/* Version and Status */}
          <div className="mb-3 flex items-center gap-4">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ${
                isFirst
                  ? 'bg-blue-600 text-white dark:bg-blue-600 dark:text-white'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              {release.version}
            </span>

            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${config.color}`}
            >
              <config.icon className="h-3 w-3" />
              {config.label}
            </span>

            {isFirst && (
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                <span className="mr-2 h-2 w-2 rounded-full bg-green-600"></span>
                Next Release
              </span>
            )}
          </div>

          {/* Expected Date */}
          <div className="mb-4 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span
              className={`text-sm ${isOverdue ? 'font-medium text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}
            >
              予定日: {formatDate(release.expectedDate)}
              {isOverdue && ' (予定より遅れています)'}
            </span>
          </div>

          {/* Features */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">主な新機能</h4>
            <ul className="space-y-1">
              {release.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400 dark:bg-gray-500"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side - Progress */}
        <div className="w-24 flex-shrink-0">
          <div className="text-center">
            <div className="mb-1 text-2xl font-bold text-gray-900 dark:text-gray-100">{config.progress}%</div>

            {/* Progress Bar */}
            <div className="mb-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  config.progress >= 80 ? 'bg-green-500' : config.progress >= 50 ? 'bg-yellow-500' : 'bg-blue-500'
                }`}
                style={{ width: `${config.progress}%` }}
              ></div>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400">進捗</div>
          </div>
        </div>
      </div>

      {/* Additional Info for First Item */}
      {isFirst && (
        <div className="mt-4 border-t border-blue-200 pt-4 dark:border-blue-800">
          <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
            <Info className="h-4 w-4" />
            このリリースの詳細は開発ブログで随時更新されます
          </div>
        </div>
      )}
    </div>
  )
}

// Compact version for sidebar
export function UpcomingReleasesCompact({ upcomingReleases = [] }: UpcomingReleasesProps = {}) {
  const nextRelease = upcomingReleases[0]
  if (!nextRelease) {
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 dark:border-blue-800 dark:from-blue-900/20 dark:to-indigo-900/20">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-600">
          <Clock className="h-3 w-3 text-white" />
        </div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">次期リリース</h4>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{nextRelease.version}</span>
          <span className="text-xs text-gray-600 dark:text-gray-400">{formatDate(nextRelease.expectedDate)}</span>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          {nextRelease.features.slice(0, 2).map((feature, index) => (
            <div key={index} className="flex items-start gap-1">
              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400 dark:bg-gray-500"></span>
              <span className="text-xs">{feature}</span>
            </div>
          ))}
          {nextRelease.features.length > 2 && (
            <div className="mt-1 text-xs text-blue-600 dark:text-blue-400">
              +{nextRelease.features.length - 2} more features
            </div>
          )}
        </div>

        <Link
          href="/releases"
          className="mt-2 inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          詳細を見る
          <ChevronRight className="ml-1 h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}

// Release Timeline Component
export function ReleaseTimeline() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-gray-100">リリースタイムライン</h3>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute top-0 bottom-0 left-6 w-1 bg-gray-200 dark:bg-gray-700"></div>

        <div className="space-y-8">
          {/* Current Release */}
          <div className="relative flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-4 border-white bg-[rgb(var(--icon-bg-tertiary))] shadow-sm dark:border-gray-900">
              <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">v2.1.0</span>
                <span className="text-xs font-medium text-green-600 dark:text-green-400">リリース済み</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Advanced Analytics & Team Collaboration</p>
              <p className="mt-1 text-xs text-gray-500">2024年1月15日</p>
            </div>
          </div>

          {/* Upcoming Releases */}
          <div className="relative flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-4 border-white bg-[rgb(var(--icon-bg-secondary))] shadow-sm dark:border-gray-900">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">v2.2.0</span>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">開発中</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">AI-Powered Insights & Mobile Enhancements</p>
              <p className="mt-1 text-xs text-gray-500">予定: 2024年2月15日</p>
            </div>
          </div>

          <div className="relative flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-4 border-white bg-gray-100 shadow-sm dark:border-gray-900 dark:bg-gray-700">
              <Clipboard className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">v2.3.0</span>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">計画中</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Advanced Security & Enterprise Features</p>
              <p className="mt-1 text-xs text-gray-500">予定: 2024年3月20日</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
