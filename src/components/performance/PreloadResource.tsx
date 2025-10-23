'use client'

import { useEffect } from 'react'

interface PreloadResourceProps {
  href: string
  as: 'script' | 'style' | 'font' | 'image' | 'document'
  type?: string
  crossOrigin?: 'anonymous' | 'use-credentials'
  media?: string
}

export function PreloadResource({ 
  href, 
  as, 
  type, 
  crossOrigin, 
  media 
}: PreloadResourceProps) {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = as
    
    if (type) link.type = type
    if (crossOrigin) link.crossOrigin = crossOrigin
    if (media) link.media = media

    document.head.appendChild(link)

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }
    }
  }, [href, as, type, crossOrigin, media])

  return null
}

// Hook for programmatic preloading
export function usePreloadResource() {
  const preload = (options: PreloadResourceProps) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = options.href
    link.as = options.as
    
    if (options.type) link.type = options.type
    if (options.crossOrigin) link.crossOrigin = options.crossOrigin
    if (options.media) link.media = options.media

    document.head.appendChild(link)
  }

  return preload
}

export default PreloadResource