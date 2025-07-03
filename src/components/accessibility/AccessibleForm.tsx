'use client'

import { InputHTMLAttributes, LabelHTMLAttributes, forwardRef, useState } from 'react'
import { FormA11y } from '@/lib/accessibility'
import { useAccessibility } from './AccessibilityProvider'

interface AccessibleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helpText?: string
  required?: boolean
  showRequiredIndicator?: boolean
}

export const AccessibleInput = forwardRef<HTMLInputElement, AccessibleInputProps>(
  ({
    id,
    label,
    error,
    helpText,
    required = false,
    showRequiredIndicator = true,
    className = '',
    ...props
  }, ref) => {
    const { announce } = useAccessibility()
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const errorId = error ? `${inputId}-error` : undefined
    const helpId = helpText ? `${inputId}-help` : undefined
    
    const describedBy = [errorId, helpId].filter(Boolean).join(' ')

    const baseClasses = 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
    const errorClasses = error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''

    return (
      <div className="space-y-1">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && showRequiredIndicator && (
            <span className="text-red-500 ml-1" aria-label="required">*</span>
          )}
        </label>
        
        <input
          ref={ref}
          id={inputId}
          className={`${baseClasses} ${errorClasses} ${className}`}
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? 'true' : 'false'}
          aria-required={required}
          required={required}
          {...props}
        />
        
        {helpText && (
          <p id={helpId} className="text-sm text-gray-600">
            {helpText}
          </p>
        )}
        
        {error && (
          <p
            id={errorId}
            className="text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

AccessibleInput.displayName = 'AccessibleInput'

interface AccessibleTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  helpText?: string
  required?: boolean
  showRequiredIndicator?: boolean
}

export const AccessibleTextarea = forwardRef<HTMLTextAreaElement, AccessibleTextareaProps>(
  ({
    id,
    label,
    error,
    helpText,
    required = false,
    showRequiredIndicator = true,
    className = '',
    ...props
  }, ref) => {
    const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
    const errorId = error ? `${inputId}-error` : undefined
    const helpId = helpText ? `${inputId}-help` : undefined
    
    const describedBy = [errorId, helpId].filter(Boolean).join(' ')

    const baseClasses = 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
    const errorClasses = error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''

    return (
      <div className="space-y-1">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && showRequiredIndicator && (
            <span className="text-red-500 ml-1" aria-label="required">*</span>
          )}
        </label>
        
        <textarea
          ref={ref}
          id={inputId}
          className={`${baseClasses} ${errorClasses} ${className}`}
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? 'true' : 'false'}
          aria-required={required}
          required={required}
          {...props}
        />
        
        {helpText && (
          <p id={helpId} className="text-sm text-gray-600">
            {helpText}
          </p>
        )}
        
        {error && (
          <p
            id={errorId}
            className="text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

AccessibleTextarea.displayName = 'AccessibleTextarea'

interface AccessibleSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  helpText?: string
  required?: boolean
  showRequiredIndicator?: boolean
  options: Array<{ value: string; label: string; disabled?: boolean }>
  placeholder?: string
}

export const AccessibleSelect = forwardRef<HTMLSelectElement, AccessibleSelectProps>(
  ({
    id,
    label,
    error,
    helpText,
    required = false,
    showRequiredIndicator = true,
    options,
    placeholder = 'Select an option',
    className = '',
    ...props
  }, ref) => {
    const inputId = id || `select-${Math.random().toString(36).substr(2, 9)}`
    const errorId = error ? `${inputId}-error` : undefined
    const helpId = helpText ? `${inputId}-help` : undefined
    
    const describedBy = [errorId, helpId].filter(Boolean).join(' ')

    const baseClasses = 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
    const errorClasses = error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''

    return (
      <div className="space-y-1">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && showRequiredIndicator && (
            <span className="text-red-500 ml-1" aria-label="required">*</span>
          )}
        </label>
        
        <select
          ref={ref}
          id={inputId}
          className={`${baseClasses} ${errorClasses} ${className}`}
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? 'true' : 'false'}
          aria-required={required}
          required={required}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {helpText && (
          <p id={helpId} className="text-sm text-gray-600">
            {helpText}
          </p>
        )}
        
        {error && (
          <p
            id={errorId}
            className="text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

AccessibleSelect.displayName = 'AccessibleSelect'

interface AccessibleFieldsetProps {
  legend: string
  children: React.ReactNode
  error?: string
  helpText?: string
  className?: string
}

export function AccessibleFieldset({
  legend,
  children,
  error,
  helpText,
  className = ''
}: AccessibleFieldsetProps) {
  const fieldsetId = `fieldset-${Math.random().toString(36).substr(2, 9)}`
  const errorId = error ? `${fieldsetId}-error` : undefined
  const helpId = helpText ? `${fieldsetId}-help` : undefined
  
  const describedBy = [errorId, helpId].filter(Boolean).join(' ')

  return (
    <fieldset
      className={`space-y-4 ${className}`}
      aria-describedby={describedBy || undefined}
      aria-invalid={error ? 'true' : 'false'}
    >
      <legend className="text-sm font-medium text-gray-700 mb-2">
        {legend}
      </legend>
      
      {helpText && (
        <p id={helpId} className="text-sm text-gray-600 -mt-1 mb-3">
          {helpText}
        </p>
      )}
      
      {children}
      
      {error && (
        <p
          id={errorId}
          className="text-sm text-red-600"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </fieldset>
  )
}