import { PostCard } from '@/components/blog/PostCard'
import { ReleaseCard } from '@/components/releases/ReleaseCard'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { getAllTags as getAllBlogTags, getBlogPostsByTag } from '@/lib/blog'
import { getAllReleaseTags, getReleasesByTag } from '@/lib/releases'
import { ArrowLeft, FileText, Megaphone } from 'lucide-react'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

interface TagPageProps {
  params: Promise<{ tag: string; locale: string }>
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const [blogPosts, releases] = await Promise.all([getBlogPostsByTag(decodedTag), getReleasesByTag(decodedTag)])

  const totalCount = blogPosts.length + releases.length

  if (totalCount === 0) {
    return {
      title: 'Tag not found',
      description: 'The tag you are looking for could not be found.',
    }
  }

  return {
    title: `#${decodedTag} - Tagged Content`,
    description: `Browse all content tagged with "${decodedTag}". ${blogPosts.length} blog posts, ${releases.length} releases.`,
    openGraph: {
      title: `#${decodedTag} - Tagged Content | BoxLog`,
      description: `Browse all content tagged with "${decodedTag}". ${blogPosts.length} blog posts, ${releases.length} releases.`,
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  const [blogTags, releaseTags] = await Promise.all([getAllBlogTags(), getAllReleaseTags()])

  // Combine and deduplicate tags
  const allTagsSet = new Set([...blogTags.map((t) => t.tag), ...releaseTags.map((t) => t.tag)])

  const params = []
  for (const locale of routing.locales) {
    for (const tag of allTagsSet) {
      params.push({ locale, tag: encodeURIComponent(tag) })
    }
  }

  return params
}

export default async function UnifiedTagPage({ params }: TagPageProps) {
  const { tag, locale } = await params
  setRequestLocale(locale)

  const decodedTag = decodeURIComponent(tag)

  const [blogPosts, releases, allBlogTags, allReleaseTags] = await Promise.all([
    getBlogPostsByTag(decodedTag),
    getReleasesByTag(decodedTag),
    getAllBlogTags(),
    getAllReleaseTags(),
  ])

  const totalCount = blogPosts.length + releases.length

  if (totalCount === 0) {
    notFound()
  }

  // Combine all tags and deduplicate
  const allTagsMap = new Map<string, number>()
  allBlogTags.forEach((t) => allTagsMap.set(t.tag, (allTagsMap.get(t.tag) || 0) + t.count))
  allReleaseTags.forEach((t) => allTagsMap.set(t.tag, (allTagsMap.get(t.tag) || 0) + t.count))
  const allTags = Array.from(allTagsMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)

  const isJa = locale === 'ja'

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="text-muted-foreground flex items-center space-x-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-foreground">
                    {isJa ? 'ホーム' : 'Home'}
                  </Link>
                </li>
                <li>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </li>
                <li className="text-foreground font-medium">#{decodedTag}</li>
              </ol>
            </nav>

            {/* Tag Header */}
            <div className="text-center">
              <div className="mb-6 inline-flex items-center justify-center gap-4">
                <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-xl">
                  <svg className="text-foreground h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </div>
                <h1 className="text-5xl font-semibold tracking-tight text-neutral-900 sm:text-6xl dark:text-white">
                  #{decodedTag}
                </h1>
              </div>

              <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
                {totalCount} {totalCount === 1 ? 'item' : 'items'} tagged with "{decodedTag}"
              </p>

              {/* Stats */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                {blogPosts.length > 0 && (
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4" />
                    <span>
                      {blogPosts.length} blog {blogPosts.length === 1 ? 'post' : 'posts'}
                    </span>
                  </div>
                )}
                {releases.length > 0 && (
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Megaphone className="h-4 w-4" />
                    <span>
                      {releases.length} {releases.length === 1 ? 'release' : 'releases'}
                    </span>
                  </div>
                )}
              </div>

              {/* Back Link */}
              <div className="mt-10">
                <Link
                  href="/tags"
                  className="text-foreground hover:text-muted-foreground inline-flex items-center gap-2 text-sm font-semibold"
                >
                  <ArrowLeft className="h-4 w-4" />
                  All Tags
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
            {/* Main Content */}
            <div className="space-y-16 lg:col-span-3">
              {/* Blog Posts */}
              {blogPosts.length > 0 && (
                <div>
                  <h2 className="text-foreground mb-8 text-3xl font-semibold tracking-tight">
                    <FileText className="mr-2 inline-block h-6 w-6" />
                    {isJa ? 'ブログ' : 'Blog'}
                    <span className="text-muted-foreground ml-2 text-lg font-normal">({blogPosts.length})</span>
                  </h2>
                  <div className="space-y-8">
                    {blogPosts.map((post, index) => (
                      <PostCard key={post.slug} post={post} priority={index < 2} />
                    ))}
                  </div>
                </div>
              )}

              {/* Releases */}
              {releases.length > 0 && (
                <div>
                  <h2 className="text-foreground mb-8 text-3xl font-semibold tracking-tight">
                    <Megaphone className="mr-2 inline-block h-6 w-6" />
                    {isJa ? 'リリース' : 'Releases'}
                    <span className="text-muted-foreground ml-2 text-lg font-normal">({releases.length})</span>
                  </h2>
                  <div className="space-y-6">
                    {releases.map((release) => (
                      <ReleaseCard key={release.slug} release={release} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Popular Tags */}
                <div className="border-border bg-card rounded-xl border p-6">
                  <h3 className="text-foreground mb-4 text-lg font-semibold">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.slice(0, 10).map((tagItem) => (
                      <Link
                        key={tagItem.tag}
                        href={`/tags/${encodeURIComponent(tagItem.tag)}`}
                        className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                          tagItem.tag === decodedTag
                            ? 'bg-foreground text-background'
                            : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        }`}
                      >
                        #{tagItem.tag}
                        <span className="ml-1 text-xs opacity-75">{tagItem.count}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
