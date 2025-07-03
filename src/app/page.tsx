import { Button, Container, Heading, Text } from '@/components/ui'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20 dark:opacity-10"></div>
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 dark:opacity-10"></div>
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
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
                className="border-gray-300 hover:border-gray-400 bg-white/50 backdrop-blur-sm dark:border-gray-600 dark:hover:border-gray-500 dark:bg-gray-900/50"
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
            <div className="mt-16 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
              <Text size="sm" variant="subtle" className="mb-6">
                Trusted by teams at
              </Text>
              <div className="flex items-center justify-center gap-8 opacity-60">
                <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">Company A</div>
                <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">Company B</div>
                <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">Company C</div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Additional sections can be added here */}
      <section className="py-24 bg-white dark:bg-gray-900">
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