import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-2',
  {
    variants: {
      variant: {
        // Default - neutral primary style
        default: 'border-transparent bg-btn-secondary text-btn-secondary-text hover:bg-btn-secondary-hover',
        // Secondary - lighter neutral style
        secondary: 'border-transparent bg-bg-tertiary text-text-primary hover:bg-bg-secondary',
        // Destructive - semantic error color
        destructive: 'border-transparent bg-semantic-error-bg text-semantic-error-text hover:opacity-80',
        // Outline - neutral outline style
        outline: 'border-border-primary text-text-primary hover:bg-bg-secondary',
        // Success - semantic success color
        success: 'border-transparent bg-semantic-success-bg text-semantic-success-text hover:opacity-80',
        // Warning - semantic warning color
        warning: 'border-transparent bg-semantic-warning-bg text-semantic-warning-text hover:opacity-80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
