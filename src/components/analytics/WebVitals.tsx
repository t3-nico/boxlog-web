'use client'

import { useEffect, useRef } from 'react'
import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals'

interface WebVitalMetric {
  name: string
  value: number
  id: string
  delta: number
  rating: 'good' | 'needs-improvement' | 'poor'
  url: string
  timestamp: number
}

class WebVitalsOptimizer {
  private metrics: Map<string, WebVitalMetric> = new Map()
  private observers: Map<string, PerformanceObserver> = new Map()
  private improvements: string[] = []

  constructor() {
    this.initializeOptimizations()
  }

  private initializeOptimizations() {
    // Monitor performance and suggest improvements
    this.monitorResourceLoading()
    this.monitorLayoutShifts()
    this.monitorLargestContentfulPaint()
    this.monitorInteractionToNextPaint()
  }

  private monitorResourceLoading() {
    if (typeof window === 'undefined') return

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming

          // Check for slow resources
          if (resourceEntry.duration > 1000) {
            this.improvements.push(
              `Slow resource detected: ${resourceEntry.name} (${Math.round(resourceEntry.duration)}ms)`
            )
          }

          // Check for large resources
          if (resourceEntry.transferSize > 1024 * 1024) {
            this.improvements.push(
              `Large resource detected: ${resourceEntry.name} (${Math.round(resourceEntry.transferSize / 1024)}KB)`
            )
          }
        }
      }
    })

    observer.observe({ entryTypes: ['resource'] })
    this.observers.set('resource', observer)
  }

  private monitorLayoutShifts() {
    if (typeof window === 'undefined') return

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (
          entry.entryType === 'layout-shift' &&
          !(entry as any).hadRecentInput
        ) {
          const layoutShiftEntry = entry as any
          if (layoutShiftEntry.value > 0.1) {
            this.improvements.push(
              `Layout shift detected: ${layoutShiftEntry.value.toFixed(4)}`
            )
          }
        }
      }
    })

    observer.observe({ entryTypes: ['layout-shift'] })
    this.observers.set('layout-shift', observer)
  }

  private monitorLargestContentfulPaint() {
    if (typeof window === 'undefined') return

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          const lcpEntry = entry as any
          if (lcpEntry.startTime > 2500) {
            this.improvements.push(
              `LCP is slow: ${Math.round(lcpEntry.startTime)}ms (target: <2.5s)`
            )
          }
        }
      }
    })

    observer.observe({ entryTypes: ['largest-contentful-paint'] })
    this.observers.set('lcp', observer)
  }

  private monitorInteractionToNextPaint() {
    if (typeof window === 'undefined') return

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'event') {
          const eventEntry = entry as any
          if (eventEntry.duration > 200) {
            this.improvements.push(
              `Slow interaction detected: ${eventEntry.name} (${Math.round(eventEntry.duration)}ms)`
            )
          }
        }
      }
    })

    observer.observe({ entryTypes: ['event'] })
    this.observers.set('inp', observer)
  }

  public getImprovements(): string[] {
    return this.improvements
  }

  public getMetrics(): Map<string, WebVitalMetric> {
    return this.metrics
  }

  public recordMetric(metric: any) {
    const webVitalMetric: WebVitalMetric = {
      name: metric.name,
      value: metric.value,
      id: metric.id,
      delta: metric.delta,
      rating: metric.rating,
      url: window.location.href,
      timestamp: Date.now(),
    }

    this.metrics.set(metric.name, webVitalMetric)

    // Provide improvement suggestions
    if (metric.name === 'LCP' && metric.value > 2500) {
      this.improvements.push(
        'LCP > 2.5s: Consider optimizing images, reducing server response time, or preloading critical resources'
      )
    }

    if (metric.name === 'CLS' && metric.value > 0.1) {
      this.improvements.push(
        'CLS > 0.1: Reserve space for images, avoid inserting content above existing content'
      )
    }

    if (metric.name === 'INP' && metric.value > 200) {
      this.improvements.push(
        'INP > 200ms: Optimize JavaScript execution, use requestIdleCallback for non-critical tasks'
      )
    }
  }

  public cleanup() {
    this.observers.forEach((observer) => observer.disconnect())
    this.observers.clear()
  }
}

function sendToAnalytics(metric: any) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', metric)
  }

  // Send to analytics service in production
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics 4
    if (typeof window !== 'undefined' && 'gtag' in window) {
      ;(window as any).gtag('event', metric.name, {
        event_category: 'Web Vitals',
        value: Math.round(
          metric.name === 'CLS' ? metric.value * 1000 : metric.value
        ),
        event_label: metric.id,
        non_interaction: true,
      })
    }

    // Example: Send to custom analytics endpoint
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: metric.name,
        value: metric.value,
        id: metric.id,
        delta: metric.delta,
        rating: metric.rating,
        url: window.location.href,
        timestamp: Date.now(),
      }),
    }).catch(console.error)
  }
}

export function WebVitals() {
  const optimizerRef = useRef<WebVitalsOptimizer | null>(null)

  useEffect(() => {
    try {
      // Initialize optimizer
      optimizerRef.current = new WebVitalsOptimizer()

      const handleMetric = (metric: any) => {
        optimizerRef.current?.recordMetric(metric)
        sendToAnalytics(metric)
      }

      onCLS(handleMetric)
      onINP(handleMetric) // INP replaced FID in newer versions
      onFCP(handleMetric)
      onLCP(handleMetric)
      onTTFB(handleMetric)

      // Log improvements after 5 seconds
      const improvementTimer = setTimeout(() => {
        if (optimizerRef.current) {
          const improvements = optimizerRef.current.getImprovements()
          if (improvements.length > 0) {
            console.group('🚀 Performance Improvement Suggestions')
            improvements.forEach((improvement) =>
              console.log(`• ${improvement}`)
            )
            console.groupEnd()
          }
        }
      }, 5000)

      return () => {
        clearTimeout(improvementTimer)
        optimizerRef.current?.cleanup()
      }
    } catch (error) {
      console.error('Error measuring web vitals:', error)
    }
  }, [])

  return null
}

export default WebVitals
