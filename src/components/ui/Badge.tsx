import * as React from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      secondary: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
      destructive: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
      outline: 'text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
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