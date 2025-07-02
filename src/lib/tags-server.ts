import { getAllBlogPostMetas } from './blog'
import { getAllReleaseMetas } from './releases'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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

// ドキュメントのメタデータを取得
async function getAllDocMetas(): Promise<TaggedContent[]> {
  const docsDirectory = path.join(process.cwd(), 'content/docs')
  
  if (!fs.existsSync(docsDirectory)) {
    return []
  }

  const getAllMdxFiles = (dir: string): string[] => {
    const files: string[] = []
    const items = fs.readdirSync(dir)
    
    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        files.push(...getAllMdxFiles(fullPath))
      } else if (item.endsWith('.mdx') || item.endsWith('.md')) {
        files.push(fullPath)
      }
    }
    
    return files
  }

  const mdxFiles = getAllMdxFiles(docsDirectory)
  const docMetas: TaggedContent[] = []

  for (const filePath of mdxFiles) {
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data: frontMatter } = matter(fileContents)
      
      // Skip draft content
      if (frontMatter.draft) continue
      
      // Generate slug from file path
      const relativePath = path.relative(docsDirectory, filePath)
      const slug = relativePath.replace(/\.(mdx?|md)$/, '').replace(/\\/g, '/')
      
      docMetas.push({
        type: 'doc',
        slug: slug,
        title: frontMatter.title || 'Untitled',
        description: frontMatter.description || '',
        date: frontMatter.publishedAt || frontMatter.updatedAt || new Date().toISOString(),
        tags: frontMatter.tags || [],
        category: frontMatter.category,
        featured: frontMatter.featured || false,
      })
    } catch (error) {
      console.warn(`Error processing doc file ${filePath}:`, error)
    }
  }

  return docMetas.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// 全コンテンツタイプからタグとその使用回数を取得
export async function getAllTags(): Promise<TagCount[]> {
  const [blogPosts, releases, docs] = await Promise.all([
    getAllBlogPostMetas(),
    getAllReleaseMetas(),
    getAllDocMetas()
  ])

  const tagCounts = new Map<string, number>()

  // ブログ記事のタグを集計
  blogPosts.forEach(post => {
    post.frontMatter.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })

  // リリースのタグを集計
  releases.forEach(release => {
    release.frontMatter.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })

  // ドキュメントのタグを集計
  docs.forEach(doc => {
    doc.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

// 特定のタグに関連するすべてのコンテンツを取得
export async function getContentByTag(tag: string): Promise<UnifiedTagData> {
  const [blogPosts, releases, docs] = await Promise.all([
    getAllBlogPostMetas(),
    getAllReleaseMetas(), 
    getAllDocMetas()
  ])

  const normalizedTag = tag.toLowerCase()

  // ブログ記事をフィルタリング
  const blogContent: TaggedContent[] = blogPosts
    .filter(post => post.frontMatter.tags.some(t => t.toLowerCase() === normalizedTag))
    .map(post => ({
      type: 'blog' as const,
      slug: post.slug,
      title: post.frontMatter.title,
      description: post.frontMatter.description,
      date: post.frontMatter.publishedAt,
      tags: post.frontMatter.tags,
      category: post.frontMatter.category,
      featured: post.frontMatter.featured,
    }))

  // リリースをフィルタリング
  const releaseContent: TaggedContent[] = releases
    .filter(release => release.frontMatter.tags.some(t => t.toLowerCase() === normalizedTag))
    .map(release => ({
      type: 'release' as const,
      slug: release.frontMatter.version,
      title: release.frontMatter.title,
      description: release.frontMatter.description,
      date: release.frontMatter.date,
      tags: release.frontMatter.tags,
      featured: release.frontMatter.featured,
      version: release.frontMatter.version,
      breaking: release.frontMatter.breaking,
    }))

  // ドキュメントをフィルタリング
  const docContent: TaggedContent[] = docs.filter(doc => doc.tags.some(t => t.toLowerCase() === normalizedTag))

  const totalCount = blogContent.length + releaseContent.length + docContent.length

  // 元のタグ名を取得（最初に見つかったマッチング）
  const originalTag = [...blogContent, ...releaseContent, ...docContent]
    .flatMap(content => content.tags)
    .find(t => t.toLowerCase() === normalizedTag) || tag

  return {
    tag: originalTag,
    totalCount,
    blog: blogContent,
    releases: releaseContent,
    docs: docContent,
  }
}

// よく使われるタグを取得
export async function getPopularTags(limit: number = 10): Promise<TagCount[]> {
  const allTags = await getAllTags()
  return allTags.slice(0, limit)
}

// 関連タグを取得（共通して使われているタグ）
export async function getRelatedTags(currentTag: string, limit: number = 5): Promise<string[]> {
  const contentByTag = await getContentByTag(currentTag)
  const allContent = [...contentByTag.blog, ...contentByTag.releases, ...contentByTag.docs]
  
  const relatedTagCounts = new Map<string, number>()
  const normalizedCurrentTag = currentTag.toLowerCase()
  
  allContent.forEach(content => {
    content.tags.forEach(tag => {
      if (tag.toLowerCase() !== normalizedCurrentTag) {
        relatedTagCounts.set(tag, (relatedTagCounts.get(tag) || 0) + 1)
      }
    })
  })

  return Array.from(relatedTagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag)
}

// カテゴリ別タグ統計
export async function getTagsByCategory(): Promise<Record<string, TagCount[]>> {
  const [blogPosts, releases, docs] = await Promise.all([
    getAllBlogPostMetas(),
    getAllReleaseMetas(),
    getAllDocMetas()
  ])

  const categorizedTags: Record<string, Map<string, number>> = {
    blog: new Map(),
    releases: new Map(),
    docs: new Map(),
  }

  // ブログタグを集計
  blogPosts.forEach(post => {
    post.frontMatter.tags.forEach(tag => {
      categorizedTags.blog.set(tag, (categorizedTags.blog.get(tag) || 0) + 1)
    })
  })

  // リリースタグを集計
  releases.forEach(release => {
    release.frontMatter.tags.forEach(tag => {
      categorizedTags.releases.set(tag, (categorizedTags.releases.get(tag) || 0) + 1)
    })
  })

  // ドキュメントタグを集計
  docs.forEach(doc => {
    doc.tags.forEach(tag => {
      categorizedTags.docs.set(tag, (categorizedTags.docs.get(tag) || 0) + 1)
    })
  })

  // Map を TagCount[] に変換
  const result: Record<string, TagCount[]> = {}
  
  Object.entries(categorizedTags).forEach(([category, tagMap]) => {
    result[category] = Array.from(tagMap.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
  })

  return result
}