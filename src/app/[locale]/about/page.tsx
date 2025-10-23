import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { TeamMember } from '@/components/about/TeamMember'
import { CompanyStats } from '@/components/about/CompanyStats'
import { 
  teamMembers, 
  companyStats, 
  companyValues, 
  companyMission, 
  companyVision 
} from '@/lib/about-data'
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
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h1" size="4xl" className="mb-6">
              {dict.pages.about.hero.title}
            </Heading>
            
            <Text size="xl" variant="muted" className="mb-8 max-w-3xl mx-auto">
              {dict.pages.about.hero.description}
            </Text>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href={`/${locale}/contact`}>{dict.pages.about.hero.contactButton}</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#team">{dict.pages.about.hero.teamButton}</a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Company Stats */}
      <CompanyStats stats={companyStats} />

      {/* Mission & Vision */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Mission */}
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[rgb(var(--icon-bg-secondary))] rounded-2xl opacity-20" />
                <div className="relative z-10 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800">
                  <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  
                  <Heading as="h2" size="2xl" className="mb-4 text-blue-900 dark:text-blue-100">
                    {dict.pages.about.mission.title}
                  </Heading>
                  
                  <Text size="lg" className="font-semibold text-blue-800 dark:text-blue-200 mb-4">
                    {dict.pages.about.mission.content}
                  </Text>
                  
                  <Text variant="muted" className="leading-relaxed">
                    {dict.pages.about.mission.description}
                  </Text>
                </div>
              </div>

              {/* Vision */}
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[rgb(var(--icon-bg-secondary))] rounded-2xl opacity-20" />
                <div className="relative z-10 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-purple-100 dark:border-purple-800">
                  <div className="w-12 h-12 bg-purple-600 dark:bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  
                  <Heading as="h2" size="2xl" className="mb-4 text-purple-900 dark:text-purple-100">
                    {dict.pages.about.vision.title}
                  </Heading>
                  
                  <Text size="lg" className="font-semibold text-purple-800 dark:text-purple-200 mb-4">
                    {dict.pages.about.vision.content}
                  </Text>
                  
                  <Text variant="muted" className="leading-relaxed">
                    {dict.pages.about.vision.description}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Company Values */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Heading as="h2" size="3xl" className="mb-4">
                {dict.pages.about.values.title}
              </Heading>
              <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
                {dict.pages.about.values.subtitle}
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  id: 'customer-first',
                  ...dict.pages.about.values.items.customerFirst,
                  icon: '🎯'
                },
                {
                  id: 'innovation',
                  ...dict.pages.about.values.items.innovation,
                  icon: '💡'
                },
                {
                  id: 'transparency',
                  ...dict.pages.about.values.items.transparency,
                  icon: '🔍'
                },
                {
                  id: 'excellence',
                  ...dict.pages.about.values.items.excellence,
                  icon: '⭐'
                }
              ].map((value, index) => (
                <div
                  key={value.id}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-700 group"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-[rgb(var(--icon-bg-secondary))] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[rgb(var(--icon-bg-secondary))] transition-colors">
                      <span className="text-2xl" role="img" aria-label={value.title}>
                        {value.icon}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <Heading as="h3" size="lg" className="mb-3">
                        {value.title}
                      </Heading>
                      <Text variant="muted" className="leading-relaxed">
                        {value.description}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-white dark:bg-gray-900">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Heading as="h2" size="3xl" className="mb-4">
                {dict.pages.about.team.title}
              </Heading>
              <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
                {dict.pages.about.team.subtitle}
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <TeamMember key={member.id} member={member} />
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800">
                <Heading as="h3" size="xl" className="mb-4">
                  {dict.pages.about.team.hiring.title}
                </Heading>
                <Text size="md" variant="muted" className="mb-6 max-w-2xl mx-auto">
                  {dict.pages.about.team.hiring.description}
                </Text>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <a href={`/${locale}/careers`}>{dict.pages.about.team.hiring.careersButton}</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={`/${locale}/contact`}>{dict.pages.about.team.hiring.contactButton}</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 dark:from-blue-700 dark:via-blue-800 dark:to-purple-800">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h2" size="3xl" className="text-white mb-6">
              {dict.pages.about.cta.title}
            </Heading>
            
            <Text size="lg" className="text-blue-100 mb-12 max-w-2xl mx-auto">
              {dict.pages.about.cta.description}
            </Text>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-lg"
                asChild
              >
                <a href={`/${locale}/signup`}>{dict.pages.about.cta.startButton}</a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 dark:border-white/20 text-white hover:bg-white/10 dark:hover:bg-white/5 backdrop-blur"
                asChild
              >
                <a href={`/${locale}/features`}>{dict.pages.about.cta.featuresButton}</a>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}