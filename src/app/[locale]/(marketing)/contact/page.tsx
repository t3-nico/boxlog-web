import { Container } from '@/components/ui/container';
import { routing } from '@/i18n/routing';
import { generateSEOMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactForm } from './contact-form';

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
    title: t('contact.title'),
    description: t('contact.subtitle'),
    url: `/${locale}/contact`,
    locale: locale,
    keywords:
      locale === 'ja'
        ? ['お問い合わせ', 'サポート', 'ヘルプ', '質問', 'カスタマーサービス']
        : ['contact', 'support', 'help', 'inquiry', 'customer service'],
    type: 'website',
  });
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'marketing' });

  return (
    <div className="bg-background">
      <section className="py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-foreground mb-6 text-4xl font-semibold tracking-tight sm:text-5xl">
              {t('contact.title')}
            </h1>
            <p className="text-muted-foreground mb-10 text-lg sm:text-xl">
              {t('contact.subtitle')}
            </p>
            <div className="bg-card border-border w-full rounded-2xl border p-6 text-left shadow-sm md:p-8">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
