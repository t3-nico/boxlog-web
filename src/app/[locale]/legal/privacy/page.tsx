import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { generateSEOMetadata } from '@/lib/metadata'

export const metadata = generateSEOMetadata({
  title: 'Privacy Policy - Data Protection & Privacy',
  description:
    'Learn how YourSaaS collects, uses, and protects your personal information. Our comprehensive privacy policy explains your rights and our commitments.',
  keywords: [
    'privacy policy',
    'data protection',
    'GDPR',
    'personal information',
    'cookies',
    'user rights',
  ],
  url: '/privacy',
})

interface PageProps {
  params: {
    locale: string
  }
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'jp' }]
}

export default function PrivacyPolicyPage({ params: _params }: PageProps) {
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
              Last updated:{' '}
              {new Date(lastUpdated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
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
                At YourSaaS (&quot;we,&quot; &quot;our,&quot; or
                &quot;us&quot;), we respect your privacy and are committed to
                protecting your personal data. This privacy policy explains how
                we collect, use, disclose, and safeguard your information when
                you visit our website and use our services.
              </Text>
              <Text className="mb-4 leading-relaxed">
                This policy applies to all information collected through our
                website, mobile applications, and any related services, sales,
                marketing, or events (collectively, the &quot;Services&quot;).
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
                  We collect personal information that you voluntarily provide
                  when:
                </Text>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                  <li>Registering for an account</li>
                  <li>Subscribing to our newsletter</li>
                  <li>Contacting us with inquiries</li>
                  <li>Participating in surveys or promotions</li>
                  <li>Using our services or features</li>
                </ul>
                <Text className="mb-4 leading-relaxed">
                  This may include: name, email address, phone number, company
                  information, billing address, payment information, and any
                  other information you choose to provide.
                </Text>
              </div>

              <div className="mb-8">
                <Heading as="h3" size="xl" className="mb-4 text-gray-900">
                  Automatically Collected Information
                </Heading>
                <Text className="mb-4 leading-relaxed">
                  When you visit our Services, we automatically collect certain
                  information:
                </Text>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                  <li>
                    Device information (IP address, browser type, operating
                    system)
                  </li>
                  <li>Usage data (pages viewed, time spent, click patterns)</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Performance and analytics data</li>
                  <li>Error logs and diagnostic information</li>
                </ul>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-6">
                How We Use Your Information
              </Heading>
              <Text className="mb-4 leading-relaxed">
                We use the information we collect for various purposes,
                including:
              </Text>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                <li>Providing and maintaining our Services</li>
                <li>Processing transactions and billing</li>
                <li>Sending administrative communications</li>
                <li>Providing customer support</li>
                <li>Improving our Services and user experience</li>
                <li>Personalizing content and recommendations</li>
                <li>Conducting analytics and research</li>
                <li>Detecting and preventing fraud or abuse</li>
                <li>Complying with legal obligations</li>
              </ul>
            </div>

            {/* Sharing Information */}
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-6">
                How We Share Your Information
              </Heading>
              <Text className="mb-4 leading-relaxed">
                We do not sell, trade, or rent your personal information. We may
                share information in the following circumstances:
              </Text>

              <div className="mb-6">
                <Heading as="h3" size="lg" className="mb-3 text-gray-900">
                  Service Providers
                </Heading>
                <Text className="mb-4 leading-relaxed">
                  We may share information with third-party service providers
                  who assist us in operating our Services, such as payment
                  processors, email service providers, and analytics platforms.
                </Text>
              </div>

              <div className="mb-6">
                <Heading as="h3" size="lg" className="mb-3 text-gray-900">
                  Legal Requirements
                </Heading>
                <Text className="mb-4 leading-relaxed">
                  We may disclose information if required by law or in response
                  to valid requests by public authorities.
                </Text>
              </div>

              <div className="mb-6">
                <Heading as="h3" size="lg" className="mb-3 text-gray-900">
                  Business Transfers
                </Heading>
                <Text className="mb-4 leading-relaxed">
                  In the event of a merger, acquisition, or sale of assets, your
                  information may be transferred as part of that transaction.
                </Text>
              </div>
            </div>

            {/* Cookies and Tracking */}
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-6">
                Cookies and Tracking Technologies
              </Heading>
              <Text className="mb-4 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your
                experience:
              </Text>

              <div className="mb-6">
                <Heading as="h3" size="lg" className="mb-3 text-gray-900">
                  Essential Cookies
                </Heading>
                <Text className="mb-4 leading-relaxed">
                  Required for basic website functionality, user authentication,
                  and security.
                </Text>
              </div>

              <div className="mb-6">
                <Heading as="h3" size="lg" className="mb-3 text-gray-900">
                  Analytics Cookies
                </Heading>
                <Text className="mb-4 leading-relaxed">
                  Help us understand how visitors interact with our website
                  (Google Analytics 4).
                </Text>
              </div>

              <div className="mb-6">
                <Heading as="h3" size="lg" className="mb-3 text-gray-900">
                  Performance Cookies
                </Heading>
                <Text className="mb-4 leading-relaxed">
                  Collect information about website performance and user
                  experience.
                </Text>
              </div>

              <Text className="mb-4 leading-relaxed">
                You can control cookies through your browser settings. Note that
                disabling certain cookies may affect website functionality.
              </Text>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-6">
                Data Security
              </Heading>
              <Text className="mb-4 leading-relaxed">
                We implement appropriate security measures to protect your
                personal information:
              </Text>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication requirements</li>
                <li>Employee training on data protection</li>
                <li>Incident response procedures</li>
              </ul>
              <Text className="mb-4 leading-relaxed">
                However, no method of transmission over the Internet or
                electronic storage is 100% secure. We cannot guarantee absolute
                security.
              </Text>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-6">
                Your Privacy Rights
              </Heading>
              <Text className="mb-4 leading-relaxed">
                Depending on your location, you may have the following rights:
              </Text>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                <li>
                  <strong>Access:</strong> Request access to your personal
                  information
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate
                  information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal
                  information
                </li>
                <li>
                  <strong>Portability:</strong> Request a copy of your data in a
                  portable format
                </li>
                <li>
                  <strong>Restriction:</strong> Request limitation of processing
                </li>
                <li>
                  <strong>Objection:</strong> Object to certain types of
                  processing
                </li>
                <li>
                  <strong>Withdraw Consent:</strong> Withdraw consent for
                  consent-based processing
                </li>
              </ul>
              <Text className="mb-4 leading-relaxed">
                To exercise these rights, please contact us using the
                information provided below.
              </Text>
            </div>

            {/* Data Retention */}
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-6">
                Data Retention
              </Heading>
              <Text className="mb-4 leading-relaxed">
                We retain personal information for as long as necessary to:
              </Text>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                <li>Provide our Services to you</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Maintain security and prevent fraud</li>
              </ul>
              <Text className="mb-4 leading-relaxed">
                When information is no longer needed, we securely delete or
                anonymize it.
              </Text>
            </div>

            {/* International Transfers */}
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-6">
                International Data Transfers
              </Heading>
              <Text className="mb-4 leading-relaxed">
                Your information may be transferred to and processed in
                countries other than your own. We ensure appropriate safeguards
                are in place for such transfers, including:
              </Text>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                <li>Adequacy decisions by regulatory authorities</li>
                <li>Standard contractual clauses</li>
                <li>Certification schemes</li>
                <li>Binding corporate rules</li>
              </ul>
            </div>

            {/* Children's Privacy */}
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-6">
                Children&apos;s Privacy
              </Heading>
              <Text className="mb-4 leading-relaxed">
                Our Services are not intended for children under 13 years of
                age. We do not knowingly collect personal information from
                children under 13. If we learn that we have collected
                information from a child under 13, we will delete it promptly.
              </Text>
            </div>

            {/* Updates to Policy */}
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-6">
                Updates to This Policy
              </Heading>
              <Text className="mb-4 leading-relaxed">
                We may update this privacy policy from time to time. We will
                notify you of any material changes by:
              </Text>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                <li>Posting the updated policy on our website</li>
                <li>Updating the &quot;Last updated&quot; date</li>
                <li>Sending email notifications for significant changes</li>
              </ul>
              <Text className="mb-4 leading-relaxed">
                We encourage you to review this policy periodically.
              </Text>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-6">
                Contact Us
              </Heading>
              <Text className="mb-4 leading-relaxed">
                If you have questions about this privacy policy or our data
                practices, please contact us:
              </Text>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-2">
                  <Text className="font-medium text-gray-900">
                    YourSaaS Privacy Team
                  </Text>
                  <Text className="text-gray-700">
                    Email: privacy@yoursaas.com
                  </Text>
                  <Text className="text-gray-700">
                    Phone: +1 (555) 123-4567
                  </Text>
                  <Text className="text-gray-700">
                    Address: 123 Privacy Street, Suite 100, San Francisco, CA
                    94105, USA
                  </Text>
                </div>
              </div>
              <Text className="mt-4 text-sm text-gray-600">
                For EU residents: You also have the right to lodge a complaint
                with your local data protection authority.
              </Text>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
