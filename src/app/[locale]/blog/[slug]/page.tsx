import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import { Container } from '@/components/ui'
import { PostHeader } from '@/components/blog/PostHeader'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { ShareButton } from '@/components/blog/ShareButton'
import { getBlogPost, getAllBlogPostMetas, getRelatedPosts } from '@/lib/blog'

interface BlogPostPageProps {
  params: {
    slug: string
    locale: string
  }
}

// Generate metadata
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = params
  const post = await getBlogPost(slug)
  
  if (!post) {
    return {
      title: locale === 'jp' ? '記事が見つかりません' : 'Article Not Found',
    }
  }

  const { frontMatter } = post
  const publishedTime = new Date(frontMatter.publishedAt).toISOString()
  const modifiedTime = frontMatter.updatedAt 
    ? new Date(frontMatter.updatedAt).toISOString() 
    : publishedTime

  return {
    title: frontMatter.title,
    description: frontMatter.description,
    keywords: frontMatter.tags.join(', '),
    authors: [{ name: frontMatter.author }],
    openGraph: {
      title: frontMatter.title,
      description: frontMatter.description,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: [frontMatter.author],
      tags: frontMatter.tags,
      images: frontMatter.coverImage ? [
        {
          url: frontMatter.coverImage,
          width: 1200,
          height: 630,
          alt: frontMatter.title,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: frontMatter.title,
      description: frontMatter.description,
      images: frontMatter.coverImage ? [frontMatter.coverImage] : undefined,
    },
    alternates: {
      canonical: locale === 'jp' ? `/jp/blog/${params.slug}` : `/blog/${params.slug}`,
    }
  }
}

// Generate static paths
export async function generateStaticParams() {
  const posts = await getAllBlogPostMetas()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// MDX components
const mdxComponents = {
  // Custom component definitions
  h1: (props: any) => (
    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4 first:mt-0" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-6 mb-3" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3" {...props} />
  ),
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
  const { slug, locale } = params
  const post = await getBlogPost(slug)
  
  if (!post) {
    notFound()
  }

  // Debug: Check if content is loaded correctly
  console.log('Post content:', post.content)

  const relatedPosts = await getRelatedPosts(slug, 3)

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
        {/* Article header */}
        <PostHeader frontMatter={post.frontMatter} slug={slug} locale={locale} />

        {/* Cover image */}
        {post.frontMatter.coverImage && (
          <section className="pb-8 bg-white dark:bg-gray-900">
            <Container>
              <div className="max-w-4xl mx-auto">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={post.frontMatter.coverImage}
                    alt={post.frontMatter.title}
                    fill
                    className="object-cover rounded-xl"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* Article content */}
        <article className="py-8 bg-white dark:bg-gray-900">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <MDXRemote 
                  source={post.content} 
                  components={mdxComponents}
                />
              </div>

              {/* Article end marker */}
              <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Additional article information */}
              <div className="mt-8 space-y-6">
                {/* Tags */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">{locale === 'jp' ? 'タグ' : 'Tags'}</h3>
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
                          href={locale === 'jp' ? `/jp/blog/tag/${encodeURIComponent(tag)}` : `/blog/tag/${encodeURIComponent(tag)}`}
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
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">{locale === 'jp' ? 'この記事をシェア' : 'Share this article'}</h3>
                  <ShareButton title={post.frontMatter.title} slug={slug} locale={locale} />
                </div>
              </div>
            </div>
          </Container>
        </article>

        {/* Related articles */}
        <RelatedPosts posts={relatedPosts} currentSlug={slug} locale={locale} />

      </div>
    </>
  )
}