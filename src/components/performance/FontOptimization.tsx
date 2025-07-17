'use client'

import { useEffect, useCallback } from 'react'
import Head from 'next/head'

// フォント最適化設定
const FONT_CONFIG = {
  // Primary font (Inter Variable)
  primary: {
    family: 'Inter Variable',
    fallback: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    variants: [
      {
        url: '/fonts/inter-var-latin.woff2',
        format: 'woff2-variations',
        subset: 'latin',
        weight: '100 900',
        display: 'swap',
        unicodeRange: 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
      }
    ]
  },
  // Monospace font for code
  mono: {
    family: 'JetBrains Mono Variable',
    fallback: 'ui-monospace, SFMono-Regular, Monaco, Consolas, monospace',
    variants: [
      {
        url: '/fonts/jetbrains-mono-var.woff2',
        format: 'woff2-variations',
        subset: 'latin',
        weight: '100 800',
        display: 'swap',
        unicodeRange: 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
      }
    ]
  }
}

export function FontOptimization() {
  const preloadSecondaryFonts = useCallback(() => {
    // セカンダリフォント（コードブロック用など）の遅延読み込み
    if (document.querySelector('pre, code')) {
      const monoFontLink = document.createElement('link')
      monoFontLink.rel = 'preload'
      monoFontLink.as = 'font'
      monoFontLink.type = 'font/woff2'
      monoFontLink.href = '/fonts/jetbrains-mono-var.woff2'
      monoFontLink.crossOrigin = 'anonymous'
      document.head.appendChild(monoFontLink)
    }
  }, [])

  const optimizeAfterFontLoad = useCallback(() => {
    // フォント読み込み後のCLS対策
    document.documentElement.classList.add('fonts-loaded')
    
    // 遅延読み込みフォントがあれば開始
    preloadSecondaryFonts()
  }, [preloadSecondaryFonts])

  useEffect(() => {
    // クライアントサイドでフォントの読み込み状況を監視
    if ('fonts' in document) {
      const documentFonts = (document as any).fonts
      
      documentFonts.ready.then(() => {
        console.log('All fonts loaded')
        // フォント読み込み完了後の最適化
        optimizeAfterFontLoad()
      })

      // フォントの読み込み状況をリアルタイム監視
      documentFonts.addEventListener('loadingdone', (event: any) => {
        console.log(`Font loaded: ${event.fontface.family}`)
      })

      documentFonts.addEventListener('loadingerror', (event: any) => {
        console.error(`Font failed to load: ${event.fontface.family}`)
      })
    }
  }, [optimizeAfterFontLoad, preloadSecondaryFonts])

  return (
    <>
      <style jsx>{`
        /* Critical font face declarations */
        @font-face {
          font-family: 'Inter Variable';
          font-style: normal;
          font-weight: 100 900;
          font-display: swap;
          src: url('/fonts/inter-var-latin.woff2') format('woff2-variations');
          unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
        }

        /* Font loading optimization */
        html:not(.fonts-loaded) {
          /* フォント読み込み前のフォールバック最適化 */
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .fonts-loaded {
          /* フォント読み込み後の設定 */
          font-family: 'Inter Variable', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
          font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
          font-variation-settings: normal;
        }

        /* Font size optimization for performance */
        @media (max-width: 640px) {
          html { font-size: 14px; }
        }
        
        @media (min-width: 641px) and (max-width: 1024px) {
          html { font-size: 15px; }
        }
        
        @media (min-width: 1025px) {
          html { font-size: 16px; }
        }
      `}</style>
    </>
  )
}

// Server-side font preloading component
export function FontPreloader() {
  return (
    <>
      {/* Critical font preloading */}
      <link
        rel="preload"
        href="/fonts/inter-var-latin.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* Secondary font preloading (conditional) */}
      <link
        rel="preload"
        href="/fonts/jetbrains-mono-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        // @ts-ignore
        media="(min-width: 768px)" // デスクトップでのみプリロード
      />
      
      {/* Font optimization metadata */}
      <meta name="font-optimization" content="enabled" />
    </>
  )
}