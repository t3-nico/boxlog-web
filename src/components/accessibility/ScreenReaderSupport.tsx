'use client'

import { useEffect, useRef, createContext, useContext, ReactNode, useState } from 'react'

interface ScreenReaderContextType {
  announce: (message: string, priority?: 'polite' | 'assertive') => void
  setPageTitle: (title: string) => void
  setPageDescription: (description: string) => void
  updateLiveRegion: (message: string, region: 'status' | 'alert' | 'log') => void
  describePage: (content: string) => void
}

const ScreenReaderContext = createContext<ScreenReaderContextType | null>(null)

export function useScreenReader() {
  const context = useContext(ScreenReaderContext)
  if (!context) {
    throw new Error('useScreenReader must be used within a ScreenReaderProvider')
  }
  return context
}

interface ScreenReaderProviderProps {
  children: ReactNode
}

export function ScreenReaderProvider({ children }: ScreenReaderProviderProps) {
  const politeAnnouncerRef = useRef<HTMLDivElement>(null)
  const assertiveAnnouncerRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const alertRef = useRef<HTMLDivElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  
  const [pageStructure, setPageStructure] = useState<string>('')

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = priority === 'assertive' ? assertiveAnnouncerRef.current : politeAnnouncerRef.current
    
    if (announcer) {
      // Clear previous message first
      announcer.textContent = ''
      
      // Set new message after a brief delay to ensure screen reader notices the change
      setTimeout(() => {
        if (announcer) {
          announcer.textContent = message
        }
      }, 10)
      
      // Clear message after announcement
      setTimeout(() => {
        if (announcer) {
          announcer.textContent = ''
        }
      }, 2000)
    }
  }

  const setPageTitle = (title: string) => {
    document.title = title
    announce(`Page loaded: ${title}`)
  }

  const setPageDescription = (description: string) => {
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', description)
  }

  const updateLiveRegion = (message: string, region: 'status' | 'alert' | 'log') => {
    let targetRef: React.RefObject<HTMLDivElement>
    
    switch (region) {
      case 'status':
        targetRef = statusRef
        break
      case 'alert':
        targetRef = alertRef
        break
      case 'log':
        targetRef = logRef
        break
      default:
        targetRef = statusRef
    }

    if (targetRef.current) {
      targetRef.current.textContent = message
      
      // Clear log messages after some time
      if (region === 'log') {
        setTimeout(() => {
          if (targetRef.current) {
            targetRef.current.textContent = ''
          }
        }, 5000)
      }
    }
  }

  const describePage = (content: string) => {
    setPageStructure(content)
  }

  // Automatically describe page structure
  useEffect(() => {
    const analyzePageStructure = () => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
      const landmarks = Array.from(document.querySelectorAll('[role="banner"], [role="navigation"], [role="main"], [role="complementary"], [role="contentinfo"], nav, main, aside, header, footer'))
      const forms = Array.from(document.querySelectorAll('form'))
      const lists = Array.from(document.querySelectorAll('ul, ol'))
      
      let description = ''
      
      if (headings.length > 0) {
        description += `Page contains ${headings.length} heading${headings.length > 1 ? 's' : ''}. `
      }
      
      if (landmarks.length > 0) {
        description += `${landmarks.length} landmark${landmarks.length > 1 ? 's' : ''} available for navigation. `
      }
      
      if (forms.length > 0) {
        description += `${forms.length} form${forms.length > 1 ? 's' : ''} present. `
      }
      
      if (lists.length > 0) {
        description += `${lists.length} list${lists.length > 1 ? 's' : ''} present. `
      }

      setPageStructure(description)
    }

    // Analyze page structure after content loads
    const timer = setTimeout(analyzePageStructure, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Provide keyboard shortcuts information
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + K to announce keyboard shortcuts
      if (e.altKey && e.key === 'k') {
        e.preventDefault()
        announce(
          'Keyboard shortcuts: Alt+K for this help, Tab to navigate, Enter to activate, Escape to close dialogs, Arrow keys in menus and carousels',
          'assertive'
        )
      }
      
      // Alt + S to announce page structure
      if (e.altKey && e.key === 's') {
        e.preventDefault()
        announce(pageStructure || 'Page structure information not available', 'assertive')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [pageStructure])

  const contextValue: ScreenReaderContextType = {
    announce,
    setPageTitle,
    setPageDescription,
    updateLiveRegion,
    describePage
  }

  return (
    <ScreenReaderContext.Provider value={contextValue}>
      {children}
      
      {/* Screen reader announcements */}
      <div
        ref={politeAnnouncerRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        id="polite-announcer"
      />
      
      <div
        ref={assertiveAnnouncerRef}
        className="sr-only"
        aria-live="assertive"
        aria-atomic="true"
        id="assertive-announcer"
      />
      
      {/* Live regions for different types of updates */}
      <div
        ref={statusRef}
        className="sr-only"
        role="status"
        aria-live="polite"
        id="status-region"
      />
      
      <div
        ref={alertRef}
        className="sr-only"
        role="alert"
        aria-live="assertive"
        id="alert-region"
      />
      
      <div
        ref={logRef}
        className="sr-only"
        role="log"
        aria-live="polite"
        aria-atomic="false"
        id="log-region"
      />

      {/* Screen reader help text */}
      <div className="sr-only">
        <h2>Accessibility Information</h2>
        <p>Press Alt+K for keyboard shortcuts, Alt+S for page structure information.</p>
        <p>{pageStructure}</p>
      </div>
    </ScreenReaderContext.Provider>
  )
}

interface ScreenReaderAnnouncementProps {
  children: ReactNode
  announcement?: string
  priority?: 'polite' | 'assertive'
  onMount?: boolean
}

export function ScreenReaderAnnouncement({ 
  children, 
  announcement, 
  priority = 'polite',
  onMount = false 
}: ScreenReaderAnnouncementProps) {
  const { announce } = useScreenReader()

  useEffect(() => {
    if (onMount && announcement) {
      announce(announcement, priority)
    }
  }, [announcement, priority, onMount, announce])

  return <>{children}</>
}

interface DescribeContentProps {
  description: string
  children: ReactNode
}

export function DescribeContent({ description, children }: DescribeContentProps) {
  const { describePage } = useScreenReader()

  useEffect(() => {
    describePage(description)
  }, [description, describePage])

  return <>{children}</>
}

export default ScreenReaderProvider