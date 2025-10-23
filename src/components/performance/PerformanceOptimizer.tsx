'use client'

import { useEffect, useState } from 'react'
import { getBundleAnalysis, PerformanceMonitor } from '@/lib/critical-css'

interface PerformanceMetrics {
  domContentLoaded?: number
  loadComplete?: number
  totalLoadTime?: number
  dnsLookup?: number
  tcpConnection?: number
  serverResponse?: number
  domProcessing?: number
  resourceCount?: number
  lcp?: number
  cls?: number
  fid?: number
}

export function PerformanceOptimizer() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({})

  useEffect(() => {
    // Image lazy loading optimization
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[loading="lazy"]')
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement
              if (img.dataset.src) {
                img.src = img.dataset.src
                img.removeAttribute('data-src')
                imageObserver.unobserve(img)
              }
            }
          })
        })

        images.forEach(img => imageObserver.observe(img))
      }
    }

    // Service Worker registration for caching
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
        try {
          await navigator.serviceWorker.register('/sw.js')
          PerformanceMonitor.mark('service-worker-registered')
        } catch (error) {
          console.error('Failed to register service worker:', error)
        }
      }
    }

    // Memory management
    const optimizeMemory = () => {
      // Remove unused event listeners
      const cleanupListeners = () => {
        const elements = document.querySelectorAll('[data-cleanup]')
        elements.forEach(el => {
          const cleanup = (el as any).__cleanup
          if (typeof cleanup === 'function') {
            cleanup()
          }
        })
      }

      // Cleanup on page visibility change
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          cleanupListeners()
        }
      })

      // Cleanup before unload
      window.addEventListener('beforeunload', cleanupListeners)
    }

    // Performance monitoring
    const monitorPerformance = async () => {
      try {
        // Get bundle analysis
        const bundleData = await getBundleAnalysis()
        
        // Get Web Vitals metrics
        const webVitalsMetrics = PerformanceMonitor.getAllMetrics()
        
        setMetrics({
          ...bundleData,
          ...webVitalsMetrics
        })

        // Report to analytics if available
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'web_vitals', {
            custom_map: {
              metric_lcp: 'largest_contentful_paint',
              metric_fid: 'first_input_delay',
              metric_cls: 'cumulative_layout_shift'
            }
          })
        }
      } catch (error) {
        console.error('Failed to monitor performance:', error)
      }
    }

    // Initialize optimizations
    optimizeImages()
    registerServiceWorker()
    optimizeMemory()
    
    // Monitor performance after load
    if (document.readyState === 'complete') {
      monitorPerformance()
    } else {
      window.addEventListener('load', monitorPerformance)
    }

    // Cleanup
    return () => {
      window.removeEventListener('load', monitorPerformance)
    }
  }, [])

  // Development mode performance display
  if (process.env.NODE_ENV === 'development' && Object.keys(metrics).length > 0) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-black text-white p-2 rounded text-xs max-w-xs opacity-75 hover:opacity-100 transition-opacity">
        <div className="font-bold mb-1">Performance Metrics</div>
        {metrics.totalLoadTime && (
          <div>Load Time: {Math.round(metrics.totalLoadTime)}ms</div>
        )}
        {metrics.lcp && (
          <div>LCP: {Math.round(metrics.lcp)}ms</div>
        )}
        {metrics.cls && (
          <div>CLS: {metrics.cls.toFixed(3)}</div>
        )}
        {metrics.fid && (
          <div>FID: {Math.round(metrics.fid)}ms</div>
        )}
        {metrics.resourceCount && (
          <div>Resources: {metrics.resourceCount}</div>
        )}
      </div>
    )
  }

  return null
}

export default PerformanceOptimizer