'use client'

import { Container, Heading, Text, Button } from '@/components/ui'
import { PricingPlan } from '@/lib/pricing-data'

interface PricingCardProps {
  plan: PricingPlan
  isYearly: boolean
}

export function PricingCard({ plan, isYearly }: PricingCardProps) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice
  const isCustom = plan.id === 'enterprise'
  
  return (
    <div className={`relative rounded-2xl border bg-white dark:bg-gray-800 p-8 shadow-sm transition-all hover:shadow-lg dark:hover:shadow-xl ${
      plan.popular ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20 dark:border-blue-400 dark:ring-blue-400' : 'border-gray-200 dark:border-gray-700'
    }`}>
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-blue-500 text-white dark:bg-blue-600 dark:text-blue-50 shadow-lg">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center">
        <Heading as="h3" size="xl" className="mb-2">
          {plan.name}
        </Heading>
        
        <Text size="md" variant="muted" className="mb-6">
          {plan.description}
        </Text>
        
        <div className="mb-8">
          {isCustom ? (
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Custom
              </div>
              <Text size="sm" variant="muted" className="mt-1">
                Contact us for pricing
              </Text>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-center">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-1">$</span>
                <div className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                  {Math.floor(price)}
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-1">
                  {price % 1 !== 0 && `.${Math.round((price % 1) * 100)}`}
                </span>
              </div>
              <Text size="sm" variant="muted" className="mt-1">
                per month {isYearly && '(billed annually)'}
              </Text>
              {isYearly && !isCustom && (
                <Text size="sm" className="text-green-600 dark:text-green-400 font-medium mt-1">
                  Save ${Math.round((plan.monthlyPrice * 12 - plan.yearlyPrice) * 100) / 100} per year
                </Text>
              )}
            </div>
          )}
        </div>
        
        <Button 
          className={`w-full mb-8 ${
            plan.popular 
              ? 'bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600' 
              : 'bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-700 dark:hover:bg-gray-600'
          }`}
          asChild
        >
          <a href={plan.ctaHref}>
            {plan.ctaText}
          </a>
        </Button>
      </div>
      
      <div className="space-y-4">
        <Text size="sm" className="font-medium text-gray-900 dark:text-gray-100 mb-4">
          Everything in {plan.name} includes:
        </Text>
        
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-0.5">
              <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <Text size="sm" className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {feature}
            </Text>
          </div>
        ))}
      </div>
    </div>
  )
}