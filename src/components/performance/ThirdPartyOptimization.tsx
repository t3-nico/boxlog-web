'use client'

import { useEffect } from 'react'
import Script from 'next/script'

// サードパーティスクリプトの最適化管理
export function ThirdPartyOptimization() {
  useEffect(() => {
    // Google Analytics の遅延読み込み
    const loadGoogleAnalytics = () => {
      if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_ID) {
        // gtag をグローバルに設定
        window.gtag = function(...args: any[]) {
          (window as any).dataLayer = (window as any).dataLayer || []
          ;(window as any).dataLayer.push(args)
        }
        
        // GA4 の設定
        window.gtag('js', new Date())
        window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
          page_title: document.title,
          page_location: window.location.href
        })
      }
    }

    // ユーザーのインタラクション後にGA読み込み
    const handleFirstInteraction = () => {
      loadGoogleAnalytics()
      // イベントリスナーを削除
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('scroll', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
    }

    // インタラクション検知または3秒後に読み込み
    document.addEventListener('click', handleFirstInteraction, { once: true })
    document.addEventListener('scroll', handleFirstInteraction, { once: true })
    document.addEventListener('keydown', handleFirstInteraction, { once: true })
    
    const fallbackTimer = setTimeout(loadGoogleAnalytics, 3000)

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('scroll', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
      clearTimeout(fallbackTimer)
    }
  }, [])

  return (
    <>
      {/* Google Analytics - 遅延読み込み */}
      {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
            async
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_title: document.title,
                page_location: window.location.href,
                anonymize_ip: true,
                allow_google_signals: false,
                allow_ad_personalization_signals: false
              });
            `}
          </Script>
        </>
      )}

      {/* Web Vitals レポート - 遅延読み込み */}
      <Script id="web-vitals" strategy="afterInteractive">
        {`
          function reportWebVitals(metric) {
            if (window.gtag) {
              window.gtag('event', metric.name, {
                value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                event_category: 'Web Vitals',
                event_label: metric.id,
                non_interaction: true,
              });
            }
          }

          // Web Vitals 計測の遅延読み込み
          if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
              import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(reportWebVitals);
                getFID(reportWebVitals);
                getFCP(reportWebVitals);
                getLCP(reportWebVitals);
                getTTFB(reportWebVitals);
              });
            });
          } else {
            setTimeout(() => {
              import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(reportWebVitals);
                getFID(reportWebVitals);
                getFCP(reportWebVitals);
                getLCP(reportWebVitals);
                getTTFB(reportWebVitals);
              });
            }, 2000);
          }
        `}
      </Script>

      {/* パフォーマンス監視 - 開発環境のみ */}
      {process.env.NODE_ENV === 'development' && (
        <Script id="performance-monitor" strategy="afterInteractive">
          {`
            // Core Web Vitals のリアルタイム監視
            const observer = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                console.log(\`\${entry.entryType}: \${entry.name} - \${entry.startTime.toFixed(2)}ms\`);
              }
            });
            
            observer.observe({ entryTypes: ['navigation', 'mark', 'measure'] });

            // Resource timing の監視
            const resourceObserver = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                if (entry.transferSize > 50000) { // 50KB以上のリソースを警告
                  console.warn(\`Large resource detected: \${entry.name} (\${(entry.transferSize / 1024).toFixed(2)}KB)\`);
                }
              }
            });
            
            resourceObserver.observe({ entryTypes: ['resource'] });
          `}
        </Script>
      )}

      {/* Service Worker 登録 - 最低優先度 */}
      <Script id="service-worker" strategy="lazyOnload">
        {`
          if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/sw.js').then(
                (registration) => {
                  console.log('SW registered: ', registration);
                },
                (registrationError) => {
                  console.log('SW registration failed: ', registrationError);
                }
              );
            });
          }
        `}
      </Script>
    </>
  )
}

// グローバル型定義の拡張
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}