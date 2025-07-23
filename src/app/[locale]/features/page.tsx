import type { Metadata } from 'next'
import { FeaturesHero } from '@/components/sections/FeaturesHero'
import { FeatureGrid } from '@/components/sections/FeatureGrid'
import { FeatureDetails } from '@/components/sections/FeatureDetails'
import { FeaturesCTA } from '@/components/sections/FeaturesCTA'
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
    title: dict.pages.features.title,
    description: dict.pages.features.subtitle,
    url: `/${locale}/features`,
    locale: locale,
    keywords: locale === 'jp' 
      ? ['機能', 'SaaS', 'API', '分析', 'セキュリティ', 'ワークフロー', 'コラボレーション']
      : ['features', 'SaaS', 'API', 'analytics', 'security', 'workflows', 'collaboration'],
    type: 'website'
  })
}

export default function FeaturesPage({ params }: PageProps) {
  const { locale } = params
  return (
    <div className="min-h-screen">
      <FeaturesHero />
      <FeatureGrid />
      <FeatureDetails />
      <FeaturesCTA />
    </div>
  )
}