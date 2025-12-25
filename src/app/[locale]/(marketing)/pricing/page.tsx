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
    title: t('pricing.title'),
    description: t('pricing.subtitle'),
    url: `/${locale}/pricing`,
    locale: locale,
    keywords:
      locale === 'ja'
        ? ['料金', 'プラン', 'サブスクリプション', 'SaaS料金', 'チームプラン', 'エンタープライズ']
        : ['pricing', 'plans', 'subscription', 'SaaS pricing', 'team plans', 'enterprise'],
    type: 'website',
  });
}

export default async function PricingPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'marketing' });

  return (
    <div className="bg-background min-h-screen">
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Heading as="h1" size="4xl" className="mb-6">
              {t('pricing.title')}
            </Heading>
            <Text size="xl" variant="muted">
              {t('pricing.subtitle')}
            </Text>
          </div>
        </Container>
      </section>
    </div>
  );
}
