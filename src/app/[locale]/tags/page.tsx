import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { getAllTags as getAllBlogTags } from '@/lib/blog'
import { getAllReleaseTags } from '@/lib/releases'
import { Hash, Search, TrendingUp } from 'lucide-react'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

interface TagsPageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'Tags - Browse by Topic',
  description: 'Explore content by tags. Find blog posts, releases, and documentation organized by topics.',
}

export default async function TagsPage({ params }: TagsPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const [blogTags, releaseTags] = await Promise.all([getAllBlogTags(), getAllReleaseTags()])

  // Combine and deduplicate tags
  const allTagsMap = new Map<string, { count: number; blogCount: number; releaseCount: number }>()

  blogTags.forEach((t) => {
    const existing = allTagsMap.get(t.tag)
    if (existing) {
      existing.blogCount += t.count
      existing.count += t.count
    } else {
      allTagsMap.set(t.tag, { count: t.count, blogCount: t.count, releaseCount: 0 })
    }
  })

  releaseTags.forEach((t) => {
    const existing = allTagsMap.get(t.tag)
    if (existing) {
      existing.releaseCount += t.count
      existing.count += t.count
    } else {
      allTagsMap.set(t.tag, { count: t.count, blogCount: 0, releaseCount: t.count })
    }
  })

  const allTags = Array.from(allTagsMap.entries())
    .map(([tag, counts]) => ({ tag, ...counts }))
    .sort((a, b) => b.count - a.count)

  const totalTags = allTags.length
  const totalContent = allTags.reduce((sum, t) => sum + t.count, 0)

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="border-b border-neutral-200 bg-gradient-to-br from-neutral-50 to-white py-24 dark:border-neutral-800 dark:from-neutral-800 dark:to-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center justify-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
                <Hash className="h-6 w-6 text-neutral-900 dark:text-neutral-100" />
              </div>
            </div>

            <h1 className="text-5xl font-semibold tracking-tight text-neutral-900 sm:text-6xl dark:text-white">
              Explore Tags
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-500 dark:text-neutral-400">
              Browse {totalTags} topics covering {totalContent} pieces of content.
            </p>

            {/* Search Bar */}
            <div className="mx-auto mt-10 max-w-xl">
              <div className="relative">
                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search tags..."
                  className="w-full rounded-lg border border-neutral-200 bg-white py-3 pr-4 pl-12 text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500 dark:focus:border-neutral-100 dark:focus:ring-neutral-100"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-semibold text-neutral-900 dark:text-white">{totalTags}</div>
                <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Total Tags</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-neutral-900 dark:text-white">{totalContent}</div>
                <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Tagged Items</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tags Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Popular Tags */}
          <div className="mb-16">
            <div className="mb-8 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-neutral-900 dark:text-white" />
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">Popular Tags</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allTags.slice(0, 6).map((tag) => (
                <Link
                  key={tag.tag}
                  href={`/tags/${encodeURIComponent(tag.tag)}`}
                  className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-900 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-800 dark:hover:border-neutral-100"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <Hash className="h-5 w-5 text-neutral-400 dark:text-neutral-500" />
                        <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-900 dark:text-white dark:group-hover:text-white">
                          {tag.tag}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                        {tag.blogCount > 0 && <span>{tag.blogCount} blog</span>}
                        {tag.releaseCount > 0 && <span>{tag.releaseCount} release</span>}
                      </div>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-sm font-semibold text-neutral-900 dark:bg-neutral-700 dark:text-white">
                      {tag.count}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* All Tags */}
          <div>
            <h2 className="mb-8 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">All Tags</h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {allTags.map((tag) => (
                <Link
                  key={tag.tag}
                  href={`/tags/${encodeURIComponent(tag.tag)}`}
                  className="group flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-3 transition-all hover:border-neutral-900 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-800 dark:hover:border-neutral-100 dark:hover:bg-neutral-700"
                >
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-neutral-400 dark:text-neutral-500" />
                    <span className="font-medium text-neutral-900 dark:text-white">{tag.tag}</span>
                  </div>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">{tag.count}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
