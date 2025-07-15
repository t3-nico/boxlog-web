import { Button, Container, Heading, Text } from '@/components/ui'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-50 via-neutral-50 to-neutral-100 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-neutral-300 to-neutral-400 rounded-full blur-3xl opacity-20 dark:opacity-10"></div>
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full blur-3xl opacity-20 dark:opacity-10"></div>
        </div>
        
        <Container className="relative">
          <div className="flex flex-col items-center justify-center min-h-screen py-24 text-center">
            {/* Main Title */}
            <Heading 
              as="h1" 
              size="4xl" 
              className="mb-6 max-w-4xl leading-tight sm:text-5xl lg:text-6xl"
            >
              Build Your Next
              <span className="bg-gradient-to-r from-neutral-700 to-neutral-900 dark:from-neutral-200 dark:to-neutral-50 bg-clip-text text-transparent">
                {' '}SaaS Product{' '}
              </span>
              with Confidence
            </Heading>
            
            {/* Subtitle */}
            <Text 
              size="xl" 
              variant="muted" 
              className="mb-10 max-w-3xl leading-relaxed"
            >
              Transform your ideas into reality with our powerful platform. 
              Get access to enterprise-grade tools, seamless integrations, 
              and world-class support to scale your business faster than ever.
            </Text>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow" asChild>
                <Link href="/signup">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Start Free Trial
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-neutral-300 hover:border-neutral-400 bg-neutral-50/50 backdrop-blur-sm dark:border-neutral-600 dark:hover:border-neutral-500 dark:bg-neutral-900/50"
                asChild
              >
                <Link href="/demo">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  View Demo
                </Link>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-16 pt-8 border-t border-neutral-200/50 dark:border-neutral-700/50">
              <Text size="sm" variant="subtle" className="mb-6">
                Trusted by teams at
              </Text>
              <div className="flex items-center justify-center gap-8 opacity-60">
                <div className="text-2xl font-bold text-neutral-400 dark:text-neutral-500">Company A</div>
                <div className="text-2xl font-bold text-neutral-400 dark:text-neutral-500">Company B</div>
                <div className="text-2xl font-bold text-neutral-400 dark:text-neutral-500">Company C</div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Additional sections can be added here */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900">
        <Container>
          <div className="text-center">
            <Heading as="h2" size="3xl" className="mb-4">
              Ready to get started?
            </Heading>
            <Text variant="muted" className="mb-8">
              Join thousands of teams already building with our platform.
            </Text>
            <Button asChild>
              <Link href="/features">
                Explore Features
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  )
}