import { Container, Heading, Text, Button } from '@/components/ui'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/metadata'
import { FileQuestion } from 'lucide-react'

export const metadata = generateSEOMetadata({
  title: 'Page Not Found - 404 Error',
  description: 'The page you are looking for could not be found. Return to our homepage or browse our available content.',
  url: '/404',
  noindex: true,
})

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto text-center">
          {/* 404 illustration */}
          <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-8">
            <FileQuestion className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          
          <Heading as="h1" size="4xl" className="mb-4">
            404
          </Heading>
          
          <Heading as="h2" size="xl" className="mb-4">
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
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Text size="sm" variant="muted" className="mb-3">
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