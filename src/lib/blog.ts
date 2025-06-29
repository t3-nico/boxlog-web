import glob from 'fast-glob'

export interface BlogMeta {
  title: string
  description?: string
  date?: string
  image?: string
  tags?: string[]
}

export interface BlogPost {
  slug: string
  metadata: BlogMeta
  type: string
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  let blogFiles = await glob('*/page.mdx', { cwd: 'src/app/blog' })
  let blogPosts = await Promise.all(
    blogFiles.map(async (file) => {
      let mod = await import(`../app/blog/${file}`)
      return {
        slug: `/blog/${file.replace(/\/page\.mdx$/, '')}`,
        metadata: mod.metadata as BlogMeta,
        type: 'blog',
      }
    }),
  )

  let posts = [...blogPosts]

  posts.sort((a, b) => {
    let da = a.metadata.date ? new Date(a.metadata.date).getTime() : 0
    let db = b.metadata.date ? new Date(b.metadata.date).getTime() : 0
    return db - da
  })

  return posts
}
