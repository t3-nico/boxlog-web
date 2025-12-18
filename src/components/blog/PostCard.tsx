'use client'

import { Heading } from '@/components/ui/typography'
import { Link } from '@/i18n/navigation'
import { BlogPostMeta } from '@/lib/blog'
import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface PostCardProps {
  post: BlogPostMeta
  priority?: boolean
  layout?: 'horizontal' | 'vertical'
  locale?: string
}

export function PostCard({ post, priority = false, layout = 'horizontal', locale = 'en' }: PostCardProps) {
  const [imageError, setImageError] = useState(false)

  // Function to determine tag color
  const getTagColor = (tag: string) => {
    const colors = [
      'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800',
      'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800',
      'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:hover:bg-purple-800',
      'bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-pink-900 dark:text-pink-200 dark:hover:bg-pink-800',
      'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:bg-yellow-800',
      'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800',
      'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800',
      'bg-teal-100 text-teal-800 hover:bg-teal-200 dark:bg-teal-900 dark:text-teal-200 dark:hover:bg-teal-800',
      'bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:hover:bg-orange-800',
      'bg-cyan-100 text-cyan-800 hover:bg-cyan-200 dark:bg-cyan-900 dark:text-cyan-200 dark:hover:bg-cyan-800',
    ]

    // Use tag name hash to determine color (same tag always gets same color)
    let hash = 0
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash)
    }
    const colorIndex = Math.abs(hash) % colors.length
    return colors[colorIndex]
  }

  const formatDate = (dateString: string) => {
    const localeCode = locale === 'ja' ? 'ja-JP' : 'en-US'
    return new Date(dateString).toLocaleDateString(localeCode, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formattedDate = formatDate(post.frontMatter.publishedAt)

  if (layout === 'vertical') {
    // Vertical layout (for featured articles): image on top, content below
    return (
      <article className="group overflow-hidden rounded-2xl bg-white dark:bg-gray-800">
        {/* Cover image */}
        <Link href={`/blog/${post.slug}`} className="block">
          {post.frontMatter.coverImage && !imageError ? (
            <div className="relative aspect-[380/214] overflow-hidden rounded-lg transition-all duration-300 hover:opacity-40">
              <Image
                src={post.frontMatter.coverImage}
                alt={post.frontMatter.title}
                fill
                className="rounded-lg object-cover"
                onError={() => setImageError(true)}
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className="flex aspect-[380/214] items-center justify-center rounded-lg bg-gray-100 transition-all duration-300 hover:opacity-40 dark:bg-gray-700">
              <ImageIcon className="h-12 w-12 text-gray-600 dark:text-gray-300" />
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <Link href={`/blog/${post.slug}`}>
            <Heading as="h2" size="xl" className="mb-3 line-clamp-2 cursor-pointer transition-colors hover:underline">
              {post.frontMatter.title}
            </Heading>
          </Link>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {post.frontMatter.tags.map((tag) => (
              <button
                key={tag}
                onClick={(e) => {
                  e.preventDefault()
                  // タグクリック処理をここに追加
                  console.log('Tag clicked:', tag)
                }}
                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium transition-colors hover:opacity-80 ${getTagColor(
                  tag
                )}`}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Meta information */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={post.frontMatter.publishedAt}>{formattedDate}</time>
          </div>
        </div>
      </article>
    )
  }

  // Horizontal layout (for regular articles): image on left, content on right
  return (
    <article className="group overflow-hidden rounded-2xl bg-white dark:bg-gray-800">
      <div className="flex gap-6">
        {/* Left side: Cover image */}
        <Link href={`/blog/${post.slug}`} className="w-80 flex-shrink-0">
          {post.frontMatter.coverImage && !imageError ? (
            <div className="relative aspect-[380/214] overflow-hidden rounded-lg transition-all duration-300 hover:opacity-40">
              <Image
                src={post.frontMatter.coverImage}
                alt={post.frontMatter.title}
                fill
                className="rounded-lg object-cover"
                onError={() => setImageError(true)}
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>
          ) : (
            <div className="flex aspect-[380/214] items-center justify-center rounded-lg bg-gray-100 transition-all duration-300 hover:opacity-40 dark:bg-gray-700">
              <ImageIcon className="h-8 w-8 text-gray-600 dark:text-gray-300" />
            </div>
          )}
        </Link>

        {/* Right side: Content */}
        <div className="flex-1">
          <div className="my-1">
            {/* Title */}
            <Link href={`/blog/${post.slug}`}>
              <Heading as="h2" size="lg" className="mb-3 line-clamp-2 cursor-pointer transition-colors hover:underline">
                {post.frontMatter.title}
              </Heading>
            </Link>

            {/* Tags */}
            <div className="mb-3 flex flex-wrap gap-2">
              {post.frontMatter.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={(e) => {
                    e.preventDefault()
                    // タグクリック処理をここに追加
                    console.log('Tag clicked:', tag)
                  }}
                  className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium transition-colors hover:opacity-80 ${getTagColor(
                    tag
                  )}`}
                >
                  #{tag}
                </button>
              ))}
            </div>

            {/* Meta information */}
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post.frontMatter.publishedAt}>{formattedDate}</time>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
