import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <div className="text-9xl font-bold text-neutral-200 dark:text-neutral-800 mb-4">
            404
          </div>
          
          <Heading as="h2" size="xl" className="mb-4">
            Page Not Found
          </Heading>
          
          <Text variant="muted" className="mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
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