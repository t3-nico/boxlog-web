'use client'

import { Container, Heading, Text } from '@/components/ui'
import { detailedFeatures, pricingPlans } from '@/lib/pricing-data'
import { Check, X } from 'lucide-react'

export function PricingComparison() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <Container>
        <div className="text-center mb-16">
          <Heading as="h2" size="3xl" className="mb-4">
            Compare Plans
          </Heading>
          <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
            See exactly what&apos;s included in each plan and find the perfect fit for your team.
          </Text>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-6 px-6 font-medium text-gray-900 dark:text-gray-100">
                  Features
                </th>
                {pricingPlans.map((plan) => (
                  <th key={plan.id} className="text-center py-6 px-6">
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">
                        {plan.name}
                      </div>
                      {plan.popular && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Most Popular
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {detailedFeatures.map((feature, index) => (
                <tr key={feature.name} className={`border-b border-gray-100 dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-800'}`}>
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-gray-100">
                    {feature.name}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {typeof feature.starter === 'boolean' ? (
                      feature.starter ? (
                        <div className="flex justify-center">
                          <Check className="w-5 h-5 text-green-500 dark:text-green-400" />
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <X className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                        </div>
                      )
                    ) : (
                      <Text size="sm" className="text-gray-700 dark:text-gray-300 font-medium">
                        {feature.starter}
                      </Text>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {typeof feature.pro === 'boolean' ? (
                      feature.pro ? (
                        <div className="flex justify-center">
                          <Check className="w-5 h-5 text-green-500 dark:text-green-400" />
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <X className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                        </div>
                      )
                    ) : (
                      <Text size="sm" className="text-gray-700 dark:text-gray-300 font-medium">
                        {feature.pro}
                      </Text>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {typeof feature.enterprise === 'boolean' ? (
                      feature.enterprise ? (
                        <div className="flex justify-center">
                          <Check className="w-5 h-5 text-green-500 dark:text-green-400" />
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <X className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                        </div>
                      )
                    ) : (
                      <Text size="sm" className="text-gray-700 dark:text-gray-300 font-medium">
                        {feature.enterprise}
                      </Text>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  )
}