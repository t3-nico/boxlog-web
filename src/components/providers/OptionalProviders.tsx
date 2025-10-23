'use client'

import { ReactNode, Suspense } from 'react'
import dynamic from 'next/dynamic'

// 軽量なProviderは直接インポート
import { ThemeProvider } from '@/lib/theme-provider'
import { PerformanceProvider } from '@/components/performance/PerformanceProvider'

// 重いProviderは動的インポート
const AccessibilityProvider = dynamic(
  () => import('@/components/accessibility/AccessibilityProvider').then(mod => ({ default: mod.AccessibilityProvider })),
  {
    ssr: false,
    loading: () => <div className="accessibility-loading" />
  }
)

interface ProvidersWrapperProps {
  children: ReactNode
  skipAccessibility?: boolean
  skipPerformance?: boolean
}

export function ProvidersWrapper({ children, skipAccessibility = false, skipPerformance = false }: ProvidersWrapperProps) {
  let content = children

  // パフォーマンスモニタリングが必要な場合のみ
  if (!skipPerformance) {
    content = (
      <PerformanceProvider>
        {content}
      </PerformanceProvider>
    )
  }

  // アクセシビリティ機能が必要な場合のみ（フォーム、ダイアログなど）
  if (!skipAccessibility) {
    content = (
      <Suspense fallback={<div className="a11y-loading" />}>
        <AccessibilityProvider>
          {content}
        </AccessibilityProvider>
      </Suspense>
    )
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      {content}
    </ThemeProvider>
  )
}

// 軽量バージョン（静的ページ、ランディングページなど）
export function LightweightProviders({ children }: { children: ReactNode }) {
  return (
    <ProvidersWrapper skipAccessibility skipPerformance>
      {children}
    </ProvidersWrapper>
  )
}

// 中量バージョン（ブログ、ドキュメントなど）
export function StandardProviders({ children }: { children: ReactNode }) {
  return (
    <ProvidersWrapper skipAccessibility>
      {children}
    </ProvidersWrapper>
  )
}

// フル機能バージョン（フォーム、インタラクティブページなど）
export function FullProviders({ children }: { children: ReactNode }) {
  return (
    <ProvidersWrapper>
      {children}
    </ProvidersWrapper>
  )
}