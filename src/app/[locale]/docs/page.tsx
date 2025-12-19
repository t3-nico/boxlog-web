import { Button } from '@/components/ui/button'
import { Heading, Text } from '@/components/ui/typography'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { generateSEOMetadata } from '@/lib/metadata'
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
  const t = await getTranslations({ locale, namespace: 'common' })

  return generateSEOMetadata({
    title: t('navigation.docs'),
    description: locale === 'ja' ? 'ドキュメントとガイド' : 'Documentation and guides',
    url: `/${locale}/docs`,
    locale: locale,
    keywords:
      locale === 'ja'
        ? ['ドキュメント', 'API', 'ガイド', 'チュートリアル', 'SaaS', '開発']
        : ['documentation', 'API', 'guides', 'tutorials', 'SaaS', 'development'],
    type: 'website',
  })
}

export default async function DocsPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'common' })

  const isJa = locale === 'ja'

  return (
    <div className="bg-background min-h-screen space-y-12 py-12">
      {/* Header Section */}
      <div className="space-y-4">
        <Heading as="h1" size="4xl" className="text-foreground">
          {t('navigation.docs')}
        </Heading>
        <Text size="xl" variant="muted" className="max-w-3xl">
          {isJa
            ? 'ドキュメントとガイドでBoxLogを始めましょう'
            : 'Get started with BoxLog using our documentation and guides'}
        </Text>
      </div>

      {/* Quick Start Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="border-border bg-card hover:border-foreground rounded-lg border p-6 transition-colors">
          <div className="mb-4 flex items-center space-x-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <svg className="text-primary h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <Heading as="h3" size="lg">
              {isJa ? 'クイックスタート' : 'Quick Start'}
            </Heading>
          </div>
          <Text variant="muted" className="mb-4">
            {isJa ? '数分でBoxLogを始めましょう' : 'Get started with BoxLog in minutes'}
          </Text>
          <Link href="/docs/quick-start" className="text-primary hover:text-primary/80 font-medium">
            {isJa ? 'ガイドを読む →' : 'Read guide →'}
          </Link>
        </div>

        <div className="border-border bg-card hover:border-foreground rounded-lg border p-6 transition-colors">
          <div className="mb-4 flex items-center space-x-3">
            <div className="bg-success/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <svg className="text-success h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <Heading as="h3" size="lg">
              {isJa ? 'APIリファレンス' : 'API Reference'}
            </Heading>
          </div>
          <Text variant="muted" className="mb-4">
            {isJa ? 'APIドキュメントを探索する' : 'Explore our API documentation'}
          </Text>
          <Link href="/docs/api" className="text-primary hover:text-primary/80 font-medium">
            {isJa ? 'ドキュメントを見る →' : 'View docs →'}
          </Link>
        </div>

        <div className="border-border bg-card hover:border-foreground rounded-lg border p-6 transition-colors">
          <div className="mb-4 flex items-center space-x-3">
            <div className="bg-info/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <svg className="text-info h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <Heading as="h3" size="lg">
              {isJa ? 'ガイド' : 'Guides'}
            </Heading>
          </div>
          <Text variant="muted" className="mb-4">
            {isJa ? 'ステップバイステップのチュートリアル' : 'Step-by-step tutorials'}
          </Text>
          <Link href="/docs/guides" className="text-primary hover:text-primary/80 font-medium">
            {isJa ? 'ガイドを見る →' : 'Browse guides →'}
          </Link>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-muted rounded-lg p-8 text-center">
        <Heading as="h2" size="xl" className="text-foreground mb-4">
          {isJa ? 'お困りですか？' : 'Need Help?'}
        </Heading>
        <Text variant="muted" className="mx-auto mb-6 max-w-2xl">
          {isJa
            ? 'ドキュメントで答えが見つからない場合は、お気軽にお問い合わせください。'
            : "Can't find what you're looking for? Reach out to us."}
        </Text>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button variant="outline" asChild>
            <Link href="/docs/faq">{isJa ? 'よくある質問' : 'FAQ'}</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">{t('navigation.contact')}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
