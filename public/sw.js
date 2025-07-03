// Service Worker for performance optimization
const CACHE_NAME = 'yoursaas-v1'
const STATIC_CACHE = 'yoursaas-static-v1'
const DYNAMIC_CACHE = 'yoursaas-dynamic-v1'

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/offline.html',
  // Add critical CSS and JS files here
]

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first, then network
  CACHE_FIRST: 'cache-first',
  // Network first, then cache
  NETWORK_FIRST: 'network-first',
  // Stale while revalidate
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  // Network only
  NETWORK_ONLY: 'network-only',
  // Cache only
  CACHE_ONLY: 'cache-only'
}

// Route strategies
const ROUTE_STRATEGIES = {
  // Static assets (images, fonts, etc.)
  '/images/': CACHE_STRATEGIES.CACHE_FIRST,
  '/fonts/': CACHE_STRATEGIES.CACHE_FIRST,
  '/_next/static/': CACHE_STRATEGIES.CACHE_FIRST,
  
  // API routes
  '/api/': CACHE_STRATEGIES.NETWORK_FIRST,
  
  // Pages
  '/': CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
  '/blog': CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
  '/docs': CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
}

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== STATIC_CACHE && 
                     cacheName !== DYNAMIC_CACHE &&
                     cacheName !== CACHE_NAME
            })
            .map((cacheName) => caches.delete(cacheName))
        )
      })
      .then(() => {
        self.clients.claim()
      })
  )
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip chrome extension requests
  if (url.protocol === 'chrome-extension:') {
    return
  }

  // Determine cache strategy
  const strategy = getStrategyForUrl(url.pathname)
  
  event.respondWith(
    handleRequest(request, strategy)
  )
})

// Get cache strategy for URL
function getStrategyForUrl(pathname) {
  for (const [route, strategy] of Object.entries(ROUTE_STRATEGIES)) {
    if (pathname.startsWith(route)) {
      return strategy
    }
  }
  return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE
}

// Handle request based on strategy
async function handleRequest(request, strategy) {
  const cache = await caches.open(DYNAMIC_CACHE)
  
  switch (strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      return cacheFirst(request, cache)
    
    case CACHE_STRATEGIES.NETWORK_FIRST:
      return networkFirst(request, cache)
    
    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      return staleWhileRevalidate(request, cache)
    
    case CACHE_STRATEGIES.NETWORK_ONLY:
      return fetch(request)
    
    case CACHE_STRATEGIES.CACHE_ONLY:
      return cache.match(request)
    
    default:
      return staleWhileRevalidate(request, cache)
  }
}

// Cache first strategy
async function cacheFirst(request, cache) {
  const cachedResponse = await cache.match(request)
  
  if (cachedResponse) {
    return cachedResponse
  }
  
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    // Return offline page if available
    if (request.destination === 'document') {
      return cache.match('/offline.html')
    }
    throw error
  }
}

// Network first strategy
async function networkFirst(request, cache) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    const cachedResponse = await cache.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return offline page if available
    if (request.destination === 'document') {
      return cache.match('/offline.html')
    }
    
    throw error
  }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request, cache) {
  const cachedResponse = await cache.match(request)
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  }).catch(() => {
    // Silently fail network requests in background
  })
  
  return cachedResponse || fetchPromise
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  // Implement background sync logic
  console.log('Background sync triggered')
}