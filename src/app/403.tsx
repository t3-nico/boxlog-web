import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/metadata'

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
          <div className="text-9xl font-bold text-neutral-200 dark:text-neutral-800 mb-4">
            403
          </div>
          
          <Heading as="h2" size="xl" className="mb-4">
            Access Forbidden
          </Heading>
          
          <Text variant="muted" className="mb-8">
            You don&apos;t have permission to access this resource. 
            Please check your credentials or contact support if you believe this is an error.
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