import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  getAllContent,
  getMDXContentForRSC,
  getRelatedContent,
} from '@/lib/mdx'
import { mdxComponents } from '@/components/docs/MDXComponents'
import { Breadcrumbs } from '@/components/docs/Breadcrumbs'
import { PageNavigation } from '@/components/docs/PageNavigation'
import { ClientTableOfContents } from '@/components/docs/ClientTableOfContents'
import { Heading, Text } from '@/components/ui/typography'
import { ContentData } from '@/types/content'

interface PageParams {
  locale: string
  slug: string[]
}

interface DocPageProps {
  params: PageParams
}

// Generate static parameters (SEO optimization)
export async function generateStaticParams(): Promise<PageParams[]> {
  try {
    const allContent = await getAllContent()
    const locales = ['en', 'jp']

    const params: PageParams[] = []

    for (const locale of locales) {
      for (const content of allContent) {
        params.push({
          locale,
          slug: content.slug.split('/'),
        })
      }
    }

    return params
  } catch {
    return []
  }
}

// Generate metadata
export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  try {
    const category = params.slug[0] as any
    const contentSlug = params.slug.slice(1).join('/')

    const content = await getMDXContentForRSC(`${category}/${contentSlug}`)

    if (!content) {
      return {
        title: 'Page Not Found - YourSaaS Documentation',
        description: 'The requested documentation page could not be found.',
      }
    }

    const { frontMatter } = content

    return {
      title: `${frontMatter.title} - YourSaaS Documentation`,
      description: frontMatter.description,
      keywords: frontMatter.tags?.join(', '),
      authors: frontMatter.author ? [{ name: frontMatter.author }] : undefined,
      openGraph: {
        title: frontMatter.title,
        description: frontMatter.description,
        type: 'article',
        publishedTime: frontMatter.publishedAt,
        modifiedTime: frontMatter.updatedAt,
        tags: frontMatter.tags,
        authors: frontMatter.author ? [frontMatter.author] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: frontMatter.title,
        description: frontMatter.description,
      },
    }
  } catch {
    return {
      title: 'Documentation - YourSaaS',
      description: 'YourSaaS documentation and guides',
    }
  }
}

// Get adjacent pages
async function getAdjacentPages(slug: string): Promise<{
  previousPage?: ContentData
  nextPage?: ContentData
}> {
  try {
    const allContent = await getAllContent()
    const currentIndex = allContent.findIndex(
      (content) => content.slug === slug
    )

    if (currentIndex === -1) {
      return {}
    }

    return {
      previousPage: currentIndex > 0 ? allContent[currentIndex - 1] : undefined,
      nextPage:
        currentIndex < allContent.length - 1
          ? allContent[currentIndex + 1]
          : undefined,
    }
  } catch {
    return {}
  }
}

// Main page component
export default async function DocPage({ params }: DocPageProps) {
  try {
    const slug = params.slug.join('/')
    const category = params.slug[0] as any
    const contentSlug = params.slug.slice(1).join('/')

    // Get MDX content
    let content

    // First try with complete slug
    content = await getMDXContentForRSC(slug)

    // If not found, try other patterns
    if (!content && contentSlug) {
      // Category/file format
      content = await getMDXContentForRSC(`${category}/${contentSlug}`)
    }

    if (!content && !contentSlug) {
      // Single file format
      content = await getMDXContentForRSC(category)
    }

    if (!content) {
      notFound()
    }

    const { content: mdxContent, frontMatter } = content

    // Get adjacent pages
    const { previousPage, nextPage } = await getAdjacentPages(slug)

    // Get related content
    const relatedContent = await getRelatedContent(
      frontMatter.category,
      slug,
      3
    )

    return (
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="max-w-4xl">
            {/* Breadcrumb navigation */}
            <Breadcrumbs slug={slug} title={frontMatter.title} />

            {/* MDX content */}
            <article className="prose prose-gray dark:prose-invert max-w-none">
              <MDXRemote source={mdxContent} components={mdxComponents} />
            </article>

            {/* Related content */}
            {relatedContent.length > 0 && (
              <aside className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <Heading as="h2" size="xl" className="mb-6">
                  Related Articles
                </Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedContent.map((related) => (
                    <a
                      key={related.slug}
                      href={`/docs/${related.slug}`}
                      className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors bg-white dark:bg-gray-800"
                    >
                      <Heading as="h3" size="lg" className="mb-2">
                        {related.frontMatter.title}
                      </Heading>
                      <Text size="sm" variant="muted" className="line-clamp-2">
                        {related.frontMatter.description}
                      </Text>
                      <div className="flex items-center gap-2 mt-3">
                        {related.frontMatter.tags?.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </a>
                  ))}
                </div>
              </aside>
            )}

            {/* Previous/next page navigation */}
            <PageNavigation previousPage={previousPage} nextPage={nextPage} />
          </div>
        </div>

        {/* Right Sidebar - Table of Contents */}
        <aside className="w-[240px] flex-shrink-0 hidden xl:block">
          <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pl-6">
            <ClientTableOfContents content={mdxContent} />
          </div>
        </aside>
      </div>
    )
  } catch {
    // Error page
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heading as="h1" size="3xl" className="mb-4">
            Something went wrong
          </Heading>
          <Text variant="muted" className="mb-6">
            We encountered an error while loading this page.
          </Text>
          <Link
            href="/docs"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Documentation
          </Link>
        </div>
      </div>
    )
  }
}
