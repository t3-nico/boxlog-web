import Link from 'next/link'
import { Twitter, Github, Youtube } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n'
import { getNavigationConfig } from '@/lib/navigation'

interface FooterProps {
  locale: string
  dict: Dictionary
}

export function Footer({ locale, dict }: FooterProps) {
  const navigation = getNavigationConfig(dict)

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
          {/* ブランドセクション */}
          <div className="space-y-8">
            <Link href={`/${locale}`} className="flex items-center">
              <span className="text-2xl font-bold">BoxLog</span>
            </Link>
            <p className="text-sm leading-6 text-balance text-muted-foreground">
              {dict.pages.home.subtitle}
            </p>
            <div className="flex gap-x-6">
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* ナビゲーションリンク */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            {/* Product */}
            <div>
              <h3 className="text-sm font-semibold leading-6">Product</h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.footer.product.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={`/${locale}${item.href}`}
                      className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold leading-6">Company</h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.footer.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={`/${locale}${item.href}`}
                      className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-16 border-t border-border pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <p className="text-sm leading-6 text-muted-foreground">
              &copy; {new Date().getFullYear()} BoxLog, Inc. All rights reserved.
            </p>
            <div className="flex gap-x-6">
              <Link
                href={`/${locale}/privacy`}
                className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
