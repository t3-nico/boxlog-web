import glob from 'fast-glob'
import Link from 'next/link'

interface PostMeta {
  title: string
  description?: string
  date?: string
  image?: string
}

interface Post {
  slug: string
  metadata: PostMeta
}

export async function BlogPosts() {
  let files = await glob('*/page.mdx', { cwd: 'src/app/blog' })
  let posts: Post[] = await Promise.all(
    files.map(async (file) => {
      // The blog posts live in src/app/blog so we need to import from there
      // relative to this component file.
      let mod = await import(`../app/blog/${file}`)
      return {
        slug: file.replace(/\/page\.mdx$/, ''),
        metadata: mod.metadata as PostMeta,
      }
    })
  )

  posts.sort((a, b) => {
    let da = a.metadata.date ? new Date(a.metadata.date).getTime() : 0
    let db = b.metadata.date ? new Date(b.metadata.date).getTime() : 0
    return db - da
  })

  return (
    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article key={post.slug} className="flex flex-col gap-4">
          {post.metadata.image && (
            <Link href={`/blog/${post.slug}`} className="block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.metadata.image}
                alt={post.metadata.title}
                className="w-full rounded-lg"
              />
            </Link>
          )}
          <h2 className="text-xl font-semibold">
            <Link href={`/blog/${post.slug}`}>{post.metadata.title}</Link>
          </h2>
          {post.metadata.date && (
            <time
              dateTime={post.metadata.date}
              className="block text-sm text-zinc-500"
            >
              {new Date(post.metadata.date).toLocaleDateString()}
            </time>
          )}
          {post.metadata.description && (
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              {post.metadata.description}
            </p>
          )}
        </article>
      ))}
    </div>
  )
}
