'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SkipLinks } from '@/components/accessibility/SkipLinks'
import { LightweightProviders, StandardProviders, FullProviders } from '@/components/providers/OptionalProviders'

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

export function OptimizedLayout({ children }: OptimizedLayoutProps) {
  const pathname = usePathname()
  const providerLevel = getProviderLevel(pathname)

  const ProviderComponent = {
    lightweight: LightweightProviders,
    standard: StandardProviders,
    full: FullProviders
  }[providerLevel]

  return (
    <ProviderComponent>
      <SkipLinks />
      <Header />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </ProviderComponent>
  )
}