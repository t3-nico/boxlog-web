import { Button } from '@/components/ui/button';
import { Heading, Text } from '@/components/ui/typography';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import Link from 'next/link';

export default async function NotFound() {
  // Try to get locale from headers or fallback to 'en'
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const locale = pathname.split('/')[1] || 'en';
  const t = await getTranslations({ locale, namespace: 'errors' });

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-4 text-9xl font-bold text-neutral-200 dark:text-neutral-800">404</div>

        <Heading as="h2" size="xl" className="mb-4">
          {t('notFound.title')}
        </Heading>

        <Text variant="muted" className="mb-8">
          {t('notFound.description')}
        </Text>

        <Button asChild className="w-full">
          <Link href={`/${locale}`}>{t('notFound.goHome')}</Link>
        </Button>
      </div>
    </div>
  );
}
