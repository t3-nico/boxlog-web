import { Heading, Text } from '@/components/ui'

export default function QuickStartPage() {
  return (
    <div className="prose prose-gray max-w-none">
      {/* Title */}
      <Heading as="h1" size="4xl" className="mb-6" id="quick-start">
        Quick Start Guide
      </Heading>
      
      <Text size="xl" variant="muted" className="mb-8">
        Get up and running with YourSaaS in under 5 minutes. This guide will walk you through 
        the essential steps to integrate our platform into your application.
      </Text>

      {/* Prerequisites */}
      <Heading as="h2" size="2xl" className="mt-12 mb-4" id="prerequisites">
        Prerequisites
      </Heading>
      
      <Text className="mb-4">
        Before you begin, make sure you have the following:
      </Text>
      
      <ul className="mb-6 space-y-2">
        <li className="flex items-start">
          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Node.js 18.0 or later
        </li>
        <li className="flex items-start">
          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          A YourSaaS account (sign up for free)
        </li>
        <li className="flex items-start">
          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Basic knowledge of React or your preferred framework
        </li>
      </ul>

      {/* Installation */}
      <Heading as="h2" size="2xl" className="mt-12 mb-4" id="installation">
        Installation
      </Heading>
      
      <Text className="mb-4">
        Install the YourSaaS SDK using your preferred package manager:
      </Text>

      <div className="mb-6">
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-green-400 text-sm">
            <code>{`# Using npm
npm install @yoursaas/sdk

# Using yarn  
yarn add @yoursaas/sdk

# Using pnpm
pnpm add @yoursaas/sdk`}</code>
          </pre>
        </div>
      </div>

      {/* API Key Setup */}
      <Heading as="h3" size="xl" className="mt-8 mb-4" id="api-key-setup">
        API Key Setup
      </Heading>
      
      <Text className="mb-4">
        First, obtain your API key from the dashboard and add it to your environment variables:
      </Text>

      <div className="mb-6">
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-green-400 text-sm">
            <code>{`# .env.local
YOURSAAS_API_KEY=your_api_key_here
YOURSAAS_PROJECT_ID=your_project_id`}</code>
          </pre>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex">
          <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <strong className="text-yellow-800">Important:</strong>
            <Text className="text-yellow-700 mt-1">
              Never expose your API key in client-side code. Always use environment variables 
              and server-side requests for authentication.
            </Text>
          </div>
        </div>
      </div>

      {/* Basic Usage */}
      <Heading as="h2" size="2xl" className="mt-12 mb-4" id="basic-usage">
        Basic Usage
      </Heading>
      
      <Text className="mb-4">
        Here's a simple example of how to initialize the SDK and make your first API call:
      </Text>

      <div className="mb-6">
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-green-400 text-sm">
            <code>{`import { YourSaaSClient } from '@yoursaas/sdk';

// Initialize the client
const client = new YourSaaSClient({
  apiKey: process.env.YOURSAAS_API_KEY,
  projectId: process.env.YOURSAAS_PROJECT_ID,
});

// Example: Create a new user
async function createUser() {
  try {
    const user = await client.users.create({
      email: 'user@example.com',
      name: 'John Doe',
      plan: 'pro'
    });
    
    console.log('User created:', user);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
  }
}`}</code>
          </pre>
        </div>
      </div>

      {/* Framework Integration */}
      <Heading as="h3" size="xl" className="mt-8 mb-4" id="framework-integration">
        Framework Integration
      </Heading>
      
      <Text className="mb-4">
        YourSaaS works seamlessly with popular frameworks. Here are some examples:
      </Text>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <Heading as="h4" size="lg" className="mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
            </svg>
            React
          </Heading>
          <Text size="sm" variant="muted">
            Use our React hooks for seamless integration with state management and effects.
          </Text>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <Heading as="h4" size="lg" className="mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z"/>
            </svg>
            Vue.js
          </Heading>
          <Text size="sm" variant="muted">
            Leverage Vue's reactivity system with our composables and plugins.
          </Text>
        </div>
      </div>

      {/* Authentication Example */}
      <Heading as="h2" size="2xl" className="mt-12 mb-4" id="authentication">
        Authentication
      </Heading>
      
      <Text className="mb-4">
        Secure your application with our built-in authentication system:
      </Text>

      <div className="mb-6">
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-green-400 text-sm">
            <code>{`// Login example
async function loginUser(email, password) {
  try {
    const session = await client.auth.login({
      email,
      password
    });
    
    // Store session token
    localStorage.setItem('token', session.token);
    
    return session;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

// Check authentication status
async function getCurrentUser() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const user = await client.auth.me();
    return user;
  } catch (error) {
    // Token expired or invalid
    localStorage.removeItem('token');
    return null;
  }
}`}</code>
          </pre>
        </div>
      </div>

      {/* Error Handling */}
      <Heading as="h3" size="xl" className="mt-8 mb-4" id="error-handling">
        Error Handling
      </Heading>
      
      <Text className="mb-4">
        The SDK provides comprehensive error handling with detailed error codes:
      </Text>

      <div className="mb-6">
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-green-400 text-sm">
            <code>{`import { YourSaaSError } from '@yoursaas/sdk';

try {
  const result = await client.users.create(userData);
} catch (error) {
  if (error instanceof YourSaaSError) {
    switch (error.code) {
      case 'INVALID_API_KEY':
        console.error('API key is invalid');
        break;
      case 'RATE_LIMIT_EXCEEDED':
        console.error('Rate limit exceeded, retry after:', error.retryAfter);
        break;
      case 'VALIDATION_ERROR':
        console.error('Validation errors:', error.details);
        break;
      default:
        console.error('Unknown error:', error.message);
    }
  } else {
    console.error('Network or other error:', error);
  }
}`}</code>
          </pre>
        </div>
      </div>

      {/* Next Steps */}
      <Heading as="h2" size="2xl" className="mt-12 mb-4" id="next-steps">
        Next Steps
      </Heading>
      
      <Text className="mb-6">
        Congratulations! You've successfully set up YourSaaS. Here's what you can explore next:
      </Text>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <a href="/docs/api" className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 mt-1">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <Heading as="h4" size="lg" className="mb-1">API Reference</Heading>
              <Text size="sm" variant="muted">
                Explore all available endpoints and methods
              </Text>
            </div>
          </div>
        </a>

        <a href="/docs/guides" className="block p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 mt-1">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <Heading as="h4" size="lg" className="mb-1">Guides</Heading>
              <Text size="sm" variant="muted">
                Learn best practices and advanced patterns
              </Text>
            </div>
          </div>
        </a>

        <a href="/docs/examples" className="block p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 mt-1">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <Heading as="h4" size="lg" className="mb-1">Examples</Heading>
              <Text size="sm" variant="muted">
                See real-world implementation examples
              </Text>
            </div>
          </div>
        </a>
      </div>

      {/* Support */}
      <div className="bg-gray-50 rounded-lg p-6 mt-12">
        <Heading as="h3" size="xl" className="mb-4">Need Help?</Heading>
        <Text className="mb-4">
          If you run into any issues or have questions, our support team is here to help:
        </Text>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="/docs/support" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Contact Support
          </a>
          <a href="/docs/community" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Join Community
          </a>
        </div>
      </div>
    </div>
  )
}