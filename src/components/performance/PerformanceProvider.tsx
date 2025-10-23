'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react'

interface PerformanceContextValue {
  monitor: {
    measureFunction: (name: string, fn: Function) => void
    recordMetric: (name: string, value: number) => void
  }
}

const PerformanceContext = createContext<PerformanceContextValue | null>(null)

interface PerformanceProviderProps {
  children: ReactNode
}

// Simple performance monitor implementation
const createSimpleMonitor = () => ({
  measureFunction: (name: string, fn: Function) => {
    if (typeof fn === 'function') {
      const start = performance.now()
      try {
        fn()
      } finally {
        const end = performance.now()
        }
    }
  },
  recordMetric: (name: string, value: number) => {
    }
})

export function PerformanceProvider({ children }: PerformanceProviderProps) {
  useEffect(() => {
    // Setup Web Vitals reporting (simplified)
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
        const reportWebVitals = (metric: any) => {
          }
        
        onCLS(reportWebVitals)
        onFCP(reportWebVitals)
        onLCP(reportWebVitals)
        onTTFB(reportWebVitals)
        onINP(reportWebVitals)
      }).catch(console.error)
    }
  }, [])

  const value = {
    monitor: createSimpleMonitor()
  }

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  )
}

export function usePerformance() {
  const context = useContext(PerformanceContext)
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider')
  }
  return context
}