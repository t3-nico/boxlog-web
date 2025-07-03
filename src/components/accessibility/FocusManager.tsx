'use client'

import { useEffect, useRef, useState, createContext, useContext, ReactNode } from 'react'

interface FocusManagerContextType {
  trapFocus: (element: HTMLElement) => () => void
  restoreFocus: (element?: HTMLElement) => void
  moveFocus: (direction: 'next' | 'previous' | 'first' | 'last') => void
  announceToScreenReader: (message: string, priority?: 'polite' | 'assertive') => void
}

const FocusManagerContext = createContext<FocusManagerContextType | null>(null)

export function useFocusManager() {
  const context = useContext(FocusManagerContext)
  if (!context) {
    throw new Error('useFocusManager must be used within a FocusManagerProvider')
  }
  return context
}

interface FocusManagerProviderProps {
  children: ReactNode
}

export function FocusManagerProvider({ children }: FocusManagerProviderProps) {
  const [focusHistory, setFocusHistory] = useState<HTMLElement[]>([])
  const announcementRef = useRef<HTMLDivElement>(null)

  const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
    const focusableSelectors = [
      'a[href]',
      'area[href]',
      'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
      'select:not([disabled]):not([aria-hidden])',
      'textarea:not([disabled]):not([aria-hidden])',
      'button:not([disabled]):not([aria-hidden])',
      'iframe',
      'object',
      'embed',
      '[tabindex]:not([tabindex^="-"])',
      '[contenteditable]',
      'audio[controls]',
      'video[controls]',
      'summary',
      'details[open]'
    ].join(', ')

    const elements = Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[]
    
    return elements.filter(element => {
      const style = window.getComputedStyle(element)
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        !element.hasAttribute('inert') &&
        element.offsetWidth > 0 &&
        element.offsetHeight > 0
      )
    })
  }

  const trapFocus = (element: HTMLElement) => {
    const focusableElements = getFocusableElements(element)
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    element.addEventListener('keydown', handleKeyDown)
    
    // Focus the first element initially
    if (firstElement) {
      firstElement.focus()
    }

    return () => {
      element.removeEventListener('keydown', handleKeyDown)
    }
  }

  const restoreFocus = (element?: HTMLElement) => {
    const elementToFocus = element || focusHistory[focusHistory.length - 1]
    
    if (elementToFocus && document.contains(elementToFocus)) {
      elementToFocus.focus()
      setFocusHistory(prev => prev.slice(0, -1))
    }
  }

  const moveFocus = (direction: 'next' | 'previous' | 'first' | 'last') => {
    const focusableElements = getFocusableElements(document.body)
    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement)
    
    let nextIndex: number
    
    switch (direction) {
      case 'next':
        nextIndex = (currentIndex + 1) % focusableElements.length
        break
      case 'previous':
        nextIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1
        break
      case 'first':
        nextIndex = 0
        break
      case 'last':
        nextIndex = focusableElements.length - 1
        break
      default:
        return
    }

    const nextElement = focusableElements[nextIndex]
    if (nextElement) {
      nextElement.focus()
    }
  }

  const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (announcementRef.current) {
      announcementRef.current.textContent = message
      announcementRef.current.setAttribute('aria-live', priority)
      
      // Clear the message after a delay to allow for re-announcements
      setTimeout(() => {
        if (announcementRef.current) {
          announcementRef.current.textContent = ''
        }
      }, 1000)
    }
  }

  // Track focus history
  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      if (target && target !== document.body) {
        setFocusHistory(prev => [...prev.slice(-4), target]) // Keep last 5 elements
      }
    }

    document.addEventListener('focus', handleFocus, true)
    return () => document.removeEventListener('focus', handleFocus, true)
  }, [])

  // Handle escape key for focus restoration
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const currentElement = document.activeElement as HTMLElement
        
        // Check if we're in a modal or dialog
        const modal = currentElement.closest('[role="dialog"], [role="alertdialog"], .modal')
        if (modal) {
          const closeButton = modal.querySelector('[aria-label*="close"], [aria-label*="Close"], .close-button') as HTMLElement
          if (closeButton) {
            closeButton.click()
          }
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const contextValue: FocusManagerContextType = {
    trapFocus,
    restoreFocus,
    moveFocus,
    announceToScreenReader
  }

  return (
    <FocusManagerContext.Provider value={contextValue}>
      {children}
      <div
        ref={announcementRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />
    </FocusManagerContext.Provider>
  )
}

export default FocusManagerProvider