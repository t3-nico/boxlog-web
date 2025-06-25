"use client"

import Link from 'next/link'
import { useState } from 'react'
import clsx from 'clsx'
import type { MediaPost } from '@/lib/media'

export function MediaListInner({
  posts,
  initialTag,
}: {
  posts: MediaPost[]
  initialTag?: string
}) {
  const [tag, setTag] = useState(initialTag ?? 'all')
  const [page, setPage] = useState(1)
  const pageSize = 6

  let tags = Array.from(
    new Set(posts.flatMap((p) => p.metadata.tags ?? [])),
  )

  let filtered = posts.filter((p) =>
    tag === 'all' ? true : p.metadata.tags?.includes(tag),
  )

  let visible = filtered.slice(0, page * pageSize)
  let hasMore = visible.length < filtered.length

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => {
            setTag('all')
            setPage(1)
          }}
          className={clsx(
            'rounded-full px-3 py-1 text-sm transition',
            tag === 'all'
              ? 'bg-emerald-500 text-white'
              :
                'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700',
          )}
        >
          All
        </button>
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => {
              setTag(t)
              setPage(1)
            }}
            className={clsx(
              'rounded-full px-3 py-1 text-sm transition',
              tag === t
                ? 'bg-emerald-500 text-white'
                :
                  'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700',
            )}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <article
            key={post.slug}
            className="group overflow-hidden rounded-lg shadow-md transition hover:shadow-lg"
          >
            {post.metadata.image && (
              <Link href={post.slug} className="block overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.metadata.image}
                  alt=""
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            )}
            <div className="space-y-2 p-4">
              <div className="flex flex-wrap gap-2">
                {post.metadata.tags?.map((tag) => (
                  <Link
                    href={`/tags/${tag}`}
                    key={tag}
                    className="rounded-full bg-gray-100 px-2 py-0.5 text-sm text-gray-700 dark:bg-zinc-800 dark:text-zinc-200"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              <h3 className="text-lg font-semibold">
                <Link href={post.slug}>{post.metadata.title}</Link>
              </h3>
              {post.metadata.date && (
                <time
                  dateTime={post.metadata.date}
                  className="block text-sm text-gray-500 dark:text-zinc-400"
                >
                  {new Date(post.metadata.date).toLocaleDateString()}
                </time>
              )}
            </div>
          </article>
        ))}
      </div>
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="rounded bg-emerald-500 px-4 py-2 text-white transition hover:bg-emerald-600"
          >
            もっと見る
          </button>
        </div>
      )}
    </div>
  )
}
