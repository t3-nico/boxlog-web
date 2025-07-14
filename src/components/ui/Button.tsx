import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
  children: React.ReactNode
}

const buttonVariants = {
  variant: {
    primary: 'bg-accent-primary text-white hover:bg-accent-primary hover:opacity-90 focus:ring-accent-primary',
    secondary: 'bg-bg-tertiary text-text-primary hover:bg-bg-tertiary hover:opacity-90 focus:ring-accent-primary',
    outline: 'border border-border-primary bg-bg-primary text-text-primary hover:bg-bg-tertiary focus:ring-accent-primary',
  },
  size: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  },
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, children, ...props }, ref) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary',
      'disabled:opacity-50 disabled:pointer-events-none',
      buttonVariants.variant[variant],
      buttonVariants.size[size],
      className
    )

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...children.props,
        className: cn(baseClasses, children.props.className),
        ref,
        ...props,
      })
    }

    return (
      <button
        className={baseClasses}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'