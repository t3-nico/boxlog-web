'use client'

import { useState, useEffect } from 'react'
import { type Locale, defaultLocale, isValidLocale } from '@/lib/i18n'

export function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  useEffect(() => {
    // Get locale from localStorage or browser language
    const storedLocale = localStorage.getItem('locale')

    if (storedLocale && isValidLocale(storedLocale)) {
      setLocale(storedLocale as Locale)
    } else {
      // Detect from browser language
      const browserLang = navigator.language.split('-')[0]
      if (browserLang === 'ja' || browserLang === 'jp') {
        setLocale('jp')
      } else {
        setLocale('en')
      }
    }
  }, [])

  return locale
}

export function setLocale(newLocale: Locale) {
  if (isValidLocale(newLocale)) {
    localStorage.setItem('locale', newLocale)
    // Trigger a storage event to update other components
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'locale',
        newValue: newLocale,
        storageArea: localStorage,
      })
    )
  }
}
