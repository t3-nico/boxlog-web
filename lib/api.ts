import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), '_posts')

// Postの型定義を追加
export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  content: string;
  tags?: string[];
}

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string, fields: (keyof Post)[] = []): Partial<Post> {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items: Partial<Post> = {}

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

export function getAllPosts(fields: (keyof Post)[] = []): Partial<Post>[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => ((post1.date || '') > (post2.date || '') ? -1 : 1))
  return posts
}

export function getPostsByTag(tag: string, fields: (keyof Post)[] = []): Partial<Post>[] {
  const posts = getAllPosts([...fields, 'tags'])
  return posts.filter((post) => Array.isArray(post.tags) && post.tags.includes(tag))
}

export function getAllPostTags(): string[] {
  const posts = getAllPosts(['tags'])
  const tags = new Set<string>()
  posts.forEach((post) => {
    post.tags?.forEach((t) => tags.add(t))
  })
  return Array.from(tags)
}
