import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const docsDirectory = join(process.cwd(), 'src/content/docs')

// Docの型定義を追加
export interface Doc {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
}

export function getDocSlugs() {
  return fs.readdirSync(docsDirectory)
}

export function getDocBySlug(slug: string, fields: (keyof Doc)[] = []): Partial<Doc> {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(docsDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items: Partial<Doc> = {}

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllDocs(fields: (keyof Doc)[] = []): Partial<Doc>[] {
  const slugs = getDocSlugs()
  const docs = slugs
    .map((slug) => getDocBySlug(slug, fields))
  return docs
} 