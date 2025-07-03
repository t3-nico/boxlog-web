'use client'

import { Suspense, ComponentType, ReactNode, lazy, useEffect, useState } from 'react'
import { usePerformance } from './PerformanceProvider'

interface CodeSplittingProps {
  loader: () => Promise<{ default: ComponentType<any> }>
  fallback?: ReactNode
  props?: Record<string, any>
  priority?: 'high' | 'low'
  preload?: boolean
  viewport?: boolean
}

export function CodeSplitting({
  loader,
  fallback = <div className="animate-pulse bg-gray-200 rounded h-32" />,
  props = {},
  priority = 'low',
  preload = false,
  viewport = false
}: CodeSplittingProps) {
  const { monitor } = usePerformance()
  const [LazyComponent, setLazyComponent] = useState<ComponentType<any> | null>(null)
  const [isInViewport, setIsInViewport] = useState(!viewport)
  const [element, setElement] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (preload || priority === 'high') {
      const Component = lazy(loader)
      setLazyComponent(Component)
    }
  }, [loader, preload, priority])

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

  useEffect(() => {
    if (isInViewport && !LazyComponent) {
      const startTime = performance.now()
      const Component = lazy(loader)
      setLazyComponent(Component)
      
      monitor.measureFunction('code-splitting-load', () => {
        const endTime = performance.now()
        console.log(`Code splitting load time: ${endTime - startTime}ms`)
      })
    }
  }, [isInViewport, LazyComponent, loader, monitor])

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

  if (!LazyComponent) {
    return <>{fallback}</>
  }

  return (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

export const createAsyncComponent = (loader: () => Promise<{ default: ComponentType<any> }>) => {
  return (props: any) => <CodeSplitting loader={loader} {...props} />
}

export default CodeSplitting