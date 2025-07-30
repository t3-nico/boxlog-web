import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary button - 最重要アクション (Neutral system)
        default: "bg-btn-primary text-btn-primary-text hover:bg-btn-primary-hover active:bg-btn-primary-active border border-btn-primary animate-button-press",
        // Secondary button - 二次アクション (Neutral system) 
        secondary: "bg-btn-secondary text-btn-secondary-text hover:bg-btn-secondary-hover active:bg-btn-secondary-active border border-border-primary",
        // Ghost button - 軽いアクション (Neutral system)
        ghost: "bg-btn-ghost text-btn-ghost-text hover:bg-btn-ghost-hover active:bg-btn-ghost-active border border-transparent hover:border-border-primary",
        // Destructive - エラー・削除系アクション (セマンティックカラー)
        destructive: "bg-semantic-error-bg text-semantic-error-text hover:bg-destructive/90 border border-destructive",
        // Outline variant - アウトライン表示
        outline: "border border-border-primary bg-bg-primary hover:bg-bg-secondary text-text-primary",
        // Link style - リンク風
        link: "text-text-secondary underline-offset-4 hover:underline hover:text-text-primary",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }