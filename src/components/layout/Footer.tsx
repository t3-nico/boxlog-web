import Link from 'next/link'
import { Container } from '@/components/ui'
import { Twitter, Github, Linkedin } from 'lucide-react'

const navigation = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Integrations', href: '/integrations' },
    { name: 'API', href: '/api' },
    { name: 'Releases', href: '/releases' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
    { name: 'Partners', href: '/partners' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Help Center', href: '/help' },
    { name: 'Guides', href: '/guides' },
    { name: 'Community', href: '/community' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' },
    { name: 'Security', href: '/security' },
  ],
}

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

export function Footer() {
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
                href="/"
                className="text-2xl font-bold text-text-primary hover:text-text-secondary transition-colors"
              >
                YourSaaS
              </Link>
              <p className="mt-4 text-base text-text-tertiary max-w-md">
                Build your next SaaS product with confidence. Transform your ideas into reality 
                with our powerful platform and enterprise-grade tools.
              </p>
            </div>

            {/* Product */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-text-primary tracking-wider uppercase">
                Product
              </h3>
              <ul className="mt-4 space-y-3">
                {navigation.product.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
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
                Company
              </h3>
              <ul className="mt-4 space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
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
                Resources
              </h3>
              <ul className="mt-4 space-y-3">
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
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
                Legal
              </h3>
              <ul className="mt-4 space-y-3">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
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
                &copy; {new Date().getFullYear()} YourSaaS, Inc. All rights reserved.
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