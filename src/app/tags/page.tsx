import Link from 'next/link'
import { getAllTags } from '@/lib/tags'

export default async function TagsIndex() {
  const tags = await getAllTags()
  return (
    <div className="container mx-auto px-5 py-12">
      <h1 className="text-3xl font-bold mb-6 text-white">Tags</h1>
      <ul className="space-y-2">
        {tags.map(tag => (
          <li key={tag}>
            <Link href={`/tags/${tag}`} className="text-blue-400 hover:underline">#{tag}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
