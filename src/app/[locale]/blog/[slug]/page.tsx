import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { ShareButton } from '@/components/blog/ShareButton'
import { ClientTableOfContents } from '@/components/docs/ClientTableOfContents'
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { getBlogPost, getAllBlogPostMetas, getRelatedPosts } from '@/lib/blog'
import { generateSEOMetadata } from '@/lib/metadata'
import { getDictionary } from '@/lib/i18n'
import Link from 'next/link'

interface BlogPostPageProps {
  params: {
    locale: string
    slug: string
  }
}

// Generate metadata
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = params
  const post = await getBlogPost(slug)
  const dict = await getDictionary(locale as 'en' | 'jp')
  
  if (!post) {
    return generateSEOMetadata({
      title: locale === 'jp' ? '記事が見つかりません' : 'Article Not Found',
      description: locale === 'jp' ? 'お探しの記事は見つかりませんでした。' : 'The article you are looking for could not be found.',
      url: `/${locale}/blog/${slug}`,
      locale: locale
    })
  }

  const { frontMatter } = post
  
  return generateSEOMetadata({
    title: frontMatter.title,
    description: frontMatter.description,
    url: `/${locale}/blog/${slug}`,
    locale: locale,
    type: 'article',
    publishedTime: frontMatter.publishedAt,
    modifiedTime: frontMatter.updatedAt || frontMatter.publishedAt,
    authors: [frontMatter.author],
    tags: frontMatter.tags,
    keywords: frontMatter.tags,
    image: frontMatter.coverImage,
    section: frontMatter.category
  })
}

// Generate static paths
export async function generateStaticParams() {
  const posts = await getAllBlogPostMetas()
  const locales = ['en', 'jp']
  const params = []
  
  for (const locale of locales) {
    for (const post of posts) {
      params.push({ locale, slug: post.slug })
    }
  }
  
  return params
}

// MDX components
const mdxComponents = {
  // Custom component definitions with ID generation for anchor links
  h1: (props: any) => {
    const id = props.children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || ''
    return <h1 id={id} className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4 first:mt-0" {...props} />
  },
  h2: (props: any) => {
    const id = props.children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || ''
    return <h2 id={id} className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4" {...props} />
  },
  h3: (props: any) => {
    const id = props.children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || ''
    return <h3 id={id} className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-6 mb-3" {...props} />
  },
  h4: (props: any) => {
    const id = props.children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || ''
    return <h4 id={id} className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3" {...props} />
  },
  p: (props: any) => (
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4" {...props} />
  ),
  a: (props: any) => (
    <a 
      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-2" 
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props} 
    />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2 my-6 bg-blue-50 dark:bg-blue-900 text-gray-700 dark:text-gray-300 italic rounded-r-lg" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto my-6 text-sm" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300" {...props} />
  ),
  li: (props: any) => (
    <li className="leading-relaxed" {...props} />
  ),
  img: (props: any) => (
    <div className="relative my-6 rounded-lg overflow-hidden shadow-lg">
      <Image
        className="rounded-lg shadow-lg"
        loading="lazy"
        width={800}
        height={600}
        style={{ width: '100%', height: 'auto' }}
        alt={props.alt || 'Blog post image'}
        {...props}
      />
    </div>
  ),
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" {...props} />
  ),
  td: (props: any) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 border-t border-gray-200 dark:border-gray-700" {...props} />
  ),
  // Custom callouts
  Callout: ({ type = 'info', children }: { type?: 'info' | 'warning' | 'error' | 'success', children: React.ReactNode }) => {
    const styles = {
      info: 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200',
      warning: 'bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200',
      error: 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200',
      success: 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200',
    }
    
    const icons = {
      info: '💡',
      warning: '⚠️',
      error: '❌',
      success: '✅',
    }
    
    return (
      <div className={`border-l-4 p-4 my-6 rounded-r-lg ${styles[type]}`}>
        <div className="flex items-start">
          <span className="text-lg mr-3 flex-shrink-0">{icons[type]}</span>
          <div className="prose prose-sm max-w-none">{children}</div>
        </div>
      </div>
    )
  },
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = params
  const post = await getBlogPost(slug)
  
  if (!post) {
    notFound()
  }

  // Remove duplicate title and description from MDX content
  let processedContent = post.content
  
  // Remove the first heading if it matches the frontmatter title
  const titlePattern = new RegExp(`^# ${post.frontMatter.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\n`, 'gm')
  processedContent = processedContent.replace(titlePattern, '')
  
  // Remove description if it matches frontmatter description
  if (post.frontMatter.description) {
    const descPattern = new RegExp(`^${post.frontMatter.description.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\n`, 'gm')
    processedContent = processedContent.replace(descPattern, '')
  }
  
  // Remove any remaining standalone h1 at the beginning
  processedContent = processedContent.replace(/^# [^\n]*\n+/gm, '')
  
  // Remove description-like paragraph at the beginning (first paragraph after title)
  const lines = processedContent.split('\n')
  let processedLines = []
  let skipNext = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Skip empty lines at the beginning
    if (processedLines.length === 0 && line === '') continue
    
    // If this looks like a description paragraph (first substantial paragraph)
    if (processedLines.length === 0 && line && !line.startsWith('#') && !line.startsWith('```')) {
      // Skip this line if it looks like a description
      continue
    }
    
    processedLines.push(lines[i])
  }
  
  processedContent = processedLines.join('\n')

  const relatedPosts = await getRelatedPosts(params.slug, 3)

  // Structured data (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontMatter.title,
    description: post.frontMatter.description,
    author: {
      '@type': 'Person',
      name: post.frontMatter.author,
    },
    datePublished: post.frontMatter.publishedAt,
    dateModified: post.frontMatter.updatedAt || post.frontMatter.publishedAt,
    keywords: post.frontMatter.tags.join(', '),
    articleSection: post.frontMatter.category,
    wordCount: post.readingTime * 200, // Estimated word count
    timeRequired: `PT${post.readingTime}M`,
    image: post.frontMatter.coverImage,
    publisher: {
      '@type': 'Organization',
      name: 'YourSaaS Platform',
    },
  }

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen">

        {/* Article content with sidebar layout */}
        <article className="py-8 bg-white dark:bg-gray-900">
          <Container>
            <div className="flex gap-8 justify-center">
              {/* Main content */}
              <div className="w-[700px] flex-shrink-0 pt-16">

                {/* Breadcrumb */}
                <div className="mb-8">
                  <nav aria-label="breadcrumb" className="flex items-center space-x-2 text-sm">
                    <Link 
                      href="/" 
                      className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                    >
                      Home
                    </Link>
                    <span className="text-gray-300 dark:text-gray-700">/</span>
                    <Link 
                      href="/blog" 
                      className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                    >
                      Blog
                    </Link>
                    <span className="text-gray-300 dark:text-gray-700">/</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {post.frontMatter.title}
                    </span>
                  </nav>
                </div>

                {/* Date */}
                <time className="text-sm text-gray-500 dark:text-gray-400 mb-2 block" dateTime={post.frontMatter.publishedAt}>
                  {new Date(post.frontMatter.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>

                {/* Title */}
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                  {post.frontMatter.title}
                </h1>

                {/* Cover image */}
                {post.frontMatter.coverImage && (
                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl shadow-lg mb-8">
                    <Image
                      src={post.frontMatter.coverImage}
                      alt={post.frontMatter.title}
                      fill
                      className="object-cover rounded-xl"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                  </div>
                )}


                {/* Article content */}
                <div className="prose prose-lg max-w-none">
                  <MDXRemote 
                    source={processedContent} 
                    components={mdxComponents}
                  />
                </div>

              {/* Article end marker */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              </div>

              {/* Additional article information */}
              <div className="mt-6 space-y-6">
                {/* Tags */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Tags Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.frontMatter.tags.map((tag) => {
                      // Function to determine tag color
                      const getTagColor = (tag: string) => {
                        const colors = [
                          'bg-blue-100 text-blue-800 hover:bg-blue-200',
                          'bg-green-100 text-green-800 hover:bg-green-200',
                          'bg-purple-100 text-purple-800 hover:bg-purple-200',
                          'bg-pink-100 text-pink-800 hover:bg-pink-200',
                          'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
                          'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
                          'bg-red-100 text-red-800 hover:bg-red-200',
                          'bg-teal-100 text-teal-800 hover:bg-teal-200',
                          'bg-orange-100 text-orange-800 hover:bg-orange-200',
                          'bg-cyan-100 text-cyan-800 hover:bg-cyan-200',
                        ]
                        
                        let hash = 0
                        for (let i = 0; i < tag.length; i++) {
                          hash = tag.charCodeAt(i) + ((hash << 5) - hash)
                        }
                        const colorIndex = Math.abs(hash) % colors.length
                        return colors[colorIndex]
                      }
                      
                      return (
                        <a
                          key={tag}
                          href={`/blog/tag/${encodeURIComponent(tag)}`}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${getTagColor(tag)}`}
                        >
                          #{tag}
                        </a>
                      )
                    })}
                  </div>
                </div>

                {/* Share button */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Share this article</h3>
                  <ShareButton title={post.frontMatter.title} slug={params.slug} locale="en" />
                </div>
              </div>
              </div>

              {/* Right Sidebar - Table of Contents */}
              <aside className="w-[240px] flex-shrink-0 hidden xl:block">
                <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pl-6 pt-16">
                  <ClientTableOfContents content={post.content} />
                </div>
              </aside>
            </div>
          </Container>
        </article>

        {/* Related articles */}
        <RelatedPosts posts={relatedPosts} currentSlug={params.slug} locale="en" />

      </div>
    </>
  )
}