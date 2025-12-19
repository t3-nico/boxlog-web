'use client'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import { ReleaseCard } from './ReleaseCard'
import { FilterSummary, ReleaseFilter } from './ReleaseFilter'
import { UpcomingReleasesCompact } from './UpcomingReleases'

// Define types locally to avoid importing from server-only lib
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

interface TagCount {
  tag: string
  count: number
}

interface UpcomingRelease {
  version: string
  expectedDate: string
  status: 'planning' | 'development' | 'testing' | 'review'
  description: string
  features: string[]
  progress: number
}

interface ReleasesClientProps {
  initialReleases: ReleasePostMeta[]
  initialTags: TagCount[]
  upcomingReleases: UpcomingRelease[]
  locale: string
}

export function ReleasesClient({
  initialReleases,
  initialTags,
  upcomingReleases,
  locale,
}: ReleasesClientProps) {
  const t = useTranslations('releases')
  // フィルター状態
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showBreakingOnly, setShowBreakingOnly] = useState(false)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  // フィルター関数
  const filteredReleases = useMemo(() => {
    return initialReleases.filter((release) => {
      // タグフィルター
      if (selectedTags.length > 0 && !selectedTags.some((tag) => release.frontMatter.tags.includes(tag))) {
        return false
      }

      // 破壊的変更フィルター
      if (showBreakingOnly && !release.frontMatter.breaking) {
        return false
      }

      // 注目リリースフィルター
      if (showFeaturedOnly && !release.frontMatter.featured) {
        return false
      }

      return true
    })
  }, [initialReleases, selectedTags, showBreakingOnly, showFeaturedOnly])

  // フィルターハンドラー
  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleClearFilters = () => {
    setSelectedTags([])
    setShowBreakingOnly(false)
    setShowFeaturedOnly(false)
  }

  return (
    <section id="releases" className="bg-white py-16 dark:bg-gray-900">
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Filters */}
                <ReleaseFilter
                  tags={initialTags}
                  selectedTags={selectedTags}
                  showBreakingOnly={showBreakingOnly}
                  showFeaturedOnly={showFeaturedOnly}
                  onTagToggle={handleTagToggle}
                  onBreakingToggle={() => setShowBreakingOnly(!showBreakingOnly)}
                  onFeaturedToggle={() => setShowFeaturedOnly(!showFeaturedOnly)}
                  onClearFilters={handleClearFilters}
                  locale={locale}
                />

                {/* Upcoming Releases Compact */}
                <UpcomingReleasesCompact upcomingReleases={upcomingReleases} />

                {/* RSS Feed */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <Heading as="h3" size="md" className="mb-4">
                    {t('rss.title')}
                  </Heading>
                  <Text size="sm" variant="muted" className="mb-4">
                    {t('rss.description')}
                  </Text>
                  <a
                    href="/releases/feed.xml"
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.429 2.857A1.429 1.429 0 002 4.286v11.428A1.429 1.429 0 003.429 17h13.142A1.429 1.429 0 0018 15.714V4.286A1.429 1.429 0 0016.571 2.857H3.429zM4 6.857v2.286H6.286V6.857H4zm8.571 0h2.286v2.286h-2.286V6.857zM4 10.571v2.286h2.286v-2.286H4zm4.571-3.714v2.286h2.286V6.857H8.571zm4.572 3.714v2.286h2.286v-2.286h-2.286zM8.571 10.571v2.286h2.286v-2.286H8.571z" />
                    </svg>
                    {t('rss.link')}
                  </a>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Filter Summary */}
              <FilterSummary
                selectedTags={selectedTags}
                showBreakingOnly={showBreakingOnly}
                showFeaturedOnly={showFeaturedOnly}
                resultCount={filteredReleases.length}
                totalCount={initialReleases.length}
                onTagRemove={handleTagToggle}
                onBreakingToggle={() => setShowBreakingOnly(!showBreakingOnly)}
                onFeaturedToggle={() => setShowFeaturedOnly(!showFeaturedOnly)}
                onClearAll={handleClearFilters}
                locale={locale}
              />

              <div className="mb-8 flex items-center justify-between">
                <Heading as="h2" size="2xl">
                  {t('history.title')}
                  <span className="ml-2 text-lg font-normal text-gray-500 dark:text-gray-400">
                    ({filteredReleases.length}
                    {t('history.count')})
                  </span>
                </Heading>
              </div>

              {filteredReleases.length > 0 ? (
                <div className="space-y-8">
                  {filteredReleases.map((release, index) => (
                    <ReleaseCard
                      key={release.frontMatter.version}
                      release={release}
                      priority={index < 3}
                      locale={locale}
                    />
                  ))}
                </div>
              ) : initialReleases.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                    <svg
                      className="h-12 w-12 text-gray-400 dark:text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <Heading as="h3" size="lg" className="mb-2">
                    {t('emptyState.title')}
                  </Heading>
                  <Text variant="muted">{t('emptyState.description')}</Text>
                </div>
              ) : (
                <div className="py-16 text-center">
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <svg
                      className="h-12 w-12 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <Heading as="h3" size="lg" className="mb-2">
                    {t('noResults.title')}
                  </Heading>
                  <Text variant="muted" className="mb-4">
                    {t('noResults.description')}
                  </Text>
                  <Button onClick={handleClearFilters} variant="primary">
                    {t('noResults.clearFilters')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
