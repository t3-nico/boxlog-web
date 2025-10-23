'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { type Locale, defaultLocale, isValidLocale } from '@/lib/i18n'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  useEffect(() => {
    // Get locale from localStorage or browser language
    const storedLocale = localStorage.getItem('locale')
    
    if (storedLocale && isValidLocale(storedLocale)) {
      setLocaleState(storedLocale as Locale)
    } else {
      // Detect from browser language
      const browserLang = navigator.language.split('-')[0]
      if (browserLang === 'ja' || browserLang === 'jp') {
        setLocaleState('jp')
      }
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    if (isValidLocale(newLocale)) {
      localStorage.setItem('locale', newLocale)
      setLocaleState(newLocale)
    }
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}