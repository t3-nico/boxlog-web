import { Container, Heading, Text, Button } from '@/components/ui'

export function FeaturesHero() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-neutral-50 to-neutral-50 dark:from-neutral-900 dark:to-neutral-800">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-neutral-100 text-neutral-700 text-sm font-medium rounded-full mb-8 dark:bg-neutral-800/30 dark:text-neutral-300">
            <span className="w-2 h-2 bg-neutral-500 rounded-full mr-2"></span>
            Features
          </div>
          
          <Heading as="h1" size="4xl" className="mb-6">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-neutral-700 to-neutral-900 dark:from-neutral-200 dark:to-neutral-50 bg-clip-text text-transparent">
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
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-neutral-200 rounded-full opacity-20 blur-3xl dark:bg-neutral-600 dark:opacity-10"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-neutral-300 rounded-full opacity-20 blur-3xl dark:bg-neutral-700 dark:opacity-10"></div>
      </div>
    </section>
  )
}