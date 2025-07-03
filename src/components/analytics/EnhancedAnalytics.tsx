'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { CustomEvents } from '@/lib/search-console'

export function EnhancedAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Track feature usage based on page
    const trackPageSpecificFeatures = () => {
      switch (pathname) {
        case '/pricing':
          trackPricingPageFeatures()
          break
        case '/features':
          trackFeaturesPageFeatures()
          break
        case '/contact':
          trackContactPageFeatures()
          break
        case '/search':
          trackSearchPageFeatures()
          break
        default:
          if (pathname.startsWith('/blog/')) {
            trackBlogPostFeatures()
          } else if (pathname.startsWith('/docs/')) {
            trackDocsPageFeatures()
          }
      }
    }

    // Track referrer information
    const trackReferrer = () => {
      if (typeof window === 'undefined') return
      
      const referrer = document.referrer
      const urlParams = new URLSearchParams(window.location.search)
      const utmSource = urlParams.get('utm_source')
      const utmMedium = urlParams.get('utm_medium')
      const utmCampaign = urlParams.get('utm_campaign')

      if (utmSource) {
        CustomEvents.trackFeatureUsage('campaign_tracking', 'utm_visit')
      }

      if (referrer && !referrer.includes(window.location.hostname)) {
        CustomEvents.trackFeatureUsage('referral_traffic', 'external_referrer')
      }
    }

    trackPageSpecificFeatures()
    trackReferrer()

    // Setup intersection observer for content engagement
    const setupContentTracking = () => {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const element = entry.target
                const elementType = element.tagName.toLowerCase()
                const elementId = element.id || 'unnamed'
                
                CustomEvents.trackFeatureUsage('content_engagement', `${elementType}_viewed`)
                
                // Track specific content sections
                if (element.classList.contains('hero-section')) {
                  CustomEvents.trackFeatureUsage('hero_engagement', 'viewed')
                } else if (element.classList.contains('pricing-card')) {
                  CustomEvents.trackFeatureUsage('pricing_engagement', 'card_viewed')
                } else if (element.classList.contains('feature-card')) {
                  CustomEvents.trackFeatureUsage('feature_engagement', 'card_viewed')
                }
              }
            })
          },
          { threshold: 0.5, rootMargin: '0px 0px -20% 0px' }
        )

        // Observe key content sections
        const contentSections = document.querySelectorAll([
          '.hero-section',
          '.pricing-card',
          '.feature-card',
          '.testimonial',
          '.cta-section',
          'article',
          'section[id]'
        ].join(', '))

        contentSections.forEach(section => observer.observe(section))

        return () => observer.disconnect()
      }
    }

    const cleanupContentTracking = setupContentTracking()

    return () => {
      if (cleanupContentTracking) {
        cleanupContentTracking()
      }
    }
  }, [pathname])

  return null
}

// Page-specific feature tracking functions
function trackPricingPageFeatures() {
  // Track pricing plan interactions
  const handlePricingInteraction = (event: Event) => {
    const target = event.target as HTMLElement
    
    if (target.closest('.pricing-card')) {
      const planName = target.closest('.pricing-card')?.getAttribute('data-plan') || 'unknown'
      CustomEvents.trackFeatureUsage('pricing_interaction', `plan_${planName}_clicked`)
    }
    
    if (target.classList.contains('cta-button') || target.textContent?.includes('Get Started')) {
      CustomEvents.trackFeatureUsage('pricing_conversion', 'cta_clicked')
    }
  }

  document.addEventListener('click', handlePricingInteraction)
  
  return () => document.removeEventListener('click', handlePricingInteraction)
}

function trackFeaturesPageFeatures() {
  // Track feature exploration
  const handleFeatureInteraction = (event: Event) => {
    const target = event.target as HTMLElement
    
    if (target.closest('.feature-card')) {
      const featureName = target.closest('.feature-card')?.getAttribute('data-feature') || 'unknown'
      CustomEvents.trackFeatureUsage('feature_exploration', `feature_${featureName}_viewed`)
    }
  }

  document.addEventListener('click', handleFeatureInteraction)
  
  return () => document.removeEventListener('click', handleFeatureInteraction)
}

function trackContactPageFeatures() {
  // Track contact form interactions
  const handleContactInteraction = (event: Event) => {
    const target = event.target as HTMLElement
    
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      const fieldName = target.getAttribute('name') || target.id || 'unknown'
      CustomEvents.trackFeatureUsage('contact_form', `field_${fieldName}_focused`)
    }
  }

  document.addEventListener('focus', handleContactInteraction, true)
  
  return () => document.removeEventListener('focus', handleContactInteraction, true)
}

function trackSearchPageFeatures() {
  // Track search interactions
  const handleSearchInteraction = (event: Event) => {
    const target = event.target as HTMLElement
    
    if (target.classList.contains('search-result')) {
      CustomEvents.trackFeatureUsage('search_results', 'result_clicked')
    }
    
    if (target.classList.contains('search-filter')) {
      const filterType = target.getAttribute('data-filter') || 'unknown'
      CustomEvents.trackFeatureUsage('search_filtering', `filter_${filterType}_used`)
    }
  }

  document.addEventListener('click', handleSearchInteraction)
  
  return () => document.removeEventListener('click', handleSearchInteraction)
}

function trackBlogPostFeatures() {
  // Track blog engagement
  const handleBlogInteraction = (event: Event) => {
    const target = event.target as HTMLElement
    
    if (target.classList.contains('share-button')) {
      const platform = target.getAttribute('data-platform') || 'unknown'
      CustomEvents.trackSocialShare(platform, window.location.href, document.title)
    }
    
    if (target.classList.contains('related-post')) {
      CustomEvents.trackFeatureUsage('blog_engagement', 'related_post_clicked')
    }
  }

  document.addEventListener('click', handleBlogInteraction)
  
  return () => document.removeEventListener('click', handleBlogInteraction)
}

function trackDocsPageFeatures() {
  // Track documentation usage
  const handleDocsInteraction = (event: Event) => {
    const target = event.target as HTMLElement
    
    if (target.classList.contains('docs-nav-link')) {
      const section = target.getAttribute('data-section') || 'unknown'
      CustomEvents.trackFeatureUsage('docs_navigation', `section_${section}_viewed`)
    }
    
    if (target.classList.contains('copy-code-button')) {
      CustomEvents.trackFeatureUsage('docs_interaction', 'code_copied')
    }
  }

  document.addEventListener('click', handleDocsInteraction)
  
  return () => document.removeEventListener('click', handleDocsInteraction)
}

export default EnhancedAnalytics