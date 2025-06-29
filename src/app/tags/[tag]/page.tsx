import { notFound } from 'next/navigation'
import { BlogList } from '@/components/BlogList'
import { getBlogPosts } from '@/lib/blog'

export async function generateMetadata({ params }: { params: { tag: string } }) {
  return { title: `Tag: ${params.tag}` }
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const posts = await getBlogPosts()
  const hasTag = posts.some((p) => p.metadata.tags?.includes(params.tag))
  if (!hasTag) notFound()
  return (
    <div className="prose mx-auto max-w-3xl">
      <h1>Tag: {params.tag}</h1>
      <BlogList initialTag={params.tag} />
    </div>
  )
}
