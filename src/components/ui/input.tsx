import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        // デザインシステム統合: 8pxグリッド + タイポグラフィ + フォーカス
        'h-md border-input-border bg-input-bg text-body-md text-input-text flex w-full rounded-md border px-3 py-2 transition-all duration-200 ease-in-out',
        'file:text-body-md file:border-0 file:bg-transparent file:font-medium',
        'placeholder:text-input-placeholder',
        'focus-visible:border-input-focus focus-visible:shadow-focus focus-visible:outline-none',
        'disabled:bg-bg-secondary disabled:text-text-disabled disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
