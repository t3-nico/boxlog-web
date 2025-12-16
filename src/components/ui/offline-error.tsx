'use client'

import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { WifiOff } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface OfflineErrorProps {
  onRetry?: () => void
  className?: string
}

export function OfflineError({ onRetry, className }: OfflineErrorProps) {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleRetry = () => {
    if (isOnline && onRetry) {
      onRetry()
    } else if (isOnline) {
      window.location.reload()
    }
  }

  return (
    <div
      className={`min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center ${className}`}
    >
      <Container>
        <div className="max-w-md mx-auto text-center">
          {/* Offline illustration */}
          <div className="w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-8">
            <WifiOff className="w-12 h-12 text-neutral-500" />
          </div>

          <Heading as="h1" size="2xl" className="mb-4">
            {isOnline ? 'Network Error' : "You're Offline"}
          </Heading>

          <Text variant="muted" className="mb-8">
            {isOnline
              ? 'Unable to connect to our servers. Please check your connection and try again.'
              : 'Check your internet connection and try again.'}
          </Text>

          <div className="space-y-4">
            <Button
              onClick={handleRetry}
              className="w-full"
              disabled={!isOnline}
            >
              {isOnline ? 'Try again' : 'Waiting for connection...'}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => (window.location.href = '/')}
              className="w-full"
            >
              Go to homepage
            </Button>
          </div>

          {/* Connection status */}
          <div className="mt-8 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <div className="flex items-center justify-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
              />
              <Text size="sm" variant="muted">
                {isOnline ? 'Connection restored' : 'No internet connection'}
              </Text>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

// Full page offline error component
export default function OfflineErrorPage() {
  return <OfflineError />
}
