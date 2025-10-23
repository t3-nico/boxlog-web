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
  return [
    { locale: 'en' },
    { locale: 'jp' }
  ]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = params
  const dict = await getDictionary(locale as 'en' | 'jp')

  return generateSEOMetadata({
    title: dict.common.about,
    description: locale === 'jp'
      ? '私たちのミッション、チーム、価値観について学んでください。誰もがより良い未来を築けるような技術を創造しています。'
      : 'Learn about our mission, team, and values. We create technology that empowers everyone to build a better future.',
    url: `/${locale}/about`,
    locale: locale,
    keywords: locale === 'jp'
      ? ['概要', '会社', 'チーム', 'ミッション', 'ビジョン', '価値観', 'SaaSプラットフォーム']
      : ['about', 'company', 'team', 'mission', 'vision', 'values', 'SaaS platform'],
    type: 'website'
  })
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = params
  const dict = await getDictionary(locale as 'en' | 'jp')

  return (
    <div className="min-h-screen">
      <section className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h1" size="4xl" className="mb-6">
              {dict.common.about}
            </Heading>
            <Text size="xl" variant="muted">
              {locale === 'jp'
                ? '私たちのミッション、チーム、価値観について学んでください。'
                : 'Learn about our mission, team, and values.'}
            </Text>
          </div>
        </Container>
      </section>
    </div>
  )
}
