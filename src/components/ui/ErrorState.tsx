'use client'

import { ReactNode } from 'react'
import { Button } from './button'
import { AlertTriangle, Wifi, Search } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n'

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
  dict?: Dictionary
}

const icons = {
  error: <AlertTriangle className="w-full h-full text-red-500" strokeWidth={1.5} />,
  warning: <AlertTriangle className="w-full h-full text-yellow-500" strokeWidth={1.5} />,
  network: <Wifi className="w-full h-full text-gray-500" strokeWidth={1.5} />,
  search: <Search className="w-full h-full text-gray-500" strokeWidth={1.5} />
}

export function ErrorState({
  title,
  description,
  action,
  children,
  icon = 'error',
  size = 'md',
  dict
}: ErrorStateProps) {
  // Use provided title/description or fall back to dictionary or default
  const finalTitle = title || dict?.errors.general.title || 'Something went wrong'
  const finalDescription = description || dict?.errors.general.description || 'An unexpected error occurred. Please try again.'
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
      spacing: 'space-y-4'
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
            {finalTitle}
          </h3>
          <p className={`${classes.description} text-gray-600`}>
            {finalDescription}
          </p>
        </div>

        {action && (
          <Button onClick={action.onClick} size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'default'}>
            {action.label}
          </Button>
        )}

        {children}
      </div>
    </div>
  )
}

// Specific error states for common scenarios
export function NetworkErrorState({ onRetry, dict }: { onRetry?: () => void; dict?: Dictionary }) {
  return (
    <ErrorState
      icon="network"
      title={dict?.errors.network.title}
      description={dict?.errors.network.description}
      action={onRetry ? { label: dict?.errors.network.tryAgain || 'Try again', onClick: onRetry } : undefined}
      dict={dict}
    />
  )
}

export function SearchErrorState({ onClear, dict }: { onClear?: () => void; dict?: Dictionary }) {
  return (
    <ErrorState
      icon="search"
      title={dict?.errors.search.title}
      description={dict?.errors.search.description}
      action={onClear ? { label: dict?.errors.search.clearSearch || 'Clear search', onClick: onClear } : undefined}
      dict={dict}
    />
  )
}

export function FormErrorState({ 
  title,
  description,
  onRetry,
  dict
}: { 
  title?: string
  description?: string
  onRetry?: () => void
  dict?: Dictionary
}) {
  return (
    <ErrorState
      icon="warning"
      title={title || dict?.errors.form.title}
      description={description || dict?.errors.form.description}
      action={onRetry ? { label: dict?.errors.form.tryAgain || 'Try again', onClick: onRetry } : undefined}
      dict={dict}
    />
  )
}

export default ErrorState