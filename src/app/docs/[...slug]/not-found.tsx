import { Heading, Text, Button } from '@/components/ui'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Icon */}
        <div className="mb-6">
          <svg 
            className="w-24 h-24 mx-auto text-gray-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
        </div>
        
        {/* 404 Content */}
        <Heading as="h1" size="3xl" className="mb-4">
          Page Not Found
        </Heading>
        
        <Text variant="muted" className="mb-6">
          The documentation page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </Text>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/docs">
              Back to Documentation
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link href="/">
              Go to Homepage
            </Link>
          </Button>
        </div>
        
        {/* Helpful Links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <Text size="sm" variant="muted" className="mb-4">
            Popular documentation pages:
          </Text>
          
          <div className="space-y-2">
            <Link 
              href="/docs/getting-started/introduction"
              className="block text-sm text-blue-600 hover:text-blue-700"
            >
              Getting Started Guide
            </Link>
            <Link 
              href="/docs/api-reference/authentication"
              className="block text-sm text-blue-600 hover:text-blue-700"
            >
              Authentication API
            </Link>
            <Link 
              href="/docs/guides/quickstart"
              className="block text-sm text-blue-600 hover:text-blue-700"
            >
              5-Minute Quickstart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}