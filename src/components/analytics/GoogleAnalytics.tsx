'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initGA, Analytics, ConsentManager, GA4_CONFIG } from '@/lib/analytics'

export function GoogleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Initialize consent first
    ConsentManager.initConsent()
    
    // Check if user has previously granted consent
    if (ConsentManager.hasConsent()) {
      ConsentManager.grantConsent()
    }
    
    // Initialize GA4 if enabled
    if (GA4_CONFIG.enabled) {
      initGA()
    }
  }, [])

  useEffect(() => {
    // Track page views on route changes
    if (GA4_CONFIG.enabled && ConsentManager.hasConsent()) {
      Analytics.pageView(document.title, pathname)
    }
  }, [pathname])

  // Don't render anything in development or if GA is disabled
  if (!GA4_CONFIG.enabled) {
    return null
  }

  return (
    <>
      {/* Google Analytics Scripts */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_CONFIG.measurementId}`}
      />
      <script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Initialize consent before GA
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              functionality_storage: 'denied',
              personalization_storage: 'denied',
              security_storage: 'granted',
              wait_for_update: 500
            });
            
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
        }}
      />
    </>
  )
}

export default GoogleAnalytics