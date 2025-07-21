'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { features } from '@/lib/features-data'

const categoryColors = {
  integration: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
  analytics: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700',
  security: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700',
  workflow: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700',
  collaboration: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700',
  mobile: 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-700'
}

export function FeatureGrid() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
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
              className={`group relative p-8 bg-white border border-gray-200 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-gray-100 hover:-translate-y-1 cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-gray-900/50 ${
                hoveredFeature === feature.id ? 'border-blue-300 shadow-lg dark:border-blue-600' : ''
              }`}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 bg-gray-50 rounded-xl mb-6 group-hover:bg-blue-50 transition-colors dark:bg-gray-700 dark:group-hover:bg-blue-900/50">
                <feature.icon className="w-8 h-8 text-gray-600 group-hover:text-blue-600 transition-colors dark:text-gray-300 dark:group-hover:text-blue-400" />
              </div>
              
              {/* Category Badge */}
              <div className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border mb-4 ${categoryColors[feature.category]}`}>
                {feature.category.charAt(0).toUpperCase() + feature.category.slice(1).replace('-', ' ')}
              </div>
              
              {/* Content */}
              <Heading as="h3" size="xl" className="mb-3 group-hover:text-blue-600 transition-colors dark:group-hover:text-blue-400">
                {feature.title}
              </Heading>
              
              <Text variant="muted" className="leading-relaxed">
                {feature.description}
              </Text>
              
              {/* Hover arrow */}
              <div className="flex items-center mt-6 text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity dark:text-blue-400">
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