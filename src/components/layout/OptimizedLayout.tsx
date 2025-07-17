'use client'

import { ReactNode, Suspense } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SkipLinks } from '@/components/accessibility/SkipLinks'
import { LightweightProviders, StandardProviders, FullProviders } from '@/components/providers/OptionalProviders'
import { PageLoader } from '@/components/loading/PageLoader'
import { PreloadStrategy } from '@/components/performance/PreloadStrategy'
import { EnhancedAccessibility } from '@/components/accessibility/EnhancedAccessibility'

interface OptimizedLayoutProps {
  children: ReactNode
}

// ページタイプ別にProvider要件を定義
const getProviderLevel = (pathname: string): 'lightweight' | 'standard' | 'full' => {
  // 軽量: 静的ページ、ランディングページ
  if (pathname === '/' || pathname === '/about' || pathname === '/features' || pathname === '/pricing') {
    return 'lightweight'
  }
  
  // フル機能: インタラクティブページ、フォームページ
  if (pathname === '/contact' || pathname.startsWith('/search') || pathname.includes('admin')) {
    return 'full'
  }
  
  // 標準: ブログ、ドキュメント
  return 'standard'
}

// ページ遷移時のローディング設定
const getLoadingConfig = (pathname: string) => {
  if (pathname === '/' || pathname === '/about' || pathname === '/features' || pathname === '/pricing') {
    return { showSkeleton: false } // 軽量ページは最小限のローダー
  }
  return { showSkeleton: true } // 他のページはスケルトン表示
}

export function OptimizedLayout({ children }: OptimizedLayoutProps) {
  const pathname = usePathname()
  const providerLevel = getProviderLevel(pathname)
  const loadingConfig = getLoadingConfig(pathname)

  const ProviderComponent = {
    lightweight: LightweightProviders,
    standard: StandardProviders,
    full: FullProviders
  }[providerLevel]

  return (
    <ProviderComponent>
      <PreloadStrategy />
      <EnhancedAccessibility />
      <SkipLinks />
      <Header />
      <main id="main-content" role="main">
        <PageLoader showSkeleton={loadingConfig.showSkeleton}>
          {children}
        </PageLoader>
      </main>
      <Footer />
    </ProviderComponent>
  )
}