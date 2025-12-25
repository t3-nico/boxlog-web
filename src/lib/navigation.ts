export interface NavItem {
  name: string;
  href?: string;
  description?: string;
  items?: NavItem[];
}

export interface NavSection {
  name: string;
  items: NavItem[];
}

// Navigation types for docs sidebar
export interface NavigationItem {
  title: string;
  href?: string;
  items?: NavigationItem[];
  badge?: string;
  external?: boolean;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

// Generate docs navigation structure
export function generateDocsNavigation(): NavigationSection[] {
  return [
    {
      title: 'Getting Started',
      items: [
        { title: 'Introduction', href: '/docs' },
        { title: 'Quick Start', href: '/docs/getting-started/quick-start' },
        { title: 'Installation', href: '/docs/getting-started/installation' },
      ],
    },
    {
      title: 'Guides',
      items: [
        { title: 'Calendar Basics', href: '/docs/guides/calendar-basics' },
        { title: 'Best Practices', href: '/docs/guides/best-practices' },
      ],
    },
    {
      title: 'API Reference',
      items: [
        { title: 'REST API', href: '/docs/api/rest' },
        { title: 'Authentication', href: '/docs/api/rest/authentication' },
      ],
    },
    {
      title: 'SDKs',
      items: [{ title: 'JavaScript SDK', href: '/docs/sdks/javascript' }],
    },
    {
      title: 'Account',
      items: [
        { title: 'Profile', href: '/docs/account/profile' },
        { title: 'Billing', href: '/docs/account/billing' },
      ],
    },
  ];
}
