import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { LazyContactForm } from '@/components/contact/LazyContactForm'
import { Mail, Phone, MessageCircle } from '@/lib/icons'
import { getDictionary } from '@/lib/i18n'
import { generateSEOMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = params
  const dict = await getDictionary(locale as 'en' | 'jp')
  
  return generateSEOMetadata({
    title: dict.pages.contact.title,
    description: dict.pages.contact.subtitle,
    url: `/${locale}/contact`,
    locale: locale,
    keywords: locale === 'jp' 
      ? ['お問い合わせ', 'サポート', 'ヘルプ', '質問', 'カスタマーサービス']
      : ['contact', 'support', 'help', 'inquiry', 'customer service'],
    type: 'website'
  })
}

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

export default async function ContactPage({ params }: PageProps) {
  const { locale } = params
  const dict = await getDictionary(locale as 'en' | 'jp')
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h1" size="4xl" className="mb-6">
              {dict.pages.contact.title}
            </Heading>
            
            <Text size="xl" variant="muted" className="mb-8 max-w-3xl mx-auto">
              {dict.pages.contact.subtitle}
            </Text>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="w-12 h-12 bg-[rgb(var(--icon-bg-secondary))] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <Heading as="h3" size="md" className="mb-2">
                  {dict.pages.contact.support.email.title}
                </Heading>
                <Text size="sm" variant="muted">
                  {dict.pages.contact.support.email.description}
                </Text>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="w-12 h-12 bg-[rgb(var(--icon-bg-tertiary))] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <Heading as="h3" size="md" className="mb-2">
                  {dict.pages.contact.support.phone.title}
                </Heading>
                <Text size="sm" variant="muted">
                  {dict.pages.contact.support.phone.description}
                </Text>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="w-12 h-12 bg-[rgb(var(--icon-bg-secondary))] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                </div>
                <Heading as="h3" size="md" className="mb-2">
                  {dict.pages.contact.support.chat.title}
                </Heading>
                <Text size="sm" variant="muted">
                  {dict.pages.contact.support.chat.description}
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Form */}
      <LazyContactForm />

      {/* Office Information */}
      <section className="py-24 bg-gray-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* オフィス情報 */}
              <div>
                <Heading as="h2" size="2xl" className="mb-6">
                  {dict.pages.contact.office.title}
                </Heading>
                
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[rgb(var(--icon-bg-secondary))] rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <Text className="font-medium mb-1">{dict.pages.contact.office.address.label}</Text>
                        <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ 
                          __html: dict.pages.contact.office.address.value.replace(/\\n/g, '<br />') 
                        }} />
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[rgb(var(--icon-bg-tertiary))] rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <Text className="font-medium mb-1">{dict.pages.contact.office.hours.label}</Text>
                        <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ 
                          __html: dict.pages.contact.office.hours.value.replace(/\\n/g, '<br />') 
                        }} />
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[rgb(var(--icon-bg-secondary))] rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <Text className="font-medium mb-1">{dict.pages.contact.office.access.label}</Text>
                        <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ 
                          __html: dict.pages.contact.office.access.value.replace(/\\n/g, '<br />') 
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Information */}
              <div>
                <Heading as="h2" size="2xl" className="mb-6">
                  {dict.pages.contact.supportInfo.title}
                </Heading>
                
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-[rgb(var(--icon-bg-secondary))] rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <Heading as="h3" size="md">{dict.pages.contact.supportInfo.docs.title}</Heading>
                        <Text size="sm" variant="muted">{dict.pages.contact.supportInfo.docs.description}</Text>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href="/docs">{dict.pages.contact.supportInfo.docs.button}</a>
                    </Button>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-[rgb(var(--icon-bg-primary))] rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <Heading as="h3" size="md">{dict.pages.contact.supportInfo.faq.title}</Heading>
                        <Text size="sm" variant="muted">{dict.pages.contact.supportInfo.faq.description}</Text>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href="/pricing#faq">{dict.pages.contact.supportInfo.faq.button}</a>
                    </Button>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-[rgb(var(--icon-bg-tertiary))] rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <Heading as="h3" size="md">{dict.pages.contact.supportInfo.status.title}</Heading>
                        <Text size="sm" variant="muted">{dict.pages.contact.supportInfo.status.description}</Text>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://status.yoursaas.com" target="_blank" rel="noopener noreferrer">
                        {dict.pages.contact.supportInfo.status.button}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-white border-t border-gray-100">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[rgb(var(--icon-bg-primary))] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <Heading as="h3" size="lg" className="text-red-800 mb-2">
                    {dict.pages.contact.emergency.title}
                  </Heading>
                  <Text className="text-red-700 mb-4">
                    {dict.pages.contact.emergency.description}
                  </Text>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="bg-white rounded-lg p-4 border border-red-200">
                      <Text className="font-semibold text-red-800">{dict.pages.contact.emergency.hotline.label}</Text>
                      <Text className="text-red-700">{dict.pages.contact.emergency.hotline.phone}</Text>
                      <Text size="sm" className="text-red-600">{dict.pages.contact.emergency.hotline.availability}</Text>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-red-200">
                      <Text className="font-semibold text-red-800">{dict.pages.contact.emergency.email.label}</Text>
                      <Text className="text-red-700">{dict.pages.contact.emergency.email.email}</Text>
                      <Text size="sm" className="text-red-600">{dict.pages.contact.emergency.email.priority}</Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}