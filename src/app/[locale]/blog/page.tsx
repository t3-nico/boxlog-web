import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Heading, Text } from '@/components/ui'
import { PostCard } from '@/components/blog/PostCard'
import { TagList } from '@/components/blog/TagList'
import { getAllBlogPostMetas, getAllTags, getFeaturedPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'SaaS開発、テクノロジー、ビジネス戦略に関する最新の記事をお届けします。',
}

export default async function BlogPage() {
  const [allPosts, allTags, featuredPosts] = await Promise.all([
    getAllBlogPostMetas(),
    getAllTags(),
    getFeaturedPosts()
  ])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h1" size="4xl" className="mb-6">
              ブログ
            </Heading>
            
            <Text size="xl" variant="muted" className="mb-8 max-w-3xl mx-auto">
              SaaS開発、テクノロジー、ビジネス戦略に関する最新の記事をお届けします。
              私たちの経験と知識を共有し、皆様のビジネス成長をサポートします。
            </Text>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <Heading as="h3" size="md" className="mb-2">
                  技術記事
                </Heading>
                <Text size="sm" variant="muted">
                  最新の開発技術やベストプラクティス
                </Text>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <Heading as="h3" size="md" className="mb-2">
                  ビジネス戦略
                </Heading>
                <Text size="sm" variant="muted">
                  SaaS事業の成長戦略と運営ノウハウ
                </Text>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <Heading as="h3" size="md" className="mb-2">
                  学習コンテンツ
                </Heading>
                <Text size="sm" variant="muted">
                  チュートリアルとハウツーガイド
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-12">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <Heading as="h2" size="2xl">
                  注目記事
                </Heading>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.slice(0, 3).map((post, index) => (
                  <PostCard 
                    key={post.slug} 
                    post={post} 
                    priority={index < 2}
                    layout="vertical"
                  />
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* 記事一覧 */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-8">
                  <Heading as="h2" size="2xl">
                    最新記事
                    <span className="ml-2 text-lg font-normal text-gray-500 dark:text-gray-400">
                      ({Math.min(allPosts.length, 5)}件表示)
                    </span>
                  </Heading>
                  
                  <Link
                    href="#all-posts-section"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
                  >
                    すべて見る
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                </div>

                {allPosts.length > 0 ? (
                  <div className="space-y-8">
                    {allPosts.slice(0, 5).map((post, index) => (
                      <PostCard 
                        key={post.slug} 
                        post={post}
                        priority={index < 3}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <Heading as="h3" size="lg" className="mb-2">
                      記事が見つかりませんでした
                    </Heading>
                    <Text variant="muted">
                      現在記事を準備中です。しばらくお待ちください。
                    </Text>
                  </div>
                )}
                
                {/* 全記事セクション */}
                {allPosts.length > 5 && (
                  <div id="all-posts-section" className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <Heading as="h2" size="2xl" className="mb-8">
                      全記事
                      <span className="ml-2 text-lg font-normal text-gray-500 dark:text-gray-400">
                        ({allPosts.length}件)
                      </span>
                    </Heading>
                    
                    <div className="space-y-8">
                      {allPosts.slice(5).map((post, index) => (
                        <PostCard 
                          key={post.slug} 
                          post={post}
                          priority={false}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* サイドバー */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* タグリスト */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <TagList tags={allTags} maxDisplay={15} locale={locale} />
                  </div>

                  {/* RSS Feed */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <Heading as="h3" size="md" className="mb-4">
                      RSS フィード
                    </Heading>
                    <Text size="sm" variant="muted" className="mb-4">
                      最新記事をRSSで購読できます
                    </Text>
                    <a
                      href="/blog/feed.xml"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.429 2.857A1.429 1.429 0 002 4.286v11.428A1.429 1.429 0 003.429 17h13.142A1.429 1.429 0 0018 15.714V4.286A1.429 1.429 0 0016.571 2.857H3.429zM4 6.857v2.286H6.286V6.857H4zm8.571 0h2.286v2.286h-2.286V6.857zM4 10.571v2.286h2.286v-2.286H4zm4.571-3.714v2.286h2.286V6.857H8.571zm4.572 3.714v2.286h2.286v-2.286h-2.286zM8.571 10.571v2.286h2.286v-2.286H8.571z" />
                      </svg>
                      {locale === 'jp' ? 'RSS フィード' : 'RSS Feed'}
                    </a>
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