'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui'
import { ConsentManager } from '@/lib/analytics'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [preferences, setPreferences] = useState({
    essential: true, // Always required
    analytics: false,
    marketing: false,
    functional: false
  })
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem('cookie_consent_timestamp')
    if (!hasConsent) {
      setShowBanner(true)
    }
  }, [])

  const acceptAll = () => {
    setPreferences({
      essential: true,
      analytics: true,
      marketing: false, // Keep marketing disabled by default
      functional: true
    })
    saveConsent(true)
  }

  const acceptEssential = () => {
    setPreferences({
      essential: true,
      analytics: false,
      marketing: false,
      functional: false
    })
    saveConsent(false)
  }

  const savePreferences = () => {
    saveConsent(preferences.analytics)
  }

  const saveConsent = (analyticsEnabled: boolean) => {
    // Save to localStorage
    localStorage.setItem('cookie_consent_timestamp', new Date().toISOString())
    localStorage.setItem('cookie_preferences', JSON.stringify(preferences))
    
    // Update analytics consent
    if (analyticsEnabled) {
      ConsentManager.grantConsent()
    } else {
      ConsentManager.revokeConsent()
    }
    
    setShowBanner(false)
  }

  if (!showBanner) {
    return null
  }

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg dark:bg-gray-900 dark:border-gray-700"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      aria-modal="false"
    >
      <div className="max-w-7xl mx-auto p-4">
        {!showDetails ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 id="cookie-consent-title" className="text-sm font-medium text-gray-900 mb-1 dark:text-gray-100">
                We use cookies
              </h3>
              <p id="cookie-consent-description" className="text-sm text-gray-700 dark:text-gray-300">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                By clicking &quot;Accept All&quot;, you consent to our use of cookies.{' '}
                <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline dark:text-blue-400 dark:hover:text-blue-300">
                  Learn more
                </a>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 min-w-fit">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowDetails(true)}
              >
                Customize
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={acceptEssential}
              >
                Essential Only
              </Button>
              <Button 
                size="sm"
                onClick={acceptAll}
              >
                Accept All
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Cookie Preferences
              </h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
                aria-label="Close preferences"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Essential Cookies */}
              <div className="border border-gray-200 rounded-lg p-4 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Essential Cookies</h4>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded dark:bg-gray-700 dark:text-gray-300">Required</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  These cookies are necessary for the website to function and cannot be disabled.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="border border-gray-200 rounded-lg p-4 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Analytics Cookies</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:bg-gray-700 dark:peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Help us understand how visitors interact with our website (Google Analytics).
                </p>
              </div>

              {/* Functional Cookies */}
              <div className="border border-gray-200 rounded-lg p-4 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Functional Cookies</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => setPreferences(prev => ({ ...prev, functional: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:bg-gray-700 dark:peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Remember your preferences and settings for a personalized experience.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="border border-gray-200 rounded-lg p-4 opacity-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Marketing Cookies</h4>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded dark:bg-gray-700 dark:text-gray-300">Disabled</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Currently not used. We prioritize your privacy and don&apos;t track for advertising.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button 
                variant="outline" 
                size="sm"
                onClick={acceptEssential}
              >
                Essential Only
              </Button>
              <Button 
                size="sm"
                onClick={savePreferences}
              >
                Save Preferences
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CookieConsent