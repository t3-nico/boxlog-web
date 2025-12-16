'use client'

import { ReactNode } from 'react'
import { Alert, AlertDescription, AlertTitle } from './alert'
import { Button } from './button'
import { AlertTriangle, Wifi, Search, AlertCircle } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n'

interface ErrorStateProps {
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  children?: ReactNode
  variant?: 'error' | 'warning' | 'network' | 'search'
  size?: 'sm' | 'md' | 'lg'
  dict?: Dictionary
}

const icons = {
  error: AlertCircle,
  warning: AlertTriangle,
  network: Wifi,
  search: Search,
}

const variantStyles = {
  error: 'border-red-500/50 text-red-900 dark:text-red-400',
  warning: 'border-yellow-500/50 text-yellow-900 dark:text-yellow-400',
  network: 'border-gray-500/50',
  search: 'border-gray-500/50',
}

export function ErrorState({
  title,
  description,
  action,
  children,
  variant = 'error',
  size = 'md',
  dict,
}: ErrorStateProps) {
  // Use provided title/description or fall back to dictionary or default
  const finalTitle =
    title || dict?.errors.general.title || 'Something went wrong'
  const finalDescription =
    description ||
    dict?.errors.general.description ||
    'An unexpected error occurred. Please try again.'

  const Icon = icons[variant]

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const iconSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  return (
    <Alert className={`${sizeClasses[size]} ${variantStyles[variant]}`}>
      <Icon className={iconSizeClasses[size]} />
      <AlertTitle className="mt-0">{finalTitle}</AlertTitle>
      <AlertDescription className="mt-2">{finalDescription}</AlertDescription>

      {action && (
        <div className="mt-4">
          <Button
            onClick={action.onClick}
            size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'default'}
            variant="outline"
          >
            {action.label}
          </Button>
        </div>
      )}

      {children && <div className="mt-4">{children}</div>}
    </Alert>
  )
}

// Specific error states for common scenarios
export function NetworkErrorState({
  onRetry,
  dict,
}: {
  onRetry?: () => void
  dict?: Dictionary
}) {
  return (
    <ErrorState
      variant="network"
      title={dict?.errors.network.title}
      description={dict?.errors.network.description}
      action={
        onRetry
          ? {
              label: dict?.errors.network.tryAgain || 'Try again',
              onClick: onRetry,
            }
          : undefined
      }
      dict={dict}
    />
  )
}

export function SearchErrorState({
  onClear,
  dict,
}: {
  onClear?: () => void
  dict?: Dictionary
}) {
  return (
    <ErrorState
      variant="search"
      title={dict?.errors.search.title}
      description={dict?.errors.search.description}
      action={
        onClear
          ? {
              label: dict?.errors.search.clearSearch || 'Clear search',
              onClick: onClear,
            }
          : undefined
      }
      dict={dict}
    />
  )
}

export function FormErrorState({
  title,
  description,
  onRetry,
  dict,
}: {
  title?: string
  description?: string
  onRetry?: () => void
  dict?: Dictionary
}) {
  return (
    <ErrorState
      variant="warning"
      title={title || dict?.errors.form.title}
      description={description || dict?.errors.form.description}
      action={
        onRetry
          ? {
              label: dict?.errors.form.tryAgain || 'Try again',
              onClick: onRetry,
            }
          : undefined
      }
      dict={dict}
    />
  )
}

export default ErrorState
