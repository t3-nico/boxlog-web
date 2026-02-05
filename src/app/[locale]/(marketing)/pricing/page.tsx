import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Heading, Text } from '@/components/ui/typography';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { generateSEOMetadata } from '@/lib/metadata';
import { Check, Clock, HeadphonesIcon, Shield } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ISR: マーケティングページは1時間ごとに再検証
export const revalidate = 3600;

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

const planKeys = ['starter', 'pro', 'enterprise'] as const;

const trustIndicatorIcons = {
  trial: Clock,
  security: Shield,
  support: HeadphonesIcon,
};

const trustIndicatorKeys = ['trial', 'security', 'support'] as const;

export default async function PricingPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'marketing' });

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Heading as="h1" size="4xl" className="mb-6">
              {t('pricing.hero.title')}
            </Heading>
            <Text size="xl" variant="muted" className="mx-auto mb-4 max-w-2xl">
              {t('pricing.hero.subtitle')}
            </Text>
            <Text size="lg" variant="muted">
              {t('pricing.hero.description')}{' '}
              <span className="text-primary font-bold">{t('pricing.hero.trialNote')}</span>
            </Text>
          </div>
        </Container>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            {planKeys.map((planKey) => {
              const isPopular = planKey === 'pro';
              const features = t.raw(`pricing.plans.${planKey}.features`) as string[];

              return (
                <Card
                  key={planKey}
                  className={`relative flex flex-col ${isPopular ? 'border-primary ring-primary/20 shadow-lg ring-2' : 'border-border'}`}
                >
                  {isPopular && (
                    <Badge className="bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2">
                      {t(`pricing.plans.${planKey}.popular`)}
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{t(`pricing.plans.${planKey}.name`)}</CardTitle>
                    <CardDescription className="mt-2">
                      {t(`pricing.plans.${planKey}.description`)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-8 text-center">
                      <span className="text-4xl font-bold">
                        {t(`pricing.plans.${planKey}.price`)}
                      </span>
                      <span className="text-muted-foreground">
                        {t(`pricing.plans.${planKey}.period`)}
                      </span>
                    </div>
                    <ul className="space-y-4">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-4">
                          <Check className="text-primary mt-1 size-5 shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={isPopular ? 'primary' : 'outline'}
                      size="lg"
                      asChild
                    >
                      <Link href="/contact">{t(`pricing.plans.${planKey}.cta`)}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Trust Indicators */}
      <section className="bg-muted py-16">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {trustIndicatorKeys.map((key) => {
              const Icon = trustIndicatorIcons[key];
              return (
                <div key={key} className="text-center">
                  <div className="bg-muted mx-auto mb-4 inline-flex size-12 items-center justify-center rounded-full">
                    <Icon className="text-primary size-6" />
                  </div>
                  <Heading as="h3" size="lg" className="mb-2">
                    {t(`pricing.trustIndicators.${key}.title`)}
                  </Heading>
                  <Text variant="muted">{t(`pricing.trustIndicators.${key}.description`)}</Text>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <Container>
          <div className="bg-primary mx-auto max-w-4xl rounded-2xl px-8 py-16 text-center">
            <Heading as="h2" size="3xl" className="text-primary-foreground mb-4">
              {t('pricing.cta.title')}
            </Heading>
            <Text size="lg" className="text-primary-foreground/80 mx-auto mb-8 max-w-2xl">
              {t('pricing.cta.description')}
            </Text>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary bg-white hover:bg-white/90"
                asChild
              >
                <Link href="/contact">{t('pricing.cta.startButton')}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/contact">{t('pricing.cta.salesButton')}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
