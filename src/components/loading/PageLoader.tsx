'use client'

import { Suspense, ReactNode } from 'react'
import { Container } from '@/components/ui/container'

interface PageLoaderProps {
  children: ReactNode
  fallback?: ReactNode
  showSkeleton?: boolean
}

// シンプルなスケルトンローダー
function DefaultSkeleton() {
  return (
    <Container>
      <div className="py-12 space-y-8 animate-pulse">
        {/* ヘッダー部分 */}
        <div className="space-y-4">
          <div className="h-8 bg-neutral-200 rounded-lg w-1/3 dark:bg-neutral-700" />
          <div className="h-4 bg-neutral-200 rounded-lg w-2/3 dark:bg-neutral-700" />
          <div className="h-4 bg-neutral-200 rounded-lg w-1/2 dark:bg-neutral-700" />
        </div>
        
        {/* コンテンツ部分 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-48 bg-neutral-200 rounded-lg dark:bg-neutral-700" />
              <div className="space-y-2">
                <div className="h-4 bg-neutral-200 rounded dark:bg-neutral-700" />
                <div className="h-4 bg-neutral-200 rounded w-4/5 dark:bg-neutral-700" />
                <div className="h-4 bg-neutral-200 rounded w-3/5 dark:bg-neutral-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

// ミニマルローダー（軽量ページ用）
function MinimalLoader() {
  return (
    <Container>
      <div className="py-16 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-neutral-400 rounded-full animate-pulse dark:bg-neutral-600"></div>
          <div className="w-3 h-3 bg-neutral-400 rounded-full animate-pulse [animation-delay:0.2s] dark:bg-neutral-600"></div>
          <div className="w-3 h-3 bg-neutral-400 rounded-full animate-pulse [animation-delay:0.4s] dark:bg-neutral-600"></div>
        </div>
      </div>
    </Container>
  )
}

export function PageLoader({ children, fallback, showSkeleton = true }: PageLoaderProps) {
  const defaultFallback = showSkeleton ? <DefaultSkeleton /> : <MinimalLoader />
  
  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  )
}

// 特定のコンテンツタイプ用のローダー
export function BlogContentLoader({ children }: { children: ReactNode }) {
  return (
    <PageLoader 
      fallback={
        <Container>
          <div className="max-w-4xl mx-auto py-12 space-y-8 animate-pulse">
            <div className="space-y-4">
              <div className="h-10 bg-neutral-200 rounded-lg w-3/4 dark:bg-neutral-700" />
              <div className="h-4 bg-neutral-200 rounded w-1/3 dark:bg-neutral-700" />
              <div className="h-64 bg-neutral-200 rounded-lg dark:bg-neutral-700" />
            </div>
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-4 bg-neutral-200 rounded dark:bg-neutral-700" />
              ))}
            </div>
          </div>
        </Container>
      }
    >
      {children}
    </PageLoader>
  )
}

export function ListContentLoader({ children }: { children: ReactNode }) {
  return (
    <PageLoader 
      fallback={
        <Container>
          <div className="py-12 space-y-6 animate-pulse">
            <div className="h-8 bg-neutral-200 rounded-lg w-1/4 dark:bg-neutral-700" />
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border border-neutral-200 rounded-lg p-6 dark:border-neutral-700">
                  <div className="space-y-4">
                    <div className="h-6 bg-neutral-200 rounded w-2/3 dark:bg-neutral-700" />
                    <div className="h-4 bg-neutral-200 rounded w-full dark:bg-neutral-700" />
                    <div className="h-4 bg-neutral-200 rounded w-4/5 dark:bg-neutral-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      }
    >
      {children}
    </PageLoader>
  )
}