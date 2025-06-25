import Link from 'next/link'
import { getMediaPosts } from '@/lib/media'

export const metadata = {
  title: 'Tags',
}

export default async function TagsPage() {
  const posts = await getMediaPosts()
  const tagCounts: Record<string, number> = {}
  for (const post of posts) {
    for (const tag of post.metadata.tags ?? []) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    }
  }
  const tags = Object.entries(tagCounts)

  return (
    <div className="prose mx-auto max-w-3xl">
      <h1>Tags</h1>
      <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {tags.map(([tag, count]) => (
          <li key={tag}>
            <Link href={`/tags/${tag}`} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-zinc-800 dark:text-zinc-200">
              {tag} ({count})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
