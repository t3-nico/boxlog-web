'use client'

import { useState } from 'react'
import { Container, Heading, Text, Button } from '@/components/ui'
import { faqItems } from '@/lib/pricing-data'

export function PricingFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])
  
  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }
  
  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Heading as="h2" size="3xl" className="mb-4">
              Frequently Asked Questions
            </Heading>
            <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
              Everything you need to know about our pricing and features. Can't find what you're looking for?{' '}
              <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                Contact our team
              </a>
              .
            </Text>
          </div>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden transition-all hover:shadow-sm"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  aria-expanded={openItems.includes(index)}
                >
                  <div className="flex items-center justify-between">
                    <Heading as="h3" size="md" className="text-gray-900 pr-4">
                      {item.question}
                    </Heading>
                    <div className="flex-shrink-0">
                      <svg
                        className={`w-5 h-5 text-gray-500 transition-transform ${
                          openItems.includes(index) ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-4 bg-gray-50">
                    <Text className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </Text>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <div className="bg-gray-50 rounded-2xl p-8">
              <Heading as="h3" size="xl" className="mb-4">
                Still have questions?
              </Heading>
              <Text size="md" variant="muted" className="mb-6">
                Our team is here to help you find the perfect plan for your needs.
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  asChild
                >
                  <a href="/contact">Contact Sales</a>
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  asChild
                >
                  <a href="/docs">View Documentation</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}