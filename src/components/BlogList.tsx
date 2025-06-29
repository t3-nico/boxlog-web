import { getBlogPosts } from '@/lib/blog'
import { BlogListInner } from '@/components/BlogListClient'

export async function BlogList({ initialTag }: { initialTag?: string }) {
  const posts = await getBlogPosts()
  return <BlogListInner posts={posts} initialTag={initialTag} />
}
