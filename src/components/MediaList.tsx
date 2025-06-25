import { getMediaPosts } from '@/lib/media'
import { MediaListInner } from '@/components/MediaListClient'

export async function MediaList({ initialTag }: { initialTag?: string }) {
  const posts = await getMediaPosts()
  return <MediaListInner posts={posts} initialTag={initialTag} />
}
