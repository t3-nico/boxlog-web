'use client'

import { useEffect } from 'react'

export function FocusVisible() {
  useEffect(() => {
    // Add focus-visible polyfill behavior
    let hadKeyboardEvent = true
    let keyboardThrottleTimeout: NodeJS.Timeout | undefined

    const focusTriggeredByKeyboard = () => {
      hadKeyboardEvent = true
    }

    const focusTriggeredByMouse = () => {
      hadKeyboardEvent = false
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.altKey || e.ctrlKey) {
        return
      }
      hadKeyboardEvent = true
    }

    const onPointerDown = () => {
      hadKeyboardEvent = false
    }

    const onFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      // Add focus-visible class based on input method
      if (hadKeyboardEvent || target.matches(':focus-visible')) {
        target.classList.add('focus-visible')
      }
    }

    const onBlur = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      target.classList.remove('focus-visible')
      
      // Clear the timeout if it exists
      if (keyboardThrottleTimeout) {
        clearTimeout(keyboardThrottleTimeout)
      }
    }

    // Listen for keyboard events
    document.addEventListener('keydown', onKeyDown, true)
    document.addEventListener('mousedown', onPointerDown, true)
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('touchstart', onPointerDown, true)
    
    // Listen for focus events
    document.addEventListener('focus', onFocus, true)
    document.addEventListener('blur', onBlur, true)

    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      document.removeEventListener('mousedown', onPointerDown, true)
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('touchstart', onPointerDown, true)
      document.removeEventListener('focus', onFocus, true)
      document.removeEventListener('blur', onBlur, true)
      if (keyboardThrottleTimeout) {
        clearTimeout(keyboardThrottleTimeout)
      }
    }
  }, [])

  return (
    <style jsx global>{`
      /* Enhanced focus styles for better accessibility */
      *:focus {
        outline: none;
      }

      .focus-visible,
      *:focus-visible {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
        border-radius: 3px;
      }

      /* High contrast focus for better visibility */
      @media (prefers-contrast: high) {
        .focus-visible,
        *:focus-visible {
          outline: 3px solid #000;
          outline-offset: 2px;
          background-color: #ffff00;
          color: #000;
        }
      }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        .focus-visible,
        *:focus-visible {
          transition: none;
        }
      }

      /* Interactive elements focus styles */
      button.focus-visible,
      a.focus-visible,
      input.focus-visible,
      textarea.focus-visible,
      select.focus-visible,
      [role="button"].focus-visible,
      [role="link"].focus-visible,
      [tabindex]:not([tabindex="-1"]).focus-visible {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
      }

      /* Form elements */
      input.focus-visible,
      textarea.focus-visible,
      select.focus-visible {
        outline: 2px solid #3b82f6;
        outline-offset: 1px;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      /* Error state focus */
      input[aria-invalid="true"].focus-visible,
      textarea[aria-invalid="true"].focus-visible,
      select[aria-invalid="true"].focus-visible {
        outline: 2px solid #ef4444;
        outline-offset: 1px;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }

      /* Skip links special styling */
      .skip-nav-link.focus-visible {
        outline: 2px solid #fbbf24;
        outline-offset: 2px;
      }

      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        .focus-visible,
        *:focus-visible {
          outline-color: #60a5fa;
        }

        input.focus-visible,
        textarea.focus-visible,
        select.focus-visible {
          outline-color: #60a5fa;
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
        }

        input[aria-invalid="true"].focus-visible,
        textarea[aria-invalid="true"].focus-visible,
        select[aria-invalid="true"].focus-visible {
          outline-color: #f87171;
          box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.1);
        }
      }
    `}</style>
  )
}

export default FocusVisible