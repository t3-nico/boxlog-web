import { MetadataRoute } from 'next'
import { getAllBlogPostMetas } from '@/lib/blog'
import { getAllReleaseMetas } from '@/lib/releases'
import { getAllTags } from '@/lib/tags-server'
import { siteConfig } from '@/lib/metadata'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url
  const locales = ['en', 'jp']

  // Helper function to create pages for both locales
  const createLocalizedPages = (
    path: string,
    options: {
      lastModified: Date
      changeFrequency:
        | 'always'
        | 'hourly'
        | 'daily'
        | 'weekly'
        | 'monthly'
        | 'yearly'
        | 'never'
      priority: number
    }
  ) => {
    return locales.map((locale) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: options.lastModified,
      changeFrequency: options.changeFrequency,
      priority: options.priority,
    }))
  }

  // Static pages for both locales
  const staticPages = [
    // Home pages
    ...createLocalizedPages('', {
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    }),
    // Features pages
    ...createLocalizedPages('/features', {
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }),
    // Pricing pages
    ...createLocalizedPages('/pricing', {
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }),
    // About pages
    ...createLocalizedPages('/about', {
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }),
    // Contact pages
    ...createLocalizedPages('/contact', {
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    }),
    // Blog listing pages
    ...createLocalizedPages('/blog', {
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    }),
    // Docs pages
    ...createLocalizedPages('/docs', {
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    }),
    // Releases pages
    ...createLocalizedPages('/releases', {
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }),
    // Search pages
    ...createLocalizedPages('/search', {
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    }),
    // Tags pages
    ...createLocalizedPages('/tags', {
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }),
  ]

  try {
    // Blog posts for both locales
    const blogPosts = await getAllBlogPostMetas()
    const blogPages = blogPosts.flatMap((post) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(
          post.frontMatter.updatedAt || post.frontMatter.publishedAt
        ),
        changeFrequency: 'monthly' as const,
        priority: post.frontMatter.featured ? 0.8 : 0.6,
      }))
    )

    // Release notes for both locales
    const releases = await getAllReleaseMetas()
    const releasePages = releases.flatMap((release) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/releases/${release.frontMatter.version}`,
        lastModified: new Date(release.frontMatter.date),
        changeFrequency: 'yearly' as const,
        priority: 0.7,
      }))
    )

    // Documentation pages for both locales
    const docPaths = [
      '/docs/introduction',
      '/docs/installation',
      '/docs/quickstart',
      '/docs/api-reference/authentication',
      '/docs/guides/quick-start',
    ]
    const docPages = docPaths.flatMap((path) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }))
    )

    // Tag pages for both locales
    const tags = await getAllTags()
    const tagPages = tags.slice(0, 50).flatMap((tag) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/tags/${encodeURIComponent(tag.tag.toLowerCase())}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      }))
    )

    return [
      ...staticPages,
      ...blogPages,
      ...releasePages,
      ...docPages,
      ...tagPages,
    ]
  } catch (error) {
    return staticPages
  }
}
