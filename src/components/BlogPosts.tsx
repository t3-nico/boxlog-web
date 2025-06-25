import glob from 'fast-glob'
import Link from 'next/link'

interface PostMeta {
  title: string
  description?: string
  date?: string
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
    <ul className="space-y-10">
      {posts.map((post) => (
        <li key={post.slug}>
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
        </li>
      ))}
    </ul>
  )
}
