import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | YourSaaS Releases',
    default: 'Release Notes | YourSaaS Platform'
  },
  description: 'YourSaaSプラットフォームの最新リリース情報、機能アップデート、バグ修正、破壊的変更について。',
  keywords: 'YourSaaS, リリースノート, アップデート, 新機能, バグ修正, 変更履歴, SaaS',
  authors: [{ name: 'YourSaaS Team' }],
  openGraph: {
    title: 'Release Notes | YourSaaS Platform',
    description: 'YourSaaSプラットフォームの最新リリース情報、機能アップデート、バグ修正、破壊的変更について。',
    type: 'website',
    siteName: 'YourSaaS Platform',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Release Notes | YourSaaS Platform',
    description: 'YourSaaSプラットフォームの最新リリース情報、機能アップデート、バグ修正、破壊的変更について。',
  },
  alternates: {
    canonical: '/releases',
  }
}

export default function ReleasesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  )
}