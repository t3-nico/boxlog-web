/**
 * Critical CSS extraction and performance optimization utilities
 */

// Critical CSS for above-the-fold content
export const criticalCSS = `
/* Critical styles for immediate rendering */
html {
  scroll-behavior: smooth;
}

/* Skip links */
.skip-nav-link {
  position: absolute;
  transform: translateY(-100%);
  transition: transform 0.3s;
  background: #1e40af;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 0 0 4px 4px;
  font-weight: 600;
  white-space: nowrap;
  z-index: 9999;
}

.skip-nav-link:focus {
  transform: translateY(0%);
}

/* Loading state */
.loading {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

*:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`

// Font loading optimization
export const fontLoadingCSS = `
/* Font loading optimization */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/inter-var.woff2') format('woff2');
}

/* Fallback fonts for FOUT prevention */
.font-inter {
  font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Preload critical fonts */
.font-preload {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}
`

// Performance monitoring utilities
export class PerformanceMonitor {
  private static metrics: Map<string, number> = new Map()

  static mark(name: string): void {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(name)
    }
  }

  static measure(name: string, startMark: string, endMark?: string): number | null {
    if (typeof window === 'undefined' || !('performance' in window)) {
      return null
    }

    try {
      const measurement = performance.measure(name, startMark, endMark)
      const duration = measurement.duration
      this.metrics.set(name, duration)
      return duration
    } catch (error) {
      console.warn('Performance measurement failed:', error)
      return null
    }
  }

  static getMetric(name: string): number | undefined {
    return this.metrics.get(name)
  }

  static getAllMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics)
  }

  static observeLCP(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return
    }

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        if (lastEntry) {
          this.metrics.set('LCP', lastEntry.startTime)
        }
      })
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (error) {
      console.warn('LCP observation failed:', error)
    }
  }

  static observeCLS(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return
    }

    try {
      let clsValue = 0
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
            this.metrics.set('CLS', clsValue)
          }
        }
      })
      observer.observe({ entryTypes: ['layout-shift'] })
    } catch (error) {
      console.warn('CLS observation failed:', error)
    }
  }

  static observeFID(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return
    }

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.set('FID', (entry as any).processingStart - entry.startTime)
        }
      })
      observer.observe({ entryTypes: ['first-input'] })
    } catch (error) {
      console.warn('FID observation failed:', error)
    }
  }

  static initAllObservers(): void {
    this.observeLCP()
    this.observeCLS()
    this.observeFID()
  }
}

// Resource hints generator
export const generateResourceHints = (urls: string[]) => {
  return urls.map(url => ({
    rel: 'dns-prefetch',
    href: new URL(url).origin
  }))
}

// Critical resource priorities
export const criticalResources = [
  '/fonts/inter-var.woff2',
  '/icons/icon-192x192.png',
  '/icons/icon-32x32.png'
]

// Bundle analyzer helper
export const getBundleAnalysis = async () => {
  if (typeof window === 'undefined') return null

  try {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      totalLoadTime: navigation.loadEventEnd - navigation.fetchStart,
      dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcpConnection: navigation.connectEnd - navigation.connectStart,
      serverResponse: navigation.responseEnd - navigation.responseStart,
      domProcessing: navigation.domComplete - (navigation as any).domLoading,
      resourceCount: performance.getEntriesByType('resource').length
    }
  } catch (error) {
    console.warn('Bundle analysis failed:', error)
    return null
  }
}

export default {
  criticalCSS,
  fontLoadingCSS,
  PerformanceMonitor,
  generateResourceHints,
  criticalResources,
  getBundleAnalysis
}