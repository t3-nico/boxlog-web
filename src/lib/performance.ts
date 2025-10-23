/**
 * Performance utilities for Core Web Vitals optimization
 */

// Core Web Vitals types
export interface WebVitals {
  lcp?: number
  fid?: number
  cls?: number
  fcp?: number
  ttfb?: number
}

// Critical resource hints
export const criticalResources = {
  fonts: [
    '/fonts/inter-var.woff2'
  ],
  scripts: [],
  styles: ['/css/critical.css']
}

// Core Web Vitals monitoring
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number> = new Map()
  private webVitals: WebVitals = {}
  private observers: PerformanceObserver[] = []

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // Initialize Core Web Vitals observers
  initCoreWebVitals(): void {
    if (typeof window === 'undefined') return

    this.observeLCP()
    this.observeFID()
    this.observeCLS()
    this.observeFCP()
    this.observeTTFB()
  }

  private observeLCP(): void {
    if (!('PerformanceObserver' in window)) return

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as PerformanceEventTiming
        this.webVitals.lcp = lastEntry.startTime
        this.reportMetric('LCP', lastEntry.startTime)
      })
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
      this.observers.push(observer)
    } catch (error) {
      console.warn('LCP observation failed:', error)
    }
  }

  private observeFID(): void {
    if (!('PerformanceObserver' in window)) return

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEventTiming
          if (fidEntry.processingStart) {
            const fid = fidEntry.processingStart - fidEntry.startTime
            this.webVitals.fid = fid
            this.reportMetric('FID', fid)
          }
        })
      })
      
      observer.observe({ entryTypes: ['first-input'] })
      this.observers.push(observer)
    } catch (error) {
      console.warn('FID observation failed:', error)
    }
  }

  private observeCLS(): void {
    if (!('PerformanceObserver' in window)) return

    try {
      let clsValue = 0
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            this.webVitals.cls = clsValue
          }
        })
        this.reportMetric('CLS', clsValue)
      })
      
      observer.observe({ entryTypes: ['layout-shift'] })
      this.observers.push(observer)
    } catch (error) {
      console.warn('CLS observation failed:', error)
    }
  }

  private observeFCP(): void {
    if (!('PerformanceObserver' in window)) return

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.webVitals.fcp = entry.startTime
            this.reportMetric('FCP', entry.startTime)
          }
        })
      })
      
      observer.observe({ entryTypes: ['paint'] })
      this.observers.push(observer)
    } catch (error) {
      console.warn('FCP observation failed:', error)
    }
  }

  private observeTTFB(): void {
    if (typeof window === 'undefined') return

    try {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart
        this.webVitals.ttfb = ttfb
        this.reportMetric('TTFB', ttfb)
      }
    } catch (error) {
      console.warn('TTFB measurement failed:', error)
    }
  }

  private reportMetric(name: string, value: number): void {
    // Report to analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'web_vitals', {
        metric_name: name,
        metric_value: Math.round(value),
        metric_rating: this.getMetricRating(name, value)
      })
    }

    // Development logging
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name}: ${Math.round(value)}ms (${this.getMetricRating(name, value)})`)
    }
  }

  private getMetricRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      FCP: { good: 1800, poor: 3000 },
      TTFB: { good: 800, poor: 1800 }
    }

    const threshold = thresholds[metric as keyof typeof thresholds]
    if (!threshold) return 'good'

    if (value <= threshold.good) return 'good'
    if (value <= threshold.poor) return 'needs-improvement'
    return 'poor'
  }

  // Measure function execution time
  measureFunction<T>(name: string, fn: () => T): T {
    const start = performance.now()
    const result = fn()
    const end = performance.now()
    
    this.metrics.set(name, end - start)
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`)
    }
    
    return result
  }

  // Measure async function execution time
  async measureAsyncFunction<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now()
    const result = await fn()
    const end = performance.now()
    
    this.metrics.set(name, end - start)
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`)
    }
    
    return result
  }

  // Get all metrics
  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics)
  }

  // Get Core Web Vitals
  getWebVitals(): WebVitals {
    return { ...this.webVitals }
  }

  // Clear metrics
  clearMetrics(): void {
    this.metrics.clear()
  }

  // Cleanup observers
  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

// Debounce utility for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

// Throttle utility for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Image optimization utilities
export const imageOptimization = {
  // Generate responsive image sizes
  generateSizes: (breakpoints: number[] = [640, 768, 1024, 1280, 1536]) => {
    return breakpoints
      .map((bp, index) => {
        if (index === breakpoints.length - 1) {
          return `${bp}px`
        }
        return `(max-width: ${bp}px) ${bp}px`
      })
      .join(', ')
  },

  // Generate blur data URL for placeholder
  generateBlurDataURL: (width = 8, height = 8): string => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
    }
    
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return ''
    
    ctx.fillStyle = '#f3f4f6'
    ctx.fillRect(0, 0, width, height)
    
    return canvas.toDataURL()
  }
}

// Bundle size analysis utilities
export const bundleAnalysis = {
  // Log component render count
  logRender: (componentName: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Render] ${componentName}`)
    }
  },

  // Measure bundle size impact
  measureBundleSize: async (moduleName: string) => {
    if (process.env.NODE_ENV === 'development') {
      const start = performance.now()
      try {
        await import(moduleName)
        const end = performance.now()
        console.log(`[Bundle] ${moduleName} loaded in ${(end - start).toFixed(2)}ms`)
      } catch (error) {
        console.error(`[Bundle] Failed to load ${moduleName}:`, error)
      }
    }
  }
}

// Resource preloader for critical assets
export class ResourcePreloader {
  private static preloadedResources = new Set<string>()

  static preloadCriticalResources(): void {
    if (typeof document === 'undefined') return

    // Preload critical fonts
    criticalResources.fonts.forEach(font => {
      this.preloadFont(font)
    })

    // Preload critical styles
    criticalResources.styles.forEach(style => {
      this.preloadCSS(style)
    })
  }

  private static preloadFont(href: string): void {
    if (this.preloadedResources.has(href)) return

    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.type = 'font/woff2'
    link.href = href
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
    this.preloadedResources.add(href)
  }

  private static preloadCSS(href: string): void {
    if (this.preloadedResources.has(href)) return

    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'style'
    link.href = href
    link.onload = () => {
      link.rel = 'stylesheet'
    }
    document.head.appendChild(link)
    this.preloadedResources.add(href)
  }
}

// Dynamic import utilities for code splitting
export const dynamicImports = {
  // Lazy load components
  lazyLoadComponent: (importFn: () => Promise<{ default: React.ComponentType<any> }>) => {
    return import('react').then(({ lazy }) => lazy(importFn))
  },

  // Preload components on interaction
  preloadOnInteraction: (selector: string, importFn: () => Promise<any>) => {
    if (typeof document === 'undefined') return

    const preload = () => {
      importFn()
      document.removeEventListener('mouseenter', preload)
      document.removeEventListener('touchstart', preload)
    }

    const elements = document.querySelectorAll(selector)
    elements.forEach(element => {
      element.addEventListener('mouseenter', preload, { once: true })
      element.addEventListener('touchstart', preload, { once: true })
    })
  }
}

// Lazy loading utilities
export const createLazyLoader = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null
  }

  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement
          
          // Handle images
          if (target.tagName === 'IMG') {
            const img = target as HTMLImageElement
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.removeAttribute('data-src')
            }
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset
              img.removeAttribute('data-srcset')
            }
          }
          
          // Handle background images
          if (target.dataset.bgSrc) {
            target.style.backgroundImage = `url(${target.dataset.bgSrc})`
            delete target.dataset.bgSrc
          }
          
          // Trigger custom load event
          target.dispatchEvent(new CustomEvent('lazyloaded'))
        }
      })
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01
    }
  )
}

// Critical CSS utilities
export const criticalCSS = {
  // Above-the-fold styles
  aboveFold: `
    /* Critical layout styles */
    html { scroll-behavior: smooth; }
    body { 
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }
    
    /* Header critical styles */
    header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 50;
      background: white;
      border-bottom: 1px solid #e5e7eb;
      height: 64px;
    }
    
    /* Main content spacing */
    main { padding-top: 64px; }
    
    /* Critical button styles */
    .btn-primary {
      background-color: #3b82f6;
      color: white;
      padding: 12px 24px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .btn-primary:hover { background-color: #2563eb; }
    
    /* Loading states to prevent CLS */
    .loading { opacity: 0.5; }
    .skeleton { background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: loading 1.5s infinite; }
    
    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    
    /* Critical layout */
    .container { 
      max-width: 1200px; 
      margin: 0 auto; 
      padding: 0 1rem; 
    }
    
    /* Critical utilities */
    .grid { display: grid; }
    .flex { display: flex; }
    .hidden { display: none; }
    
    @media (min-width: 768px) {
      .md\\:flex { display: flex; }
      .md\\:hidden { display: none; }
    }
  `,

  // Inline critical styles
  inlineStyles: () => {
    if (typeof window !== 'undefined') {
      const style = document.createElement('style')
      style.textContent = criticalCSS.aboveFold
      document.head.appendChild(style)
    }
  }
}

// Web Vitals reporter
export const reportWebVitals = (metric: { name: string; value: number }) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(metric)
  }

  // Report to analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.name,
      custom_parameter_1: 'web_vitals'
    })
  }
}

export default PerformanceMonitor