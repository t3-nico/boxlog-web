import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { getDictionary } from '@/lib/i18n'
import { generateSEOMetadata } from '@/lib/metadata'

interface PageProps {
  params: {
    locale: string
  }
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'jp' }]
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params
  const dict = await getDictionary(locale as 'en' | 'jp')

  return generateSEOMetadata({
    title: dict.pages.contact.title,
    description: dict.pages.contact.subtitle,
    url: `/${locale}/contact`,
    locale: locale,
    keywords:
      locale === 'jp'
        ? ['お問い合わせ', 'サポート', 'ヘルプ', '質問', 'カスタマーサービス']
        : ['contact', 'support', 'help', 'inquiry', 'customer service'],
    type: 'website',
  })
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = params
  const dict = await getDictionary(locale as 'en' | 'jp')

  return (
    <div className="min-h-screen">
      <section className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h1" size="4xl" className="mb-6">
              {dict.pages.contact.title}
            </Heading>
            <Text size="xl" variant="muted">
              {dict.pages.contact.subtitle}
            </Text>
          </div>
        </Container>
      </section>
    </div>
  )
}
