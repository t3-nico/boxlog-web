import Link from 'next/link'
import { getDocsByTag } from '@/lib/docsApi'
import { getPostsByTag } from '@/lib/api'
import { getReleasesByTag } from '@/lib/releases'
import { getAllTags } from '@/lib/tags'

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map(tag => ({ tag }))
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const { tag } = params
  const [docs, posts, releases] = await Promise.all([
    getDocsByTag(tag, ['slug', 'title']),
    Promise.resolve(getPostsByTag(tag, ['slug', 'title', 'date'])),
    Promise.resolve(getReleasesByTag(tag))
  ])
  return (
    <div className="container mx-auto px-5 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-white">Tag: {tag}</h1>
      {docs.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white">Docs</h2>
          <ul className="list-disc list-inside">
            {docs.map(doc => (
              <li key={doc.slug}>
                <Link href={`/docs/${doc.slug}`} className="text-blue-400 hover:underline">{doc.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {posts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white">Blog</h2>
          <ul className="list-disc list-inside">
            {posts.map(post => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="text-blue-400 hover:underline">{post.title}</Link>
                {post.date && <span className="ml-2 text-sm text-zinc-400">{new Date(post.date).toLocaleDateString('ja-JP')}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
      {releases.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2 text-white">Releases</h2>
          <ul className="list-disc list-inside">
            {releases.map((rel, idx) => (
              <li key={idx}>
                <span className="font-mono">v{rel.version}</span> - {rel.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
