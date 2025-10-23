'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { SearchConsole, CustomEvents } from '@/lib/search-console'

export function SearchConsoleIntegration() {
  const pathname = usePathname()

  useEffect(() => {
    const searchConsole = SearchConsole.getInstance()
    
    // Initialize Core Web Vitals monitoring
    searchConsole.monitorCoreWebVitals()

    // Track page engagement time
    const startTime = Date.now()
    let scrollDepthTracked = false
    let maxScrollDepth = 0

    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / documentHeight) * 100)
      
      maxScrollDepth = Math.max(maxScrollDepth, scrollPercent)

      // Track significant scroll milestones
      if (!scrollDepthTracked && scrollPercent >= 75) {
        CustomEvents.trackScrollDepth(scrollPercent)
        scrollDepthTracked = true
      }
    }

    // Track time on page
    const handleBeforeUnload = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000)
      if (timeOnPage > 10) { // Only track if user spent more than 10 seconds
        CustomEvents.trackTimeOnPage(timeOnPage)
      }
      
      if (maxScrollDepth > 25) { // Track final scroll depth if significant
        CustomEvents.trackScrollDepth(maxScrollDepth)
      }
    }

    // Track visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000)
        if (timeOnPage > 30) {
          CustomEvents.trackTimeOnPage(timeOnPage)
        }
      }
    }

    // Track form submissions
    const handleFormSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement
      const formName = form.getAttribute('name') || form.id || 'unnamed-form'
      CustomEvents.trackFormSubmission(formName, form.id)
    }

    // Track outbound link clicks
    const handleLinkClick = (event: Event) => {
      const link = event.target as HTMLAnchorElement
      if (link.href && link.hostname !== window.location.hostname) {
        CustomEvents.trackOutboundClick(link.href, link.textContent || undefined)
      }
    }

    // Track file downloads
    const handleDownloadClick = (event: Event) => {
      const link = event.target as HTMLAnchorElement
      if (link.href && /\.(pdf|doc|docx|xls|xlsx|zip|exe|dmg)$/i.test(link.href)) {
        const fileName = link.href.split('/').pop() || 'unknown-file'
        CustomEvents.trackFileDownload(fileName, link.href)
      }
    }

    // Track search usage
    const handleSearchInput = (event: Event) => {
      const input = event.target as HTMLInputElement
      if (input.type === 'search' || input.placeholder?.toLowerCase().includes('search')) {
        const searchTerm = input.value.trim()
        if (searchTerm.length > 2) {
          // Debounce search tracking
          clearTimeout((input as any).searchTimeout)
          ;(input as any).searchTimeout = setTimeout(() => {
            CustomEvents.trackSearch(searchTerm)
          }, 1000)
        }
      }
    }

    // Track errors
    const handleError = (event: ErrorEvent) => {
      CustomEvents.trackError('javascript', event.message, event.filename)
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      CustomEvents.trackError('promise', String(event.reason), 'unhandled-promise')
    }

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    document.addEventListener('submit', handleFormSubmit)
    document.addEventListener('click', handleLinkClick)
    document.addEventListener('click', handleDownloadClick)
    document.addEventListener('input', handleSearchInput)
    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('submit', handleFormSubmit)
      document.removeEventListener('click', handleLinkClick)
      document.removeEventListener('click', handleDownloadClick)
      document.removeEventListener('input', handleSearchInput)
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [pathname])

  // Don't render anything in development
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return null
}

export default SearchConsoleIntegration