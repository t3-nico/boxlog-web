import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

export interface BlogPostFrontMatter {
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  tags: string[]
  category: string
  author: string
  authorAvatar?: string
  coverImage?: string
  draft?: boolean
  featured?: boolean
  readingTime?: number
}

export interface BlogPost {
  slug: string
  frontMatter: BlogPostFrontMatter
  content: string
  excerpt: string
  readingTime: number
}

export interface BlogPostMeta {
  slug: string
  frontMatter: BlogPostFrontMatter
  excerpt: string
  readingTime: number
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

// 読了時間計算（平均200文字/分）
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return Math.max(1, minutes)
}

// 記事の抜粋を生成
export function generateExcerpt(content: string, maxLength: number = 160): string {
  // Markdown記法とHTMLタグを除去
  const cleanContent = content
    .replace(/#{1,6}\s+/g, '') // ヘッダー
    .replace(/\*\*(.+?)\*\*/g, '$1') // Bold
    .replace(/\*(.+?)\*/g, '$1') // Italic
    .replace(/`(.+?)`/g, '$1') // Code
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Links
    .replace(/!\[.*?\]\(.+?\)/g, '') // Images
    .replace(/```[\s\S]*?```/g, '') // Code blocks
    .replace(/\n+/g, ' ') // 改行
    .trim()

  if (cleanContent.length <= maxLength) {
    return cleanContent
  }

  return cleanContent.slice(0, maxLength).trim() + '...'
}

// 全ブログ記事のメタデータを取得
export async function getAllBlogPostMetas(): Promise<BlogPostMeta[]> {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  const files = fs.readdirSync(BLOG_DIR)
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const slug = file.replace('.mdx', '')
        const filePath = path.join(BLOG_DIR, file)
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const { data, content } = matter(fileContent)
        
        const frontMatter = data as BlogPostFrontMatter
        const readingTime = calculateReadingTime(content)
        const excerpt = frontMatter.description || generateExcerpt(content)

        return {
          slug,
          frontMatter: {
            ...frontMatter,
            readingTime
          },
          excerpt,
          readingTime
        }
      })
  )

  // 下書きを除外し、公開日で降順ソート
  return posts
    .filter(post => !post.frontMatter.draft)
    .sort((a, b) => new Date(b.frontMatter.publishedAt).getTime() - new Date(a.frontMatter.publishedAt).getTime())
}

// 個別記事を取得
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
    
    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    
    const frontMatter = data as BlogPostFrontMatter
    
    // 下書きの場合はnullを返す
    if (frontMatter.draft) {
      return null
    }

    const readingTime = calculateReadingTime(content)
    const excerpt = frontMatter.description || generateExcerpt(content)

    return {
      slug,
      frontMatter: {
        ...frontMatter,
        readingTime
      },
      content,
      excerpt,
      readingTime
    }
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error)
    return null
  }
}

// タグ別記事取得
export async function getBlogPostsByTag(tag: string): Promise<BlogPostMeta[]> {
  const allPosts = await getAllBlogPostMetas()
  return allPosts.filter(post => 
    post.frontMatter.tags.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  )
}

// カテゴリ別記事取得
export async function getBlogPostsByCategory(category: string): Promise<BlogPostMeta[]> {
  const allPosts = await getAllBlogPostMetas()
  return allPosts.filter(post => 
    post.frontMatter.category.toLowerCase() === category.toLowerCase()
  )
}

// 関連記事取得
export async function getRelatedPosts(currentSlug: string, maxPosts: number = 3): Promise<BlogPostMeta[]> {
  const allPosts = await getAllBlogPostMetas()
  const currentPost = allPosts.find(post => post.slug === currentSlug)
  
  if (!currentPost) {
    return []
  }

  const currentTags = currentPost.frontMatter.tags
  const currentCategory = currentPost.frontMatter.category

  // 他の記事を関連度順でソート
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      let score = 0
      
      // 同じカテゴリの場合は高スコア
      if (post.frontMatter.category === currentCategory) {
        score += 10
      }
      
      // 共通タグの数でスコア追加
      const commonTags = post.frontMatter.tags.filter(tag => 
        currentTags.includes(tag)
      ).length
      score += commonTags * 5

      return { ...post, score }
    })
    .filter(post => post.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxPosts)

  return relatedPosts.map(({ score, ...post }) => post)
}

// 全タグを取得
export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const allPosts = await getAllBlogPostMetas()
  const tagCounts: Record<string, number> = {}

  allPosts.forEach(post => {
    post.frontMatter.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

// 全カテゴリを取得
export async function getAllCategories(): Promise<{ category: string; count: number }[]> {
  const allPosts = await getAllBlogPostMetas()
  const categoryCounts: Record<string, number> = {}

  allPosts.forEach(post => {
    const category = post.frontMatter.category
    categoryCounts[category] = (categoryCounts[category] || 0) + 1
  })

  return Object.entries(categoryCounts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
}

// 記事検索
export async function searchBlogPosts(query: string): Promise<BlogPostMeta[]> {
  const allPosts = await getAllBlogPostMetas()
  const searchTerm = query.toLowerCase()

  return allPosts.filter(post => {
    const titleMatch = post.frontMatter.title.toLowerCase().includes(searchTerm)
    const descriptionMatch = post.frontMatter.description?.toLowerCase().includes(searchTerm)
    const tagMatch = post.frontMatter.tags.some(tag => 
      tag.toLowerCase().includes(searchTerm)
    )
    const categoryMatch = post.frontMatter.category.toLowerCase().includes(searchTerm)
    const excerptMatch = post.excerpt.toLowerCase().includes(searchTerm)

    return titleMatch || descriptionMatch || tagMatch || categoryMatch || excerptMatch
  })
}

// 注目記事を取得
export async function getFeaturedPosts(): Promise<BlogPostMeta[]> {
  const allPosts = await getAllBlogPostMetas()
  return allPosts.filter(post => post.frontMatter.featured)
}

// 最新記事を取得
export async function getRecentPosts(limit: number = 5): Promise<BlogPostMeta[]> {
  const allPosts = await getAllBlogPostMetas()
  return allPosts.slice(0, limit)
}