'use client'

import { ReactNode, Suspense, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SkipLinks } from '@/components/accessibility/SkipLinks'
import { LightweightProviders, StandardProviders, FullProviders } from '@/components/providers/OptionalProviders'
import { PageLoader } from '@/components/loading/PageLoader'
import { PreloadStrategy } from '@/components/performance/PreloadStrategy'
import { EnhancedAccessibility } from '@/components/accessibility/EnhancedAccessibility'
import { getDictionary, type Dictionary } from '@/lib/i18n'

interface OptimizedLayoutProps {
  children: ReactNode
  locale?: string
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

export function OptimizedLayout({ children, locale }: OptimizedLayoutProps) {
  const pathname = usePathname()
  const providerLevel = getProviderLevel(pathname)
  const loadingConfig = getLoadingConfig(pathname)
  const [dict, setDict] = useState<Dictionary | null>(null)
  
  // Extract locale from pathname if not provided
  const currentLocale = locale || pathname.split('/')[1] || 'en'

  useEffect(() => {
    const loadDictionary = async () => {
      const dictionary = getDictionary(currentLocale as 'en' | 'jp')
      setDict(dictionary)
    }
    loadDictionary()
  }, [currentLocale])

  const ProviderComponent = {
    lightweight: LightweightProviders,
    standard: StandardProviders,
    full: FullProviders
  }[providerLevel]

  // Show loading until dictionary is loaded
  if (!dict) {
    return <div>Loading...</div>
  }

  return (
    <ProviderComponent>
      <PreloadStrategy />
      <EnhancedAccessibility />
      <SkipLinks />
      <Header locale={currentLocale} dict={dict} />
      <main id="main-content" role="main">
        <PageLoader showSkeleton={loadingConfig.showSkeleton}>
          {children}
        </PageLoader>
      </main>
      <Footer locale={currentLocale} dict={dict} />
    </ProviderComponent>
  )
}