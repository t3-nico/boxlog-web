import { Container, Heading, Text, Button } from '@/components/ui'

export function FeaturesHero() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-full mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Features
          </div>
          
          <Heading as="h1" size="4xl" className="mb-6">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              scale your business
            </span>
          </Heading>
          
          <Text size="xl" variant="muted" className="mb-8 max-w-3xl mx-auto">
            From powerful APIs to advanced analytics, YourSaaS provides all the tools 
            you need to build, deploy, and scale your applications with confidence.
          </Text>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/signup">
                Start Free Trial
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/demo">
                Schedule Demo
              </a>
            </Button>
          </div>
        </div>
      </Container>
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>
      </div>
    </section>
  )
}