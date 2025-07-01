'use client'

import { Container, Heading, Text } from '@/components/ui'
import { detailedFeatures } from '@/lib/features-data'

export function FeatureDetails() {
  return (
    <section className="py-24 bg-gray-50">
      <Container>
        {detailedFeatures.map((feature, index) => (
          <div
            key={feature.id}
            className={`flex flex-col ${
              feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
            } items-center gap-16 mb-32 last:mb-0`}
          >
            {/* Content */}
            <div className="flex-1 lg:max-w-lg">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-full mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {feature.subtitle}
              </div>
              
              <Heading as="h2" size="3xl" className="mb-6">
                {feature.title}
              </Heading>
              
              <Text size="lg" variant="muted" className="mb-8 leading-relaxed">
                {feature.description}
              </Text>
              
              <div className="space-y-4">
                {feature.features.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <Text className="text-gray-700">{item}</Text>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Image/Visual */}
            <div className="flex-1 lg:max-w-lg">
              <div className="relative group">
                {/* Placeholder for actual image */}
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="w-full h-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">
                          {index === 0 ? '⚡' : index === 1 ? '📊' : '🔒'}
                        </span>
                      </div>
                      <Text className="text-gray-600 font-medium">
                        {feature.title} Preview
                      </Text>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements for visual interest */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-purple-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </section>
  )
}