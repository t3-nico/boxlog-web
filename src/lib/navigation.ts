export interface NavigationItem {
  title: string
  href?: string
  icon?: React.ComponentType<{ className?: string }>
  items?: NavigationItem[]
  badge?: string
  external?: boolean
}

export interface NavigationSection {
  title: string
  items: NavigationItem[]
}

export const docsNavigation: NavigationSection[] = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Introduction',
        href: '/docs',
      },
      {
        title: 'Quick Start',
        href: '/docs/quick-start',
      },
      {
        title: 'Installation',
        href: '/docs/installation',
        items: [
          { title: 'Next.js', href: '/docs/installation/nextjs' },
          { title: 'React', href: '/docs/installation/react' },
          { title: 'Vue.js', href: '/docs/installation/vue' },
          { title: 'Angular', href: '/docs/installation/angular' },
        ],
      },
      {
        title: 'Configuration',
        href: '/docs/configuration',
        items: [
          { title: 'Environment Variables', href: '/docs/configuration/env' },
          { title: 'Database Setup', href: '/docs/configuration/database' },
          { title: 'Authentication', href: '/docs/configuration/auth' },
        ],
      },
      {
        title: 'First Steps',
        href: '/docs/first-steps',
      },
    ],
  },
  {
    title: 'API Reference',
    items: [
      {
        title: 'Authentication',
        href: '/docs/api/authentication',
        items: [
          { title: 'API Keys', href: '/docs/api/authentication/api-keys' },
          { title: 'OAuth 2.0', href: '/docs/api/authentication/oauth' },
          { title: 'JWT Tokens', href: '/docs/api/authentication/jwt' },
        ],
      },
      {
        title: 'Users',
        href: '/docs/api/users',
        items: [
          { title: 'Create User', href: '/docs/api/users/create' },
          { title: 'Get User', href: '/docs/api/users/get' },
          { title: 'Update User', href: '/docs/api/users/update' },
          { title: 'Delete User', href: '/docs/api/users/delete' },
        ],
      },
      {
        title: 'Projects',
        href: '/docs/api/projects',
        items: [
          { title: 'List Projects', href: '/docs/api/projects/list' },
          { title: 'Create Project', href: '/docs/api/projects/create' },
          { title: 'Project Settings', href: '/docs/api/projects/settings' },
        ],
      },
      {
        title: 'Webhooks',
        href: '/docs/api/webhooks',
        items: [
          { title: 'Setup', href: '/docs/api/webhooks/setup' },
          { title: 'Events', href: '/docs/api/webhooks/events' },
          { title: 'Verification', href: '/docs/api/webhooks/verification' },
        ],
      },
      {
        title: 'Rate Limiting',
        href: '/docs/api/rate-limiting',
      },
      {
        title: 'Errors',
        href: '/docs/api/errors',
      },
    ],
  },
  {
    title: 'Guides',
    items: [
      {
        title: 'Best Practices',
        href: '/docs/guides/best-practices',
        items: [
          { title: 'Code Organization', href: '/docs/guides/best-practices/code-organization' },
          { title: 'Error Handling', href: '/docs/guides/best-practices/error-handling' },
          { title: 'Testing', href: '/docs/guides/best-practices/testing' },
        ],
      },
      {
        title: 'Security',
        href: '/docs/guides/security',
        items: [
          { title: 'Data Protection', href: '/docs/guides/security/data-protection' },
          { title: 'CORS Setup', href: '/docs/guides/security/cors' },
          { title: 'Rate Limiting', href: '/docs/guides/security/rate-limiting' },
        ],
      },
      {
        title: 'Performance',
        href: '/docs/guides/performance',
        items: [
          { title: 'Caching', href: '/docs/guides/performance/caching' },
          { title: 'Optimization', href: '/docs/guides/performance/optimization' },
          { title: 'Monitoring', href: '/docs/guides/performance/monitoring' },
        ],
      },
      {
        title: 'Integrations',
        href: '/docs/guides/integrations',
        items: [
          { title: 'Third-party APIs', href: '/docs/guides/integrations/third-party' },
          { title: 'Custom Integrations', href: '/docs/guides/integrations/custom' },
        ],
      },
      {
        title: 'Deployment',
        href: '/docs/guides/deployment',
        items: [
          { title: 'Vercel', href: '/docs/guides/deployment/vercel' },
          { title: 'AWS', href: '/docs/guides/deployment/aws' },
          { title: 'Docker', href: '/docs/guides/deployment/docker' },
        ],
      },
    ],
  },
  {
    title: 'Examples',
    items: [
      {
        title: 'Frontend Frameworks',
        items: [
          { title: 'React', href: '/docs/examples/react' },
          { title: 'Vue.js', href: '/docs/examples/vue' },
          { title: 'Angular', href: '/docs/examples/angular' },
          { title: 'Svelte', href: '/docs/examples/svelte' },
        ],
      },
      {
        title: 'Backend Languages',
        items: [
          { title: 'Node.js', href: '/docs/examples/nodejs' },
          { title: 'Python', href: '/docs/examples/python' },
          { title: 'PHP', href: '/docs/examples/php' },
          { title: 'Ruby', href: '/docs/examples/ruby' },
        ],
      },
      {
        title: 'Use Cases',
        items: [
          { title: 'E-commerce', href: '/docs/examples/ecommerce' },
          { title: 'Blog Platform', href: '/docs/examples/blog' },
          { title: 'Dashboard', href: '/docs/examples/dashboard' },
        ],
      },
    ],
  },
  {
    title: 'Resources',
    items: [
      {
        title: 'Changelog',
        href: '/docs/changelog',
        badge: 'New',
      },
      {
        title: 'Migration Guide',
        href: '/docs/migration',
      },
      {
        title: 'FAQ',
        href: '/docs/faq',
      },
      {
        title: 'Support',
        href: '/docs/support',
      },
      {
        title: 'Community',
        href: '/docs/community',
        external: true,
      },
      {
        title: 'GitHub',
        href: 'https://github.com/yoursaas',
        external: true,
      },
    ],
  },
]