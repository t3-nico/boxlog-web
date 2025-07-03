'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { FocusManager, KeyboardNav, ARIA_ROLES } from '@/lib/accessibility'
import { useAccessibility } from './AccessibilityProvider'

interface AccessibleDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
  className?: string
  closeOnEscape?: boolean
  closeOnBackdrop?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function AccessibleDialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  className = '',
  closeOnEscape = true,
  closeOnBackdrop = true,
  size = 'md'
}: AccessibleDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId = `dialog-title-${Math.random().toString(36).substr(2, 9)}`
  const descId = description ? `dialog-desc-${Math.random().toString(36).substr(2, 9)}` : undefined
  const { focusManager, announce } = useAccessibility()

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  }

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      // Trap focus within dialog
      focusManager.trapFocus(dialogRef.current)
      
      // Announce dialog opening
      announce(`Dialog opened: ${title}`, 'polite')
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
      
      return () => {
        // Restore focus and body scroll
        focusManager.releaseFocusTrap()
        document.body.style.overflow = ''
        
        // Announce dialog closing
        announce('Dialog closed', 'polite')
      }
    }
  }, [isOpen, title, focusManager, announce])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === KeyboardNav.KEYS.ESCAPE && closeOnEscape && isOpen) {
        event.preventDefault()
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, closeOnEscape])

  if (!isOpen) return null

  const dialogContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
      onMouseDown={(e) => {
        if (closeOnBackdrop && e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        aria-hidden="true"
      />
      
      {/* Dialog */}
      <div
        ref={dialogRef}
        className={`relative bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} ${className}`}
        role={ARIA_ROLES.DIALOG}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2
            id={titleId}
            className="text-lg font-semibold text-gray-900"
          >
            {title}
          </h2>
          
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            aria-label="Close dialog"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        
        {/* Description */}
        {description && (
          <div className="px-6 pt-4">
            <p id={descId} className="text-sm text-gray-600">
              {description}
            </p>
          </div>
        )}
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )

  // Render in portal to ensure proper stacking
  return createPortal(dialogContent, document.body)
}

export default AccessibleDialog