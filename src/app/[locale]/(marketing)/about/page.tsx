import { Container } from '@/components/ui/container';
import { Heading, Text } from '@/components/ui/typography';
import { routing } from '@/i18n/routing';
import { generateSEOMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'marketing' });

  return generateSEOMetadata({
    title: t('about.title'),
    description: t('about.subtitle'),
    url: `/${locale}/about`,
    locale: locale,
    keywords:
      locale === 'ja'
        ? ['概要', '会社', 'チーム', 'ミッション', 'ビジョン', '価値観', 'SaaSプラットフォーム']
        : ['about', 'company', 'team', 'mission', 'vision', 'values', 'SaaS platform'],
    type: 'website',
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'marketing' });

  return (
    <div className="bg-background min-h-screen">
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Heading as="h1" size="4xl" className="mb-6">
              {t('about.title')}
            </Heading>
            <Text size="xl" variant="muted">
              {t('about.subtitle')}
            </Text>
          </div>
        </Container>
      </section>
    </div>
  );
}
