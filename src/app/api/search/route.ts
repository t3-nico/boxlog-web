import { NextRequest, NextResponse } from 'next/server'
import { getAllBlogPostMetas } from '@/lib/blog'
import { getAllReleaseMetas } from '@/lib/releases'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Get document metadata
async function getAllDocMetas() {
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
  const docMetas: any[] = []

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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    
    if (!query || query.trim().length === 0) {
      return NextResponse.json({ results: [] })
    }

    const [blogPosts, releases, docs] = await Promise.all([
      getAllBlogPostMetas().catch(() => []),
      getAllReleaseMetas().catch(() => []),
      getAllDocMetas().catch(() => [])
    ])

    const searchTerm = query.toLowerCase()
    const results = []

    // Search blog posts
    for (const post of blogPosts) {
      const titleMatch = post.frontMatter.title.toLowerCase().includes(searchTerm)
      const descriptionMatch = post.frontMatter.description?.toLowerCase().includes(searchTerm) || false
      const tagMatch = post.frontMatter.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) || false
      
      if (titleMatch || descriptionMatch || tagMatch) {
        results.push({
          id: post.slug,
          title: post.frontMatter.title,
          description: post.frontMatter.description || '',
          url: `/blog/${post.slug}`,
          type: 'blog',
          breadcrumbs: ['Blog', post.frontMatter.category || 'Uncategorized'],
          lastModified: post.frontMatter.publishedAt,
          tags: post.frontMatter.tags || []
        })
      }
    }

    // Search releases
    for (const release of releases) {
      const titleMatch = release.frontMatter.title.toLowerCase().includes(searchTerm)
      const descriptionMatch = release.frontMatter.description?.toLowerCase().includes(searchTerm) || false
      const tagMatch = release.frontMatter.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) || false
      
      if (titleMatch || descriptionMatch || tagMatch) {
        results.push({
          id: release.frontMatter.version || release.slug,
          title: release.frontMatter.title,
          description: release.frontMatter.description || '',
          url: `/releases/${release.frontMatter.version || release.slug}`,
          type: 'release',
          breadcrumbs: ['Releases', release.frontMatter.version || release.slug],
          lastModified: release.frontMatter.date,
          tags: release.frontMatter.tags || []
        })
      }
    }

    // Search documents
    for (const doc of docs) {
      const titleMatch = doc.title.toLowerCase().includes(searchTerm)
      const descriptionMatch = doc.description?.toLowerCase().includes(searchTerm) || false
      const tagMatch = doc.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm)) || false
      
      if (titleMatch || descriptionMatch || tagMatch) {
        results.push({
          id: doc.slug,
          title: doc.title,
          description: doc.description || '',
          url: `/docs/${doc.slug}`,
          type: 'docs',
          breadcrumbs: ['Documentation', doc.category || 'Uncategorized'],
          lastModified: doc.date,
          tags: doc.tags || []
        })
      }
    }

    // Sort by relevance (prioritize title matches)
    results.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(searchTerm)
      const bTitleMatch = b.title.toLowerCase().includes(searchTerm)
      
      if (aTitleMatch && !bTitleMatch) return -1
      if (!aTitleMatch && bTitleMatch) return 1
      
      return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
    })

    return NextResponse.json({ results: results.slice(0, 50) })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}