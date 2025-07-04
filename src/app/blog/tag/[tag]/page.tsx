import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container, Heading, Text } from '@/components/ui'
import { PostCard } from '@/components/blog/PostCard'
import { TagList } from '@/components/blog/TagList'
import { getBlogPostsByTag, getAllTags } from '@/lib/blog'

interface TagPageProps {
  params: {
    tag: string
  }
}

// メタデータ生成
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag)
  const posts = await getBlogPostsByTag(decodedTag)
  
  if (posts.length === 0) {
    return {
      title: 'タグが見つかりません',
    }
  }

  return {
    title: `${decodedTag} の記事一覧`,
    description: `「${decodedTag}」タグが付いた記事一覧です。${posts.length}件の記事があります。`,
    keywords: `${decodedTag}, ブログ, 記事, SaaS, テクノロジー`,
    openGraph: {
      title: `${decodedTag} の記事一覧 | YourSaaS Blog`,
      description: `「${decodedTag}」タグが付いた記事一覧です。${posts.length}件の記事があります。`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${decodedTag} の記事一覧 | YourSaaS Blog`,
      description: `「${decodedTag}」タグが付いた記事一覧です。${posts.length}件の記事があります。`,
    },
    alternates: {
      canonical: `/blog/tag/${params.tag}`,
    }
  }
}

// 静的パス生成
export async function generateStaticParams() {
  const allTags = await getAllTags()
  
  return allTags.map((tagItem) => ({
    tag: encodeURIComponent(tagItem.tag),
  }))
}

export default async function TagPage({ params }: TagPageProps) {
  const decodedTag = decodeURIComponent(params.tag)
  const [posts, allTags] = await Promise.all([
    getBlogPostsByTag(decodedTag),
    getAllTags()
  ])
  
  if (posts.length === 0) {
    notFound()
  }

  const currentTagInfo = allTags.find(t => t.tag === decodedTag)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            {/* パンくず */}
            <nav className="mb-8" aria-label="パンくず">
              <ol className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <a href="/" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    ホーム
                  </a>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li>
                  <a href="/blog" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    ブログ
                  </a>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li className="text-gray-900 dark:text-gray-100 font-medium">
                  #{decodedTag}
                </li>
              </ol>
            </nav>

            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <Heading as="h1" size="4xl">
                #{decodedTag}
              </Heading>
            </div>
            
            <Text size="xl" variant="muted" className="mb-8">
              「{decodedTag}」タグが付いた記事一覧です。
              {currentTagInfo && (
                <span className="block mt-2">
                  全 <strong>{currentTagInfo.count}件</strong> の記事があります。
                </span>
              )}
            </Text>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/blog"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                すべての記事を見る
              </a>
              
              <a
                href="#tags"
                className="inline-flex items-center px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                他のタグを探す
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* 記事一覧 */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* メインコンテンツ */}
              <div className="lg:col-span-3">
                <div className="mb-8">
                  <Heading as="h2" size="2xl" className="mb-4">
                    記事一覧
                    <span className="ml-2 text-lg font-normal text-gray-500 dark:text-gray-400">
                      ({posts.length}件)
                    </span>
                  </Heading>
                  
                  {/* ソート・フィルター */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                      </svg>
                      <Text size="sm" variant="muted">
                        新着順で表示中
                      </Text>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Text size="sm" variant="muted">
                        最終更新: {new Date(posts[0]?.frontMatter.publishedAt).toLocaleDateString('ja-JP')}
                      </Text>
                    </div>
                  </div>
                </div>

                {/* 記事カード一覧 */}
                <div className="space-y-8">
                  {posts.map((post, index) => (
                    <PostCard 
                      key={post.slug} 
                      post={post}
                      priority={index < 3}
                    />
                  ))}
                </div>

                {/* ページネーション（将来的に実装） */}
                {posts.length > 10 && (
                  <div className="mt-12 text-center">
                    <Text size="sm" variant="muted">
                      すべての記事を表示中
                    </Text>
                  </div>
                )}
              </div>

              {/* サイドバー */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-8">
                  {/* 現在のタグ情報 */}
                  <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      <Heading as="h3" size="lg" className="text-blue-900 dark:text-blue-100">
                        #{decodedTag}
                      </Heading>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Text size="sm" className="text-blue-700 dark:text-blue-300">記事数</Text>
                        <Text size="sm" className="font-semibold text-blue-900 dark:text-blue-100">
                          {posts.length}件
                        </Text>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Text size="sm" className="text-blue-700 dark:text-blue-300">最新記事</Text>
                        <Text size="sm" className="font-semibold text-blue-900 dark:text-blue-100">
                          {new Date(posts[0]?.frontMatter.publishedAt).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
                        </Text>
                      </div>
                      
                      {currentTagInfo && allTags.length > 0 && (
                        <div className="flex justify-between items-center">
                          <Text size="sm" className="text-blue-700 dark:text-blue-300">人気度</Text>
                          <Text size="sm" className="font-semibold text-blue-900 dark:text-blue-100">
                            {allTags.findIndex(t => t.tag === decodedTag) + 1}位 / {allTags.length}
                          </Text>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
                      <a
                        href="/blog"
                        className="inline-flex items-center text-sm font-medium text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        すべての記事を見る
                      </a>
                    </div>
                  </div>

                  {/* 関連タグ */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <Heading as="h3" size="md" className="mb-4">
                      関連するタグ
                    </Heading>
                    
                    <div className="flex flex-wrap gap-2">
                      {allTags
                        .filter(tagItem => tagItem.tag !== decodedTag)
                        .slice(0, 10)
                        .map((tagItem) => (
                          <a
                            key={tagItem.tag}
                            href={`/blog/tag/${encodeURIComponent(tagItem.tag)}`}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                          >
                            #{tagItem.tag}
                            <span className="ml-1 text-xs opacity-75 dark:opacity-70">
                              {tagItem.count}
                            </span>
                          </a>
                        ))}
                    </div>
                  </div>

                  {/* 全タグリスト */}
                  <div id="tags" className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <TagList 
                      tags={allTags} 
                      currentTag={decodedTag}
                      maxDisplay={10}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}