"use client"

import Link from 'next/link'
import { useState } from 'react'
import clsx from 'clsx'
import type { BlogPost } from '@/lib/blog'

export function BlogListInner({
  posts,
  initialTag,
}: {
  posts: BlogPost[]
  initialTag?: string
}) {
  const [tag, setTag] = useState(initialTag ?? 'all')
  const [page, setPage] = useState(1)
  const pageSize = 12

  let tags = Array.from(
    new Set(posts.flatMap((p) => p.metadata.tags ?? [])),
  )

  let filtered = posts.filter((p) =>
    tag === 'all' ? true : p.metadata.tags?.includes(tag),
  )

  let visible = filtered.slice(0, page * pageSize)
  let hasMore = visible.length < filtered.length

  return (
    <div className="not-prose">
      {/* タグフィルター */}
      {tags.length > 0 && (
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              setTag('all')
              setPage(1)
            }}
            className={clsx(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors',
              tag === 'all'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
            )}
          >
            すべて
          </button>
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => {
                setTag(t)
                setPage(1)
              }}
              className={clsx(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                tag === t
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
              )}
            >
              {t}
            </button>
          ))}
        </div>
      )}
      
      {/* ブログカードグリッド */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {visible.map((post) => (
          <article
            key={post.slug}
            className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            {/* 画像 */}
            <Link href={post.slug}>
              <div className="aspect-video overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.metadata.image || `https://picsum.photos/seed/${post.slug}/400/225`}
                  alt={post.metadata.title || "Blog post image"}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
            
            {/* コンテンツ */}
            <div className="p-6">
              {/* タグ */}
              {post.metadata.tags && post.metadata.tags.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {post.metadata.tags.slice(0, 2).map((tag) => (
                    <Link
                      href={`/tags/${tag}`}
                      key={tag}
                      className="rounded bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
              
              {/* タイトル */}
              <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                <Link href={post.slug} className="hover:text-emerald-600 dark:hover:text-emerald-400">
                  {post.metadata.title}
                </Link>
              </h3>
              
              {/* 日付 */}
              {post.metadata.date && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <time dateTime={post.metadata.date}>
                    {new Date(post.metadata.date).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* 空の状態 */}
      {visible.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">該当する記事が見つかりませんでした。</p>
        </div>
      )}

      {/* もっと見るボタン */}
      {hasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg bg-emerald-600 px-6 py-3 text-white font-medium hover:bg-emerald-700 transition-colors"
          >
            もっと見る
          </button>
        </div>
      )}
    </div>
  )
}