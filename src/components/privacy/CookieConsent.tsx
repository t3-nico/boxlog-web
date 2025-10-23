'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { ConsentManager } from '@/lib/analytics'
import type { Dictionary } from '@/lib/i18n'

interface CookieConsentProps {
  dict: Dictionary
  locale: string
}

export function CookieConsent({ dict, locale }: CookieConsentProps) {
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
                {dict.cookieConsent.title}
              </h3>
              <p id="cookie-consent-description" className="text-sm text-gray-700 dark:text-gray-300">
                {dict.cookieConsent.description}{' '}
                <a href={`/${locale}/privacy`} className="text-blue-600 hover:text-blue-700 underline dark:text-blue-400 dark:hover:text-blue-300">
                  {dict.cookieConsent.learnMore}
                </a>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 min-w-fit">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDetails(true)}
              >
                {dict.cookieConsent.customize}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={acceptEssential}
              >
                {dict.cookieConsent.essentialOnly}
              </Button>
              <Button
                size="sm"
                onClick={acceptAll}
              >
                {dict.cookieConsent.acceptAll}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {dict.cookieConsent.preferencesTitle}
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
                  <Label className="font-medium">{dict.cookieConsent.cookies.essential.title}</Label>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded dark:bg-gray-700 dark:text-gray-300">{dict.cookieConsent.cookies.essential.required}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {dict.cookieConsent.cookies.essential.description}
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="border border-gray-200 rounded-lg p-4 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="analytics-switch" className="font-medium">
                    {dict.cookieConsent.cookies.analytics.title}
                  </Label>
                  <Switch
                    id="analytics-switch"
                    checked={preferences.analytics}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, analytics: checked }))}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {dict.cookieConsent.cookies.analytics.description}
                </p>
              </div>

              {/* Functional Cookies */}
              <div className="border border-gray-200 rounded-lg p-4 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="functional-switch" className="font-medium">
                    {dict.cookieConsent.cookies.functional.title}
                  </Label>
                  <Switch
                    id="functional-switch"
                    checked={preferences.functional}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, functional: checked }))}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {dict.cookieConsent.cookies.functional.description}
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="border border-gray-200 rounded-lg p-4 opacity-50 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <Label className="font-medium">{dict.cookieConsent.cookies.marketing.title}</Label>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded dark:bg-gray-700 dark:text-gray-300">{dict.cookieConsent.cookies.marketing.disabled}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {dict.cookieConsent.cookies.marketing.description}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                size="sm"
                onClick={acceptEssential}
              >
                {dict.cookieConsent.essentialOnly}
              </Button>
              <Button
                size="sm"
                onClick={savePreferences}
              >
                {dict.cookieConsent.savePreferences}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CookieConsent
