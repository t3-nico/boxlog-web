import Link from 'next/link'
import { getAllPosts } from '../../../lib/api'

export default function BlogIndex() {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'excerpt'])

  return (
    <div className="container mx-auto px-5 py-12">
      <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left text-white">
        Blog
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-x-16 lg:gap-x-32 ">
        {allPosts.map((post) => (
          <div key={post.slug}>
            <h3 className="text-3xl mb-3 leading-snug">
              <Link href={`/blog/${post.slug}`} className="hover:underline text-white">
                {post.title}
              </Link>
            </h3>
            <div className="text-lg mb-4 text-zinc-400">
              {post.date && new Date(post.date).toLocaleDateString('ja-JP')}
            </div>
            <p className="text-lg leading-relaxed mb-4 text-zinc-300">{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 