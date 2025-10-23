import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { ReleaseCard } from '@/components/releases/ReleaseCard'
import { UpcomingReleasesCompact } from '@/components/releases/UpcomingReleases'
import { getReleasesByTag, getAllReleaseTags } from '@/lib/releases'

interface TagPageProps {
  params: {
    tag: string
  }
}

// メタデータ生成
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag)
  const releases = await getReleasesByTag(decodedTag)
  
  if (releases.length === 0) {
    return {
      title: 'タグが見つかりません',
    }
  }

  return {
    title: `${decodedTag} のリリース一覧`,
    description: `「${decodedTag}」タグが付いたリリース一覧です。${releases.length}件のリリースがあります。`,
    keywords: `${decodedTag}, リリースノート, アップデート, YourSaaS`,
    openGraph: {
      title: `${decodedTag} のリリース一覧 | YourSaaS Releases`,
      description: `「${decodedTag}」タグが付いたリリース一覧です。${releases.length}件のリリースがあります。`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${decodedTag} のリリース一覧 | YourSaaS Releases`,
      description: `「${decodedTag}」タグが付いたリリース一覧です。${releases.length}件のリリースがあります。`,
    },
    alternates: {
      canonical: `/releases/tag/${params.tag}`,
    }
  }
}

// 静的パス生成
export async function generateStaticParams() {
  const allTags = await getAllReleaseTags()
  
  return allTags.map((tagItem) => ({
    tag: encodeURIComponent(tagItem.tag),
  }))
}

export default async function TagReleasesPage({ params }: TagPageProps) {
  const decodedTag = decodeURIComponent(params.tag)
  const [releases, allTags] = await Promise.all([
    getReleasesByTag(decodedTag),
    getAllReleaseTags()
  ])
  
  if (releases.length === 0) {
    notFound()
  }

  const currentTagInfo = allTags.find(t => t.tag === decodedTag)

  // タグ別統計
  const stats = {
    total: releases.length,
    featured: releases.filter(r => r.frontMatter.featured).length,
    breaking: releases.filter(r => r.frontMatter.breaking).length,
    recent: releases.filter(r => {
      const releaseDate = new Date(r.frontMatter.date)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      return releaseDate >= thirtyDaysAgo
    }).length
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            {/* パンくず */}
            <nav className="mb-8" aria-label="パンくず">
              <ol className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <li>
                  <a href="/" className="hover:text-gray-700 transition-colors">
                    ホーム
                  </a>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li>
                  <a href="/releases" className="hover:text-gray-700 transition-colors">
                    リリースノート
                  </a>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li className="text-gray-900 font-medium">
                  #{decodedTag}
                </li>
              </ol>
            </nav>

            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[rgb(var(--icon-bg-secondary))] rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <Heading as="h1" size="4xl">
                #{decodedTag}
              </Heading>
            </div>
            
            <Text size="xl" variant="muted" className="mb-8">
              「{decodedTag}」タグが付いたリリース一覧です。
              {currentTagInfo && (
                <span className="block mt-2">
                  全 <strong>{currentTagInfo.count}件</strong> のリリースがあります。
                </span>
              )}
            </Text>

            {/* 統計情報 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">総リリース数</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-purple-600">{stats.featured}</div>
                <div className="text-sm text-gray-600">注目リリース</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-red-600">{stats.breaking}</div>
                <div className="text-sm text-gray-600">破壊的変更</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-green-600">{stats.recent}</div>
                <div className="text-sm text-gray-600">最近30日</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/releases"
                className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                すべてのリリースを見る
              </a>
              
              <a
                href="#tags"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
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

      {/* リリース一覧 */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* メインコンテンツ */}
              <div className="lg:col-span-3">
                <div className="mb-8">
                  <Heading as="h2" size="2xl" className="mb-4">
                    リリース一覧
                    <span className="ml-2 text-lg font-normal text-gray-500">
                      ({releases.length}件)
                    </span>
                  </Heading>
                  
                  {/* ソート・フィルター */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                      </svg>
                      <Text size="sm" variant="muted">
                        新着順で表示中
                      </Text>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Text size="sm" variant="muted">
                        最新リリース: {new Date(releases[0]?.frontMatter.date).toLocaleDateString('ja-JP')}
                      </Text>
                    </div>
                  </div>
                </div>

                {/* リリースカード一覧 */}
                <div className="space-y-8">
                  {releases.map((release, index) => (
                    <ReleaseCard 
                      key={release.frontMatter.version} 
                      release={release}
                      priority={index < 3}
                    />
                  ))}
                </div>

                {/* ページネーション（将来的に実装） */}
                {releases.length > 10 && (
                  <div className="mt-12 text-center">
                    <Text size="sm" variant="muted">
                      すべてのリリースを表示中
                    </Text>
                  </div>
                )}
              </div>

              {/* サイドバー */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-8">
                  {/* 現在のタグ情報 */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      <Heading as="h3" size="lg" className="text-blue-900">
                        #{decodedTag}
                      </Heading>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Text size="sm" className="text-blue-700">リリース数</Text>
                        <Text size="sm" className="font-semibold text-blue-900">
                          {releases.length}件
                        </Text>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Text size="sm" className="text-blue-700">最新リリース</Text>
                        <Text size="sm" className="font-semibold text-blue-900">
                          {new Date(releases[0]?.frontMatter.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
                        </Text>
                      </div>
                      
                      {currentTagInfo && allTags.length > 0 && (
                        <div className="flex justify-between items-center">
                          <Text size="sm" className="text-blue-700">人気度</Text>
                          <Text size="sm" className="font-semibold text-blue-900">
                            {allTags.findIndex(t => t.tag === decodedTag) + 1}位 / {allTags.length}
                          </Text>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <a
                        href="/releases"
                        className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-800"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        すべてのリリースを見る
                      </a>
                    </div>
                  </div>

                  {/* 関連タグ */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
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
                            href={`/releases/tag/${encodeURIComponent(tagItem.tag)}`}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                          >
                            #{tagItem.tag}
                            <span className="ml-1 text-xs opacity-75">
                              {tagItem.count}
                            </span>
                          </a>
                        ))}
                    </div>
                  </div>

                  {/* 今後のリリース予定 */}
                  <UpcomingReleasesCompact />

                  {/* 全タグリスト */}
                  <div id="tags" className="bg-white rounded-xl p-6 border border-gray-200">
                    <Heading as="h3" size="md" className="mb-4">
                      すべてのタグ
                    </Heading>
                    
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {allTags.map((tagItem) => (
                        <a
                          key={tagItem.tag}
                          href={`/releases/tag/${encodeURIComponent(tagItem.tag)}`}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                            tagItem.tag === decodedTag
                              ? 'bg-blue-100 text-blue-800 font-medium'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <span>#{tagItem.tag}</span>
                          <span className="text-xs opacity-75">
                            {tagItem.count}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* タグ詳細情報 */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h2" size="2xl" className="mb-4">
              「{decodedTag}」について
            </Heading>
            
            <Text variant="muted" className="mb-8">
              このタグは、{getTagDescription(decodedTag)}に関連するリリースに付けられています。
              定期的にチェックして、最新の機能やアップデートをお見逃しなく。
            </Text>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/releases/feed.xml?tag=${encodeURIComponent(decodedTag)}`}
                className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.429 2.857A1.429 1.429 0 002 4.286v11.428A1.429 1.429 0 003.429 17h13.142A1.429 1.429 0 0018 15.714V4.286A1.429 1.429 0 0016.571 2.857H3.429zM4 6.857v2.286H6.286V6.857H4zm8.571 0h2.286v2.286h-2.286V6.857zM4 10.571v2.286h2.286v-2.286H4zm4.571-3.714v2.286h2.286V6.857H8.571zm4.572 3.714v2.286h2.286v-2.286h-2.286zM8.571 10.571v2.286h2.286v-2.286H8.571z" />
                </svg>
                このタグのRSSを購読
              </a>
              
              <a
                href="/releases"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                すべてのリリースを見る
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

// タグの説明を生成する関数
function getTagDescription(tag: string): string {
  const descriptions: Record<string, string> = {
    'frontend': 'フロントエンド（ユーザーインターフェース）',
    'backend': 'バックエンド（サーバー・API）',
    'api': 'API（アプリケーションプログラミングインターフェース）',
    'mobile': 'モバイルアプリケーション',
    'security': 'セキュリティ',
    'performance': 'パフォーマンス・最適化',
    'ui': 'ユーザーインターフェース',
    'ux': 'ユーザーエクスペリエンス',
    'database': 'データベース',
    'analytics': '分析・統計',
    'integration': '外部サービス連携',
    'collaboration': 'チーム・コラボレーション機能',
    'automation': '自動化・ワークフロー',
    'reporting': 'レポート・ダッシュボード'
  }

  return descriptions[tag.toLowerCase()] || `${tag}関連の機能や改善`
}