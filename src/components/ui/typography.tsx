import React from 'react'

export interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
  children: React.ReactNode
  className?: string
}

export interface TextProps {
  as?: 'p' | 'span' | 'div'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'muted' | 'light'
  children: React.ReactNode
  className?: string
}

export function Heading({ as: Component = 'h1', size = 'xl', children, className = '' }: HeadingProps) {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl'
  }

  return (
    <Component className={`font-bold ${sizeClasses[size]} ${className}`}>
      {children}
    </Component>
  )
}

export function Text({ as: Component = 'p', size = 'md', variant = 'default', children, className = '' }: TextProps) {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  const variantClasses = {
    default: 'text-neutral-900 dark:text-neutral-100',
    muted: 'text-neutral-600 dark:text-neutral-400',
    light: 'text-neutral-500 dark:text-neutral-500'
  }

  return (
    <Component className={`${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {children}
    </Component>
  )
}