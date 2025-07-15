import * as React from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-info-bg text-info-color',
      secondary: 'bg-bg-tertiary text-text-primary',
      destructive: 'bg-error-bg text-error-color',
      outline: 'text-text-primary border border-border-primary'
    }

    return (
      <div
        ref={ref}
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className || ''}`}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge }