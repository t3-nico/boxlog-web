'use client'

import { useEffect } from 'react'
import { Container } from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui/Typography'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto text-center">
          {/* Error icon */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600" />
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