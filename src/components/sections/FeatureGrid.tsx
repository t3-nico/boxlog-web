'use client'

import { useState } from 'react'
import { Container, Heading, Text } from '@/components/ui'
import { features } from '@/lib/features-data'

const categoryColors = {
  integration: 'bg-blue-50 text-blue-700 border-blue-200',
  analytics: 'bg-green-50 text-green-700 border-green-200',
  security: 'bg-red-50 text-red-700 border-red-200',
  workflow: 'bg-purple-50 text-purple-700 border-purple-200',
  collaboration: 'bg-orange-50 text-orange-700 border-orange-200',
  mobile: 'bg-pink-50 text-pink-700 border-pink-200'
}

export function FeatureGrid() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)

  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="text-center mb-16">
          <Heading as="h2" size="3xl" className="mb-4">
            Powerful features for modern teams
          </Heading>
          <Text size="xl" variant="muted" className="max-w-2xl mx-auto">
            Everything you need to build, deploy, and scale your applications in one integrated platform.
          </Text>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`group relative p-8 bg-white border border-gray-200 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-gray-100 hover:-translate-y-1 cursor-pointer ${
                hoveredFeature === feature.id ? 'border-blue-300 shadow-lg' : ''
              }`}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 bg-gray-50 rounded-xl mb-6 group-hover:bg-blue-50 transition-colors">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              
              {/* Category Badge */}
              <div className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border mb-4 ${categoryColors[feature.category]}`}>
                {feature.category.charAt(0).toUpperCase() + feature.category.slice(1).replace('-', ' ')}
              </div>
              
              {/* Content */}
              <Heading as="h3" size="xl" className="mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </Heading>
              
              <Text variant="muted" className="leading-relaxed">
                {feature.description}
              </Text>
              
              {/* Hover arrow */}
              <div className="flex items-center mt-6 text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm">Learn more</span>
                <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              {/* Gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}