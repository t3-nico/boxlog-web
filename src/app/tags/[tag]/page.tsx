import { notFound } from 'next/navigation'
import { MediaList } from '@/components/MediaList'
import { getMediaPosts } from '@/lib/media'

export async function generateMetadata({ params }: { params: { tag: string } }) {
  return { title: `Tag: ${params.tag}` }
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const posts = await getMediaPosts()
  const hasTag = posts.some((p) => p.metadata.tags?.includes(params.tag))
  if (!hasTag) notFound()
  return (
    <div className="prose mx-auto max-w-3xl">
      <h1>Tag: {params.tag}</h1>
      <MediaList initialTag={params.tag} />
    </div>
  )
}
