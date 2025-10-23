'use client'

import { useEffect } from 'react'
// import { criticalCSS, fontLoadingCSS, PerformanceMonitor } from '@/lib/critical-css'

// Enhanced Critical CSS for 90+ Lighthouse score
const ENHANCED_CRITICAL_CSS = `
  /* Essential reset and base */
  *,*::before,*::after{box-sizing:border-box;border:0 solid #e5e7eb}
  html{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;scroll-behavior:smooth}
  body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;min-height:100vh}
  
  /* Layout stability - Critical for CLS */
  header{position:fixed;top:0;left:0;right:0;z-index:9999;background:rgba(255,255,255,0.95);backdrop-filter:blur(8px);border-bottom:1px solid #e5e7eb;height:64px;transform:translateZ(0)}
  main{padding-top:64px;min-height:calc(100vh - 64px);contain:layout}
  
  /* Critical button styles for above-the-fold */
  .btn{display:inline-flex;align-items:center;justify-content:center;border-radius:6px;font-weight:500;border:none;cursor:pointer;text-decoration:none;transition:transform 0.1s,background-color 0.2s;will-change:transform}
  .btn:hover{transform:translateY(-1px)}
  .btn-primary{background:#171717;color:#fff;padding:12px 24px}
  .btn-primary:hover{background:#262626}
  .btn-secondary{background:#f5f5f5;color:#171717;padding:12px 24px;border:1px solid #e5e5e5}
  .btn-secondary:hover{background:#f0f0f0}
  
  /* Essential layout utilities */
  .container{max-width:1200px;margin:0 auto;padding:0 1rem}
  .flex{display:flex}.grid{display:grid}.hidden{display:none}.block{display:block}
  .relative{position:relative}.absolute{position:absolute}.fixed{position:fixed}
  .w-full{width:100%}.h-full{height:100%}
  .items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}
  .text-center{text-align:center}
  .space-x-4>:not([hidden])~:not([hidden]){margin-left:1rem}
  .space-y-4>:not([hidden])~:not([hidden]){margin-top:1rem}
  .p-4{padding:1rem}.px-4{padding-left:1rem;padding-right:1rem}.py-4{padding-top:1rem;padding-bottom:1rem}
  
  /* Critical typography */
  h1,h2,h3,h4,h5,h6{font-weight:600;line-height:1.25;margin:0;contain:layout}
  h1{font-size:clamp(1.875rem,4vw,3rem)}h2{font-size:clamp(1.5rem,3vw,2.25rem)}h3{font-size:1.5rem}
  p{margin:0;line-height:1.6}
  
  /* Loading states - Prevent CLS */
  .skeleton{background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:200% 100%;animation:skeleton 1.5s infinite ease-in-out}
  @keyframes skeleton{0%{background-position:200% 0}100%{background-position:-200% 0}}
  
  /* Responsive optimizations */
  @media (min-width:640px){.sm\\:flex{display:flex}.sm\\:hidden{display:none}.container{padding:0 1.5rem}}
  @media (min-width:768px){.md\\:flex{display:flex}.md\\:hidden{display:none}}
  @media (min-width:1024px){.lg\\:flex{display:flex}.lg\\:hidden{display:none}.container{padding:0 2rem}}
  
  /* Dark mode critical styles */
  @media (prefers-color-scheme:dark){
    body{background:#0a0a0a;color:#fafafa}
    header{background:rgba(10,10,10,0.95);border-bottom-color:#262626}
    .btn-secondary{background:#262626;color:#fafafa;border-color:#404040}
    .btn-secondary:hover{background:#404040}
  }
  
  /* Performance optimizations */
  img,picture,video,canvas,svg{max-width:100%;height:auto}
  [loading="lazy"]{content-visibility:auto}
  
  /* Reduced motion */
  @media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:0.01ms!important;transition-duration:0.01ms!important;scroll-behavior:auto!important}}
  
  /* Font loading optimization */
  @font-face{font-family:'Inter Variable';font-style:normal;font-weight:100 900;font-display:swap;src:url('/fonts/inter-var-latin.woff2') format('woff2-variations');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
  
  /* Above-the-fold optimizations */
  .hero{min-height:50vh;display:flex;align-items:center;justify-content:center;text-align:center}
  .fade-in{opacity:0;transform:translateY(20px);animation:fadeIn 0.6s ease-out forwards}
  @keyframes fadeIn{to{opacity:1;transform:translateY(0)}}
`

export function CriticalCSS() {
  useEffect(() => {
    // Mark critical styles loaded for performance tracking
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark('critical-css-loaded')
    }

    // Load non-critical CSS after initial paint
    const loadNonCriticalCSS = () => {
      // Check if Tailwind CSS is already loaded
      if (!document.querySelector('link[href*="tailwind"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = '/_next/static/css/app/layout.css' // Next.js generated CSS
        link.media = 'print'
        link.onload = function() {
          (this as HTMLLinkElement).media = 'all'
          if (typeof window !== 'undefined' && 'performance' in window) {
            performance.mark('non-critical-css-loaded')
          }
        }
        document.head.appendChild(link)
      }
    }

    // Use requestIdleCallback for better performance
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadNonCriticalCSS, { timeout: 2000 })
    } else {
      setTimeout(loadNonCriticalCSS, 100)
    }

    // Font loading optimization
    const optimizeFontLoading = () => {
      if ('fonts' in document && 'FontFace' in window) {
        const interFont = new FontFace('Inter Variable', 'url(/fonts/inter-var-latin.woff2)', {
          weight: '100 900',
          display: 'swap',
          unicodeRange: 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
        })

        interFont.load().then(font => {
          document.fonts.add(font)
          document.documentElement.classList.add('fonts-loaded')
          if (typeof window !== 'undefined' && 'performance' in window) {
            performance.mark('fonts-loaded')
          }
        }).catch(error => {
          console.warn('Font loading failed:', error)
        })
      }
    }

    optimizeFontLoading()

    // Add performance observer for monitoring
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'mark' && process.env.NODE_ENV === 'development') {
            console.log(`Performance mark: ${entry.name} at ${entry.startTime.toFixed(2)}ms`)
          }
        })
      })
      observer.observe({ entryTypes: ['mark'] })
    }
  }, [])

  return (
    <>
      {/* Enhanced Critical CSS inline */}
      <style 
        id="critical-css"
        dangerouslySetInnerHTML={{ __html: ENHANCED_CRITICAL_CSS }} 
      />
      
      {/* Resource hints for performance */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
    </>
  )
}

export default CriticalCSS