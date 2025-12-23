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
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center justify-center gap-4">
              <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-xl">
                <Hash className="text-foreground h-6 w-6" />
              </div>
            </div>

            <h1 className="text-foreground text-5xl font-semibold tracking-tight sm:text-6xl">Explore Tags</h1>

            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
              Browse {totalTags} topics covering {totalContent} pieces of content.
            </p>

            {/* Search Bar */}
            <div className="mx-auto mt-10 max-w-xl">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search tags..."
                  className="border-border bg-card text-foreground placeholder-muted-foreground focus:border-foreground focus:ring-ring w-full rounded-lg border py-3 pr-4 pl-12 focus:ring-1 focus:outline-none"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-foreground text-3xl font-semibold">{totalTags}</div>
                <div className="text-muted-foreground mt-1 text-sm">Total Tags</div>
              </div>
              <div className="text-center">
                <div className="text-foreground text-3xl font-semibold">{totalContent}</div>
                <div className="text-muted-foreground mt-1 text-sm">Tagged Items</div>
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
              <TrendingUp className="text-foreground h-5 w-5" />
              <h2 className="text-foreground text-2xl font-semibold tracking-tight">Popular Tags</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allTags.slice(0, 6).map((tag) => (
                <Link
                  key={tag.tag}
                  href={`/tags/${encodeURIComponent(tag.tag)}`}
                  className="group border-border bg-card hover:border-foreground relative overflow-hidden rounded-xl border p-6 transition-all hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <Hash className="text-muted-foreground h-5 w-5" />
                        <h3 className="text-foreground text-lg font-semibold">{tag.tag}</h3>
                      </div>
                      <div className="text-muted-foreground flex items-center gap-4 text-sm">
                        {tag.blogCount > 0 && <span>{tag.blogCount} blog</span>}
                        {tag.releaseCount > 0 && <span>{tag.releaseCount} release</span>}
                      </div>
                    </div>
                    <div className="bg-muted text-foreground flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold">
                      {tag.count}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* All Tags */}
          <div>
            <h2 className="text-foreground mb-8 text-2xl font-semibold tracking-tight">All Tags</h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {allTags.map((tag) => (
                <Link
                  key={tag.tag}
                  href={`/tags/${encodeURIComponent(tag.tag)}`}
                  className="group border-border bg-card hover:border-foreground hover:bg-muted flex items-center justify-between rounded-lg border px-4 py-3 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Hash className="text-muted-foreground h-4 w-4" />
                    <span className="text-foreground font-medium">{tag.tag}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">{tag.count}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
