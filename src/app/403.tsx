import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/metadata'
import { Shield } from 'lucide-react'

export const metadata = generateSEOMetadata({
  title: 'Access Forbidden - 403 Error',
  description: 'You do not have permission to access this resource. Please check your credentials or contact support.',
  url: '/403',
  noindex: true,
})

export default function Forbidden() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto text-center">
          {/* 403 illustration */}
          <div className="w-24 h-24 bg-yellow-50 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Shield className="w-12 h-12 text-yellow-500" />
          </div>
          
          <Heading as="h1" size="4xl" className="mb-4">
            403
          </Heading>
          
          <Heading as="h2" size="xl" className="mb-4">
            Access Forbidden
          </Heading>
          
          <Text variant="muted" className="mb-8">
            You don&apos;t have permission to access this resource. 
            Please check your credentials or contact support if you believe this is an error.
          </Text>
          
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/">
                Go back home
              </Link>
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">
                  Sign In
                </Link>
              </Button>
              
              <Button variant="outline" size="sm" asChild>
                <Link href="/contact">
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Access help section */}
          <div className="mt-8 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <Text size="sm" variant="muted" className="mb-3">
              Need access?
            </Text>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/pricing">View Plans</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/docs">Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}