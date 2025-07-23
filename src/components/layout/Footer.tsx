import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Twitter, Github, Linkedin } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n'

const socialLinks = [
  {
    name: 'Twitter',
    href: '#',
    icon: <Twitter className="h-6 w-6" />,
  },
  {
    name: 'GitHub',
    href: '#',
    icon: <Github className="h-6 w-6" />,
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: <Linkedin className="h-6 w-6" />,
  },
]

interface FooterProps {
  locale: string
  dict: Dictionary
}

export function Footer({ locale, dict }: FooterProps) {
  const navigation = {
    product: [
      { name: dict.common.features, href: '/features' },
      { name: dict.common.pricing, href: '/pricing' },
      { name: locale === 'jp' ? 'インテグレーション' : 'Integrations', href: '/integrations' },
      { name: 'API', href: '/api' },
      { name: dict.common.releases, href: '/releases' },
    ],
    company: [
      { name: dict.common.about, href: '/about' },
      { name: dict.common.blog, href: '/blog' },
      { name: locale === 'jp' ? 'キャリア' : 'Careers', href: '/careers' },
      { name: dict.common.contact, href: '/contact' },
      { name: locale === 'jp' ? 'パートナー' : 'Partners', href: '/partners' },
    ],
    resources: [
      { name: dict.common.docs, href: '/docs' },
      { name: locale === 'jp' ? 'ヘルプセンター' : 'Help Center', href: '/help' },
      { name: locale === 'jp' ? 'ガイド' : 'Guides', href: '/guides' },
      { name: locale === 'jp' ? 'コミュニティ' : 'Community', href: '/community' },
      { name: locale === 'jp' ? 'ステータス' : 'Status', href: '/status' },
    ],
    legal: [
      { name: dict.footer.privacyPolicy, href: '/privacy' },
      { name: dict.footer.termsOfService, href: '/terms' },
      { name: dict.footer.cookiePolicy, href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
      { name: locale === 'jp' ? 'セキュリティ' : 'Security', href: '/security' },
    ],
  }
  return (
    <footer className="bg-bg-tertiary" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container>
        <div className="py-16">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company info */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <Link
                href={`/${locale}`}
                className="text-2xl font-bold text-text-primary hover:text-text-secondary transition-colors"
              >
                YourSaaS
              </Link>
              <p className="mt-4 text-base text-text-tertiary max-w-md">
                {dict.pages.home.subtitle}
              </p>
            </div>

            {/* Product */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-text-primary tracking-wider uppercase">
                {locale === 'jp' ? '製品' : 'Product'}
              </h3>
              <ul className="mt-4 space-y-2">
                {navigation.product.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={`/${locale}${item.href}`}
                      className="text-base text-text-tertiary hover:text-text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-text-primary tracking-wider uppercase">
                {locale === 'jp' ? '会社' : 'Company'}
              </h3>
              <ul className="mt-4 space-y-2">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={`/${locale}${item.href}`}
                      className="text-base text-text-tertiary hover:text-text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-text-primary tracking-wider uppercase">
                {locale === 'jp' ? 'リソース' : 'Resources'}
              </h3>
              <ul className="mt-4 space-y-2">
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={`/${locale}${item.href}`}
                      className="text-base text-text-tertiary hover:text-text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-text-primary tracking-wider uppercase">
                {locale === 'jp' ? '法的事項' : 'Legal'}
              </h3>
              <ul className="mt-4 space-y-2">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={`/${locale}${item.href}`}
                      className="text-base text-text-tertiary hover:text-text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-12 pt-8 border-t border-border-secondary">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Copyright */}
              <p className="text-base text-text-tertiary">
                &copy; {new Date().getFullYear()} YourSaaS, Inc. {dict.footer.copyright}
              </p>

              {/* Social links */}
              <div className="mt-4 md:mt-0">
                <div className="flex space-x-6">
                  {socialLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-text-tertiary hover:text-text-primary transition-colors"
                    >
                      <span className="sr-only">{item.name}</span>
                      {item.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}