export interface Feature {
  id: string
  title: string
  description: string
  icon: string
  category: 'integration' | 'analytics' | 'security' | 'workflow' | 'collaboration' | 'mobile'
}

export interface DetailedFeature {
  id: string
  title: string
  subtitle: string
  description: string
  features: string[]
  image: string
  reverse?: boolean
}

export const features: Feature[] = [
  {
    id: 'api-integration',
    title: 'API Integration',
    description: 'Connect with 100+ third-party services and build custom integrations with our powerful REST API.',
    icon: '🔗',
    category: 'integration'
  },
  {
    id: 'real-time-analytics',
    title: 'Real-time Analytics',
    description: 'Monitor your application performance with live dashboards and custom metrics tracking.',
    icon: '📊',
    category: 'analytics'
  },
  {
    id: 'team-collaboration',
    title: 'Team Collaboration',
    description: 'Work together seamlessly with shared workspaces, comments, and real-time collaboration tools.',
    icon: '👥',
    category: 'collaboration'
  },
  {
    id: 'advanced-security',
    title: 'Advanced Security',
    description: 'Enterprise-grade security with SSO, 2FA, audit logs, and compliance certifications.',
    icon: '🔒',
    category: 'security'
  },
  {
    id: 'custom-workflows',
    title: 'Custom Workflows',
    description: 'Automate your processes with visual workflow builder and custom business logic.',
    icon: '⚡',
    category: 'workflow'
  },
  {
    id: 'mobile-app',
    title: 'Mobile App',
    description: 'Access your data on the go with our native iOS and Android applications.',
    icon: '📱',
    category: 'mobile'
  }
]

export const detailedFeatures: DetailedFeature[] = [
  {
    id: 'api-first',
    title: 'API-First Architecture',
    subtitle: 'Built for developers, designed for scale',
    description: 'Our comprehensive API allows you to integrate YourSaaS into any application or workflow. With SDKs for popular languages and extensive documentation, getting started is simple.',
    features: [
      'RESTful API with OpenAPI specification',
      'SDKs for JavaScript, Python, Ruby, and Go',
      'Webhook support for real-time events',
      'Rate limiting and authentication',
      'Comprehensive API documentation'
    ],
    image: '/images/api-integration.jpg',
    reverse: false
  },
  {
    id: 'analytics-dashboard',
    title: 'Advanced Analytics',
    subtitle: 'Data-driven insights at your fingertips',
    description: 'Make informed decisions with our powerful analytics platform. Track user behavior, monitor performance, and create custom reports with our intuitive dashboard.',
    features: [
      'Real-time data visualization',
      'Custom dashboard creation',
      'Automated report generation',
      'Data export and API access',
      'Advanced filtering and segmentation'
    ],
    image: '/images/analytics-dashboard.jpg',
    reverse: true
  },
  {
    id: 'security-compliance',
    title: 'Enterprise Security',
    subtitle: 'Security and compliance you can trust',
    description: 'Protect your data with enterprise-grade security features. We maintain SOC 2 Type II compliance and offer advanced security controls for enterprise customers.',
    features: [
      'SOC 2 Type II compliance',
      'Single Sign-On (SSO) integration',
      'Two-factor authentication',
      'Audit logs and monitoring',
      'Data encryption at rest and in transit'
    ],
    image: '/images/security-features.jpg',
    reverse: false
  }
]

export const ctaData = {
  title: 'Ready to get started?',
  subtitle: 'Join thousands of teams already using YourSaaS to build better products.',
  description: 'Start your free trial today and see how YourSaaS can transform your workflow.',
  primaryButton: {
    text: 'Start Free Trial',
    href: '/signup'
  },
  secondaryButton: {
    text: 'Schedule Demo',
    href: '/demo'
  }
}