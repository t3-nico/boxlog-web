import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:shadow-focus disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Primary button - 最重要アクション (Neutral system + Elevation)
        default:
          'elevation-1 bg-btn-primary text-btn-primary-text hover:bg-btn-primary-hover hover:elevation-2 hover:-translate-y-0.5 active:bg-btn-primary-active active:elevation-1 active:translate-y-0 animate-button-press',
        // Secondary button - 二次アクション (Neutral system + Elevation)
        secondary:
          'elevation-0 bg-btn-secondary text-btn-secondary-text hover:bg-btn-secondary-hover hover:elevation-1 active:bg-btn-secondary-active active:elevation-0 border border-border-primary',
        // Ghost button - 軽いアクション (Neutral system)
        ghost:
          'elevation-0 bg-btn-ghost text-btn-ghost-text hover:bg-btn-ghost-hover hover:elevation-1 active:bg-btn-ghost-active active:elevation-0',
        // Destructive - エラー・削除系アクション (セマンティックカラー)
        destructive:
          'elevation-1 bg-semantic-error-bg text-semantic-error-text hover:bg-destructive/90 hover:elevation-2 border border-destructive',
        // Outline variant - アウトライン表示
        outline:
          'elevation-0 border border-border-primary bg-bg-primary hover:bg-bg-secondary hover:elevation-1 text-text-primary',
        // Link style - リンク風
        link: 'text-text-secondary underline-offset-4 hover:underline hover:text-text-primary',
      },
      size: {
        // 8pxグリッド準拠のサイズ + 新しいタイポグラフィ
        default: 'h-md px-4 py-2 text-button-md', // 40px height
        sm: 'h-sm px-3 py-1 text-button-sm rounded-md', // 32px height
        lg: 'h-lg px-6 py-3 text-button-lg rounded-lg', // 48px height
        icon: 'h-md w-md', // 40px square
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
