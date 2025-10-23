/**
 * Google Analytics 4 configuration and utilities
 */

export const GA4_CONFIG = {
  measurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || '',
  enabled: process.env.NODE_ENV === 'production' && !!process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
  debug: process.env.NODE_ENV === 'development'
}

// Custom event types for type safety
export interface GAEvent {
  action: string
  category: string
  label?: string
  value?: number
}

export interface GAPageView {
  page_title: string
  page_location: string
  page_path: string
}

export interface GACustomEvent {
  event_name: string
  custom_parameters?: Record<string, any>
}

// Predefined events for SaaS application
export const GA_EVENTS = {
  // Navigation events
  PAGE_VIEW: 'page_view',
  NAVIGATION: 'navigation',
  EXTERNAL_LINK_CLICK: 'external_link_click',
  
  // User engagement events
  SEARCH: 'search',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  NEWSLETTER_SIGNUP: 'newsletter_signup',
  DOCUMENTATION_VIEW: 'documentation_view',
  BLOG_POST_VIEW: 'blog_post_view',
  
  // Product events
  FEATURE_VIEW: 'feature_view',
  PRICING_VIEW: 'pricing_view',
  PLAN_SELECT: 'plan_select',
  
  // Conversion events
  SIGN_UP_START: 'sign_up_start',
  SIGN_UP_COMPLETE: 'sign_up_complete',
  LOGIN_START: 'login_start',
  LOGIN_COMPLETE: 'login_complete',
  
  // Error events
  ERROR_404: 'error_404',
  ERROR_500: 'error_500',
  API_ERROR: 'api_error',
  
  // Performance events
  PERFORMANCE_METRIC: 'performance_metric',
  PAGE_LOAD_TIME: 'page_load_time'
} as const

/**
 * Initialize Google Analytics
 */
export function initGA(): void {
  if (!GA4_CONFIG.enabled) {
    if (GA4_CONFIG.debug) {
      console.log('[Analytics] GA4 disabled - missing measurement ID or not in production')
    }
    return
  }

  // Load gtag script
  const script1 = document.createElement('script')
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_CONFIG.measurementId}`
  document.head.appendChild(script1)

  // Initialize gtag
  const script2 = document.createElement('script')
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA4_CONFIG.measurementId}', {
      page_title: document.title,
      page_location: window.location.href,
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_flags: 'SameSite=None;Secure'
    });
  `
  document.head.appendChild(script2)

  if (GA4_CONFIG.debug) {
    console.log('[Analytics] GA4 initialized with ID:', GA4_CONFIG.measurementId)
  }
}

/**
 * Track a page view
 */
export function trackPageView(data: GAPageView): void {
  if (!GA4_CONFIG.enabled) {
    if (GA4_CONFIG.debug) {
      console.log('[Analytics] Page view (debug):', data)
    }
    return
  }

  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('config', GA4_CONFIG.measurementId, {
      page_title: data.page_title,
      page_location: data.page_location,
      page_path: data.page_path
    })
  }
}

/**
 * Track a custom event
 */
export function trackEvent(eventName: string, parameters?: Record<string, any>): void {
  if (!GA4_CONFIG.enabled) {
    if (GA4_CONFIG.debug) {
      console.log('[Analytics] Event (debug):', eventName, parameters)
    }
    return
  }

  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', eventName, {
      event_category: parameters?.category || 'engagement',
      event_label: parameters?.label,
      value: parameters?.value,
      ...parameters
    })
  }
}

/**
 * Track user engagement events
 */
export const Analytics = {
  // Page tracking
  pageView: (title: string, path?: string) => {
    trackPageView({
      page_title: title,
      page_location: window.location.href,
      page_path: path || window.location.pathname
    })
  },

  // Navigation events
  navigation: (destination: string, source?: string) => {
    trackEvent(GA_EVENTS.NAVIGATION, {
      category: 'navigation',
      destination,
      source
    })
  },

  externalLink: (url: string, text?: string) => {
    trackEvent(GA_EVENTS.EXTERNAL_LINK_CLICK, {
      category: 'outbound',
      url,
      text
    })
  },

  // User engagement
  search: (query: string, results?: number) => {
    trackEvent(GA_EVENTS.SEARCH, {
      category: 'engagement',
      search_term: query,
      results_count: results
    })
  },

  contactForm: (success: boolean, method?: string) => {
    trackEvent(GA_EVENTS.CONTACT_FORM_SUBMIT, {
      category: 'form',
      success,
      method
    })
  },

  newsletter: (email_domain?: string) => {
    trackEvent(GA_EVENTS.NEWSLETTER_SIGNUP, {
      category: 'conversion',
      email_domain
    })
  },

  // Content engagement
  documentationView: (page: string, section?: string) => {
    trackEvent(GA_EVENTS.DOCUMENTATION_VIEW, {
      category: 'content',
      page,
      section
    })
  },

  blogPostView: (title: string, category?: string, reading_time?: number) => {
    trackEvent(GA_EVENTS.BLOG_POST_VIEW, {
      category: 'content',
      title,
      content_category: category,
      reading_time
    })
  },

  // Product events
  featureView: (feature_name: string) => {
    trackEvent(GA_EVENTS.FEATURE_VIEW, {
      category: 'product',
      feature_name
    })
  },

  pricingView: (plan?: string) => {
    trackEvent(GA_EVENTS.PRICING_VIEW, {
      category: 'product',
      plan
    })
  },

  planSelect: (plan_name: string, plan_price?: number) => {
    trackEvent(GA_EVENTS.PLAN_SELECT, {
      category: 'conversion',
      plan_name,
      value: plan_price
    })
  },

  // Error tracking
  error404: (path: string) => {
    trackEvent(GA_EVENTS.ERROR_404, {
      category: 'error',
      page_path: path
    })
  },

  error500: (error_message?: string) => {
    trackEvent(GA_EVENTS.ERROR_500, {
      category: 'error',
      error_message
    })
  },

  apiError: (endpoint: string, status_code: number, error_message?: string) => {
    trackEvent(GA_EVENTS.API_ERROR, {
      category: 'error',
      endpoint,
      status_code,
      error_message
    })
  },

  // Performance tracking
  performanceMetric: (metric_name: string, value: number, unit?: string) => {
    trackEvent(GA_EVENTS.PERFORMANCE_METRIC, {
      category: 'performance',
      metric_name,
      value,
      unit
    })
  },

  pageLoadTime: (load_time: number, page_path?: string) => {
    trackEvent(GA_EVENTS.PAGE_LOAD_TIME, {
      category: 'performance',
      value: Math.round(load_time),
      page_path
    })
  }
}

/**
 * Enhanced ecommerce tracking for SaaS subscriptions
 */
export const EcommerceAnalytics = {
  // Subscription events
  beginCheckout: (plan_name: string, plan_price: number) => {
    trackEvent('begin_checkout', {
      category: 'ecommerce',
      currency: 'USD',
      value: plan_price,
      items: [{
        item_id: plan_name.toLowerCase().replace(/\s+/g, '_'),
        item_name: plan_name,
        category: 'subscription',
        price: plan_price,
        quantity: 1
      }]
    })
  },

  purchase: (transaction_id: string, plan_name: string, plan_price: number) => {
    trackEvent('purchase', {
      category: 'ecommerce',
      transaction_id,
      currency: 'USD',
      value: plan_price,
      items: [{
        item_id: plan_name.toLowerCase().replace(/\s+/g, '_'),
        item_name: plan_name,
        category: 'subscription',
        price: plan_price,
        quantity: 1
      }]
    })
  },

  refund: (transaction_id: string, refund_amount: number) => {
    trackEvent('refund', {
      category: 'ecommerce',
      transaction_id,
      currency: 'USD',
      value: refund_amount
    })
  }
}

/**
 * GDPR-compliant consent management
 */
export const ConsentManager = {
  // Grant consent for analytics
  grantConsent: () => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied', // Keep ads denied for privacy
        functionality_storage: 'granted',
        personalization_storage: 'denied',
        security_storage: 'granted'
      })
    }
    
    // Store consent in localStorage
    localStorage.setItem('analytics_consent', 'granted')
    
    if (GA4_CONFIG.debug) {
      console.log('[Analytics] Consent granted')
    }
  },

  // Revoke consent
  revokeConsent: () => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'granted'
      })
    }
    
    localStorage.setItem('analytics_consent', 'denied')
    
    if (GA4_CONFIG.debug) {
      console.log('[Analytics] Consent revoked')
    }
  },

  // Check current consent status
  hasConsent: (): boolean => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('analytics_consent') === 'granted'
  },

  // Initialize consent (called before GA initialization)
  initConsent: () => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // Set default consent to denied
      (window as any).gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'granted',
        wait_for_update: 500
      })
    }
  }
}

export default Analytics