import { Button } from '@/components/ui/button'
import { getDictionary } from '@/lib/i18n'
import { generateSEOMetadata } from '@/lib/metadata'
import Link from 'next/link'
import type { Metadata } from 'next'

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
    title: dict.pages.home.title,
    description: dict.pages.home.subtitle,
    url: `/${locale}`,
    locale: locale,
    keywords:
      locale === 'jp'
        ? [
            'SaaS',
            'プラットフォーム',
            'ビジネス',
            '生産性',
            '自動化',
            'Next.js',
            'TypeScript',
          ]
        : [
            'SaaS',
            'platform',
            'business',
            'productivity',
            'automation',
            'Next.js',
            'TypeScript',
          ],
    type: 'website',
  })
}

export default async function Home({ params }: PageProps) {
  const { locale } = params
  const dict = await getDictionary(locale as 'en' | 'jp')

  return (
    <div className="bg-background">
      <div className="relative isolate">
        {/* Background gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/30 to-primary/10 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        {/* Hero content */}
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
                {dict.pages.home.title}
              </h1>
              <p className="mt-8 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
                {dict.pages.home.subtitle}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button size="lg" asChild>
                  <Link href={`/${locale}/contact`}>
                    {dict.pages.home.cta || 'Get started'}
                  </Link>
                </Button>
                <Button variant="ghost" size="lg" asChild>
                  <Link href={`/${locale}/about`}>
                    {dict.common.learnMore || 'Learn more'}{' '}
                    <span aria-hidden="true">→</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Screenshot */}
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-muted/50 p-2 ring-1 ring-inset ring-border lg:-m-4 lg:rounded-2xl lg:p-4">
                <div className="relative aspect-[16/9] w-full rounded-md bg-muted shadow-2xl ring-1 ring-border">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">
                      App Screenshot Placeholder
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary/30 to-primary/10 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  )
}
