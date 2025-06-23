import fs from 'fs/promises'
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

export async function getDocSlugs(): Promise<string[]> {
  async function walk(dir: string, prefix = ''): Promise<string[]> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const items: string[] = [];
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const children = await walk(join(dir, entry.name), prefix + entry.name + '/');
        items.push(...children);
      } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
        items.push(prefix + entry.name.replace(/\.mdx$/, ''));
      }
    }
    return items;
  }
  return walk(docsDirectory);
}

export async function getDocBySlug(slug: string, fields: (keyof Doc)[] = []): Promise<Partial<Doc>> {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(docsDirectory, `${realSlug}.mdx`)
  try {
    const fileContents = await fs.readFile(fullPath, 'utf8')
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
  } catch (e) {
    return {};
  }
}

export async function getAllDocs(fields: (keyof Doc)[] = []): Promise<Partial<Doc>[]> {
  const slugs = await getDocSlugs()
  const docs = await Promise.all(slugs.map((slug) => getDocBySlug(slug, fields)))
  return docs
} 