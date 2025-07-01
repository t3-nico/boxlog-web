import type { Metadata } from 'next'
import { Container, Heading, Text, Button } from '@/components/ui'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us - YourSaaS Platform',
  description: 'お問い合わせはこちらから。ご質問やご相談がございましたら、お気軽にお問い合わせください。専門スタッフが迅速にご対応いたします。',
  keywords: 'contact, support, help, inquiry, customer service, お問い合わせ, サポート',
  openGraph: {
    title: 'Contact Us - YourSaaS Platform',
    description: 'お問い合わせはこちらから。専門スタッフが迅速にご対応いたします。',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - YourSaaS Platform',
    description: 'お問い合わせはこちらから。専門スタッフが迅速にご対応いたします。',
  }
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h1" size="4xl" className="mb-6">
              お問い合わせ
            </Heading>
            
            <Text size="xl" variant="muted" className="mb-8 max-w-3xl mx-auto">
              ご質問やご相談がございましたら、お気軽にお問い合わせください。
              専門スタッフが迅速にご対応いたします。
            </Text>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <Heading as="h3" size="md" className="mb-2">
                  メールサポート
                </Heading>
                <Text size="sm" variant="muted">
                  24時間以内に返信いたします
                </Text>
              </div>
              
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <Heading as="h3" size="md" className="mb-2">
                  電話サポート
                </Heading>
                <Text size="sm" variant="muted">
                  平日 9:00-18:00
                </Text>
              </div>
              
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <Heading as="h3" size="md" className="mb-2">
                  チャットサポート
                </Heading>
                <Text size="sm" variant="muted">
                  リアルタイムでサポート
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Form */}
      <ContactForm />

      {/* Office Information */}
      <section className="py-24 bg-gray-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* オフィス情報 */}
              <div>
                <Heading as="h2" size="2xl" className="mb-6">
                  オフィス情報
                </Heading>
                
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <Text className="font-medium mb-1">本社所在地</Text>
                        <Text variant="muted">
                          〒100-0001<br />
                          東京都千代田区千代田1-1-1<br />
                          YourSaaSビル 5F
                        </Text>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <Text className="font-medium mb-1">営業時間</Text>
                        <Text variant="muted">
                          平日: 9:00 - 18:00<br />
                          土日祝日: 休業
                        </Text>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <Text className="font-medium mb-1">アクセス</Text>
                        <Text variant="muted">
                          JR東京駅 徒歩5分<br />
                          地下鉄大手町駅 徒歩3分
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* サポート情報 */}
              <div>
                <Heading as="h2" size="2xl" className="mb-6">
                  サポート情報
                </Heading>
                
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <Heading as="h3" size="md">ドキュメント</Heading>
                        <Text size="sm" variant="muted">詳細な使い方ガイド</Text>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href="/docs">ドキュメントを見る</a>
                    </Button>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <Heading as="h3" size="md">よくある質問</Heading>
                        <Text size="sm" variant="muted">お客様からよくいただく質問</Text>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href="/pricing#faq">FAQ を見る</a>
                    </Button>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <Heading as="h3" size="md">ステータスページ</Heading>
                        <Text size="sm" variant="muted">サービスの稼働状況</Text>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://status.yoursaas.com" target="_blank" rel="noopener noreferrer">
                        ステータスを確認
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
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <Heading as="h3" size="lg" className="text-red-800 mb-2">
                    緊急時のお問い合わせ
                  </Heading>
                  <Text className="text-red-700 mb-4">
                    サービスに重大な問題が発生している場合や、セキュリティに関する緊急事態の場合は、
                    以下の緊急連絡先までお電話ください。
                  </Text>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="bg-white rounded-lg p-4 border border-red-200">
                      <Text className="font-semibold text-red-800">緊急ホットライン</Text>
                      <Text className="text-red-700">03-1234-9999</Text>
                      <Text size="sm" className="text-red-600">24時間対応</Text>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-red-200">
                      <Text className="font-semibold text-red-800">緊急メール</Text>
                      <Text className="text-red-700">emergency@yoursaas.com</Text>
                      <Text size="sm" className="text-red-600">最優先で対応</Text>
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