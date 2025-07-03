'use client'

import { ReactNode } from 'react'
import { Button } from './Button'

interface ErrorStateProps {
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  children?: ReactNode
  icon?: 'error' | 'warning' | 'network' | 'search'
  size?: 'sm' | 'md' | 'lg'
}

const icons = {
  error: (
    <svg className="w-full h-full text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ),
  warning: (
    <svg className="w-full h-full text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ),
  network: (
    <svg className="w-full h-full text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
    </svg>
  ),
  search: (
    <svg className="w-full h-full text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  action,
  children,
  icon = 'error',
  size = 'md'
}: ErrorStateProps) {
  const sizeClasses = {
    sm: {
      container: 'p-4',
      icon: 'w-8 h-8 mb-3',
      title: 'text-sm font-medium',
      description: 'text-xs',
      spacing: 'space-y-2'
    },
    md: {
      container: 'p-6',
      icon: 'w-12 h-12 mb-4',
      title: 'text-base font-semibold',
      description: 'text-sm',
      spacing: 'space-y-3'
    },
    lg: {
      container: 'p-8',
      icon: 'w-16 h-16 mb-6',
      title: 'text-lg font-semibold',
      description: 'text-base',
      spacing: 'space-y-4'
    }
  }

  const classes = sizeClasses[size]

  return (
    <div className={`text-center ${classes.container}`}>
      <div className={`${classes.spacing}`}>
        <div className={`${classes.icon} mx-auto flex items-center justify-center`}>
          {icons[icon]}
        </div>
        
        <div>
          <h3 className={`${classes.title} text-gray-900 mb-1`}>
            {title}
          </h3>
          <p className={`${classes.description} text-gray-600`}>
            {description}
          </p>
        </div>

        {action && (
          <Button onClick={action.onClick} size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}>
            {action.label}
          </Button>
        )}

        {children}
      </div>
    </div>
  )
}

// Specific error states for common scenarios
export function NetworkErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      icon="network"
      title="Connection problem"
      description="Unable to connect to the server. Please check your internet connection and try again."
      action={onRetry ? { label: 'Try again', onClick: onRetry } : undefined}
    />
  )
}

export function SearchErrorState({ onClear }: { onClear?: () => void }) {
  return (
    <ErrorState
      icon="search"
      title="No results found"
      description="We couldn't find anything matching your search. Try different keywords or browse our content."
      action={onClear ? { label: 'Clear search', onClick: onClear } : undefined}
    />
  )
}

export function FormErrorState({ 
  title = 'Submission failed',
  description = 'There was a problem submitting your form. Please check your input and try again.',
  onRetry 
}: { 
  title?: string
  description?: string
  onRetry?: () => void 
}) {
  return (
    <ErrorState
      icon="warning"
      title={title}
      description={description}
      action={onRetry ? { label: 'Try again', onClick: onRetry } : undefined}
    />
  )
}

export default ErrorState