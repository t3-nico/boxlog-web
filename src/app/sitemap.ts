import { MetadataRoute } from 'next'
import { getAllBlogPostMetas } from '@/lib/blog'
import { getAllReleaseMetas } from '@/lib/releases'
import { getAllTags } from '@/lib/tags-server'
import { siteConfig } from '@/lib/metadata'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/releases`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/tags`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
  ]

  try {
    // Blog posts
    const blogPosts = await getAllBlogPostMetas()
    const blogPages = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.frontMatter.updatedAt || post.frontMatter.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: post.frontMatter.featured ? 0.8 : 0.6,
    }))

    // Release notes
    const releases = await getAllReleaseMetas()
    const releasePages = releases.map((release) => ({
      url: `${baseUrl}/releases/${release.frontMatter.version}`,
      lastModified: new Date(release.frontMatter.date),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    }))

    // Documentation pages
    // Note: You'll need to implement getAllDocMetas or use the existing function from tags-server
    const docPages = [
      {
        url: `${baseUrl}/docs/introduction`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/docs/installation`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/docs/quickstart`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/docs/api-reference/authentication`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/docs/guides/quick-start`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
    ]

    // Tag pages
    const tags = await getAllTags()
    const tagPages = tags.slice(0, 50).map((tag) => ({
      url: `${baseUrl}/tags/${encodeURIComponent(tag.tag.toLowerCase())}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }))

    return [
      ...staticPages,
      ...blogPages,
      ...releasePages,
      ...docPages,
      ...tagPages,
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}