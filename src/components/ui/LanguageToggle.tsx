'use client'

import { useState, useRef } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { locales, getLocaleName, getLocaleFlag, type Locale } from '@/lib/i18n'

export function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  
  // Detect current locale from pathname and params
  const currentLocale = (params.locale as Locale) || (pathname.startsWith('/jp') ? 'jp' : 'en')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLocaleChange = (newLocale: Locale) => {
    setIsOpen(false)
    
    // Handle path conversion between locales
    let newPath: string
    
    if (currentLocale === 'jp' && pathname.startsWith('/jp')) {
      // From Japanese to English: remove /jp prefix
      const pathWithoutJp = pathname.replace('/jp', '') || '/'
      newPath = newLocale === 'en' ? pathWithoutJp : `/${newLocale}${pathWithoutJp}`
    } else {
      // From English (root) to other locale
      newPath = newLocale === 'en' ? pathname : `/jp${pathname}`
    }
    
    router.push(newPath)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-base" role="img" aria-hidden="true">
          {getLocaleFlag(currentLocale)}
        </span>
        <span className="hidden sm:inline">
          {getLocaleName(currentLocale)}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown */}
          <div
            className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
            role="listbox"
            aria-label="Language"
          >
            <div className="py-1">
              {locales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => handleLocaleChange(locale)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    currentLocale === locale 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                      : 'text-gray-700 dark:text-gray-200'
                  }`}
                  role="option"
                  aria-selected={currentLocale === locale}
                >
                  <span className="text-base" role="img" aria-hidden="true">
                    {getLocaleFlag(locale)}
                  </span>
                  <span className="flex-1">
                    {getLocaleName(locale)}
                  </span>
                  {currentLocale === locale && (
                    <svg
                      className="w-4 h-4 text-blue-600 dark:text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}