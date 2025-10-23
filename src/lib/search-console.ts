/**
 * Google Search Console integration and SEO monitoring utilities
 */

// Search Console verification and monitoring
export class SearchConsole {
  private static instance: SearchConsole
  private siteUrl: string
  private isProduction: boolean

  constructor() {
    this.siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
    this.isProduction = process.env.NODE_ENV === 'production'
  }

  static getInstance(): SearchConsole {
    if (!SearchConsole.instance) {
      SearchConsole.instance = new SearchConsole()
    }
    return SearchConsole.instance
  }

  // Generate Search Console verification meta tag
  getVerificationMeta(): string | null {
    const verificationCode = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    return verificationCode ? `<meta name="google-site-verification" content="${verificationCode}" />` : null
  }

  // Submit URL to Google for indexing
  async submitUrlForIndexing(url: string): Promise<boolean> {
    if (!this.isProduction) {
      console.log('URL indexing submission (dev mode):', url)
      return true
    }

    try {
      // In a real implementation, this would use the Google Search Console API
      // For now, we'll track the request for manual submission
      this.trackIndexingRequest(url)
      return true
    } catch (error) {
      console.error('Failed to submit URL for indexing:', error)
      return false
    }
  }

  // Track indexing requests for manual processing
  private trackIndexingRequest(url: string): void {
    const requests = this.getStoredIndexingRequests()
    requests.push({
      url,
      timestamp: new Date().toISOString(),
      status: 'pending'
    })
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('indexing_requests', JSON.stringify(requests))
    }
  }

  // Get stored indexing requests
  getStoredIndexingRequests(): Array<{url: string, timestamp: string, status: string}> {
    if (typeof window === 'undefined') return []
    
    try {
      const stored = localStorage.getItem('indexing_requests')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  // Generate sitemap index for Search Console
  generateSitemapIndex(sitemaps: string[]): string {
    const sitemapEntries = sitemaps.map(sitemap => `
  <sitemap>
    <loc>${this.siteUrl}${sitemap}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`).join('')

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`
  }

  // Monitor Core Web Vitals for Search Console
  monitorCoreWebVitals(): void {
    if (typeof window === 'undefined') return

    // Monitor Largest Contentful Paint (LCP)
    this.observeLCP()
    
    // Monitor First Input Delay (FID) / Interaction to Next Paint (INP)
    this.observeINP()
    
    // Monitor Cumulative Layout Shift (CLS)
    this.observeCLS()
  }

  private observeLCP(): void {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          
          if (lastEntry) {
            const lcp = lastEntry.startTime
            this.reportWebVital('LCP', lcp)
          }
        })
        observer.observe({ entryTypes: ['largest-contentful-paint'] })
      } catch (error) {
        console.warn('LCP monitoring failed:', error)
      }
    }
  }

  private observeINP(): void {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          
          entries.forEach(entry => {
            const inp = (entry as any).processingStart - entry.startTime
            this.reportWebVital('INP', inp)
          })
        })
        observer.observe({ entryTypes: ['first-input'] })
      } catch (error) {
        console.warn('INP monitoring failed:', error)
      }
    }
  }

  private observeCLS(): void {
    if ('PerformanceObserver' in window) {
      try {
        let clsValue = 0
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          
          entries.forEach(entry => {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value
            }
          })
          
          this.reportWebVital('CLS', clsValue)
        })
        observer.observe({ entryTypes: ['layout-shift'] })
      } catch (error) {
        console.warn('CLS monitoring failed:', error)
      }
    }
  }

  private reportWebVital(metric: string, value: number): void {
    // Report to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'web_vitals', {
        metric_name: metric,
        metric_value: Math.round(value),
        metric_rating: this.getMetricRating(metric, value)
      })
    }

    // Store for Search Console reporting
    this.storeWebVital(metric, value)
  }

  private getMetricRating(metric: string, value: number): string {
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },
      INP: { good: 200, poor: 500 },
      CLS: { good: 0.1, poor: 0.25 }
    }

    const threshold = thresholds[metric as keyof typeof thresholds]
    if (!threshold) return 'unknown'

    if (value <= threshold.good) return 'good'
    if (value <= threshold.poor) return 'needs-improvement'
    return 'poor'
  }

  private storeWebVital(metric: string, value: number): void {
    if (typeof window === 'undefined') return

    try {
      const vitals = JSON.parse(localStorage.getItem('web_vitals') || '[]')
      vitals.push({
        metric,
        value,
        timestamp: new Date().toISOString(),
        url: window.location.pathname
      })

      // Keep only last 100 entries
      const recentVitals = vitals.slice(-100)
      localStorage.setItem('web_vitals', JSON.stringify(recentVitals))
    } catch (error) {
      console.warn('Failed to store web vital:', error)
    }
  }

  // Get stored web vitals for reporting
  getStoredWebVitals(): Array<{metric: string, value: number, timestamp: string, url: string}> {
    if (typeof window === 'undefined') return []
    
    try {
      return JSON.parse(localStorage.getItem('web_vitals') || '[]')
    } catch {
      return []
    }
  }
}

// Custom events for enhanced analytics
export class CustomEvents {
  private static analytics = typeof window !== 'undefined' && (window as any).gtag

  // E-commerce events
  static trackPurchase(transactionId: string, value: number, currency: string = 'USD', items: any[] = []): void {
    if (!this.analytics) return

    (window as any).gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items
    })
  }

  static trackAddToCart(currency: string, value: number, items: any[]): void {
    if (!this.analytics) return

    (window as any).gtag('event', 'add_to_cart', {
      currency: currency,
      value: value,
      items: items
    })
  }

  static trackBeginCheckout(currency: string, value: number, items: any[]): void {
    if (!this.analytics) return

    (window as any).gtag('event', 'begin_checkout', {
      currency: currency,
      value: value,
      items: items
    })
  }

  // Engagement events
  static trackSearch(searchTerm: string, searchResults?: number): void {
    if (!this.analytics) return

    (window as any).gtag('event', 'search', {
      search_term: searchTerm,
      ...(searchResults !== undefined && { search_results: searchResults })
    })
  }

  static trackVideoPlay(videoTitle: string, videoUrl: string): void {
    if (!this.analytics) return

    (window as any).gtag('event', 'video_play', {
      video_title: videoTitle,
      video_url: videoUrl
    })
  }

  static trackFileDownload(fileName: string, fileUrl: string): void {
    if (!this.analytics) return

    (window as any).gtag('event', 'file_download', {
      file_name: fileName,
      file_url: fileUrl,
      link_url: fileUrl
    })
  }

  static trackOutboundClick(url: string, linkText?: string): void {
    if (!this.analytics) return

    (window as any).gtag('event', 'click', {
      link_url: url,
      outbound: true,
      ...(linkText && { link_text: linkText })
    })
  }

  // Form events
  static trackFormSubmission(formName: string, formId?: string): void {
    if (!this.analytics) return

    (window as any).gtag('event', 'form_submit', {
      form_name: formName,
      ...(formId && { form_id: formId })
    })
  }

  static trackFormError(formName: string, errorField: string, errorMessage: string): void {
    if (!this.analytics) return

    (window as any).gtag('event', 'form_error', {
      form_name: formName,
      error_field: errorField,
      error_message: errorMessage
    })
  }

  // Content engagement
  static trackScrollDepth(depth: number): void {
    if (!this.analytics) return

    (window as any).gtag('event', 'scroll', {
      scroll_depth: depth
    })
  }

  static trackTimeOnPage(timeInSeconds: number): void {
    if (!this.analytics) return

    (window as any).gtag('event', 'page_engagement', {
      engagement_time_msec: timeInSeconds * 1000
    })
  }

  // Social sharing
  static trackSocialShare(platform: string, url: string, title?: string): void {
    if (!this.analytics) return

    (window as any).gtag('event', 'share', {
      method: platform,
      content_type: 'article',
      item_id: url,
      ...(title && { content_title: title })
    })
  }

  // Navigation events
  static trackNavigationClick(linkText: string, linkUrl: string, position?: string): void {
    if (!this.analytics) return

    (window as any).gtag('event', 'select_content', {
      content_type: 'navigation',
      item_id: linkUrl,
      content_category: 'navigation',
      custom_parameters: {
        link_text: linkText,
        ...(position && { link_position: position })
      }
    })
  }

  // Performance events
  static trackPerformanceMetric(metric: string, value: number, rating: string): void {
    if (!this.analytics) return

    (window as any).gtag('event', 'performance_metric', {
      metric_name: metric,
      metric_value: value,
      metric_rating: rating,
      page_location: window.location.href
    })
  }

  // Error tracking
  static trackError(errorType: string, errorMessage: string, errorSource?: string): void {
    if (!this.analytics) return

    (window as any).gtag('event', 'exception', {
      description: errorMessage,
      error_type: errorType,
      ...(errorSource && { error_source: errorSource }),
      fatal: false
    })
  }

  // User engagement
  static trackFeatureUsage(featureName: string, action: string): void {
    if (!this.analytics) return

    (window as any).gtag('event', 'feature_usage', {
      feature_name: featureName,
      feature_action: action
    })
  }
}

const SearchConsoleTools = {
  SearchConsole,
  CustomEvents
}

export default SearchConsoleTools