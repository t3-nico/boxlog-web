'use client'

import { useEffect, useState } from 'react'

// アクセシビリティの拡張機能
export function EnhancedAccessibility() {
  useEffect(() => {
    // ARIA live region for dynamic content announcements
    const createLiveRegion = () => {
      if (!document.getElementById('live-region')) {
        const liveRegion = document.createElement('div')
        liveRegion.id = 'live-region'
        liveRegion.setAttribute('aria-live', 'polite')
        liveRegion.setAttribute('aria-atomic', 'true')
        liveRegion.style.position = 'absolute'
        liveRegion.style.left = '-10000px'
        liveRegion.style.width = '1px'
        liveRegion.style.height = '1px'
        liveRegion.style.overflow = 'hidden'
        document.body.appendChild(liveRegion)
      }
    }

    // Enhanced keyboard navigation
    const enhanceKeyboardNavigation = () => {
      let focusableElements: NodeListOf<HTMLElement>
      
      const updateFocusableElements = () => {
        focusableElements = document.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        // Tab trapping for modal dialogs
        if (e.key === 'Tab') {
          const modal = document.querySelector('[role="dialog"][aria-modal="true"]')
          if (modal) {
            const focusableInModal = modal.querySelectorAll(
              'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            ) as NodeListOf<HTMLElement>
            
            if (focusableInModal.length > 0) {
              const first = focusableInModal[0]
              const last = focusableInModal[focusableInModal.length - 1]
              
              if (e.shiftKey && document.activeElement === first) {
                e.preventDefault()
                last.focus()
              } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault()
                first.focus()
              }
            }
          }
        }

        // Escape key to close modals/dropdowns
        if (e.key === 'Escape') {
          const openModal = document.querySelector('[role="dialog"][aria-modal="true"]')
          if (openModal) {
            const closeButton = openModal.querySelector('[aria-label="Close"], [data-close-modal]') as HTMLElement
            if (closeButton) {
              closeButton.click()
            }
          }

          const openDropdown = document.querySelector('[aria-expanded="true"]')
          if (openDropdown) {
            openDropdown.setAttribute('aria-expanded', 'false')
            ;(openDropdown as HTMLElement).focus()
          }
        }

        // Arrow key navigation for dropdowns and menus
        if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
          const activeElement = document.activeElement as HTMLElement
          const menu = activeElement?.closest('[role="menu"], [role="listbox"]')
          
          if (menu) {
            e.preventDefault()
            const items = menu.querySelectorAll('[role="menuitem"], [role="option"]') as NodeListOf<HTMLElement>
            const currentIndex = Array.from(items).indexOf(activeElement)
            
            let nextIndex = currentIndex
            if (e.key === 'ArrowDown') {
              nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
            } else {
              nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
            }
            
            items[nextIndex]?.focus()
          }
        }
      }

      updateFocusableElements()
      document.addEventListener('keydown', handleKeyDown)
      
      // Update focusable elements when DOM changes
      const observer = new MutationObserver(updateFocusableElements)
      observer.observe(document.body, { childList: true, subtree: true })

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        observer.disconnect()
      }
    }

    // Color contrast enhancement
    const enhanceColorContrast = () => {
      const checkContrast = (element: Element) => {
        const styles = window.getComputedStyle(element)
        const textColor = styles.color
        const backgroundColor = styles.backgroundColor
        
        // Add warning for potential contrast issues in development
        if (process.env.NODE_ENV === 'development') {
          if (textColor === backgroundColor) {
            console.warn('Potential contrast issue detected:', element)
          }
        }
      }

      // Check contrast for all text elements
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button, label')
      textElements.forEach(checkContrast)
    }

    // Screen reader optimizations
    const optimizeForScreenReaders = () => {
      // Add hidden labels for icon-only buttons
      const iconButtons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])')
      iconButtons.forEach((button) => {
        if (button.querySelector('svg') && !button.textContent?.trim()) {
          const buttonText = button.getAttribute('title') || 'Button'
          button.setAttribute('aria-label', buttonText)
        }
      })

      // Ensure form fields have labels
      const formFields = document.querySelectorAll('input, select, textarea')
      formFields.forEach((field) => {
        const id = field.getAttribute('id')
        if (id && !field.getAttribute('aria-label') && !field.getAttribute('aria-labelledby')) {
          const label = document.querySelector(`label[for="${id}"]`)
          if (!label) {
            console.warn('Form field without label:', field)
          }
        }
      })

      // Add role and ARIA attributes to semantic elements
      const landmarks = document.querySelectorAll('main, nav, aside, footer, header')
      landmarks.forEach((landmark) => {
        if (!landmark.getAttribute('role')) {
          landmark.setAttribute('role', landmark.tagName.toLowerCase())
        }
      })
    }

    // Focus management
    const manageFocus = () => {
      let lastFocusedElement: HTMLElement | null = null

      // Store last focused element before modal opens
      const handleModalOpen = () => {
        lastFocusedElement = document.activeElement as HTMLElement
      }

      // Restore focus when modal closes
      const handleModalClose = () => {
        if (lastFocusedElement) {
          lastFocusedElement.focus()
          lastFocusedElement = null
        }
      }

      // Set up event listeners for modals
      document.addEventListener('modal:open', handleModalOpen)
      document.addEventListener('modal:close', handleModalClose)

      return () => {
        document.removeEventListener('modal:open', handleModalOpen)
        document.removeEventListener('modal:close', handleModalClose)
      }
    }

    // Page transitions announcements
    const announcePageChanges = () => {
      let currentPath = window.location.pathname

      const announceNavigation = () => {
        const newPath = window.location.pathname
        if (newPath !== currentPath) {
          currentPath = newPath
          const liveRegion = document.getElementById('live-region')
          if (liveRegion) {
            const pageTitle = document.title
            liveRegion.textContent = `Navigated to ${pageTitle}`
          }
        }
      }

      // Listen for navigation changes
      window.addEventListener('popstate', announceNavigation)
      
      // For client-side routing (Next.js)
      const originalPushState = history.pushState
      history.pushState = function(...args) {
        originalPushState.apply(history, args)
        setTimeout(announceNavigation, 100)
      }

      return () => {
        window.removeEventListener('popstate', announceNavigation)
        history.pushState = originalPushState
      }
    }

    // Initialize all accessibility enhancements
    createLiveRegion()
    const cleanupKeyboard = enhanceKeyboardNavigation()
    enhanceColorContrast()
    optimizeForScreenReaders()
    const cleanupFocus = manageFocus()
    const cleanupAnnouncements = announcePageChanges()

    // Cleanup function
    return () => {
      cleanupKeyboard()
      cleanupFocus()
      cleanupAnnouncements()
    }
  }, [])

  return null // This component doesn't render anything
}

// Utility function to announce messages to screen readers
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const liveRegion = document.getElementById('live-region')
  if (liveRegion) {
    liveRegion.setAttribute('aria-live', priority)
    liveRegion.textContent = message
    
    // Clear the message after announcement
    setTimeout(() => {
      liveRegion.textContent = ''
    }, 1000)
  }
}

// Custom hook for accessible state management
export const useAccessibleState = (initialValue: any, stateName: string) => {
  const [value, setValue] = useState(initialValue)
  
  const setValueWithAnnouncement = (newValue: any, announcement?: string) => {
    setValue(newValue)
    if (announcement) {
      announceToScreenReader(announcement)
    }
  }
  
  return [value, setValueWithAnnouncement]
}