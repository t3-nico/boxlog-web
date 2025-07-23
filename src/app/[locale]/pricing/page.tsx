import type { Metadata } from 'next'
import { PricingPageClient } from '@/components/pricing/PricingPageClient'
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
    title: dict.pages.pricing.title,
    description: dict.pages.pricing.subtitle,
    url: `/${locale}/pricing`,
    locale: locale,
    keywords: locale === 'jp' 
      ? ['料金', 'プラン', 'サブスクリプション', 'SaaS料金', 'チームプラン', 'エンタープライズ']
      : ['pricing', 'plans', 'subscription', 'SaaS pricing', 'team plans', 'enterprise'],
    type: 'website'
  })
}

export default async function PricingPage({ params }: PageProps) {
  const { locale } = params
  const dict = await getDictionary(locale as 'en' | 'jp')
  return <PricingPageClient dict={dict} locale={locale} />
}