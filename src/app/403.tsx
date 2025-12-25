import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Heading, Text } from '@/components/ui/typography';
import { generateSEOMetadata } from '@/lib/metadata';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Access Forbidden - 403 Error',
  description:
    'You do not have permission to access this resource. Please check your credentials or contact support.',
  url: '/403',
  noindex: true,
});

export default function Forbidden() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <div className="mb-4 text-9xl font-bold text-neutral-200 dark:text-neutral-800">403</div>

          <Heading as="h2" size="xl" className="mb-4">
            Access Forbidden
          </Heading>

          <Text variant="muted" className="mb-8">
            You don&apos;t have permission to access this resource. Please check your credentials or
            contact support if you believe this is an error.
          </Text>

          <Button asChild className="w-full">
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
