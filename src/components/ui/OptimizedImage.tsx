'use client'

import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { createLazyLoader, imageOptimization } from '@/lib/performance'

interface OptimizedImageProps extends Omit<NextImageProps, 'src' | 'alt'> {
  src: string
  alt: string
  fallbackSrc?: string
  containerClassName?: string
  enableBlur?: boolean
  eager?: boolean
  lazyLoad?: boolean
  breakpoints?: number[]
  deviceSizes?: number[]
  decorative?: boolean
  longDescription?: string
  context?: 'avatar' | 'logo' | 'product' | 'banner' | 'thumbnail' | 'chart' | 'diagram' | 'generic'
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/images/placeholder.png',
  containerClassName = '',
  enableBlur = true,
  className = '',
  eager = false,
  lazyLoad = true,
  breakpoints = [640, 768, 1024, 1280, 1536],
  deviceSizes = [320, 420, 768, 1024, 1200, 1920],
  decorative = false,
  longDescription,
  context = 'generic',
  ...props
}: OptimizedImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(!lazyLoad || eager)
  const imgRef = useRef<HTMLDivElement>(null)

  const generateOptimalSizes = (breakpoints: number[], deviceSizes: number[]) => {
    return breakpoints.map((bp, index) => {
      const nextBp = breakpoints[index + 1]
      const size = deviceSizes[index] || bp
      
      if (nextBp) {
        return `(max-width: ${bp}px) ${size}px`
      }
      return `${size}px`
    }).join(', ')
  }

  const generateAccessibleAlt = (alt: string, context: string, decorative: boolean): string => {
    if (decorative) return ''
    
    if (!alt || alt.trim() === '') {
      console.warn('Missing alt text for image:', src)
      return context === 'avatar' ? 'User avatar' : 
             context === 'logo' ? 'Company logo' : 
             context === 'product' ? 'Product image' : 
             context === 'banner' ? 'Banner image' : 
             context === 'thumbnail' ? 'Thumbnail image' : 
             context === 'chart' ? 'Chart or graph' : 
             context === 'diagram' ? 'Diagram or illustration' : 
             'Image'
    }
    
    // Remove redundant words
    const cleanAlt = alt.replace(/\b(image|picture|photo|graphic|icon|logo)\b/gi, '').trim()
    return cleanAlt || alt
  }

  const accessibleAlt = generateAccessibleAlt(alt, context, decorative)
  const responsiveSizes = props.sizes || generateOptimalSizes(breakpoints, deviceSizes)
  const blurDataURL = enableBlur ? imageOptimization.generateBlurDataURL() : undefined

  useEffect(() => {
    if (!lazyLoad || eager || isInView) return

    const lazyLoader = createLazyLoader()
    if (!lazyLoader || !imgRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01
      }
    )

    observer.observe(imgRef.current)

    return () => {
      observer.disconnect()
    }
  }, [lazyLoad, eager, isInView])

  const handleError = () => {
    if (currentSrc !== fallbackSrc && fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      setHasError(false)
    } else {
      setHasError(true)
    }
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${containerClassName}`}
        style={{ minHeight: props.height || '200px' }}
      >
        <div className="text-center text-gray-500">
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm">Image not available</span>
        </div>
      </div>
    )
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${containerClassName}`}>
      {longDescription && (
        <div id={`img-desc-${props.id || 'default'}`} className="sr-only">
          {longDescription}
        </div>
      )}
      
      {isLoading && isInView && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={{ zIndex: 1 }}
          aria-label="Loading image"
        >
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      {!isInView && lazyLoad && !eager ? (
        <div 
          className={`bg-gray-100 flex items-center justify-center ${containerClassName}`}
          style={{ minHeight: props.height || '200px' }}
          aria-label="Image loading placeholder"
        >
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      ) : (
        <NextImage
          src={currentSrc}
          alt={accessibleAlt}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${className}`}
          onLoad={handleLoad}
          onError={handleError}
          placeholder={enableBlur ? 'blur' : 'empty'}
          blurDataURL={blurDataURL}
          quality={90}
          sizes={responsiveSizes}
          priority={eager}
          loading={eager ? 'eager' : 'lazy'}
          role={decorative ? 'presentation' : 'img'}
          aria-describedby={longDescription ? `img-desc-${props.id || 'default'}` : undefined}
          {...props}
        />
      )}
    </div>
  )
}

export default OptimizedImage