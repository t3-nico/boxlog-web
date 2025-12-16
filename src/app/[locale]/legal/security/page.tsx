import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { generateSEOMetadata } from '@/lib/metadata'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'

export const metadata = generateSEOMetadata({
  title: 'Security - Platform Security & Compliance',
  description: 'Learn about our security practices, infrastructure protection, and compliance certifications. We prioritize the security of your data.',
  keywords: ['security', 'data protection', 'compliance', 'encryption', 'SOC 2', 'ISO 27001'],
  url: '/security',
})

interface PageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function SecurityPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const lastUpdated = '2024-01-15'

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Heading as="h1" size="4xl" className="mb-6">
              Security
            </Heading>
            <Text size="xl" variant="muted" className="mb-4">
              How we protect your data and maintain platform security
            </Text>
            <Text size="sm" variant="muted">
              Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto prose prose-lg max-w-none">

            {/* Introduction */}
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-6">
                Our Commitment to Security
              </Heading>
              <Text className="mb-4 leading-relaxed">
                Security is at the core of everything we do. We implement industry-leading security practices
                to protect your data and ensure the integrity of our platform.
              </Text>
            </div>

            {/* Infrastructure Security */}
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-6">
                Infrastructure Security
              </Heading>

              <div className="mb-8">
                <Heading as="h3" size="xl" className="mb-4 text-gray-900">
                  Data Encryption
                </Heading>
                <Text className="mb-4 leading-relaxed">
                  All data is encrypted both in transit and at rest:
                </Text>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                  <li>TLS 1.3 encryption for all data in transit</li>
                  <li>AES-256 encryption for data at rest</li>
                  <li>End-to-end encryption for sensitive operations</li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-6">
                Security Questions?
              </Heading>
              <Text className="mb-4 leading-relaxed">
                If you have questions about our security practices:
              </Text>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-2">
                  <Text className="font-medium text-gray-900">Security Team</Text>
                  <Text className="text-gray-700">Email: security@boxlog.com</Text>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </div>
  )
}
