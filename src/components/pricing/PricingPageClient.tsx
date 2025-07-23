'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { PricingToggle } from '@/components/pricing/PricingToggle'
import { PricingCard } from '@/components/pricing/PricingCard'
import { PricingComparison } from '@/components/pricing/PricingComparison'
import { PricingFAQ } from '@/components/pricing/PricingFAQ'
import { pricingPlans } from '@/lib/pricing-data'
import { CheckCircle, Lock, LifeBuoy } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n'

interface PricingPageClientProps {
  dict: Dictionary
  locale: string
}

export function PricingPageClient({ dict, locale }: PricingPageClientProps) {
  const [isYearly, setIsYearly] = useState(false)
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <Heading as="h1" size="4xl" className="mb-6">
              {dict.pages.pricing.hero.title}
            </Heading>
            
            <Text size="xl" variant="muted" className="mb-4 max-w-2xl mx-auto">
              {dict.pages.pricing.hero.subtitle}
              {dict.pages.pricing.hero.trialNote}
            </Text>
            
            <Text size="lg" variant="muted" className="mb-12 max-w-xl mx-auto">
              {dict.pages.pricing.hero.description}
            </Text>
            
            <PricingToggle isYearly={isYearly} onToggle={setIsYearly} />
          </div>
        </Container>
      </section>
      
      {/* Pricing Cards */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                isYearly={isYearly}
              />
            ))}
          </div>
          
          {/* Trust indicators */}
          <div className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-[rgb(var(--icon-bg-tertiary))] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <Heading as="h3" size="md" className="mb-2">
                  {dict.pages.pricing.trustIndicators.trial.title}
                </Heading>
                <Text size="sm" variant="muted">
                  {dict.pages.pricing.trustIndicators.trial.description}
                </Text>
              </div>
              
              <div>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-[rgb(var(--icon-bg-secondary))] rounded-full flex items-center justify-center">
                    <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <Heading as="h3" size="md" className="mb-2">
                  {dict.pages.pricing.trustIndicators.security.title}
                </Heading>
                <Text size="sm" variant="muted">
                  {dict.pages.pricing.trustIndicators.security.description}
                </Text>
              </div>
              
              <div>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-[rgb(var(--icon-bg-secondary))] rounded-full flex items-center justify-center">
                    <LifeBuoy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <Heading as="h3" size="md" className="mb-2">
                  {dict.pages.pricing.trustIndicators.support.title}
                </Heading>
                <Text size="sm" variant="muted">
                  {dict.pages.pricing.trustIndicators.support.description}
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Feature Comparison */}
      <PricingComparison />
      
      {/* FAQ */}
      <PricingFAQ />
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 dark:from-blue-700 dark:via-blue-800 dark:to-purple-800">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <Heading as="h2" size="3xl" className="text-white mb-6">
              {dict.pages.pricing.cta.title}
            </Heading>
            
            <Text size="lg" className="text-blue-100 dark:text-blue-200 mb-12 max-w-2xl mx-auto">
              {dict.pages.pricing.cta.description}
            </Text>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-50 dark:bg-gray-100 dark:text-blue-700 dark:hover:bg-gray-200 shadow-lg"
                asChild
              >
                <a href={`/${locale}/signup`}>{dict.pages.pricing.cta.startButton}</a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 dark:border-white/40 dark:hover:bg-white/20 backdrop-blur"
                asChild
              >
                <a href={`/${locale}/contact`}>{dict.pages.pricing.cta.salesButton}</a>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}