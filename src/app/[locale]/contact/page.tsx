import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { generateSEOMetadata } from '@/lib/metadata'

interface PageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'marketing' })

  return generateSEOMetadata({
    title: t('contact.title'),
    description: t('contact.subtitle'),
    url: `/${locale}/contact`,
    locale: locale,
    keywords: locale === 'ja'
      ? ['お問い合わせ', 'サポート', 'ヘルプ', '質問', 'カスタマーサービス']
      : ['contact', 'support', 'help', 'inquiry', 'customer service'],
    type: 'website'
  })
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'marketing' })

  return (
    <div className="min-h-screen">
      <section className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h1" size="4xl" className="mb-6">
              {t('contact.title')}
            </Heading>
            <Text size="xl" variant="muted">
              {t('contact.subtitle')}
            </Text>
          </div>
        </Container>
      </section>
    </div>
  )
}
