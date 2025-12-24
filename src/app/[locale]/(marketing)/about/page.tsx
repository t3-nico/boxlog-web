import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { generateSEOMetadata } from '@/lib/metadata'
import { Heart, Lightbulb, Shield, Sparkles, Target, Users } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

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
    title: t('about.title'),
    description: t('about.subtitle'),
    url: `/${locale}/about`,
    locale: locale,
    keywords:
      locale === 'ja'
        ? ['概要', '会社', 'チーム', 'ミッション', 'ビジョン', '価値観', 'SaaSプラットフォーム']
        : ['about', 'company', 'team', 'mission', 'vision', 'values', 'SaaS platform'],
    type: 'website',
  })
}

const valueIcons = {
  customerFirst: Heart,
  innovation: Lightbulb,
  transparency: Shield,
  excellence: Sparkles,
}

const valueKeys = ['customerFirst', 'innovation', 'transparency', 'excellence'] as const

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'marketing' })

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Heading as="h1" size="4xl" className="mb-6">
              {t('about.hero.title')}
            </Heading>
            <Text size="xl" variant="muted" className="mx-auto mb-10 max-w-2xl">
              {t('about.hero.description')}
            </Text>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">{t('about.hero.contactButton')}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/features">{t('about.cta.featuresButton')}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-muted/30 py-24">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
            {/* Mission */}
            <div className="bg-background rounded-2xl p-8 shadow-sm">
              <div className="bg-primary/10 mb-6 inline-flex size-14 items-center justify-center rounded-xl">
                <Target className="text-primary size-7" />
              </div>
              <Heading as="h2" size="2xl" className="mb-4">
                {t('about.mission.title')}
              </Heading>
              <Text size="lg" className="text-primary mb-4 font-semibold">
                {t('about.mission.content')}
              </Text>
              <Text variant="muted" className="leading-relaxed">
                {t('about.mission.description')}
              </Text>
            </div>

            {/* Vision */}
            <div className="bg-background rounded-2xl p-8 shadow-sm">
              <div className="bg-primary/10 mb-6 inline-flex size-14 items-center justify-center rounded-xl">
                <Users className="text-primary size-7" />
              </div>
              <Heading as="h2" size="2xl" className="mb-4">
                {t('about.vision.title')}
              </Heading>
              <Text size="lg" className="text-primary mb-4 font-semibold">
                {t('about.vision.content')}
              </Text>
              <Text variant="muted" className="leading-relaxed">
                {t('about.vision.description')}
              </Text>
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Heading as="h2" size="3xl" className="mb-4">
              {t('about.values.title')}
            </Heading>
            <Text size="lg" variant="muted" className="mb-16">
              {t('about.values.subtitle')}
            </Text>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
            {valueKeys.map((key) => {
              const Icon = valueIcons[key]
              return (
                <Card key={key} className="border-border/50 text-center transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="bg-primary/10 mx-auto mb-4 inline-flex size-14 items-center justify-center rounded-xl">
                      <Icon className="text-primary size-7" />
                    </div>
                    <CardTitle className="text-lg">{t(`about.values.items.${key}.title`)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">
                      {t(`about.values.items.${key}.description`)}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <Container>
          <div className="bg-primary mx-auto max-w-4xl rounded-2xl px-8 py-16 text-center">
            <Heading as="h2" size="3xl" className="text-primary-foreground mb-4">
              {t('about.cta.title')}
            </Heading>
            <Text size="lg" className="text-primary-foreground/80 mx-auto mb-8 max-w-2xl">
              {t('about.cta.description')}
            </Text>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary bg-white hover:bg-white/90"
                asChild
              >
                <Link href="/contact">{t('about.cta.startButton')}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/features">{t('about.cta.featuresButton')}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
