import type { Metadata } from 'next'
import { Container, Heading, Text, Button } from '@/components/ui'
import { TeamMember } from '@/components/about/TeamMember'
import { CompanyStats } from '@/components/about/CompanyStats'
import { 
  teamMembers, 
  companyStats, 
  companyValues, 
  companyMission, 
  companyVision 
} from '@/lib/about-data'

export const metadata: Metadata = {
  title: 'About Us - YourSaaS Platform',
  description: 'Learn about our mission, team, and values. We create technology that empowers everyone to build a better future.',
  keywords: 'about, company, team, mission, vision, values, SaaS platform',
  openGraph: {
    title: 'About Us - YourSaaS Platform',
    description: 'Learn about our mission, team, and values.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - YourSaaS Platform',
    description: 'Learn about our mission, team, and values.',
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h1" size="4xl" className="mb-6">
              About Us
            </Heading>
            
            <Text size="xl" variant="muted" className="mb-8 max-w-3xl mx-auto">
              YourSaaS is an innovative SaaS platform that supports corporate growth through the power of technology.
              Our mission is to realize a world where everyone can create a better future.
            </Text>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/contact">Contact Us</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#team">Meet the Team</a>
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
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-2xl opacity-20" />
                <div className="relative z-10 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800">
                  <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  
                  <Heading as="h2" size="2xl" className="mb-4 text-blue-900 dark:text-blue-100">
                    {companyMission.title}
                  </Heading>
                  
                  <Text size="lg" className="font-semibold text-blue-800 dark:text-blue-200 mb-4">
                    {companyMission.content}
                  </Text>
                  
                  <Text variant="muted" className="leading-relaxed">
                    {companyMission.description}
                  </Text>
                </div>
              </div>

              {/* Vision */}
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-100 dark:bg-purple-900 rounded-2xl opacity-20" />
                <div className="relative z-10 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-purple-100 dark:border-purple-800">
                  <div className="w-12 h-12 bg-purple-600 dark:bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  
                  <Heading as="h2" size="2xl" className="mb-4 text-purple-900 dark:text-purple-100">
                    {companyVision.title}
                  </Heading>
                  
                  <Text size="lg" className="font-semibold text-purple-800 dark:text-purple-200 mb-4">
                    {companyVision.content}
                  </Text>
                  
                  <Text variant="muted" className="leading-relaxed">
                    {companyVision.description}
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
                Our Values
              </Heading>
              <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
                These values guide our decision-making and actions
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {companyValues.map((value, index) => (
                <div
                  key={value.id}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-700 group"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
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
                Our Team
              </Heading>
              <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
                Experts from diverse backgrounds work together toward a common vision
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
                  Want to Work With Us?
                </Heading>
                <Text size="md" variant="muted" className="mb-6 max-w-2xl mx-auto">
                  We are always looking for talented people. If you&apos;re interested in creating innovative products, please contact us.
                </Text>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <a href="/careers">View Career Opportunities</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/contact">Contact Us</a>
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
              Let&apos;s Create the Future Together
            </Heading>
            
            <Text size="lg" className="text-blue-100 mb-12 max-w-2xl mx-auto">
              Unlock your business potential with our platform.
              Start today and take the first step toward digital transformation.
            </Text>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-lg"
                asChild
              >
                <a href="/signup">Start Free</a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 dark:border-white/20 text-white hover:bg-white/10 dark:hover:bg-white/5 backdrop-blur"
                asChild
              >
                <a href="/features">View Features</a>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}