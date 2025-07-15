'use client'

import { Label, Switch, Badge } from '@/components/ui'
import { savingsText } from '@/lib/pricing-data'

interface PricingToggleProps {
  isYearly: boolean
  onToggle: (isYearly: boolean) => void
}

export function PricingToggle({ isYearly, onToggle }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center mb-12">
      <div className="flex items-center space-x-4">
        <Label 
          htmlFor="billing-toggle" 
          className={`text-sm font-medium transition-colors ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}
        >
          Monthly
        </Label>
        
        <Switch
          id="billing-toggle"
          checked={isYearly}
          onCheckedChange={onToggle}
          aria-label="Toggle between monthly and yearly billing"
        />
        
        <div className="flex items-center space-x-2">
          <Label 
            htmlFor="billing-toggle" 
            className={`text-sm font-medium transition-colors ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            Yearly
          </Label>
          {isYearly && (
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              {savingsText}
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}