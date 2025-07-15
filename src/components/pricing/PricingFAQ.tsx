'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { Button } from '@/components/ui/button'
import { faqItems } from '@/lib/pricing-data'
import { ChevronDown } from 'lucide-react'

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
    <section className="py-24 bg-white dark:bg-gray-900">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Heading as="h2" size="3xl" className="mb-4">
              Frequently Asked Questions
            </Heading>
            <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
              Everything you need to know about our pricing and features. Can&apos;t find what you&apos;re looking for?{' '}
              <a href="/contact" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                Contact our team
              </a>
              .
            </Text>
          </div>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all hover:shadow-sm dark:hover:shadow-md"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-inset"
                  aria-expanded={openItems.includes(index)}
                >
                  <div className="flex items-center justify-between">
                    <Heading as="h3" size="md" className="text-gray-900 dark:text-gray-100 pr-4">
                      {item.question}
                    </Heading>
                    <div className="flex-shrink-0">
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${
                          openItems.includes(index) ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-4 bg-gray-50 dark:bg-gray-700">
                    <Text className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item.answer}
                    </Text>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              <Heading as="h3" size="xl" className="mb-4">
                Still have questions?
              </Heading>
              <Text size="md" variant="muted" className="mb-6">
                Our team is here to help you find the perfect plan for your needs.
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  asChild
                >
                  <a href="/contact">Contact Sales</a>
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
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