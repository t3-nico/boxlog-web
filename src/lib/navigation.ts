import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface NavigationItem {
  title: string
  href?: string
  icon?: React.ComponentType<{ className?: string }>
  items?: NavigationItem[]
  badge?: string
  external?: boolean
  order?: number
}

export interface NavigationSection {
  title: string
  items: NavigationItem[]
  order?: number
}

interface FileInfo {
  title: string
  href: string
  order: number
  category: string
  slug: string
  featured?: boolean
  badge?: string
}

const CONTENT_PATH = path.join(process.cwd(), 'content/docs')

/**
 * MDXファイルからフロントマターを取得
 */
function getFileInfo(filePath: string, relativePath: string): FileInfo | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data: frontMatter } = matter(fileContent)
    
    // パスからcategoryとslugを決定
    const pathParts = relativePath.replace('.mdx', '').split('/')
    let category: string
    let slug: string
    
    if (pathParts.length === 1) {
      // ルートレベルのファイル (例: introduction.mdx)
      category = frontMatter.category || 'getting-started'
      slug = pathParts[0]
    } else {
      // サブディレクトリのファイル (例: api-reference/authentication.mdx)
      category = pathParts[0]
      slug = pathParts.join('/')
    }
    
    // フロントマターのslugを優先使用
    if (frontMatter.slug) {
      slug = frontMatter.slug
    }
    
    return {
      title: frontMatter.title || slug.charAt(0).toUpperCase() + slug.slice(1),
      href: `/docs/${slug}`,
      order: frontMatter.order || 999,
      category: frontMatter.category || category,
      slug,
      featured: frontMatter.featured,
      badge: frontMatter.badge
    }
  } catch (error) {
    console.warn(`Failed to parse file: ${filePath}`, error)
    return null
  }
}

/**
 * ディレクトリを再帰的にスキャンしてMDXファイルを取得
 */
function scanDirectory(dirPath: string, basePath: string = ''): FileInfo[] {
  const files: FileInfo[] = []
  
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name)
      const relativePath = path.join(basePath, entry.name)
      
      if (entry.isDirectory()) {
        // サブディレクトリを再帰的にスキャン
        files.push(...scanDirectory(fullPath, relativePath))
      } else if (entry.name.endsWith('.mdx')) {
        // MDXファイルを処理
        const fileInfo = getFileInfo(fullPath, relativePath)
        if (fileInfo) {
          files.push(fileInfo)
        }
      }
    }
  } catch (error) {
    console.warn(`Failed to scan directory: ${dirPath}`, error)
  }
  
  return files
}

/**
 * カテゴリ名を適切な表示名に変換
 */
function getCategoryDisplayName(category: string): string {
  const categoryMap: Record<string, string> = {
    'getting-started': 'Getting Started',
    'api-reference': 'API Reference',
    'guides': 'Guides',
    'examples': 'Examples',
    'resources': 'Resources'
  }
  
  return categoryMap[category] || category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * MDXファイルから動的にナビゲーション構造を生成
 */
export function generateDocsNavigation(): NavigationSection[] {
  if (!fs.existsSync(CONTENT_PATH)) {
    console.warn('Content directory not found:', CONTENT_PATH)
    return []
  }
  
  // すべてのMDXファイルをスキャン
  const allFiles = scanDirectory(CONTENT_PATH)
  
  // カテゴリ別にグループ化
  const categorizedFiles = allFiles.reduce((acc, file) => {
    if (!acc[file.category]) {
      acc[file.category] = []
    }
    acc[file.category].push(file)
    return acc
  }, {} as Record<string, FileInfo[]>)
  
  // カテゴリ順序を定義
  const categoryOrder: Record<string, number> = {
    'getting-started': 1,
    'api-reference': 2,
    'guides': 3,
    'examples': 4,
    'resources': 5
  }
  
  // ナビゲーション構造を構築
  const navigation: NavigationSection[] = Object.entries(categorizedFiles)
    .map(([category, files]) => {
      // ファイルをorder順でソート
      const sortedFiles = files.sort((a, b) => a.order - b.order)
      
      // NavigationItemに変換
      const items: NavigationItem[] = sortedFiles.map(file => ({
        title: file.title,
        href: file.href,
        badge: file.badge,
        order: file.order
      }))
      
      return {
        title: getCategoryDisplayName(category),
        items,
        order: categoryOrder[category] || 999
      }
    })
    .sort((a, b) => (a.order || 999) - (b.order || 999))
  
  return navigation
}

/**
 * 静的データ（後方互換性のため保持）
 */
export const docsNavigation: NavigationSection[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs/introduction' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Quick Start', href: '/docs/quickstart' },
    ],
  }
]