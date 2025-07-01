'use client'

import { useState } from 'react'
import { Container, Heading, Text, Button } from '@/components/ui'
import { PricingToggle } from '@/components/pricing/PricingToggle'
import { PricingCard } from '@/components/pricing/PricingCard'
import { PricingComparison } from '@/components/pricing/PricingComparison'
import { PricingFAQ } from '@/components/pricing/PricingFAQ'
import { pricingPlans } from '@/lib/pricing-data'

export function PricingPageClient() {
  const [isYearly, setIsYearly] = useState(false)
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <Heading as="h1" size="4xl" className="mb-6">
              Simple, transparent pricing
            </Heading>
            
            <Text size="xl" variant="muted" className="mb-4 max-w-2xl mx-auto">
              Choose the perfect plan for your team. All plans include a 14-day free trial.
              No credit card required.
            </Text>
            
            <Text size="lg" variant="muted" className="mb-12 max-w-xl mx-auto">
              Start free, scale as you grow. Cancel anytime.
            </Text>
            
            <PricingToggle isYearly={isYearly} onToggle={setIsYearly} />
          </div>
        </Container>
      </section>
      
      {/* Pricing Cards */}
      <section className="py-24 bg-white">
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
          <div className="mt-16 pt-16 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <Heading as="h3" size="md" className="mb-2">
                  14-day free trial
                </Heading>
                <Text size="sm" variant="muted">
                  No credit card required to get started
                </Text>
              </div>
              
              <div>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <Heading as="h3" size="md" className="mb-2">
                  Secure & compliant
                </Heading>
                <Text size="sm" variant="muted">
                  SOC 2 Type II certified and GDPR compliant
                </Text>
              </div>
              
              <div>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <Heading as="h3" size="md" className="mb-2">
                  24/7 support
                </Heading>
                <Text size="sm" variant="muted">
                  Expert support when you need it most
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
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <Heading as="h2" size="3xl" className="text-white mb-6">
              Ready to get started?
            </Heading>
            
            <Text size="lg" className="text-blue-100 mb-12 max-w-2xl mx-auto">
              Join thousands of teams who trust our platform to scale their business.
              Start your free trial today.
            </Text>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-50 shadow-lg"
                asChild
              >
                <a href="/signup">Start Free Trial</a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur"
                asChild
              >
                <a href="/contact">Talk to Sales</a>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}