import { MetadataRoute } from 'next'
import { getAllPosts } from '../lib/api'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts(['slug', 'date'])
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://boxlog.vercel.app/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }))

  return [
    {
      url: 'https://boxlog.vercel.app',
      lastModified: new Date(),
    },
    {
      url: 'https://boxlog.vercel.app/docs',
      lastModified: new Date(),
    },
    {
        url: 'https://boxlog.vercel.app/release',
        lastModified: new Date(),
    },
    {
        url: 'https://boxlog.vercel.app/login',
        lastModified: new Date(),
    },
    ...blogEntries,
  ]
} 