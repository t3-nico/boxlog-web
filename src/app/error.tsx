'use client'

import { useEffect } from 'react'
import { Container, Heading, Text, Button } from '@/components/ui'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    }, [error])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto text-center">
          {/* Error icon */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <Heading as="h1" size="2xl" className="mb-4 text-gray-900">
            Something went wrong
          </Heading>
          
          <Text variant="muted" className="mb-8">
            We encountered an unexpected error. Please try again or contact support if the problem persists.
          </Text>
          
          <div className="space-y-4">
            <Button onClick={reset} className="w-full">
              Try again
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <a href="/">
                Go back home
              </a>
            </Button>
          </div>
          
          {/* Error details for development */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-8 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                Error details (dev only)
              </summary>
              <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
                {error.message}
                {error.stack && (
                  <>
                    {'\n\n'}
                    {error.stack}
                  </>
                )}
              </pre>
            </details>
          )}
        </div>
      </Container>
    </div>
  )
}