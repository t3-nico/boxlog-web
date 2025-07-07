'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heading } from '@/components/ui'
import { BlogPostMeta } from '@/lib/blog'

interface PostCardProps {
  post: BlogPostMeta
  priority?: boolean
  layout?: 'horizontal' | 'vertical'
  locale?: string
}

export function PostCard({ post, priority = false, layout = 'horizontal', locale = 'en' }: PostCardProps) {
  const [imageError, setImageError] = useState(false)
  
  // Function to determine tag color
  const getTagColor = (tag: string, index: number) => {
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
  
  const formattedDate = new Date(post.frontMatter.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })


  if (layout === 'vertical') {
    // Vertical layout (for featured articles): image on top, content below
    return (
      <article className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-400 transition-all duration-300">
        <Link href={locale === 'jp' ? `/jp/blog/${post.slug}` : `/blog/${post.slug}`} className="block">
          {/* Cover image */}
          {post.frontMatter.coverImage && !imageError ? (
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={post.frontMatter.coverImage}
                alt={post.frontMatter.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                onError={() => setImageError(true)}
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ) : (
            <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {/* Title */}
            <Heading 
              as="h2" 
              size="xl" 
              className="mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2"
            >
              {post.frontMatter.title}
            </Heading>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.frontMatter.tags.map((tag, index) => (
                <span
                  key={tag}
                  className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                    getTagColor(tag, index)
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Meta information */}
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post.frontMatter.publishedAt}>
                {formattedDate}
              </time>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  // Horizontal layout (for regular articles): image on left, content on right
  return (
    <article className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-400 transition-all duration-300">
      <Link href={locale === 'jp' ? `/jp/blog/${post.slug}` : `/blog/${post.slug}`} className="block">
        <div className="flex">
          {/* Left side: Cover image */}
          <div className="w-1/3 relative">
            {post.frontMatter.coverImage && !imageError ? (
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={post.frontMatter.coverImage}
                  alt={post.frontMatter.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={() => setImageError(true)}
                  priority={priority}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ) : (
              <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          {/* Right side: Content */}
          <div className="w-2/3 p-4 flex flex-col justify-between">
            <div>
              {/* Title */}
              <Heading 
                as="h2" 
                size="lg" 
                className="mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2"
              >
                {post.frontMatter.title}
              </Heading>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {post.frontMatter.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                      getTagColor(tag, index)
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              {/* Meta information */}
              <div className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={post.frontMatter.publishedAt}>
                  {formattedDate}
                </time>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}