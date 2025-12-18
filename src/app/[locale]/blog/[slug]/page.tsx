import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { ShareButton } from '@/components/blog/ShareButton'
import { ClientTableOfContents } from '@/components/docs/ClientTableOfContents'
import { Container } from '@/components/ui/container'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { getAllBlogPostMetas, getBlogPost, getRelatedPosts } from '@/lib/blog'
import { generateSEOMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>
}

type HeadingProps = ComponentPropsWithoutRef<'h1'> & { children?: ReactNode }
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type AnchorProps = ComponentPropsWithoutRef<'a'> & { href?: string }
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>
type CodeProps = ComponentPropsWithoutRef<'code'>
type PreProps = ComponentPropsWithoutRef<'pre'>
type ListProps = ComponentPropsWithoutRef<'ul'>
type OrderedListProps = ComponentPropsWithoutRef<'ol'>
type ListItemProps = ComponentPropsWithoutRef<'li'>
type ImageProps = ComponentPropsWithoutRef<'img'> & { src?: string; alt?: string }
type TableProps = ComponentPropsWithoutRef<'table'>
type ThProps = ComponentPropsWithoutRef<'th'>
type TdProps = ComponentPropsWithoutRef<'td'>

// Generate metadata
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return generateSEOMetadata({
      title: locale === 'ja' ? '記事が見つかりません' : 'Article Not Found',
      description:
        locale === 'ja'
          ? 'お探しの記事は見つかりませんでした。'
          : 'The article you are looking for could not be found.',
      url: `/${locale}/blog/${slug}`,
      locale: locale,
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
    section: frontMatter.category,
  })
}

// Generate static paths
export async function generateStaticParams() {
  const posts = await getAllBlogPostMetas()
  const params = []

  for (const locale of routing.locales) {
    for (const post of posts) {
      params.push({ locale, slug: post.slug })
    }
  }

  return params
}

// MDX components
const mdxComponents = {
  h1: (props: HeadingProps) => {
    const id =
      props.children
        ?.toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '') || ''
    return (
      <h1 id={id} className="mt-8 mb-4 text-3xl font-bold text-gray-900 first:mt-0 dark:text-gray-100" {...props} />
    )
  },
  h2: (props: HeadingProps) => {
    const id =
      props.children
        ?.toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '') || ''
    return <h2 id={id} className="mt-8 mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100" {...props} />
  },
  h3: (props: HeadingProps) => {
    const id =
      props.children
        ?.toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '') || ''
    return <h3 id={id} className="mt-6 mb-3 text-xl font-bold text-gray-900 dark:text-gray-100" {...props} />
  },
  h4: (props: HeadingProps) => {
    const id =
      props.children
        ?.toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '') || ''
    return <h4 id={id} className="mt-6 mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100" {...props} />
  },
  p: (props: ParagraphProps) => <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300" {...props} />,
  a: (props: AnchorProps) => (
    <a
      className="text-blue-600 underline underline-offset-2 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="my-6 rounded-r-lg border-l-4 border-blue-500 bg-blue-50 py-2 pl-4 text-gray-700 italic dark:border-blue-400 dark:bg-blue-900 dark:text-gray-300"
      {...props}
    />
  ),
  code: (props: CodeProps) => (
    <code
      className="rounded bg-gray-100 px-2 py-1 font-mono text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200"
      {...props}
    />
  ),
  pre: (props: PreProps) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100 dark:bg-gray-800"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul className="mb-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300" {...props} />
  ),
  ol: (props: OrderedListProps) => (
    <ol className="mb-4 list-inside list-decimal space-y-2 text-gray-700 dark:text-gray-300" {...props} />
  ),
  li: (props: ListItemProps) => <li className="leading-relaxed" {...props} />,
  img: (props: ImageProps) => (
    <div className="relative my-6 overflow-hidden rounded-lg shadow-lg">
      <Image
        className="rounded-lg shadow-lg"
        loading="lazy"
        width={800}
        height={600}
        style={{ width: '100%', height: 'auto' }}
        alt={props.alt || 'Blog post image'}
        src={props.src || ''}
      />
    </div>
  ),
  table: (props: TableProps) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700"
        {...props}
      />
    </div>
  ),
  th: (props: ThProps) => (
    <th
      className="bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:bg-gray-800 dark:text-gray-400"
      {...props}
    />
  ),
  td: (props: TdProps) => (
    <td
      className="border-t border-gray-200 px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:border-gray-700 dark:text-gray-100"
      {...props}
    />
  ),
  Callout: ({
    type = 'info',
    children,
  }: {
    type?: 'info' | 'warning' | 'error' | 'success'
    children: React.ReactNode
  }) => {
    const styles = {
      info: 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200',
      warning:
        'bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200',
      error: 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200',
      success:
        'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200',
    }

    const icons = {
      info: '💡',
      warning: '⚠️',
      error: '❌',
      success: '✅',
    }

    return (
      <div className={`my-6 rounded-r-lg border-l-4 p-4 ${styles[type]}`}>
        <div className="flex items-start">
          <span className="mr-3 flex-shrink-0 text-lg">{icons[type]}</span>
          <div className="prose prose-sm max-w-none">{children}</div>
        </div>
      </div>
    )
  },
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations('blog.share')

  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  // Remove duplicate title and description from MDX content
  let processedContent = post.content

  const titlePattern = new RegExp(`^# ${post.frontMatter.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\n`, 'gm')
  processedContent = processedContent.replace(titlePattern, '')

  if (post.frontMatter.description) {
    const descPattern = new RegExp(
      `^${post.frontMatter.description.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\n`,
      'gm'
    )
    processedContent = processedContent.replace(descPattern, '')
  }

  processedContent = processedContent.replace(/^# [^\n]*\n+/gm, '')

  const lines = processedContent.split('\n')
  const processedLines = []

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i]
    if (currentLine === undefined) continue
    const line = currentLine.trim()

    if (processedLines.length === 0 && line === '') continue

    if (processedLines.length === 0 && line && !line.startsWith('#') && !line.startsWith('```')) {
      continue
    }

    processedLines.push(currentLine)
  }

  processedContent = processedLines.join('\n')

  const relatedPosts = await getRelatedPosts(slug, 3)

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
    wordCount: post.readingTime * 200,
    timeRequired: `PT${post.readingTime}M`,
    image: post.frontMatter.coverImage,
    publisher: {
      '@type': 'Organization',
      name: 'BoxLog Platform',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen">
        <article className="bg-white py-8 dark:bg-gray-900">
          <Container>
            <div className="flex justify-center gap-8">
              <div className="w-[700px] flex-shrink-0 pt-16">
                <div className="mb-8">
                  <nav aria-label="breadcrumb" className="flex items-center space-x-2 text-sm">
                    <Link
                      href="/"
                      className="text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400"
                    >
                      Home
                    </Link>
                    <span className="text-gray-300 dark:text-gray-700">/</span>
                    <Link
                      href="/blog"
                      className="text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400"
                    >
                      Blog
                    </Link>
                    <span className="text-gray-300 dark:text-gray-700">/</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{post.frontMatter.title}</span>
                  </nav>
                </div>

                <time
                  className="mb-2 block text-sm text-gray-500 dark:text-gray-400"
                  dateTime={post.frontMatter.publishedAt}
                >
                  {new Date(post.frontMatter.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>

                <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-gray-100">{post.frontMatter.title}</h1>

                {post.frontMatter.coverImage && (
                  <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl shadow-lg">
                    <Image
                      src={post.frontMatter.coverImage}
                      alt={post.frontMatter.title}
                      fill
                      className="rounded-xl object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                  </div>
                )}

                <div className="prose prose-lg max-w-none">
                  <MDXRemote source={processedContent} components={mdxComponents} />
                </div>

                <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700"></div>

                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">Tags Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.frontMatter.tags.map((tag) => {
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
                          <Link
                            key={tag}
                            href={`/tags/${encodeURIComponent(tag)}`}
                            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors ${getTagColor(tag)}`}
                          >
                            #{tag}
                          </Link>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">{t('title')}</h3>
                    <ShareButton title={post.frontMatter.title} slug={slug} />
                  </div>
                </div>
              </div>

              <aside className="hidden w-[240px] flex-shrink-0 xl:block">
                <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pt-16 pl-6">
                  <ClientTableOfContents content={post.content} />
                </div>
              </aside>
            </div>
          </Container>
        </article>

        <RelatedPosts posts={relatedPosts} currentSlug={slug} locale={locale} />
      </div>
    </>
  )
}
