import { cn } from '@/lib/utils'
import React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn('flex h-10 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white', className)}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'
