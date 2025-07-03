'use client'

import { useEffect } from 'react'
import { criticalCSS, fontLoadingCSS, PerformanceMonitor } from '@/lib/critical-css'

export function CriticalCSS() {
  useEffect(() => {
    // Initialize performance monitoring
    PerformanceMonitor.initAllObservers()
    
    // Mark critical CSS loaded
    PerformanceMonitor.mark('critical-css-loaded')
    
    // Preload non-critical CSS
    const loadNonCriticalCSS = () => {
      const link = document.createElement('link') as HTMLLinkElement
      link.rel = 'stylesheet'
      link.href = '/css/non-critical.css'
      link.media = 'print'
      link.onload = function() {
        (this as HTMLLinkElement).media = 'all'
        PerformanceMonitor.mark('non-critical-css-loaded')
      }
      document.head.appendChild(link)
    }

    // Load non-critical CSS after initial paint
    requestIdleCallback(loadNonCriticalCSS, { timeout: 2000 })

    // Font loading optimization
    const optimizeFontLoading = () => {
      if ('fonts' in document) {
        // Load critical fonts
        const fontPromises = [
          new FontFace('Inter', 'url(/fonts/inter-var.woff2)', {
            weight: '400 700',
            display: 'swap'
          }).load()
        ]

        Promise.all(fontPromises).then(fonts => {
          fonts.forEach(font => {
            document.fonts.add(font)
          })
          PerformanceMonitor.mark('fonts-loaded')
        })
      }
    }

    optimizeFontLoading()

    // Cleanup performance marks after reporting
    return () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        // Report final metrics
        const metrics = PerformanceMonitor.getAllMetrics()
        if (Object.keys(metrics).length > 0 && process.env.NODE_ENV === 'development') {
          console.table(metrics)
        }
      }
    }
  }, [])

  return (
    <>
      {/* Critical CSS inline */}
      <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      
      {/* Font loading optimization */}
      <style dangerouslySetInnerHTML={{ __html: fontLoadingCSS }} />
      
      {/* Resource hints for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Preload critical resources */}
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/icons/icon-192x192.png"
        as="image"
        type="image/png"
      />
    </>
  )
}

export default CriticalCSS