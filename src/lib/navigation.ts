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

export function getNavigationConfig(dict: Dictionary) {
  return {
    // メインナビゲーション（Header用）
    main: [
      {
        name: dict.common.features || 'Features',
        href: '/features'
      },
      {
        name: dict.common.pricing || 'Pricing',
        href: '/pricing'
      },
      {
        name: 'Resources',
        items: [
          {
            name: dict.common.blog,
            href: '/blog',
            description: 'Read our latest articles and tutorials'
          },
          {
            name: dict.common.docs,
            href: '/docs',
            description: 'Documentation and guides'
          },
          {
            name: dict.common.releases,
            href: '/releases',
            description: 'Latest updates and changelog'
          },
        ]
      },
      {
        name: dict.common.about,
        href: '/about'
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
    }
  }
}
