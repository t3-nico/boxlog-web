import { Container } from '@/components/ui/container'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'

interface TermsPageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'legal' })

  return {
    title: t('terms.title'),
    description: t('terms.description'),
    robots: 'index, follow',
    openGraph: {
      title: t('terms.title'),
      description: t('terms.description'),
      type: 'website',
    },
  }
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'legal' })

  return (
    <main className="min-h-screen bg-background">
      <Container className="py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">
              {t('terms.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('terms.lastUpdated')}: 2025年8月5日
            </p>
          </div>

          {/* Terms Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                1. サービスの利用について
              </h2>
              <p className="mb-4">
                BoxLogサービス（以下「本サービス」）をご利用いただき、ありがとうございます。
                本利用規約（以下「本規約」）は、BoxLog株式会社（以下「当社」）が提供する本サービスの利用条件を定めるものです。
              </p>
              <p className="mb-4">
                本サービスをご利用になる場合には、本規約に同意していただく必要があります。
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                2. アカウント登録
              </h2>
              <p className="mb-4">
                本サービスの一部機能を利用するためには、アカウント登録が必要です。
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>登録情報は常に最新の状態に保ってください</li>
                <li>アカウント情報の管理は利用者の責任において行ってください</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                5. プライバシー
              </h2>
              <p className="mb-4">
                個人情報の取り扱いについては、
                <Link href="/legal/privacy" className="text-primary hover:underline">
                  プライバシーポリシー
                </Link>
                をご確認ください。
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                10. お問い合わせ
              </h2>
              <p className="mb-4">
                本規約に関するご質問は、
                <Link href="/contact" className="text-primary hover:underline">
                  お問い合わせページ
                </Link>
                よりご連絡ください。
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  )
}
