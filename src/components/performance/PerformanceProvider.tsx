'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react'
import PerformanceMonitor, { 
  ResourcePreloader, 
  criticalCSS,
  reportWebVitals 
} from '@/lib/performance'

interface PerformanceContextValue {
  monitor: PerformanceMonitor
}

const PerformanceContext = createContext<PerformanceContextValue | null>(null)

interface PerformanceProviderProps {
  children: ReactNode
}

export function PerformanceProvider({ children }: PerformanceProviderProps) {
  useEffect(() => {
    const monitor = PerformanceMonitor.getInstance()
    
    // Initialize Core Web Vitals monitoring
    monitor.initCoreWebVitals()
    
    // Preload critical resources
    ResourcePreloader.preloadCriticalResources()
    
    // Inline critical CSS
    criticalCSS.inlineStyles()
    
    // Setup Web Vitals reporting
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
        onCLS(reportWebVitals)
        onFCP(reportWebVitals)
        onLCP(reportWebVitals)
        onTTFB(reportWebVitals)
        onINP(reportWebVitals)
      })
    }
    
    return () => {
      monitor.cleanup()
    }
  }, [])

  const value = {
    monitor: PerformanceMonitor.getInstance()
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