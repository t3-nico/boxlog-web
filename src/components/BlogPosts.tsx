import glob from 'fast-glob'
import Link from 'next/link'

interface PostMeta {
  title: string
  description?: string
  date?: string
  image?: string
  tags?: string[]
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
    <div
      className="not-prose mx-auto grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3 sm:px-6 lg:px-8"
    >
      {posts.map((post) => (
        <article
          key={post.slug}
          className="group overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-zinc-200 transition hover:shadow-lg dark:bg-zinc-800/50 dark:ring-zinc-700"
        >
          {post.metadata.image && (
            <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.metadata.image}
                alt={post.metadata.title}
                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          )}
          <div className="space-y-2 p-4">
            {post.metadata.tags && (
              <div className="flex flex-wrap gap-2">
                {post.metadata.tags.map((tag) => (
                  <Link
                    href={`/tags/${tag}`}
                    key={tag}
                    className="rounded-full bg-gray-100 px-2 py-0.5 text-sm text-gray-700 transition hover:bg-gray-200 dark:bg-zinc-800 dark:text-zinc-200"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
            <h2 className="text-lg font-semibold">
              <Link href={`/blog/${post.slug}`}>{post.metadata.title}</Link>
            </h2>
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
  )
}
