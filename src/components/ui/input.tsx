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
          // デザインシステム統合: 8pxグリッド + タイポグラフィ + フォーカス
          "flex h-md w-full rounded-md border border-input-border bg-input-bg px-3 py-2 text-body-md text-input-text transition-all duration-200 ease-in-out",
          "file:border-0 file:bg-transparent file:text-body-md file:font-medium",
          "placeholder:text-input-placeholder",
          "focus-visible:outline-none focus-visible:border-input-focus focus-visible:shadow-focus",
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