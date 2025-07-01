'use client'

import { Container, Heading, Text } from '@/components/ui'
import { detailedFeatures, pricingPlans } from '@/lib/pricing-data'

export function PricingComparison() {
  return (
    <section className="py-24 bg-gray-50">
      <Container>
        <div className="text-center mb-16">
          <Heading as="h2" size="3xl" className="mb-4">
            Compare Plans
          </Heading>
          <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
            See exactly what's included in each plan and find the perfect fit for your team.
          </Text>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-2xl shadow-sm border border-gray-200">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-6 px-6 font-medium text-gray-900">
                  Features
                </th>
                {pricingPlans.map((plan) => (
                  <th key={plan.id} className="text-center py-6 px-6">
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-semibold mb-1">
                        {plan.name}
                      </div>
                      {plan.popular && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
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
                <tr key={feature.name} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {feature.name}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {typeof feature.starter === 'boolean' ? (
                      feature.starter ? (
                        <div className="flex justify-center">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )
                    ) : (
                      <Text size="sm" className="text-gray-700 font-medium">
                        {feature.starter}
                      </Text>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {typeof feature.pro === 'boolean' ? (
                      feature.pro ? (
                        <div className="flex justify-center">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )
                    ) : (
                      <Text size="sm" className="text-gray-700 font-medium">
                        {feature.pro}
                      </Text>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {typeof feature.enterprise === 'boolean' ? (
                      feature.enterprise ? (
                        <div className="flex justify-center">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )
                    ) : (
                      <Text size="sm" className="text-gray-700 font-medium">
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