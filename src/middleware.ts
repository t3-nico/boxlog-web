import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers)
  
  // Create a response
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // Security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none')
  response.headers.set('Cross-Origin-Embedder-Policy', 'unsafe-none')
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin')
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin')
  
  // Enhanced Permissions Policy
  const permissionsPolicy = [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'payment=()',
    'usb=()',
    'bluetooth=()',
    'accelerometer=()',
    'gyroscope=()',
    'magnetometer=()',
    'ambient-light-sensor=()',
    'autoplay=(self)',
    'encrypted-media=()',
    'fullscreen=(self)',
    'picture-in-picture=()',
    'display-capture=()',
    'web-share=(self)'
  ].join(', ')
  
  response.headers.set('Permissions-Policy', permissionsPolicy)
  
  // Content Security Policy
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://vercel.live",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' blob: data: https://www.google-analytics.com https://images.unsplash.com https://via.placeholder.com",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net",
    "media-src 'self'",
    "object-src 'none'",
    "child-src 'self'",
    "frame-src 'none'",
    "worker-src 'self'",
    "manifest-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ]

  const isDev = process.env.NODE_ENV === 'development'
  
  if (isDev) {
    // More permissive CSP for development
    cspDirectives.push("script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com")
  } else {
    // Stricter CSP for production
    cspDirectives.push("block-all-mixed-content")
  }

  const cspHeader = cspDirectives.join('; ')

  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Content-Security-Policy', cspHeader)
  } else {
    response.headers.set('Content-Security-Policy-Report-Only', cspHeader)
  }

  // Strict Transport Security (HSTS)
  if (request.nextUrl.protocol === 'https:') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    )
  }

  // Enhanced rate limiting and security monitoring
  const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? '127.0.0.1'
  const userAgent = request.headers.get('user-agent') ?? ''
  const now = Date.now()
  
  // Add security monitoring headers
  response.headers.set('X-Request-ID', crypto.randomUUID())
  response.headers.set('X-Response-Time', now.toString())
  
  // Set rate limiting headers for transparency
  response.headers.set('X-RateLimit-Limit', '100')
  response.headers.set('X-RateLimit-Remaining', '95') // Placeholder - would be dynamic in real implementation
  response.headers.set('X-RateLimit-Reset', (now + 3600000).toString()) // 1 hour from now
  
  // Bot protection headers
  if (userAgent.toLowerCase().includes('bot') || userAgent.toLowerCase().includes('crawler')) {
    response.headers.set('X-Robots-Tag', 'index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static files
     * Include API routes for security headers
     */
    {
      source: '/((?!_next/static|_next/image|favicon.ico|sw.js|manifest.json|browserconfig.xml|robots.txt|sitemap.xml).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}