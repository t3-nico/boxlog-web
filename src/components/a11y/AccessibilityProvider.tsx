'use client'

import { useEffect, ReactNode } from 'react'
import { FocusManager, Announcer, A11yValidator } from '@/lib/accessibility'
import SkipNavigation from './SkipNavigation'
import FocusVisible from './FocusVisible'

interface AccessibilityProviderProps {
  children: ReactNode
  enableValidator?: boolean
  enableAnnouncer?: boolean
}

export function AccessibilityProvider({ 
  children, 
  enableValidator = true,
  enableAnnouncer = true 
}: AccessibilityProviderProps) {
  useEffect(() => {
    // Initialize accessibility services
    if (enableAnnouncer) {
      Announcer.init()
    }

    // Run accessibility validation in development
    if (enableValidator && process.env.NODE_ENV === 'development') {
      // Run validation after a short delay to allow components to render
      const timer = setTimeout(() => {
        A11yValidator.reportIssues()
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [enableValidator, enableAnnouncer])

  useEffect(() => {
    // Add landmark IDs to main content areas if they don't exist
    const addLandmarkIds = () => {
      const main = document.querySelector('main')
      if (main && !main.id) {
        main.id = 'main-content'
      }

      const nav = document.querySelector('nav[role="navigation"], header nav')
      if (nav && !nav.id) {
        nav.id = 'navigation'
      }

      const footer = document.querySelector('footer')
      if (footer && !footer.id) {
        footer.id = 'footer'
      }
    }

    // Run immediately and after DOM changes
    addLandmarkIds()
    
    // Use MutationObserver to add IDs when new content is loaded
    const observer = new MutationObserver(() => {
      addLandmarkIds()
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Handle escape key for closing modals/menus
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Close any open modals, dropdowns, etc.
        const openModals = document.querySelectorAll('[role="dialog"][aria-hidden="false"]')
        openModals.forEach(modal => {
          const closeButton = modal.querySelector('[aria-label*="close"], [aria-label*="Close"], .close-button')
          if (closeButton instanceof HTMLElement) {
            closeButton.click()
          }
        })

        // Close any open dropdowns
        const openDropdowns = document.querySelectorAll('[aria-expanded="true"]')
        openDropdowns.forEach(dropdown => {
          dropdown.setAttribute('aria-expanded', 'false')
        })
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])

  return (
    <>
      <SkipNavigation />
      <FocusVisible />
      {children}
      
      {/* Screen reader announcements container */}
      <div
        id="a11y-announcer"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
    </>
  )
}

export default AccessibilityProvider