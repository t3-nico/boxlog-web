'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// 重要なページのプリロード設定
const PRELOAD_ROUTES = {
  '/': ['/features', '/pricing', '/blog'], // ホームから移動しやすいページ
  '/features': ['/pricing', '/contact', '/docs'], // 機能ページからの関連ページ
  '/pricing': ['/contact', '/features'], // 価格ページからの関連ページ
  '/blog': ['/docs', '/tags'], // ブログからの関連ページ
  '/docs': ['/blog', '/features'], // ドキュメントからの関連ページ
}

// 重要なアセットのプリロード
const CRITICAL_ASSETS: string[] = [
  // フォント（既にCSSで設定済みだが、追加の重要フォント）
  // '/fonts/inter-var.woff2',
  
  // 重要なアイコン
  // '/icons/logo.svg',
  
  // 重要な画像（実際の画像パスに置き換える）
  // '/images/hero-bg.webp',
]

export function PreloadStrategy() {
  const pathname = usePathname()

  useEffect(() => {
    // 1. ルートベースのプリフェッチ
    const routesToPreload = PRELOAD_ROUTES[pathname as keyof typeof PRELOAD_ROUTES] || []
    
    routesToPreload.forEach((route) => {
      // Next.jsのルーターで自動的にプリフェッチされるが、明示的に指定
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = route
      document.head.appendChild(link)
    })

    // 2. 重要なアセットのプリロード
    CRITICAL_ASSETS.forEach((asset) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = asset
      
      // ファイルタイプに応じてasを設定
      if (asset.includes('.woff2')) {
        link.as = 'font'
        link.type = 'font/woff2'
        link.crossOrigin = 'anonymous'
      } else if (asset.includes('.webp') || asset.includes('.jpg') || asset.includes('.png')) {
        link.as = 'image'
      } else if (asset.includes('.svg')) {
        link.as = 'image'
        link.type = 'image/svg+xml'
      }
      
      document.head.appendChild(link)
    })

    // 3. 現在のページタイプに応じた追加プリロード
    if (pathname.startsWith('/blog')) {
      // ブログページでは関連記事のプリフェッチ
      preloadBlogAssets()
    } else if (pathname.startsWith('/docs')) {
      // ドキュメントページでは関連ドキュメントのプリフェッチ
      preloadDocsAssets()
    }

    // 4. ユーザーがページを離れる前に次のページをプリロード（マウスオーバー時）
    setupHoverPreload()

    // クリーンアップ関数
    return () => {
      // 必要に応じてプリロードしたリンクを削除
      document.querySelectorAll('link[rel="prefetch"]').forEach(link => {
        if (routesToPreload.includes((link as HTMLLinkElement).href.replace(window.location.origin, ''))) {
          link.remove()
        }
      })
    }
  }, [pathname])

  return null // このコンポーネントは何もレンダリングしない
}

// ブログ関連のアセットをプリロード
function preloadBlogAssets() {
  // ブログで使用される可能性が高いアセット
  const blogAssets: string[] = [
    // '/api/tags', // タグAPIの事前読み込み
    // '/api/blog-posts', // ブログ投稿リストAPI
  ]

  blogAssets.forEach((asset) => {
    fetch(asset).catch(() => {
      // エラーは無視（プリロードなので）
    })
  })
}

// ドキュメント関連のアセットをプリロード
function preloadDocsAssets() {
  // ドキュメントで使用される可能性が高いアセット
  const docsAssets: string[] = [
    // '/api/search', // 検索APIの事前読み込み
  ]

  docsAssets.forEach((asset) => {
    fetch(asset).catch(() => {
      // エラーは無視（プリロードなので）
    })
  })
}

// ホバー時のプリロード設定
function setupHoverPreload() {
  let hoverTimer: NodeJS.Timeout

  const handleMouseEnter = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    const link = target.closest('a[href]') as HTMLAnchorElement
    
    if (link && link.href.startsWith(window.location.origin)) {
      const href = link.href.replace(window.location.origin, '')
      
      // 200ms後にプリロード（誤操作を避けるため）
      hoverTimer = setTimeout(() => {
        const preloadLink = document.createElement('link')
        preloadLink.rel = 'prefetch'
        preloadLink.href = href
        preloadLink.setAttribute('data-hover-preload', 'true')
        document.head.appendChild(preloadLink)
      }, 200)
    }
  }

  const handleMouseLeave = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer)
    }
  }

  // すべてのリンクにイベントリスナーを追加
  document.addEventListener('mouseenter', handleMouseEnter, { capture: true })
  document.addEventListener('mouseleave', handleMouseLeave, { capture: true })

  // クリーンアップ用の関数を返す
  return () => {
    document.removeEventListener('mouseenter', handleMouseEnter, { capture: true })
    document.removeEventListener('mouseleave', handleMouseLeave, { capture: true })
    
    // ホバーでプリロードしたリンクを削除
    document.querySelectorAll('link[data-hover-preload="true"]').forEach(link => {
      link.remove()
    })
  }
}