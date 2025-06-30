import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

// Heading component
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  children: React.ReactNode
}

const headingVariants = {
  size: {
    xs: 'text-xs font-semibold',
    sm: 'text-sm font-semibold',
    md: 'text-base font-semibold',
    lg: 'text-lg font-semibold',
    xl: 'text-xl font-bold',
    '2xl': 'text-2xl font-bold',
    '3xl': 'text-3xl font-bold',
    '4xl': 'text-4xl font-bold',
  },
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as: Component = 'h2', size = 'md', children, ...props }, ref) => {
    return (
      <Component
        className={cn(
          'text-gray-900 tracking-tight',
          headingVariants.size[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Heading.displayName = 'Heading'

// Text component
export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'muted' | 'subtle'
  children: React.ReactNode
}

const textVariants = {
  size: {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  },
  variant: {
    default: 'text-gray-900',
    muted: 'text-gray-600',
    subtle: 'text-gray-500',
  },
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, as: Component = 'p', size = 'md', variant = 'default', children, ...props }, ref) => {
    return (
      <Component
        className={cn(
          'leading-relaxed',
          textVariants.size[size],
          textVariants.variant[variant],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Text.displayName = 'Text'