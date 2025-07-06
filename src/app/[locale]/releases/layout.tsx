import type { Metadata } from 'next'

interface ReleasesLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  if (locale === 'jp') {
    return {
      title: {
        template: '%s | YourSaaS リリース',
        default: 'リリースノート | YourSaaS プラットフォーム'
      },
      description: 'YourSaaSプラットフォームの最新リリース情報、機能アップデート、バグ修正、破壊的変更について。',
      keywords: 'YourSaaS, リリースノート, アップデート, 新機能, バグ修正, 変更履歴, SaaS',
      authors: [{ name: 'YourSaaS Team' }],
      openGraph: {
        title: 'リリースノート | YourSaaS プラットフォーム',
        description: 'YourSaaSプラットフォームの最新リリース情報、機能アップデート、バグ修正、破壊的変更について。',
        type: 'website',
        siteName: 'YourSaaS Platform',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'リリースノート | YourSaaS プラットフォーム',
        description: 'YourSaaSプラットフォームの最新リリース情報、機能アップデート、バグ修正、破壊的変更について。',
      },
      alternates: {
        canonical: '/jp/releases',
      }
    }
  }
  
  return {
    title: {
      template: '%s | YourSaaS Releases',
      default: 'Release Notes | YourSaaS Platform'
    },
    description: 'Latest release information, feature updates, bug fixes, and breaking changes for the YourSaaS platform.',
    keywords: 'YourSaaS, release notes, updates, new features, bug fixes, changelog, SaaS',
    authors: [{ name: 'YourSaaS Team' }],
    openGraph: {
      title: 'Release Notes | YourSaaS Platform',
      description: 'Latest release information, feature updates, bug fixes, and breaking changes for the YourSaaS platform.',
      type: 'website',
      siteName: 'YourSaaS Platform',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Release Notes | YourSaaS Platform',
      description: 'Latest release information, feature updates, bug fixes, and breaking changes for the YourSaaS platform.',
    },
    alternates: {
      canonical: '/releases',
    }
  }
}

export default function ReleasesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {children}
    </div>
  )
}