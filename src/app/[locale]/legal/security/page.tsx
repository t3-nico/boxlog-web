import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { generateSEOMetadata } from '@/lib/metadata'

export const metadata = generateSEOMetadata({
  title: 'Security - Platform Security & Compliance',
  description:
    'Learn about our security practices, infrastructure protection, and compliance certifications. We prioritize the security of your data.',
  keywords: [
    'security',
    'data protection',
    'compliance',
    'encryption',
    'SOC 2',
    'ISO 27001',
  ],
  url: '/security',
})

interface PageProps {
  params: {
    locale: string
  }
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'jp' }]
}

export default function SecurityPage({ params }: PageProps) {
  const { locale } = params
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
                Our Commitment to Security
              </Heading>
              <Text className="mb-4 leading-relaxed">
                Security is at the core of everything we do. We implement
                industry-leading security practices to protect your data and
                ensure the integrity of our platform.
              </Text>
              <Text className="mb-4 leading-relaxed">
                This page outlines our security measures, compliance
                certifications, and best practices that help keep your
                information safe.
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
                  <li>Encrypted database backups</li>
                </ul>
              </div>

              <div className="mb-8">
                <Heading as="h3" size="xl" className="mb-4 text-gray-900">
                  Cloud Infrastructure
                </Heading>
                <Text className="mb-4 leading-relaxed">
                  Our infrastructure is hosted on industry-leading cloud
                  providers:
                </Text>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                  <li>Multi-region deployment for high availability</li>
                  <li>Automated failover and disaster recovery</li>
                  <li>Regular security patches and updates</li>
                  <li>DDoS protection and rate limiting</li>
                  <li>Isolated network environments</li>
                </ul>
              </div>

              <div className="mb-8">
                <Heading as="h3" size="xl" className="mb-4 text-gray-900">
                  Access Controls
                </Heading>
                <Text className="mb-4 leading-relaxed">
                  Strict access controls protect your data:
                </Text>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                  <li>Multi-factor authentication (MFA) required</li>
                  <li>Role-based access control (RBAC)</li>
                  <li>Principle of least privilege</li>
                  <li>Regular access reviews and audits</li>
                  <li>Secure credential management</li>
                </ul>
              </div>
            </div>

            {/* Application Security */}
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-6">
                Application Security
              </Heading>

              <div className="mb-8">
                <Heading as="h3" size="xl" className="mb-4 text-gray-900">
                  Secure Development
                </Heading>
                <Text className="mb-4 leading-relaxed">
                  We follow secure coding practices throughout our development
                  lifecycle:
                </Text>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                  <li>Security code reviews for all changes</li>
                  <li>Automated security scanning (SAST/DAST)</li>
                  <li>Dependency vulnerability monitoring</li>
                  <li>Regular penetration testing</li>
                  <li>Bug bounty program</li>
                </ul>
              </div>

              <div className="mb-8">
                <Heading as="h3" size="xl" className="mb-4 text-gray-900">
                  Authentication & Authorization
                </Heading>
                <Text className="mb-4 leading-relaxed">
                  Multiple layers of authentication and authorization:
                </Text>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                  <li>OAuth 2.0 and OpenID Connect support</li>
                  <li>Single Sign-On (SSO) integration</li>
                  <li>Session management and timeout policies</li>
                  <li>API key rotation and management</li>
                  <li>Audit logging for all access</li>
                </ul>
              </div>
            </div>

            {/* Compliance & Certifications */}
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-6">
                Compliance & Certifications
              </Heading>
              <Text className="mb-4 leading-relaxed">
                We maintain industry-standard compliance certifications:
              </Text>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <Heading as="h3" size="lg" className="mb-3 text-gray-900">
                    SOC 2 Type II
                  </Heading>
                  <Text className="text-gray-700">
                    Annual audits verify our security, availability, and
                    confidentiality controls.
                  </Text>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <Heading as="h3" size="lg" className="mb-3 text-gray-900">
                    GDPR Compliant
                  </Heading>
                  <Text className="text-gray-700">
                    Full compliance with EU General Data Protection Regulation
                    requirements.
                  </Text>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <Heading as="h3" size="lg" className="mb-3 text-gray-900">
                    ISO 27001
                  </Heading>
                  <Text className="text-gray-700">
                    Information security management system certified to
                    international standards.
                  </Text>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <Heading as="h3" size="lg" className="mb-3 text-gray-900">
                    HIPAA Ready
                  </Heading>
                  <Text className="text-gray-700">
                    Infrastructure and processes ready for healthcare compliance
                    requirements.
                  </Text>
                </div>
              </div>
            </div>

            {/* Data Protection */}
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-6">
                Data Protection
              </Heading>

              <div className="mb-8">
                <Heading as="h3" size="xl" className="mb-4 text-gray-900">
                  Data Backup & Recovery
                </Heading>
                <Text className="mb-4 leading-relaxed">
                  Your data is protected with comprehensive backup strategies:
                </Text>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                  <li>Automated daily backups</li>
                  <li>Multi-region backup replication</li>
                  <li>Point-in-time recovery capabilities</li>
                  <li>Regular backup testing and validation</li>
                  <li>30-day backup retention</li>
                </ul>
              </div>

              <div className="mb-8">
                <Heading as="h3" size="xl" className="mb-4 text-gray-900">
                  Data Residency
                </Heading>
                <Text className="mb-4 leading-relaxed">
                  We offer data residency options to meet your compliance
                  requirements:
                </Text>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                  <li>Choose your preferred data region</li>
                  <li>Data stays within selected geographic boundaries</li>
                  <li>Compliance with local data protection laws</li>
                  <li>Cross-region replication available upon request</li>
                </ul>
              </div>
            </div>

            {/* Monitoring & Response */}
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-6">
                Monitoring & Incident Response
              </Heading>

              <div className="mb-8">
                <Heading as="h3" size="xl" className="mb-4 text-gray-900">
                  24/7 Security Monitoring
                </Heading>
                <Text className="mb-4 leading-relaxed">
                  Our security operations center monitors the platform
                  continuously:
                </Text>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                  <li>Real-time threat detection</li>
                  <li>Automated security alerts</li>
                  <li>Intrusion detection and prevention</li>
                  <li>Log analysis and correlation</li>
                  <li>Anomaly detection using machine learning</li>
                </ul>
              </div>

              <div className="mb-8">
                <Heading as="h3" size="xl" className="mb-4 text-gray-900">
                  Incident Response
                </Heading>
                <Text className="mb-4 leading-relaxed">
                  We maintain a comprehensive incident response plan:
                </Text>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                  <li>Dedicated incident response team</li>
                  <li>Documented response procedures</li>
                  <li>Regular incident response drills</li>
                  <li>Customer notification protocols</li>
                  <li>Post-incident analysis and improvements</li>
                </ul>
              </div>
            </div>

            {/* Employee Security */}
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-6">
                Employee Security & Training
              </Heading>
              <Text className="mb-4 leading-relaxed">
                Our team is trained and committed to maintaining security:
              </Text>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                <li>Background checks for all employees</li>
                <li>Security awareness training program</li>
                <li>Regular security updates and briefings</li>
                <li>Confidentiality agreements</li>
                <li>Secure device management</li>
                <li>Clean desk and clear screen policies</li>
              </ul>
            </div>

            {/* Vulnerability Disclosure */}
            <div className="mb-12">
              <Heading as="h2" size="2xl" className="mb-6">
                Vulnerability Disclosure Program
              </Heading>
              <Text className="mb-4 leading-relaxed">
                We welcome responsible disclosure of security vulnerabilities.
                If you discover a security issue:
              </Text>
              <div className="bg-gray-50 rounded-lg p-6 mb-4">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Email us at security@boxlog.com</li>
                  <li>Provide detailed information about the vulnerability</li>
                  <li>Allow us reasonable time to address the issue</li>
                  <li>Do not exploit the vulnerability or access user data</li>
                </ul>
              </div>
              <Text className="mb-4 leading-relaxed">
                We commit to responding within 48 hours and will keep you
                updated on our progress.
              </Text>
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
                  <Text className="font-medium text-gray-900">
                    Security Team
                  </Text>
                  <Text className="text-gray-700">
                    Email: security@boxlog.com
                  </Text>
                  <Text className="text-gray-700">
                    For urgent security matters, please include [URGENT] in your
                    subject line.
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
