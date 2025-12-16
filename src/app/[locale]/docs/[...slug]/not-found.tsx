import { Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getDictionary } from '@/lib/i18n'
import { headers } from 'next/headers'

export default async function NotFound() {
  // Try to get locale from headers or fallback to 'en'
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || ''
  const locale = pathname.split('/')[1] || 'en'
  const dict = await getDictionary(locale as 'en' | 'jp')
  return (
    <div className="min-h-[60vh] bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        <div className="text-9xl font-bold text-neutral-200 dark:text-neutral-800 mb-4">
          404
        </div>

        <Heading as="h2" size="xl" className="mb-4">
          {dict.errors.notFound.title}
        </Heading>

        <Text variant="muted" className="mb-8">
          {dict.errors.notFound.description}
        </Text>

        <Button asChild className="w-full">
          <Link href={`/${locale}`}>{dict.errors.notFound.goHome}</Link>
        </Button>
      </div>
    </div>
  )
}
