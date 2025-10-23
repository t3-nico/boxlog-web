'use client'

import { ReactNode, useEffect, useState } from 'react'
import { FocusManagerProvider } from './FocusManager'
import { ColorContrastProvider } from './ColorContrastChecker'
import { ScreenReaderProvider } from './ScreenReaderSupport'
import { KeyboardNavigationProvider } from './KeyboardNavigation'
import { FocusIndicator } from './FocusIndicator'

interface AccessibilityProviderProps {
  children: ReactNode
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium')

  useEffect(() => {
    // Check user preferences
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const contrastQuery = window.matchMedia('(prefers-contrast: high)')
    
    setReducedMotion(motionQuery.matches)
    setHighContrast(contrastQuery.matches)

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    const handleContrastChange = (e: MediaQueryListEvent) => {
      setHighContrast(e.matches)
    }

    motionQuery.addEventListener('change', handleMotionChange)
    contrastQuery.addEventListener('change', handleContrastChange)
    
    return () => {
      motionQuery.removeEventListener('change', handleMotionChange)
      contrastQuery.removeEventListener('change', handleContrastChange)
    }
  }, [])

  useEffect(() => {
    // Apply accessibility classes to body
    const body = document.body
    
    if (reducedMotion) {
      body.classList.add('reduce-motion')
    } else {
      body.classList.remove('reduce-motion')
    }

    if (highContrast) {
      body.classList.add('high-contrast')
    } else {
      body.classList.remove('high-contrast')
    }

    body.classList.remove('font-small', 'font-medium', 'font-large')
    body.classList.add(`font-${fontSize}`)
  }, [reducedMotion, highContrast, fontSize])

  // Enhanced CSS for accessibility
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      /* Focus management */
      .focus-visible *:focus {
        outline: 2px solid #4F46E5;
        outline-offset: 2px;
      }

      /* Reduced motion */
      .reduce-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }

      /* High contrast */
      .high-contrast {
        filter: contrast(150%);
      }

      .high-contrast button,
      .high-contrast a,
      .high-contrast input,
      .high-contrast select,
      .high-contrast textarea {
        border: 2px solid currentColor;
      }

      /* Font size adjustments */
      .font-small {
        font-size: 87.5%;
      }

      .font-large {
        font-size: 112.5%;
      }

      /* Screen reader only content */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      /* Skip navigation */
      .skip-nav {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px 16px;
        text-decoration: none;
        z-index: 10000;
        border-radius: 0 0 4px 4px;
      }

      .skip-nav:focus {
        top: 0;
      }

      /* Enhanced keyboard navigation */
      [tabindex="-1"]:focus {
        outline: none;
      }

      /* Improved form labeling */
      .form-group {
        position: relative;
      }

      .form-error {
        color: #DC2626;
        font-size: 0.875rem;
        margin-top: 0.25rem;
      }

      .form-hint {
        color: #6B7280;
        font-size: 0.875rem;
        margin-top: 0.25rem;
      }

      /* Loading states for screen readers */
      [aria-busy="true"] {
        cursor: wait;
      }

      /* Improved table accessibility */
      table caption {
        text-align: left;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      /* Better focus for interactive elements */
      button:focus-visible,
      a:focus-visible,
      input:focus-visible,
      select:focus-visible,
      textarea:focus-visible,
      [tabindex]:focus-visible {
        outline: 2px solid #4F46E5;
        outline-offset: 2px;
      }
    `
    
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="accessibility-provider">
      <FocusManagerProvider>
        <ColorContrastProvider>
          <ScreenReaderProvider>
            <KeyboardNavigationProvider>
              <FocusIndicator />
              {children}
            </KeyboardNavigationProvider>
          </ScreenReaderProvider>
        </ColorContrastProvider>
      </FocusManagerProvider>
    </div>
  )
}