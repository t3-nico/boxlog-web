'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'

interface LazyComponentProps {
  children: ReactNode
  fallback?: ReactNode
  rootMargin?: string
  threshold?: number
  className?: string
}

export function LazyComponent({
  children,
  fallback = <div className="w-full h-32 bg-gray-100 animate-pulse rounded" />,
  rootMargin = '50px',
  threshold = 0.1,
  className = '',
}: LazyComponentProps) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return (
    <div ref={ref} className={className}>
      {isIntersecting ? children : fallback}
    </div>
  )
}

export default LazyComponent