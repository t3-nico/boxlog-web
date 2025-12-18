'use client'

import { Link } from '@/i18n/navigation'
import { Github, Twitter, Youtube } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface FooterProps {
  locale: string
}

export function Footer({ locale: _locale }: FooterProps) {
  const t = useTranslations()

  const navigation = {
    product: [
      { name: t('common.navigation.blog'), href: '/blog' },
      { name: t('common.navigation.docs'), href: '/docs' },
      { name: t('common.navigation.releases'), href: '/releases' },
    ],
    company: [
      { name: t('common.navigation.about'), href: '/about' },
      { name: t('common.navigation.contact'), href: '/contact' },
    ],
  }

  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: Twitter,
    },
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: Github,
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com',
      icon: Youtube,
    },
  ]

  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand section */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold">BoxLog</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-6 text-balance">{t('marketing.hero.subtitle')}</p>
            <div className="flex gap-x-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            {/* Product */}
            <div>
              <h3 className="text-sm leading-6 font-semibold">{t('footer.sections.product')}</h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.product.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground text-sm leading-6 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm leading-6 font-semibold">{t('footer.sections.company')}</h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground text-sm leading-6 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-border mt-16 border-t pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted-foreground text-sm leading-6">
              &copy; {new Date().getFullYear()} BoxLog, Inc. {t('footer.legal.copyright')}
            </p>
            <div className="flex gap-x-6">
              <Link
                href="/legal/privacy"
                className="text-muted-foreground hover:text-foreground text-sm leading-6 transition-colors"
              >
                {t('footer.legal.privacyPolicy')}
              </Link>
              <Link
                href="/legal/terms"
                className="text-muted-foreground hover:text-foreground text-sm leading-6 transition-colors"
              >
                {t('footer.legal.termsOfService')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
