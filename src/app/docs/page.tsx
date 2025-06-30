import { Heading, Text, Button } from '@/components/ui'
import Link from 'next/link'

export default function DocsPage() {
  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="space-y-4">
        <Heading as="h1" size="4xl" className="text-gray-900">
          Documentation
        </Heading>
        <Text size="xl" variant="muted" className="max-w-3xl">
          Everything you need to build amazing products with YourSaaS. 
          Get started with our guides, API reference, and best practices.
        </Text>
      </div>

      {/* Quick Start Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <Heading as="h3" size="lg">Quick Start</Heading>
          </div>
          <Text variant="muted" className="mb-4">
            Get up and running in minutes with our step-by-step guide.
          </Text>
          <Link href="/docs/quick-start" className="text-blue-600 hover:text-blue-700 font-medium">
            Start building →
          </Link>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <Heading as="h3" size="lg">API Reference</Heading>
          </div>
          <Text variant="muted" className="mb-4">
            Complete API documentation with examples and code samples.
          </Text>
          <Link href="/docs/api" className="text-blue-600 hover:text-blue-700 font-medium">
            View API docs →
          </Link>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <Heading as="h3" size="lg">Guides</Heading>
          </div>
          <Text variant="muted" className="mb-4">
            Learn best practices with our comprehensive guides and tutorials.
          </Text>
          <Link href="/docs/guides" className="text-blue-600 hover:text-blue-700 font-medium">
            Browse guides →
          </Link>
        </div>
      </div>

      {/* Popular Topics */}
      <div className="space-y-6">
        <Heading as="h2" size="2xl" className="text-gray-900">
          Popular Topics
        </Heading>
        
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <Link href="/docs/authentication" className="block hover:bg-gray-50 -ml-4 -mr-4 pl-4 pr-4 py-2 rounded">
              <Heading as="h3" size="lg" className="text-gray-900 mb-1">
                Authentication & Security
              </Heading>
              <Text variant="muted">
                Learn how to secure your application with authentication, authorization, and security best practices.
              </Text>
            </Link>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <Link href="/docs/integrations" className="block hover:bg-gray-50 -ml-4 -mr-4 pl-4 pr-4 py-2 rounded">
              <Heading as="h3" size="lg" className="text-gray-900 mb-1">
                Integrations
              </Heading>
              <Text variant="muted">
                Connect with third-party services and build powerful integrations with our platform.
              </Text>
            </Link>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <Link href="/docs/webhooks" className="block hover:bg-gray-50 -ml-4 -mr-4 pl-4 pr-4 py-2 rounded">
              <Heading as="h3" size="lg" className="text-gray-900 mb-1">
                Webhooks
              </Heading>
              <Text variant="muted">
                Set up real-time notifications and automate workflows with webhooks.
              </Text>
            </Link>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <Heading as="h2" size="xl" className="text-gray-900 mb-4">
          Need Help?
        </Heading>
        <Text variant="muted" className="mb-6 max-w-2xl mx-auto">
          Can't find what you're looking for? Our support team is here to help you get the most out of YourSaaS.
        </Text>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link href="/help">
              Browse Help Center
            </Link>
          </Button>
          <Button asChild>
            <Link href="/contact">
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}