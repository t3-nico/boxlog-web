/**
 * Accessibility utilities and WCAG 2.1 AA compliance helpers
 */

// ARIA roles and properties
export const ARIA_ROLES = {
  // Landmark roles
  BANNER: 'banner',
  MAIN: 'main',
  NAVIGATION: 'navigation',
  COMPLEMENTARY: 'complementary',
  CONTENTINFO: 'contentinfo',
  SEARCH: 'search',
  FORM: 'form',
  REGION: 'region',
  
  // Widget roles
  BUTTON: 'button',
  LINK: 'link',
  MENUITEM: 'menuitem',
  TAB: 'tab',
  TABPANEL: 'tabpanel',
  DIALOG: 'dialog',
  ALERT: 'alert',
  STATUS: 'status',
  PROGRESSBAR: 'progressbar',
  
  // Structure roles
  HEADING: 'heading',
  LIST: 'list',
  LISTITEM: 'listitem',
  TABLE: 'table',
  ROW: 'row',
  CELL: 'cell',
  ARTICLE: 'article',
  SECTION: 'section'
} as const

// Screen reader utilities
export const SCREEN_READER = {
  ONLY: 'sr-only',
  FOCUSABLE: 'sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded'
}

// Skip link component data
export const SKIP_LINKS = [
  { href: '#main-content', text: 'Skip to main content' },
  { href: '#navigation', text: 'Skip to navigation' },
  { href: '#footer', text: 'Skip to footer' }
]

// Focus management
export class FocusManager {
  private static instance: FocusManager
  private focusHistory: HTMLElement[] = []
  private trapStack: HTMLElement[] = []

  static getInstance(): FocusManager {
    if (!FocusManager.instance) {
      FocusManager.instance = new FocusManager()
    }
    return FocusManager.instance
  }

  // Save current focus for later restoration
  saveFocus(): void {
    const activeElement = document.activeElement as HTMLElement
    if (activeElement) {
      this.focusHistory.push(activeElement)
    }
  }

  // Restore previously saved focus
  restoreFocus(): void {
    const lastFocused = this.focusHistory.pop()
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus()
    }
  }

  // Focus first focusable element in container
  focusFirst(container: HTMLElement): boolean {
    const focusableElement = this.getFirstFocusable(container)
    if (focusableElement) {
      focusableElement.focus()
      return true
    }
    return false
  }

  // Focus last focusable element in container
  focusLast(container: HTMLElement): boolean {
    const focusableElements = this.getFocusableElements(container)
    const lastElement = focusableElements[focusableElements.length - 1]
    if (lastElement) {
      lastElement.focus()
      return true
    }
    return false
  }

  // Get all focusable elements in container
  getFocusableElements(container: HTMLElement): HTMLElement[] {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ')

    return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[]
  }

  // Get first focusable element
  getFirstFocusable(container: HTMLElement): HTMLElement | null {
    const focusableElements = this.getFocusableElements(container)
    return focusableElements[0] || null
  }

  // Trap focus within container
  trapFocus(container: HTMLElement): void {
    this.trapStack.push(container)
    this.saveFocus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      const focusableElements = this.getFocusableElements(container)
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    
    // Store cleanup function
    ;(container as any).__focusTrapCleanup = () => {
      container.removeEventListener('keydown', handleKeyDown)
    }

    // Focus first element
    this.focusFirst(container)
  }

  // Release focus trap
  releaseFocusTrap(): void {
    const container = this.trapStack.pop()
    if (container) {
      const cleanup = (container as any).__focusTrapCleanup
      if (cleanup) {
        cleanup()
        delete (container as any).__focusTrapCleanup
      }
      this.restoreFocus()
    }
  }
}

// Color contrast utilities
export const ColorContrast = {
  // Convert hex to RGB
  hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  },

  // Calculate relative luminance
  getLuminance(r: number, g: number, b: number): number {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  },

  // Calculate contrast ratio
  getContrastRatio(hex1: string, hex2: string): number {
    const color1 = this.hexToRgb(hex1)
    const color2 = this.hexToRgb(hex2)
    
    if (!color1 || !color2) return 0

    const lum1 = this.getLuminance(color1.r, color1.g, color1.b)
    const lum2 = this.getLuminance(color2.r, color2.g, color2.b)
    
    const brightest = Math.max(lum1, lum2)
    const darkest = Math.min(lum1, lum2)
    
    return (brightest + 0.05) / (darkest + 0.05)
  },

  // Check if contrast meets WCAG AA standards
  meetsWCAG_AA(foreground: string, background: string, fontSize: number = 16): boolean {
    const ratio = this.getContrastRatio(foreground, background)
    // Large text (18pt+ or 14pt+ bold) needs 3:1, normal text needs 4.5:1
    const isLargeText = fontSize >= 18 || fontSize >= 14 // Assuming bold
    return isLargeText ? ratio >= 3 : ratio >= 4.5
  },

  // Check if contrast meets WCAG AAA standards
  meetsWCAG_AAA(foreground: string, background: string, fontSize: number = 16): boolean {
    const ratio = this.getContrastRatio(foreground, background)
    // Large text needs 4.5:1, normal text needs 7:1
    const isLargeText = fontSize >= 18 || fontSize >= 14
    return isLargeText ? ratio >= 4.5 : ratio >= 7
  }
}

// Keyboard navigation utilities
export const KeyboardNav = {
  // Common key codes
  KEYS: {
    ENTER: 'Enter',
    SPACE: ' ',
    ESCAPE: 'Escape',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    HOME: 'Home',
    END: 'End',
    PAGE_UP: 'PageUp',
    PAGE_DOWN: 'PageDown',
    TAB: 'Tab'
  },

  // Handle button-like behavior for non-button elements
  makeButtonLike(element: HTMLElement, onClick: () => void): void {
    element.setAttribute('role', 'button')
    element.setAttribute('tabindex', '0')
    
    const handleActivation = (event: KeyboardEvent) => {
      if (event.key === this.KEYS.ENTER || event.key === this.KEYS.SPACE) {
        event.preventDefault()
        onClick()
      }
    }

    element.addEventListener('keydown', handleActivation)
    element.addEventListener('click', onClick)
  },

  // Handle menu navigation
  handleMenuNavigation(event: KeyboardEvent, menuItems: HTMLElement[], currentIndex: number): number {
    let newIndex = currentIndex

    switch (event.key) {
      case this.KEYS.ARROW_DOWN:
        event.preventDefault()
        newIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0
        break
      case this.KEYS.ARROW_UP:
        event.preventDefault()
        newIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1
        break
      case this.KEYS.HOME:
        event.preventDefault()
        newIndex = 0
        break
      case this.KEYS.END:
        event.preventDefault()
        newIndex = menuItems.length - 1
        break
      case this.KEYS.ESCAPE:
        event.preventDefault()
        return -1 // Signal to close menu
    }

    if (newIndex !== currentIndex) {
      menuItems[newIndex]?.focus()
    }

    return newIndex
  }
}

// Announcement utilities for screen readers
export const Announcer = {
  // Create announcement element if it doesn't exist
  init(): void {
    if (!document.getElementById('a11y-announcer')) {
      const announcer = document.createElement('div')
      announcer.id = 'a11y-announcer'
      announcer.setAttribute('aria-live', 'polite')
      announcer.setAttribute('aria-atomic', 'true')
      announcer.className = 'sr-only'
      document.body.appendChild(announcer)
    }
  },

  // Announce message to screen readers
  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    this.init()
    const announcer = document.getElementById('a11y-announcer')
    if (announcer) {
      announcer.setAttribute('aria-live', priority)
      announcer.textContent = message
      
      // Clear after a delay to avoid repeated announcements
      setTimeout(() => {
        announcer.textContent = ''
      }, 1000)
    }
  }
}

// Form accessibility utilities
export const FormA11y = {
  // Associate label with form field
  associateLabel(fieldId: string, labelText: string): void {
    const field = document.getElementById(fieldId)
    const label = document.querySelector(`label[for="${fieldId}"]`) as HTMLLabelElement
    
    if (field && label) {
      label.textContent = labelText
    } else if (field) {
      // Create label if it doesn't exist
      const newLabel = document.createElement('label')
      newLabel.setAttribute('for', fieldId)
      newLabel.textContent = labelText
      field.parentNode?.insertBefore(newLabel, field)
    }
  },

  // Add error message to field
  addError(fieldId: string, errorMessage: string): void {
    const field = document.getElementById(fieldId)
    if (!field) return

    const errorId = `${fieldId}-error`
    let errorElement = document.getElementById(errorId)
    
    if (!errorElement) {
      errorElement = document.createElement('div')
      errorElement.id = errorId
      errorElement.className = 'text-red-600 text-sm mt-1'
      errorElement.setAttribute('role', 'alert')
      field.parentNode?.insertBefore(errorElement, field.nextSibling)
    }
    
    errorElement.textContent = errorMessage
    field.setAttribute('aria-describedby', errorId)
    field.setAttribute('aria-invalid', 'true')
    
    // Announce error to screen readers
    Announcer.announce(`Error: ${errorMessage}`, 'assertive')
  },

  // Remove error from field
  removeError(fieldId: string): void {
    const field = document.getElementById(fieldId)
    const errorElement = document.getElementById(`${fieldId}-error`)
    
    if (field) {
      field.removeAttribute('aria-describedby')
      field.removeAttribute('aria-invalid')
    }
    
    if (errorElement) {
      errorElement.remove()
    }
  },

  // Add required indicator
  markRequired(fieldId: string): void {
    const field = document.getElementById(fieldId)
    const label = document.querySelector(`label[for="${fieldId}"]`)
    
    if (field) {
      field.setAttribute('required', 'true')
      field.setAttribute('aria-required', 'true')
    }
    
    if (label) {
      const asterisk = document.createElement('span')
      asterisk.textContent = '*'
      asterisk.className = 'text-red-500'
      asterisk.setAttribute('aria-label', 'required')
      label.appendChild(asterisk)
    }
  }
}

// Media accessibility
export const MediaA11y = {
  // Add alt text to image if missing
  ensureImageAlt(img: HTMLImageElement): void {
    if (!img.alt) {
      // Try to get meaningful alt text from context
      const figcaption = img.closest('figure')?.querySelector('figcaption')
      const title = img.title || img.getAttribute('data-title')
      
      if (figcaption?.textContent) {
        img.alt = figcaption.textContent.trim()
      } else if (title) {
        img.alt = title
      } else if (img.src.includes('logo')) {
        img.alt = 'Company logo'
      } else {
        img.alt = 'Image'
        console.warn('Image missing alt text:', img.src)
      }
    }
  },

  // Ensure video has captions
  ensureVideoCaptions(video: HTMLVideoElement): void {
    const hasTextTrack = video.querySelector('track[kind="captions"], track[kind="subtitles"]')
    if (!hasTextTrack) {
      console.warn('Video missing captions:', video.src)
      
      // Add a notice for users
      const notice = document.createElement('p')
      notice.className = 'text-sm text-gray-600 mt-2'
      notice.textContent = 'Captions not available for this video'
      video.parentNode?.insertBefore(notice, video.nextSibling)
    }
  }
}

// Accessibility validation
export const A11yValidator = {
  // Check page for common accessibility issues
  validatePage(): Array<{ type: string; message: string; element?: HTMLElement }> {
    const issues: Array<{ type: string; message: string; element?: HTMLElement }> = []

    // Check for missing page title
    if (!document.title || document.title.trim() === '') {
      issues.push({ type: 'structure', message: 'Page is missing a title' })
    }

    // Check for missing main landmark
    const main = document.querySelector('main, [role="main"]')
    if (!main) {
      issues.push({ type: 'structure', message: 'Page is missing a main landmark' })
    }

    // Check images for alt text
    const images = document.querySelectorAll('img')
    images.forEach(img => {
      if (!img.alt && !img.getAttribute('aria-hidden')) {
        issues.push({ 
          type: 'content', 
          message: 'Image missing alt text', 
          element: img 
        })
      }
    })

    // Check form inputs for labels
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], textarea, select')
    inputs.forEach(input => {
      const id = input.id
      const label = id ? document.querySelector(`label[for="${id}"]`) : null
      const ariaLabel = input.getAttribute('aria-label')
      const ariaLabelledby = input.getAttribute('aria-labelledby')
      
      if (!label && !ariaLabel && !ariaLabelledby) {
        issues.push({ 
          type: 'forms', 
          message: 'Form input missing label', 
          element: input as HTMLElement 
        })
      }
    })

    // Check heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    let lastLevel = 0
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1))
      if (level > lastLevel + 1) {
        issues.push({ 
          type: 'structure', 
          message: `Heading level skipped: ${heading.tagName} after h${lastLevel}`, 
          element: heading as HTMLElement 
        })
      }
      lastLevel = level
    })

    return issues
  },

  // Log accessibility issues to console
  reportIssues(): void {
    const issues = this.validatePage()
    if (issues.length > 0) {
      console.group('🔍 Accessibility Issues Found:')
      issues.forEach(issue => {
        console.warn(`[${issue.type.toUpperCase()}] ${issue.message}`, issue.element)
      })
      console.groupEnd()
    } else {
      console.log('✅ No accessibility issues found')
    }
  }
}

const AccessibilityTools = {
  FocusManager,
  ColorContrast,
  KeyboardNav,
  Announcer,
  FormA11y,
  MediaA11y,
  A11yValidator,
  ARIA_ROLES,
  SCREEN_READER,
  SKIP_LINKS
}

export default AccessibilityTools