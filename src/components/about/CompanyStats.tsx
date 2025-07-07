'use client'

import { useEffect, useState } from 'react'
import { Container, Heading, Text } from '@/components/ui'

export interface StatData {
  id: string
  value: string | number
  label: string
  description: string
  icon: string
  animationDuration?: number
}

interface CompanyStatsProps {
  stats: StatData[]
}

function AnimatedCounter({ 
  endValue, 
  duration = 2000,
  suffix = '' 
}: { 
  endValue: number
  duration?: number
  suffix?: string 
}) {
  const [currentValue, setCurrentValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById(`counter-${endValue}`)
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [endValue])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Apply easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const value = Math.floor(easeOutQuart * endValue)
      
      setCurrentValue(value)
      
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    
    requestAnimationFrame(step)
  }, [isVisible, endValue, duration])

  return (
    <span id={`counter-${endValue}`}>
      {currentValue.toLocaleString()}{suffix}
    </span>
  )
}

export function CompanyStats({ stats }: CompanyStatsProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
      <Container>
        <div className="text-center mb-16">
          <Heading as="h2" size="3xl" className="mb-4">
Our Growth in Numbers
          </Heading>
          <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
We are trusted by many customers and continue to grow together
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="relative group bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-white/50 dark:border-gray-800/50 hover:border-blue-200 dark:hover:border-blue-700"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl opacity-20 -m-2 group-hover:opacity-30 transition-opacity" />
              
              {/* Icon */}
              <div className="relative z-10 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                  <span className="text-2xl" role="img" aria-label={stat.label}>
                    {stat.icon}
                  </span>
                </div>
              </div>

              {/* Value */}
              <div className="relative z-10 mb-2">
                <Heading as="h3" size="2xl" className="text-gray-900 dark:text-gray-100 font-bold">
                  {typeof stat.value === 'number' ? (
                    <AnimatedCounter 
                      endValue={stat.value} 
                      duration={stat.animationDuration || 2000}
                      suffix={stat.value >= 1000 ? '+' : ''}
                    />
                  ) : (
                    stat.value
                  )}
                </Heading>
              </div>

              {/* Label */}
              <Text size="md" className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {stat.label}
              </Text>

              {/* Description */}
              <Text size="sm" variant="muted" className="leading-relaxed">
                {stat.description}
              </Text>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-400/5 dark:to-purple-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-12 border-t border-white/30 dark:border-gray-700/30">
          <div className="text-center">
            <Text size="sm" variant="muted" className="mb-6">
Trusted Partners
            </Text>
            
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {/* Placeholder for company logos */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-24 h-12 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center"
                >
                  <Text size="xs" className="text-gray-500 dark:text-gray-400 font-medium">
                    Company {i}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}