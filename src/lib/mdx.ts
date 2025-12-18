import type { ContentCategory, ContentCollection, ContentData, FrontMatter, SerializedContent } from '@/types/content'
import fs from 'fs'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

const CONTENT_PATH = path.join(process.cwd(), 'content/docs')

/**
 * 指定されたディレクトリからMDXファイルを取得
 */
export async function getMDXFiles(dir: string): Promise<string[]> {
  const fullPath = path.join(CONTENT_PATH, dir)

  if (!fs.existsSync(fullPath)) {
    return []
  }

  const files = fs.readdirSync(fullPath)
  return files.filter((file) => file.endsWith('.mdx'))
}

/**
 * MDXファイルを読み込んでフロントマターとコンテンツを解析
 */
export async function getMDXContent(filePath: string): Promise<ContentData | null> {
  try {
    const fullPath = path.join(CONTENT_PATH, filePath)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContent = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContent)

    // スラッグを生成（ファイルパスから）
    const slug = filePath.replace(/\.mdx$/, '').replace(/\\/g, '/')

    // カテゴリーをパスから抽出
    const pathParts = filePath.split('/')
    const category = pathParts[0] || 'general'

    const frontMatter: FrontMatter = {
      title: data.title || 'Untitled',
      description: data.description || '',
      tags: data.tags || [],
      author: data.author,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      slug,
      category,
      order: data.order || 0,
      draft: data.draft || false,
      featured: data.featured || false,
      // AI/RAG用メタデータ
      ai: data.ai || undefined,
    }

    return {
      frontMatter,
      content,
      slug,
      path: filePath,
    }
  } catch {
    return null
  }
}

/**
 * MDXコンテンツをシリアライズ（レンダリング用）
 */
export async function serializeMDX(content: string) {
  return await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
      format: 'mdx',
    },
  })
}

/**
 * 指定されたスラッグのMDXコンテンツを取得してシリアライズ
 */
export async function getSerializedContent(slug: string): Promise<SerializedContent | null> {
  const filePath = `${slug}.mdx`
  const content = await getMDXContent(filePath)

  if (!content) {
    return null
  }

  const mdxSource = await serializeMDX(content.content)

  return {
    mdxSource,
    frontMatter: content.frontMatter,
  }
}

/**
 * MDXコンテンツを直接返す（next-mdx-remote/rsc用）
 */
export async function getMDXContentForRSC(slug: string): Promise<{ content: string; frontMatter: FrontMatter } | null> {
  const filePath = `${slug}.mdx`
  const content = await getMDXContent(filePath)

  if (!content) {
    return null
  }

  return {
    content: content.content,
    frontMatter: content.frontMatter,
  }
}

/**
 * すべてのMDXファイルを取得
 */
export async function getAllContent(): Promise<ContentData[]> {
  const allContent: ContentData[] = []

  async function scanDirectory(dir: string): Promise<void> {
    const fullPath = path.join(CONTENT_PATH, dir)

    if (!fs.existsSync(fullPath)) {
      return
    }

    const items = fs.readdirSync(fullPath, { withFileTypes: true })

    for (const item of items) {
      const itemPath = path.join(dir, item.name)

      if (item.isDirectory()) {
        await scanDirectory(itemPath)
      } else if (item.name.endsWith('.mdx')) {
        const content = await getMDXContent(itemPath)
        if (content && !content.frontMatter.draft) {
          allContent.push(content)
        }
      }
    }
  }

  await scanDirectory('')

  // orderでソート
  return allContent.sort((a, b) => {
    if (a.frontMatter.category !== b.frontMatter.category) {
      return a.frontMatter.category.localeCompare(b.frontMatter.category)
    }
    return (a.frontMatter.order || 0) - (b.frontMatter.order || 0)
  })
}

/**
 * カテゴリー別にコンテンツを取得
 */
export async function getContentByCategory(): Promise<ContentCollection> {
  const allContent = await getAllContent()
  const collection: ContentCollection = {}

  for (const content of allContent) {
    const category = content.frontMatter.category
    if (!collection[category]) {
      collection[category] = []
    }
    collection[category].push(content)
  }

  return collection
}

/**
 * 指定されたカテゴリーのコンテンツを取得
 */
export async function getContentBySlug(category: ContentCategory, slug: string): Promise<SerializedContent | null> {
  const filePath = `${category}/${slug}.mdx`
  return await getSerializedContent(filePath)
}

/**
 * 関連コンテンツを取得（同じカテゴリーから最大3件）
 */
export async function getRelatedContent(
  category: string,
  currentSlug: string,
  limit: number = 3
): Promise<ContentData[]> {
  const allContent = await getAllContent()

  const relatedContent = allContent
    .filter((content) => content.frontMatter.category === category && content.slug !== currentSlug)
    .slice(0, limit)

  return relatedContent
}

/**
 * 検索機能（タイトル、説明、タグで検索）
 */
export async function searchContent(query: string): Promise<ContentData[]> {
  const allContent = await getAllContent()
  const lowercaseQuery = query.toLowerCase()

  return allContent.filter((content) => {
    const { title, description, tags } = content.frontMatter

    return (
      title.toLowerCase().includes(lowercaseQuery) ||
      description.toLowerCase().includes(lowercaseQuery) ||
      tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      content.content.toLowerCase().includes(lowercaseQuery)
    )
  })
}

/**
 * パンくずリスト用のパス情報を生成
 */
export function generateBreadcrumbs(slug: string): Array<{ title: string; href: string; clickable?: boolean }> {
  const breadcrumbs = []

  // Getting Startedセクションのページの場合
  const gettingStartedPages = ['introduction', 'installation', 'quickstart', 'configuration', 'first-steps']
  if (gettingStartedPages.includes(slug)) {
    breadcrumbs.push({
      title: 'Getting Started',
      href: '/docs',
      clickable: false,
    })

    const pageTitle = slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    breadcrumbs.push({
      title: pageTitle,
      href: `/docs/${slug}`,
      clickable: true,
    })

    return breadcrumbs
  }

  // その他のページの場合（カテゴリー部分もクリック不可）
  const parts = slug.split('/')

  let currentPath = '/docs'
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (!part) continue
    currentPath += `/${part}`
    const title = part
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    // 最初の部分（カテゴリー）はクリック不可、最後の部分もクリック不可
    const clickable = i !== 0 && i !== parts.length - 1

    breadcrumbs.push({
      title,
      href: currentPath,
      clickable,
    })
  }

  return breadcrumbs
}
