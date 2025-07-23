import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
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
  return [
    { locale: 'en' },
    { locale: 'jp' }
  ]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = params
  const dict = await getDictionary(locale as 'en' | 'jp')
  
  return generateSEOMetadata({
    title: dict.pages.home.title,
    description: dict.pages.home.subtitle,
    url: `/${locale}`,
    locale: locale,
    keywords: locale === 'jp' 
      ? ['SaaS', 'プラットフォーム', 'ビジネス', '生産性', '自動化', 'Next.js', 'TypeScript']
      : ['SaaS', 'platform', 'business', 'productivity', 'automation', 'Next.js', 'TypeScript'],
    type: 'website'
  })
}

export default async function Home({ params }: PageProps) {
  const { locale } = params
  const dict = await getDictionary(locale as 'en' | 'jp')
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-50 via-neutral-50 to-neutral-100 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-neutral-300 to-neutral-400 rounded-full blur-3xl opacity-20 dark:opacity-10"></div>
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full blur-3xl opacity-20 dark:opacity-10"></div>
        </div>
        
        <Container className="relative">
          <div className="flex flex-col items-center justify-center min-h-screen py-24 text-center">
            {/* Main Title */}
            <Heading 
              as="h1" 
              size="4xl" 
              className="mb-6 max-w-4xl leading-tight sm:text-5xl lg:text-6xl"
            >
              {dict.pages.home.title}
            </Heading>
            
            {/* Subtitle */}
            <Text 
              size="xl" 
              variant="muted" 
              className="mb-10 max-w-3xl leading-relaxed"
            >
              {dict.pages.home.subtitle}
            </Text>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow" asChild>
                <Link href="/signup">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {dict.pages.home.cta}
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-neutral-300 hover:border-neutral-400 bg-neutral-50/50 backdrop-blur-sm dark:border-neutral-600 dark:hover:border-neutral-500 dark:bg-neutral-900/50"
                asChild
              >
                <Link href="/demo">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {dict.common.learnMore}
                </Link>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-16 pt-8 border-t border-neutral-200/50 dark:border-neutral-700/50">
              <Text size="sm" variant="muted" className="mb-6">
                {locale === 'jp' ? '信頼される企業' : 'Trusted by teams at'}
              </Text>
              <div className="flex items-center justify-center gap-8 opacity-60">
                <div className="text-2xl font-bold text-neutral-400 dark:text-neutral-500">Company A</div>
                <div className="text-2xl font-bold text-neutral-400 dark:text-neutral-500">Company B</div>
                <div className="text-2xl font-bold text-neutral-400 dark:text-neutral-500">Company C</div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Additional sections can be added here */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900">
        <Container>
          <div className="text-center">
            <Heading as="h2" size="3xl" className="mb-4">
              {dict.common.getStarted}?
            </Heading>
            <Text variant="muted" className="mb-8">
              {locale === 'jp' ? '何千ものチームが既に私たちのプラットフォームで構築しております。' : 'Join thousands of teams already building with our platform.'}
            </Text>
            <Button asChild>
              <Link href="/features">
                {dict.common.features}
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  )
}