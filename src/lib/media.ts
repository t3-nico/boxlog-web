import glob from 'fast-glob'

export interface MediaMeta {
  title: string
  description?: string
  date?: string
  image?: string
  tags?: string[]
}

export interface MediaPost {
  slug: string
  metadata: MediaMeta
  type: string
}

export async function getMediaPosts(): Promise<MediaPost[]> {
  let blogFiles = await glob('*/page.mdx', { cwd: 'src/app/blog' })
  let blogPosts = await Promise.all(
    blogFiles.map(async (file) => {
      let mod = await import(`../app/blog/${file}`)
      return {
        slug: `/blog/${file.replace(/\/page\.mdx$/, '')}`,
        metadata: mod.metadata as MediaMeta,
        type: 'blog',
      }
    }),
  )

  let docFiles = await glob('*/page.{mdx,tsx}', { cwd: 'src/app/docs' })
  let docPosts = await Promise.all(
    docFiles.map(async (file) => {
      let mod = await import(`../app/docs/${file}`)
      return {
        slug: `/docs/${file.replace(/\/page\.(mdx|tsx)$/, '')}`,
        metadata: mod.metadata as MediaMeta,
        type: 'docs',
      }
    }),
  )
  let posts = [...blogPosts, ...docPosts]

  posts.sort((a, b) => {
    let da = a.metadata.date ? new Date(a.metadata.date).getTime() : 0
    let db = b.metadata.date ? new Date(b.metadata.date).getTime() : 0
    return db - da
  })

  return posts
}
