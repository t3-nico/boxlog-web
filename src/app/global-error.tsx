'use client'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
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
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-900">
          <Container>
            <div className="mx-auto max-w-md text-center">
              <div className="mb-4 text-9xl font-bold text-neutral-200 dark:text-neutral-800">!</div>

              <Heading as="h2" size="xl" className="mb-4">
                Something went wrong
              </Heading>

              <Text variant="muted" className="mb-8">
                An unexpected error occurred. This has been automatically reported to our team and we&apos;re working to
                fix it.
              </Text>

              <div className="space-y-4">
                <Button onClick={reset} className="w-full">
                  Try again
                </Button>

                <Button variant="outline" className="w-full" onClick={() => (window.location.href = '/')}>
                  Go home
                </Button>
              </div>

              {/* Error details for development */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-8 rounded-lg bg-neutral-100 p-4 text-left dark:bg-neutral-800">
                  <Text size="sm" variant="muted" className="mb-2 block">
                    Development Error Details:
                  </Text>
                  <pre className="overflow-auto text-xs text-red-600 dark:text-red-400">{error.message}</pre>
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
