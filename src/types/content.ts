import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export interface FrontMatter {
  title: string
  description: string
  tags?: string[]
  author?: string
  publishedAt?: string
  updatedAt?: string
  slug: string
  category: string
  order?: number
  draft?: boolean
  featured?: boolean
}

export interface ContentData {
  frontMatter: FrontMatter
  content: string
  slug: string
  path: string
}

export interface SerializedContent {
  mdxSource: MDXRemoteSerializeResult
  frontMatter: FrontMatter
}

export interface ContentCollection {
  [key: string]: ContentData[]
}

export interface TableOfContentsItem {
  id: string
  title: string
  level: number
  children?: TableOfContentsItem[]
}

export interface NavigationItem {
  title: string
  href?: string
  items?: NavigationItem[]
  badge?: string
  external?: boolean
}

export interface CategoryInfo {
  name: string
  description: string
  slug: string
  order: number
}

export type ContentCategory =
  | 'getting-started'
  | 'api-reference'
  | 'guides'
  | 'examples'
  | 'resources'
