import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Neutral Color System Integration for Input
          "flex h-10 w-full rounded-md border border-input-border bg-input-bg px-3 py-2 text-sm text-input-text transition-colors",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-input-placeholder",
          "focus-visible:outline-none focus-visible:border-input-focus focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-bg-secondary disabled:text-text-disabled",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }