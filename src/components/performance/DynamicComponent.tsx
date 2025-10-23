'use client'

import { Suspense, ComponentType, ReactNode, lazy, useEffect, useState } from 'react'
import { usePerformance } from './PerformanceProvider'

interface DynamicComponentProps {
  component: ComponentType<any>
  fallback?: ReactNode
  props?: Record<string, any>
  onLoad?: () => void
  preload?: boolean
  priority?: 'high' | 'low'
  viewport?: boolean
}

export function DynamicComponent({
  component: Component,
  fallback = <div className="animate-pulse bg-gray-200 rounded h-32" />,
  props = {},
  onLoad,
  preload = false,
  priority = 'low',
  viewport = false
}: DynamicComponentProps) {
  const { monitor } = usePerformance()
  const [isInViewport, setIsInViewport] = useState(!viewport)
  const [element, setElement] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!viewport || !element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [element, viewport])

  const handleLoad = () => {
    if (onLoad) {
      monitor.measureFunction('dynamic-component-load', onLoad)
    }
  }

  if (viewport && !isInViewport) {
    return (
      <div
        ref={setElement}
        className="min-h-[200px] flex items-center justify-center"
      >
        {fallback}
      </div>
    )
  }

  return (
    <Suspense fallback={fallback}>
      <Component {...props} onLoad={handleLoad} />
    </Suspense>
  )
}

export default DynamicComponent