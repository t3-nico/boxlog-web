import { getAllDocTags } from './docsApi'
import { getAllPostTags } from './api'
import { getAllReleaseTags } from './releases'

export async function getAllTags(): Promise<string[]> {
  const [docTags, postTags, releaseTags] = await Promise.all([
    getAllDocTags(),
    Promise.resolve(getAllPostTags()),
    Promise.resolve(getAllReleaseTags())
  ])
  return Array.from(new Set([...docTags, ...postTags, ...releaseTags]))
}
