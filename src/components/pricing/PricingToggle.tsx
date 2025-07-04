'use client'

import { useState } from 'react'
import { savingsText } from '@/lib/pricing-data'

interface PricingToggleProps {
  isYearly: boolean
  onToggle: (isYearly: boolean) => void
}

export function PricingToggle({ isYearly, onToggle }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center mb-12">
      <div className="flex items-center space-x-4">
        <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
          Monthly
        </span>
        
        <button
          onClick={() => onToggle(!isYearly)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
            isYearly ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
          }`}
          role="switch"
          aria-checked={isYearly}
          aria-label="Toggle between monthly and yearly billing"
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-gray-100 transition-transform ${
              isYearly ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
            Yearly
          </span>
          {isYearly && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              {savingsText}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}