import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/metadata'
import { AlertTriangle } from 'lucide-react'

export const metadata = generateSEOMetadata({
  title: 'Internal Server Error - 500 Error',
  description: 'An internal server error occurred. Our team has been notified and is working to resolve the issue.',
  url: '/500',
  noindex: true,
})

export default function InternalServerError() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto text-center">
          {/* 500 illustration */}
          <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
          
          <Heading as="h1" size="4xl" className="mb-4">
            500
          </Heading>
          
          <Heading as="h2" size="xl" className="mb-4">
            Internal Server Error
          </Heading>
          
          <Text variant="muted" className="mb-8">
            Something went wrong on our end. Our team has been automatically notified 
            and is working to fix this issue.
          </Text>
          
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/">
                Go back home
              </Link>
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/blog">
                  Browse Blog
                </Link>
              </Button>
              
              <Button variant="outline" size="sm" asChild>
                <Link href="/docs">
                  Documentation
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Help section */}
          <div className="mt-8 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <Text size="sm" variant="muted" className="mb-3">
              Need immediate help?
            </Text>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/status">System Status</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}