import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Container } from '@/components/ui'
import { PostHeader } from '@/components/blog/PostHeader'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { ShareButton } from '@/components/blog/ShareButton'
import { getBlogPost, getAllBlogPostMetas, getRelatedPosts } from '@/lib/blog'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// メタデータ生成
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: '記事が見つかりません',
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
      canonical: `/blog/${params.slug}`,
    }
  }
}

// 静的パス生成
export async function generateStaticParams() {
  const posts = await getAllBlogPostMetas()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// MDXコンポーネント
const mdxComponents = {
  // カスタムコンポーネントの定義
  h1: (props: any) => (
    <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4 first:mt-0" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3" {...props} />
  ),
  p: (props: any) => (
    <p className="text-gray-700 leading-relaxed mb-4" {...props} />
  ),
  a: (props: any) => (
    <a 
      className="text-blue-600 hover:text-blue-800 underline underline-offset-2" 
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props} 
    />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6 bg-blue-50 text-gray-700 italic rounded-r-lg" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6 text-sm" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700" {...props} />
  ),
  li: (props: any) => (
    <li className="leading-relaxed" {...props} />
  ),
  img: (props: any) => (
    <img 
      className="rounded-lg shadow-lg my-6 max-w-full h-auto" 
      loading="lazy"
      {...props} 
    />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />
  ),
  td: (props: any) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-t border-gray-200" {...props} />
  ),
  // カスタムコールアウト
  Callout: ({ type = 'info', children }: { type?: 'info' | 'warning' | 'error' | 'success', children: React.ReactNode }) => {
    const styles = {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      error: 'bg-red-50 border-red-200 text-red-800',
      success: 'bg-green-50 border-green-200 text-green-800',
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
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    notFound()
  }

  // デバッグ: コンテンツが正しく読み込まれているか確認
  console.log('Post content:', post.content)

  const relatedPosts = await getRelatedPosts(params.slug, 3)

  // 構造化データ（JSON-LD）
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
    wordCount: post.readingTime * 200, // 推定文字数
    timeRequired: `PT${post.readingTime}M`,
    image: post.frontMatter.coverImage,
    publisher: {
      '@type': 'Organization',
      name: 'YourSaaS Platform',
    },
  }

  return (
    <>
      {/* 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen">
        {/* 記事ヘッダー */}
        <PostHeader frontMatter={post.frontMatter} slug={params.slug} />

        {/* カバー画像 */}
        {post.frontMatter.coverImage && (
          <section className="pb-8 bg-white">
            <Container>
              <div className="max-w-4xl mx-auto">
                <img
                  src={post.frontMatter.coverImage}
                  alt={post.frontMatter.title}
                  className="w-full h-auto rounded-xl shadow-lg"
                  loading="eager"
                />
              </div>
            </Container>
          </section>
        )}

        {/* 記事本文 */}
        <article className="py-8 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <MDXRemote 
                  source={post.content} 
                  components={mdxComponents}
                />
              </div>

              {/* 記事終了マーカー */}
              <div className="mt-16 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-center">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* その他の記事情報 */}
              <div className="mt-8 space-y-6">
                {/* タグ */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">タグ</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.frontMatter.tags.map((tag) => {
                      // タグの色を決定する関数
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

                {/* シェアボタン */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">この記事をシェア</h3>
                  <ShareButton title={post.frontMatter.title} slug={params.slug} />
                </div>
              </div>
            </div>
          </Container>
        </article>

        {/* 関連記事 */}
        <RelatedPosts posts={relatedPosts} currentSlug={params.slug} />

      </div>
    </>
  )
}