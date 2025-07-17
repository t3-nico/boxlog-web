'use client'

import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import { useEffect } from 'react'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to your error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
          <Container>
            <div className="max-w-md mx-auto text-center">
              {/* Error illustration */}
              <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <AlertTriangle className="w-12 h-12 text-red-500" />
              </div>
              
              <Heading as="h1" size="4xl" className="mb-4">
                Oops!
              </Heading>
              
              <Heading as="h2" size="xl" className="mb-4">
                Something went wrong
              </Heading>
              
              <Text variant="muted" className="mb-8">
                An unexpected error occurred. This has been automatically reported 
                to our team and we&apos;re working to fix it.
              </Text>
              
              <div className="space-y-4">
                <Button onClick={reset} className="w-full">
                  Try again
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => window.location.href = '/'}
                  >
                    Go home
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => window.location.reload()}
                  >
                    Refresh page
                  </Button>
                </div>
              </div>
              
              {/* Error details for development */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-8 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-left">
                  <Text size="sm" variant="muted" className="mb-2 block">
                    Development Error Details:
                  </Text>
                  <pre className="text-xs text-red-600 dark:text-red-400 overflow-auto">
                    {error.message}
                  </pre>
                  {error.digest && (
                    <Text size="xs" variant="muted" className="mt-2 block">
                      Error ID: {error.digest}
                    </Text>
                  )}
                </div>
              )}
            </div>
          </Container>
        </div>
      </body>
    </html>
  )
}