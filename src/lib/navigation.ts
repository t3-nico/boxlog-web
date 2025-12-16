import type { Dictionary } from '@/lib/i18n'

export interface NavItem {
  name: string
  href?: string
  description?: string
  items?: NavItem[]
}

export interface NavSection {
  name: string
  items: NavItem[]
}

// Docs navigation types (used by ClientSidebar)
export interface NavigationItem {
  title: string
  href?: string
  items?: NavigationItem[]
  badge?: string
  external?: boolean
}

export interface NavigationSection {
  title: string
  items: NavigationItem[]
}

// Generate docs navigation structure
export function generateDocsNavigation(): NavigationSection[] {
  return [
    {
      title: 'Getting Started',
      items: [
        { title: 'Introduction', href: '/docs' },
        { title: 'Quick Start', href: '/docs/getting-started' },
        { title: 'Installation', href: '/docs/installation' },
      ],
    },
    {
      title: 'Core Concepts',
      items: [
        { title: 'Logging', href: '/docs/logging' },
        { title: 'Search', href: '/docs/search' },
        { title: 'Alerts', href: '/docs/alerts' },
      ],
    },
    {
      title: 'Integrations',
      items: [
        { title: 'SDKs', href: '/docs/sdks' },
        { title: 'API Reference', href: '/docs/api', badge: 'New' },
      ],
    },
  ]
}

export function getNavigationConfig(dict: Dictionary) {
  return {
    // メインナビゲーション（Header用）
    main: [
      {
        name: dict.common.features || 'Features',
        href: '/features',
      },
      {
        name: dict.common.pricing || 'Pricing',
        href: '/pricing',
      },
      {
        name: 'Resources',
        items: [
          {
            name: dict.common.blog,
            href: '/blog',
            description: 'Read our latest articles and tutorials',
          },
          {
            name: dict.common.docs,
            href: '/docs',
            description: 'Documentation and guides',
          },
          {
            name: dict.common.releases,
            href: '/releases',
            description: 'Latest updates and changelog',
          },
        ],
      },
      {
        name: dict.common.about,
        href: '/about',
      },
    ],

    // Footerセクション
    footer: {
      product: [
        { name: dict.common.blog, href: '/blog' },
        { name: dict.common.docs, href: '/docs' },
        { name: dict.common.releases, href: '/releases' },
      ],
      company: [
        { name: dict.common.about, href: '/about' },
        { name: dict.common.contact, href: '/contact' },
      ],
    },
  }
}
