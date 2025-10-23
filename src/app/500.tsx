import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/metadata'

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
          <div className="text-9xl font-bold text-neutral-200 dark:text-neutral-800 mb-4">
            500
          </div>
          
          <Heading as="h2" size="xl" className="mb-4">
            Internal Server Error
          </Heading>
          
          <Text variant="muted" className="mb-8">
            Something went wrong on our end. Our team has been automatically notified 
            and is working to fix this issue.
          </Text>
          
          <Button asChild className="w-full">
            <Link href="/">
              Go home
            </Link>
          </Button>
          
        </div>
      </Container>
    </div>
  )
}