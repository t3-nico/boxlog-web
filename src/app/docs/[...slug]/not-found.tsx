import { Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        <div className="text-9xl font-bold text-neutral-200 dark:text-neutral-800 mb-4">
          404
        </div>
        
        <Heading as="h2" size="xl" className="mb-4">
          Page Not Found
        </Heading>
        
        <Text variant="muted" className="mb-8">
          The documentation page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </Text>
        
        <Button asChild className="w-full">
          <Link href="/">
            Go home
          </Link>
        </Button>
      </div>
    </div>
  )
}