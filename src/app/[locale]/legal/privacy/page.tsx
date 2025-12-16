import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { generateSEOMetadata } from '@/lib/metadata'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'

export const metadata = generateSEOMetadata({
  title: 'Privacy Policy - Data Protection & Privacy',
  description: 'Learn how BoxLog collects, uses, and protects your personal information. Our comprehensive privacy policy explains your rights and our commitments.',
  keywords: ['privacy policy', 'data protection', 'GDPR', 'personal information', 'cookies', 'user rights'],
  url: '/privacy',
})

interface PageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
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
              Privacy Policy
            </Heading>
            <Text size="xl" variant="muted" className="mb-4">
              How we collect, use, and protect your information
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
                Introduction
              </Heading>
              <Text className="mb-4 leading-relaxed">
                At BoxLog (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we respect your privacy and are committed to protecting your personal data.
                This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our
                website and use our services.
              </Text>
              <Text className="mb-4 leading-relaxed">
                This policy applies to all information collected through our website, mobile applications, and any related
                services, sales, marketing, or events (collectively, the &quot;Services&quot;).
              </Text>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-6">
                Information We Collect
              </Heading>

              <div className="mb-8">
                <Heading as="h3" size="xl" className="mb-4 text-gray-900">
                  Personal Information You Provide
                </Heading>
                <Text className="mb-4 leading-relaxed">
                  We collect personal information that you voluntarily provide when:
                </Text>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                  <li>Registering for an account</li>
                  <li>Subscribing to our newsletter</li>
                  <li>Contacting us with inquiries</li>
                  <li>Participating in surveys or promotions</li>
                  <li>Using our services or features</li>
                </ul>
              </div>

              <div className="mb-8">
                <Heading as="h3" size="xl" className="mb-4 text-gray-900">
                  Automatically Collected Information
                </Heading>
                <Text className="mb-4 leading-relaxed">
                  When you visit our Services, we automatically collect certain information:
                </Text>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage data (pages viewed, time spent, click patterns)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-6">
                Contact Us
              </Heading>
              <Text className="mb-4 leading-relaxed">
                If you have questions about this privacy policy or our data practices, please contact us:
              </Text>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-2">
                  <Text className="font-medium text-gray-900">BoxLog Privacy Team</Text>
                  <Text className="text-gray-700">Email: privacy@boxlog.com</Text>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </div>
  )
}
