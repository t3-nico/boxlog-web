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

  // Function to determine tag color - using semantic tokens
  const getTagColor = (_tag: string) => {
    return 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
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
      <article className="group bg-card overflow-hidden rounded-2xl">
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
            <div className="bg-muted flex aspect-[380/214] items-center justify-center rounded-lg transition-all duration-300 hover:opacity-40">
              <ImageIcon className="text-muted-foreground h-12 w-12" />
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
          <div className="text-muted-foreground text-sm">
            <time dateTime={post.frontMatter.publishedAt}>{formattedDate}</time>
          </div>
        </div>
      </article>
    )
  }

  // Horizontal layout (for regular articles): image on left, content on right
  return (
    <article className="group bg-card overflow-hidden rounded-2xl">
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
            <div className="bg-muted flex aspect-[380/214] items-center justify-center rounded-lg transition-all duration-300 hover:opacity-40">
              <ImageIcon className="text-muted-foreground h-8 w-8" />
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
            <div className="text-muted-foreground text-sm">
              <time dateTime={post.frontMatter.publishedAt}>{formattedDate}</time>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
