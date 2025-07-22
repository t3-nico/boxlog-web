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

// Unified function to determine tag colors - now using CSS variables
export function getTagColor(tag: string): string {
  // ハッシュ値に基づいてニュートラルまたはアクセントカラーを選択
  let hash = 0
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  // アクセントカラーを一部のタグにのみ適用（約20%の割合）
  const useAccent = Math.abs(hash) % 5 === 0
  
  if (useAccent) {
    return 'bg-[rgb(var(--tag-accent-bg))] text-[rgb(var(--tag-accent-text))] hover:bg-[rgb(var(--tag-accent-hover))]'
  } else {
    return 'bg-[rgb(var(--tag-neutral-bg))] text-[rgb(var(--tag-neutral-text))] hover:bg-[rgb(var(--tag-neutral-hover))]'
  }
}