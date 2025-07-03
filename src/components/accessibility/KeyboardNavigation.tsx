'use client'

import { useEffect, createContext, useContext, ReactNode, useRef, useState } from 'react'

interface KeyboardNavigationContextType {
  registerNavigationGroup: (id: string, options: NavigationGroupOptions) => void
  unregisterNavigationGroup: (id: string) => void
  focusNavigationGroup: (id: string) => void
  enableKeyboardShortcuts: boolean
  setEnableKeyboardShortcuts: (enabled: boolean) => void
}

interface NavigationGroupOptions {
  selector: string
  orientation?: 'horizontal' | 'vertical' | 'both'
  wrap?: boolean
  autoFocus?: boolean
  onActivate?: (element: HTMLElement) => void
}

interface NavigationGroup extends NavigationGroupOptions {
  id: string
  elements: HTMLElement[]
  currentIndex: number
}

const KeyboardNavigationContext = createContext<KeyboardNavigationContextType | null>(null)

export function useKeyboardNavigation() {
  const context = useContext(KeyboardNavigationContext)
  if (!context) {
    throw new Error('useKeyboardNavigation must be used within a KeyboardNavigationProvider')
  }
  return context
}

interface KeyboardNavigationProviderProps {
  children: ReactNode
}

export function KeyboardNavigationProvider({ children }: KeyboardNavigationProviderProps) {
  const [navigationGroups, setNavigationGroups] = useState<Map<string, NavigationGroup>>(new Map())
  const [enableKeyboardShortcuts, setEnableKeyboardShortcuts] = useState(true)
  const [currentGroupId, setCurrentGroupId] = useState<string | null>(null)

  const updateNavigationGroup = (id: string) => {
    setNavigationGroups(prev => {
      const updated = new Map(prev)
      const group = updated.get(id)
      
      if (group) {
        const elements = Array.from(document.querySelectorAll(group.selector)) as HTMLElement[]
        const visibleElements = elements.filter(el => {
          const style = window.getComputedStyle(el)
          return style.display !== 'none' && style.visibility !== 'hidden' && !el.hasAttribute('disabled')
        })
        
        updated.set(id, {
          ...group,
          elements: visibleElements
        })
      }
      
      return updated
    })
  }

  const registerNavigationGroup = (id: string, options: NavigationGroupOptions) => {
    setNavigationGroups(prev => {
      const updated = new Map(prev)
      updated.set(id, {
        id,
        ...options,
        elements: [],
        currentIndex: 0
      })
      return updated
    })
    
    // Update elements after registration
    setTimeout(() => updateNavigationGroup(id), 0)
  }

  const unregisterNavigationGroup = (id: string) => {
    setNavigationGroups(prev => {
      const updated = new Map(prev)
      updated.delete(id)
      return updated
    })
  }

  const focusNavigationGroup = (id: string) => {
    const group = navigationGroups.get(id)
    if (group && group.elements.length > 0) {
      setCurrentGroupId(id)
      const elementToFocus = group.elements[group.currentIndex] || group.elements[0]
      elementToFocus.focus()
    }
  }

  const handleNavigation = (direction: 'next' | 'previous' | 'first' | 'last', orientation: 'horizontal' | 'vertical' | 'both' = 'both') => {
    if (!currentGroupId) return

    const group = navigationGroups.get(currentGroupId)
    if (!group || group.elements.length === 0) return

    let newIndex = group.currentIndex

    switch (direction) {
      case 'next':
        newIndex = group.wrap 
          ? (group.currentIndex + 1) % group.elements.length
          : Math.min(group.currentIndex + 1, group.elements.length - 1)
        break
      case 'previous':
        newIndex = group.wrap
          ? group.currentIndex === 0 ? group.elements.length - 1 : group.currentIndex - 1
          : Math.max(group.currentIndex - 1, 0)
        break
      case 'first':
        newIndex = 0
        break
      case 'last':
        newIndex = group.elements.length - 1
        break
    }

    // Update the group's current index
    setNavigationGroups(prev => {
      const updated = new Map(prev)
      const updatedGroup = updated.get(currentGroupId)
      if (updatedGroup) {
        updated.set(currentGroupId, { ...updatedGroup, currentIndex: newIndex })
      }
      return updated
    })

    // Focus the new element
    const newElement = group.elements[newIndex]
    if (newElement) {
      newElement.focus()
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!enableKeyboardShortcuts) return

    const activeElement = document.activeElement as HTMLElement
    const isInInput = activeElement.tagName === 'INPUT' || 
                     activeElement.tagName === 'TEXTAREA' || 
                     activeElement.contentEditable === 'true'

    // Don't interfere with normal input behavior
    if (isInInput && !e.altKey && !e.ctrlKey && !e.metaKey) {
      return
    }

    // Find which navigation group contains the active element
    for (const [groupId, group] of navigationGroups) {
      const elementIndex = group.elements.indexOf(activeElement)
      if (elementIndex !== -1) {
        setCurrentGroupId(groupId)
        
        // Update current index
        setNavigationGroups(prev => {
          const updated = new Map(prev)
          const updatedGroup = updated.get(groupId)
          if (updatedGroup) {
            updated.set(groupId, { ...updatedGroup, currentIndex: elementIndex })
          }
          return updated
        })
        break
      }
    }

    // Handle arrow key navigation
    const group = currentGroupId ? navigationGroups.get(currentGroupId) : null
    
    if (group) {
      const { orientation = 'both' } = group
      
      switch (e.key) {
        case 'ArrowRight':
          if (orientation === 'horizontal' || orientation === 'both') {
            e.preventDefault()
            handleNavigation('next', orientation)
          }
          break
        case 'ArrowLeft':
          if (orientation === 'horizontal' || orientation === 'both') {
            e.preventDefault()
            handleNavigation('previous', orientation)
          }
          break
        case 'ArrowDown':
          if (orientation === 'vertical' || orientation === 'both') {
            e.preventDefault()
            handleNavigation('next', orientation)
          }
          break
        case 'ArrowUp':
          if (orientation === 'vertical' || orientation === 'both') {
            e.preventDefault()
            handleNavigation('previous', orientation)
          }
          break
        case 'Home':
          if (!isInInput) {
            e.preventDefault()
            handleNavigation('first', orientation)
          }
          break
        case 'End':
          if (!isInInput) {
            e.preventDefault()
            handleNavigation('last', orientation)
          }
          break
        case 'Enter':
        case ' ':
          if (group.onActivate && !isInInput) {
            e.preventDefault()
            const currentElement = group.elements[group.currentIndex]
            if (currentElement) {
              group.onActivate(currentElement)
            }
          }
          break
      }
    }

    // Global keyboard shortcuts
    if (e.altKey) {
      switch (e.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
          e.preventDefault()
          const headingLevel = e.key
          const heading = document.querySelector(`h${headingLevel}`) as HTMLElement
          if (heading) {
            heading.focus()
            heading.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
          break
        case 'm':
          e.preventDefault()
          const main = document.querySelector('main, [role="main"]') as HTMLElement
          if (main) {
            main.focus()
            main.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
          break
        case 'n':
          e.preventDefault()
          const nav = document.querySelector('nav, [role="navigation"]') as HTMLElement
          if (nav) {
            nav.focus()
            nav.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
          break
      }
    }
  }

  // Set up global event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [enableKeyboardShortcuts, navigationGroups, currentGroupId])

  // Update navigation groups when DOM changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      navigationGroups.forEach((_, id) => {
        updateNavigationGroup(id)
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled', 'hidden', 'style']
    })

    return () => observer.disconnect()
  }, [navigationGroups])

  const contextValue: KeyboardNavigationContextType = {
    registerNavigationGroup,
    unregisterNavigationGroup,
    focusNavigationGroup,
    enableKeyboardShortcuts,
    setEnableKeyboardShortcuts
  }

  return (
    <KeyboardNavigationContext.Provider value={contextValue}>
      {children}
    </KeyboardNavigationContext.Provider>
  )
}

interface KeyboardNavigationGroupProps {
  id: string
  selector: string
  orientation?: 'horizontal' | 'vertical' | 'both'
  wrap?: boolean
  autoFocus?: boolean
  onActivate?: (element: HTMLElement) => void
  children: ReactNode
}

export function KeyboardNavigationGroup({
  id,
  selector,
  orientation = 'both',
  wrap = true,
  autoFocus = false,
  onActivate,
  children
}: KeyboardNavigationGroupProps) {
  const { registerNavigationGroup, unregisterNavigationGroup, focusNavigationGroup } = useKeyboardNavigation()

  useEffect(() => {
    registerNavigationGroup(id, {
      selector,
      orientation,
      wrap,
      autoFocus,
      onActivate
    })

    if (autoFocus) {
      setTimeout(() => focusNavigationGroup(id), 100)
    }

    return () => unregisterNavigationGroup(id)
  }, [id, selector, orientation, wrap, autoFocus, onActivate])

  return <>{children}</>
}

export default KeyboardNavigationProvider