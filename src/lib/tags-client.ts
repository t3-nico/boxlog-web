// Client-side tag utilities (without fs module)

export interface TagCount {
  tag: string
  count: number
}

export interface TaggedContent {
  type: 'blog' | 'release' | 'doc'
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  category?: string
  featured?: boolean
  version?: string // For releases
  breaking?: boolean // For releases
}

export interface UnifiedTagData {
  tag: string
  totalCount: number
  blog: TaggedContent[]
  releases: TaggedContent[]
  docs: TaggedContent[]
}

// Unified function to determine tag colors (same mechanism as blog)
export function getTagColor(tag: string): string {
  const colors = [
    'bg-blue-100 text-blue-800 hover:bg-blue-200',
    'bg-green-100 text-green-800 hover:bg-green-200',
    'bg-purple-100 text-purple-800 hover:bg-purple-200',
    'bg-pink-100 text-pink-800 hover:bg-pink-200',
    'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
    'bg-red-100 text-red-800 hover:bg-red-200',
    'bg-teal-100 text-teal-800 hover:bg-teal-200',
    'bg-orange-100 text-orange-800 hover:bg-orange-200',
    'bg-cyan-100 text-cyan-800 hover:bg-cyan-200',
  ]
  
  let hash = 0
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash)
  }
  const colorIndex = Math.abs(hash) % colors.length
  return colors[colorIndex]
}