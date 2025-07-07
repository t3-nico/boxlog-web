'use client'

import { useEffect, useState, ReactNode } from 'react'
import { usePerformance } from './PerformanceProvider'

interface DeferredLoaderProps {
  children: ReactNode
  delay?: number
  priority?: 'high' | 'low' | 'idle'
  condition?: boolean
  onLoad?: () => void
}

export function DeferredLoader({
  children,
  delay = 0,
  priority = 'low',
  condition = true,
  onLoad
}: DeferredLoaderProps) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const { monitor } = usePerformance()

  useEffect(() => {
    if (!condition) return

    const load = () => {
      setShouldLoad(true)
      if (onLoad) {
        monitor.measureFunction('deferred-load', onLoad)
      }
    }

    if (priority === 'high') {
      load()
    } else if (priority === 'idle') {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          setTimeout(load, delay)
        })
      } else {
        setTimeout(load, delay + 50)
      }
    } else {
      setTimeout(load, delay)
    }
  }, [condition, delay, priority, onLoad, monitor])

  return shouldLoad ? <>{children}</> : null
}

export function useDeferredScript(src: string, priority: 'high' | 'low' | 'idle' = 'low') {
  const [loaded, setLoaded] = useState(false)
  const { monitor } = usePerformance()

  useEffect(() => {
    if (loaded) return

    const loadScript = () => {
      const script = document.createElement('script')
      script.src = src
      script.async = true
      script.defer = true
      
      script.onload = () => {
        setLoaded(true)
        monitor.measureFunction('deferred-script-load', () => {
          })
      }
      
      document.head.appendChild(script)
    }

    if (priority === 'high') {
      loadScript()
    } else if (priority === 'idle') {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadScript)
      } else {
        setTimeout(loadScript, 100)
      }
    } else {
      setTimeout(loadScript, 1000)
    }
  }, [src, priority, loaded, monitor])

  return loaded
}

export function useDeferredStyle(href: string, priority: 'high' | 'low' | 'idle' = 'low') {
  const [loaded, setLoaded] = useState(false)
  const { monitor } = usePerformance()

  useEffect(() => {
    if (loaded) return

    const loadStyle = () => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      link.media = 'print'
      
      link.onload = () => {
        link.media = 'all'
        setLoaded(true)
        monitor.measureFunction('deferred-style-load', () => {
          })
      }
      
      document.head.appendChild(link)
    }

    if (priority === 'high') {
      loadStyle()
    } else if (priority === 'idle') {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadStyle)
      } else {
        setTimeout(loadStyle, 100)
      }
    } else {
      setTimeout(loadStyle, 2000)
    }
  }, [href, priority, loaded, monitor])

  return loaded
}

export default DeferredLoader