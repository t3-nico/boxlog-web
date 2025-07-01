import React from 'react'
import type { Metadata } from 'next'
import { Container, Heading, Text } from '@/components/ui'
import { ReleaseCard } from '@/components/releases/ReleaseCard'
import { UpcomingReleases, UpcomingReleasesCompact } from '@/components/releases/UpcomingReleases'
import { ChangeTypeGrid } from '@/components/releases/ChangeTypeList'
import { 
  getAllReleaseMetas, 
  getAllReleaseTags, 
  getFeaturedReleases,
  generateReleaseTimeline,
  ReleasePostMeta,
  TagCount
} from '@/lib/releases'
import { ReleasesClient } from '@/components/releases/ReleasesClient'

export const metadata: Metadata = {
  title: 'リリースノート | YourSaaS',
  description: 'YourSaaSプラットフォームの最新機能、改善、バグ修正について。すべての変更は透明性を持って文書化され、お客様に迅速にお届けしています。',
  keywords: 'リリースノート, アップデート, 新機能, バグ修正, YourSaaS',
  openGraph: {
    title: 'リリースノート | YourSaaS',
    description: 'YourSaaSプラットフォームの最新機能、改善、バグ修正について。',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'リリースノート | YourSaaS',
    description: 'YourSaaSプラットフォームの最新機能、改善、バグ修正について。',
  }
}

export default async function ReleasesPage() {
  // サーバーサイドでデータを取得
  const [allReleases, allTags, featuredReleases] = await Promise.all([
    getAllReleaseMetas(),
    getAllReleaseTags(),
    getFeaturedReleases()
  ])

  // Mock upcoming releases data
  const upcomingReleases = [
    {
      version: '2.2.0',
      expectedDate: '2024-02-15',
      status: 'development' as const,
      description: 'AI搭載の次世代機能とカスタムワークフロー',
      features: ['AI推奨機能', 'カスタムワークフロー', '高度な分析'],
      progress: 75
    },
    {
      version: '2.1.5',
      expectedDate: '2024-01-30',
      status: 'review' as const,
      description: 'パフォーマンス改善とセキュリティ強化',
      features: ['パフォーマンス最適化', 'セキュリティ強化'],
      progress: 90
    }
  ]

  // 統計データ
  const stats = {
    'new-features': allReleases.reduce((count, release) => {
      // MDXコンテンツから新機能の数を推定（実際の実装では詳細な解析が必要）
      return count + (release.frontMatter.tags.includes('frontend') ? 5 : 3)
    }, 0),
    'improvements': allReleases.reduce((count, release) => {
      return count + (release.frontMatter.tags.includes('performance') ? 4 : 2)
    }, 0),
    'bug-fixes': allReleases.reduce((count, release) => {
      return count + (release.frontMatter.tags.includes('security') ? 2 : 3)
    }, 0),
    'breaking-changes': allReleases.filter(r => r.frontMatter.breaking).length,
    'security-updates': allReleases.filter(r => r.frontMatter.tags.includes('security')).length
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <Container>
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            
            <Heading as="h1" size="4xl" className="mb-6">
              リリースノート
            </Heading>
            
            <Text size="xl" variant="muted" className="mb-8 max-w-3xl mx-auto">
              YourSaaSプラットフォームの最新機能、改善、バグ修正について。
              すべての変更は透明性を持って文書化され、お客様に迅速にお届けしています。
            </Text>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <Heading as="h3" size="md" className="mb-2">
                  継続的な改善
                </Heading>
                <Text size="sm" variant="muted">
                  毎週新しい機能とアップデートをリリース
                </Text>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <Heading as="h3" size="md" className="mb-2">
                  安定性重視
                </Heading>
                <Text size="sm" variant="muted">
                  徹底的なテストによる信頼性の確保
                </Text>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <Heading as="h3" size="md" className="mb-2">
                  フィードバック重視
                </Heading>
                <Text size="sm" variant="muted">
                  ユーザーの声を反映した機能開発
                </Text>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#releases"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                最新リリースを見る
              </a>
              
              <a
                href="/roadmap"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                ロードマップを見る
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Upcoming Releases */}
      <section className="py-16 bg-white border-b border-gray-100">
        <Container>
          <div className="max-w-6xl mx-auto">
            <UpcomingReleases upcomingReleases={upcomingReleases} />
          </div>
        </Container>
      </section>

      {/* Release Statistics */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <Heading as="h2" size="2xl" className="mb-4">
                変更統計
              </Heading>
              <Text variant="muted">
                最近のリリースでの変更内容の内訳
              </Text>
            </div>

            <ChangeTypeGrid stats={stats} />
          </div>
        </Container>
      </section>

      {/* Main Releases Section - Client Component */}
      <ReleasesClient 
        initialReleases={allReleases}
        initialTags={allTags}
        featuredReleases={featuredReleases}
        upcomingReleases={upcomingReleases}
      />
    </div>
  )
}