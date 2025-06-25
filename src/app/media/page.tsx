import { MediaList } from '@/components/MediaList'

export const metadata = {
  title: 'Media',
  description: '最新のメディア記事一覧です。',
}

export default function MediaPage() {
  return (
    <div className="prose mx-auto max-w-3xl">
      <h1>Media</h1>
      <MediaList />
    </div>
  )
}
