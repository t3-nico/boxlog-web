import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { glob } from 'glob'

export interface CompassDoc {
  id: string
  title: string
  path: string
  content: string
  category: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    const compassRoot = join(process.cwd(), 'compass')
    
    // Compassディレクトリが存在するかチェック
    if (!existsSync(compassRoot)) {
      return NextResponse.json({ error: 'Compass directory not found' }, { status: 404 })
    }

    const patterns = [
      'knowledge/app-docs/**/*.md',
      'knowledge/web-docs/**/*.md',
      'architecture/**/*.md',
      'design-system/**/*.md',
      'resources/**/*.md',
      'README.md'
    ]

    const docs: CompassDoc[] = []

    for (const pattern of patterns) {
      try {
        const files = await glob(pattern, { cwd: compassRoot })
        
        for (const file of files) {
          try {
            const fullPath = join(compassRoot, file)
            if (!existsSync(fullPath)) continue
            
            const content = readFileSync(fullPath, 'utf-8')
            const title = extractTitle(content) || file.split('/').pop()?.replace('.md', '') || 'Untitled'
            const category = getCategoryFromPath(file)

            docs.push({
              id: file,
              title,
              path: `compass/${file}`,
              content: content.slice(0, 500), // 検索用に最初の500文字
              category
            })
          } catch (error) {
            console.warn(`Failed to read compass doc: ${file}`, error)
          }
        }
      } catch (error) {
        console.warn(`Failed to glob pattern: ${pattern}`, error)
      }
    }

    // 検索フィルタリング
    let filteredDocs = docs
    if (query) {
      const lowercaseQuery = query.toLowerCase()
      filteredDocs = docs.filter(doc => 
        doc.title.toLowerCase().includes(lowercaseQuery) ||
        doc.content.toLowerCase().includes(lowercaseQuery) ||
        doc.path.toLowerCase().includes(lowercaseQuery)
      ).sort((a, b) => {
        // タイトルマッチを優先
        const aInTitle = a.title.toLowerCase().includes(lowercaseQuery)
        const bInTitle = b.title.toLowerCase().includes(lowercaseQuery)
        
        if (aInTitle && !bInTitle) return -1
        if (!aInTitle && bInTitle) return 1
        
        return a.title.localeCompare(b.title)
      })
    }

    return NextResponse.json({ docs: filteredDocs })

  } catch (error) {
    console.error('Failed to load compass docs:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function extractTitle(content: string): string | null {
  const titleMatch = content.match(/^#\s+(.+)$/m)
  return titleMatch ? titleMatch[1].trim() : null
}

function getCategoryFromPath(filePath: string): string {
  const parts = filePath.split('/')
  if (parts.includes('app-docs')) return '📱 App Docs'
  if (parts.includes('web-docs')) return '🌐 Web Docs'
  if (parts.includes('architecture')) return '🏗️ Architecture'
  if (parts.includes('design-system')) return '🎨 Design System'
  if (parts.includes('resources')) return '🔗 Resources'
  return '📄 Documentation'
}