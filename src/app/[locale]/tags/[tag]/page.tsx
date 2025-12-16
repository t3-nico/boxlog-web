import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, FileText, Megaphone } from 'lucide-react'
import { getBlogPostsByTag, getAllTags as getAllBlogTags } from '@/lib/blog'
import { getReleasesByTag, getAllReleaseTags } from '@/lib/releases'
import { PostCard } from '@/components/blog/PostCard'
import { ReleaseCard } from '@/components/releases/ReleaseCard'
import { getDictionary } from '@/lib/i18n'

interface TagPageProps {
  params: {
    tag: string
    locale: string
  }
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag)
  const [blogPosts, releases] = await Promise.all([
    getBlogPostsByTag(decodedTag),
    getReleasesByTag(decodedTag),
  ])

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
  const [blogTags, releaseTags] = await Promise.all([
    getAllBlogTags(),
    getAllReleaseTags(),
  ])

  // Combine and deduplicate tags
  const allTagsSet = new Set([
    ...blogTags.map((t) => t.tag),
    ...releaseTags.map((t) => t.tag),
  ])

  return Array.from(allTagsSet).map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

export default async function UnifiedTagPage({ params }: TagPageProps) {
  const decodedTag = decodeURIComponent(params.tag)
  const dict = getDictionary(params.locale as 'en' | 'jp')

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
  allBlogTags.forEach((t) =>
    allTagsMap.set(t.tag, (allTagsMap.get(t.tag) || 0) + t.count)
  )
  allReleaseTags.forEach((t) =>
    allTagsMap.set(t.tag, (allTagsMap.get(t.tag) || 0) + t.count)
  )
  const allTags = Array.from(allTagsMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
                <li>
                  <Link
                    href="/"
                    className="hover:text-neutral-700 dark:hover:text-neutral-300"
                  >
                    {dict.common.home}
                  </Link>
                </li>
                <li>
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </li>
                <li className="font-medium text-neutral-900 dark:text-neutral-100">
                  #{decodedTag}
                </li>
              </ol>
            </nav>

            {/* Tag Header */}
            <div className="text-center">
              <div className="mb-6 inline-flex items-center justify-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
                  <svg
                    className="h-6 w-6 text-neutral-900 dark:text-neutral-100"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
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

              <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-500 dark:text-neutral-400">
                {totalCount} {totalCount === 1 ? 'item' : 'items'} tagged with
                &quot;{decodedTag}&quot;
              </p>

              {/* Stats */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                {blogPosts.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <FileText className="h-4 w-4" />
                    <span>
                      {blogPosts.length} blog{' '}
                      {blogPosts.length === 1 ? 'post' : 'posts'}
                    </span>
                  </div>
                )}
                {releases.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <Megaphone className="h-4 w-4" />
                    <span>
                      {releases.length}{' '}
                      {releases.length === 1 ? 'release' : 'releases'}
                    </span>
                  </div>
                )}
              </div>

              {/* Back Link */}
              <div className="mt-10">
                <Link
                  href="/tags"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300"
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
            <div className="lg:col-span-3 space-y-16">
              {/* Blog Posts */}
              {blogPosts.length > 0 && (
                <div>
                  <h2 className="mb-8 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                    <FileText className="inline-block h-6 w-6 mr-2" />
                    {dict.common.blog}
                    <span className="ml-2 text-lg font-normal text-neutral-500 dark:text-neutral-400">
                      ({blogPosts.length})
                    </span>
                  </h2>
                  <div className="space-y-8">
                    {blogPosts.map((post, index) => (
                      <PostCard
                        key={post.slug}
                        post={post}
                        priority={index < 2}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Releases */}
              {releases.length > 0 && (
                <div>
                  <h2 className="mb-8 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                    <Megaphone className="inline-block h-6 w-6 mr-2" />
                    {dict.common.releases}
                    <span className="ml-2 text-lg font-normal text-neutral-500 dark:text-neutral-400">
                      ({releases.length})
                    </span>
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
                <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-800">
                  <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.slice(0, 10).map((tagItem) => (
                      <Link
                        key={tagItem.tag}
                        href={`/tags/${encodeURIComponent(tagItem.tag)}`}
                        className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                          tagItem.tag === decodedTag
                            ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600'
                        }`}
                      >
                        #{tagItem.tag}
                        <span className="ml-1 text-xs opacity-75">
                          {tagItem.count}
                        </span>
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
