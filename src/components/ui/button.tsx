import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Primary button
        default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover active:bg-primary/80',
        // Secondary button
        secondary: 'bg-secondary text-secondary-foreground border border-border hover:bg-state-hover',
        // Ghost button
        ghost: 'hover:bg-state-hover hover:text-foreground',
        // Destructive
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive-hover',
        // Outline variant
        outline: 'border border-border bg-background hover:bg-state-hover text-foreground',
        // Link style
        link: 'text-muted-foreground underline-offset-4 hover:underline hover:text-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2 text-sm', // 40px height
        sm: 'h-8 px-3 py-1 text-sm rounded-md', // 32px height
        lg: 'h-12 px-6 py-3 text-base rounded-lg', // 48px height
        icon: 'h-10 w-10', // 40px square
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
