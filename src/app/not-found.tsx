import { Container, Heading, Text, Button } from '@/components/ui'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/metadata'

export const metadata = generateSEOMetadata({
  title: 'Page Not Found - 404 Error',
  description: 'The page you are looking for could not be found. Return to our homepage or browse our available content.',
  url: '/404',
  noindex: true,
})

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto text-center">
          {/* 404 illustration */}
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          <Heading as="h1" size="4xl" className="mb-4 text-gray-900">
            404
          </Heading>
          
          <Heading as="h2" size="xl" className="mb-4 text-gray-700">
            Page Not Found
          </Heading>
          
          <Text variant="muted" className="mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
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
          
          {/* Popular links */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <Text size="sm" className="text-gray-600 mb-3">
              Popular pages:
            </Text>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/features">Features</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/pricing">Pricing</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/releases">Releases</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}