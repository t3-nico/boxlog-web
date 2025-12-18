'use client'

import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { ChevronDown, Menu, Search, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

interface HeaderProps {
  locale: string
}

export function Header({ locale }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const t = useTranslations('common')

  const navigation = {
    main: [
      { name: t('navigation.features'), href: '/features' },
      { name: t('navigation.pricing'), href: '/pricing' },
      {
        name: t('navigation.resources'),
        items: [
          { name: t('navigation.blog'), href: '/blog', description: t('navigation.blogDescription') },
          { name: t('navigation.docs'), href: '/docs', description: t('navigation.docsDescription') },
          { name: t('navigation.releases'), href: '/releases', description: t('navigation.releasesDescription') },
        ],
      },
      { name: t('navigation.about'), href: '/about' },
    ],
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur transition-shadow',
        isScrolled && 'shadow-sm'
      )}
    >
      <nav className="mx-auto flex max-w-screen-2xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">BoxLog</span>
            <span className="text-lg font-bold">BoxLog</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="text-foreground -m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.main.map((item) =>
            item.items ? (
              <DropdownMenuPrimitive.Root key={item.name}>
                <DropdownMenuPrimitive.Trigger className="text-foreground hover:text-foreground/80 flex items-center gap-x-1 text-sm leading-6 font-semibold outline-none">
                  {item.name}
                  <ChevronDown className="text-muted-foreground h-4 w-4 flex-none" aria-hidden="true" />
                </DropdownMenuPrimitive.Trigger>

                <DropdownMenuPrimitive.Portal>
                  <DropdownMenuPrimitive.Content
                    className="bg-popover ring-border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-50 mt-3 w-screen max-w-md overflow-hidden rounded-xl p-4 shadow-lg ring-1"
                    sideOffset={8}
                    align="start"
                  >
                    {item.items.map((subItem) => (
                      <DropdownMenuPrimitive.Item key={subItem.name} asChild>
                        <Link
                          href={subItem.href}
                          className="group hover:bg-accent relative flex cursor-pointer items-center gap-x-6 rounded-lg p-4 text-sm leading-6 outline-none"
                        >
                          <div className="flex-auto">
                            <span className="text-foreground block font-semibold">{subItem.name}</span>
                            <p className="text-muted-foreground mt-1">{subItem.description}</p>
                          </div>
                        </Link>
                      </DropdownMenuPrimitive.Item>
                    ))}
                  </DropdownMenuPrimitive.Content>
                </DropdownMenuPrimitive.Portal>
              </DropdownMenuPrimitive.Root>
            ) : (
              <Link
                key={item.name}
                href={item.href!}
                className="text-foreground hover:text-foreground/80 text-sm leading-6 font-semibold"
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* Right side actions */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Search className="h-4 w-4" />
            <span className="sr-only">{t('actions.search')}</span>
          </Button>

          <LanguageSwitcher currentLocale={locale} />
          <ThemeToggle />

          <Button variant="ghost" size="sm" asChild>
            <Link href="/contact">{t('navigation.contact')}</Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu - Using Radix Dialog */}
      <DialogPrimitive.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/20 lg:hidden" />
          <DialogPrimitive.Content className="bg-background sm:ring-border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 duration-300 sm:max-w-sm sm:ring-1 lg:hidden">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">BoxLog</span>
                <span className="text-lg font-bold">BoxLog</span>
              </Link>
              <DialogPrimitive.Close className="text-foreground -m-2.5 rounded-md p-2.5">
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </DialogPrimitive.Close>
            </div>

            <div className="mt-6 flow-root">
              <div className="divide-border -my-6 divide-y">
                <div className="space-y-2 py-6">
                  {navigation.main.map((item) =>
                    item.items ? (
                      <div key={item.name} className="space-y-2">
                        <div className="text-foreground px-3 py-2 text-base leading-7 font-semibold">{item.name}</div>
                        <div className="space-y-2 pl-4">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-foreground hover:bg-accent block rounded-lg px-3 py-2 text-sm leading-7"
                            >
                              <div className="font-semibold">{subItem.name}</div>
                              <div className="text-muted-foreground text-xs">{subItem.description}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href!}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-foreground hover:bg-accent -mx-3 block rounded-lg px-3 py-2 text-base leading-7 font-semibold"
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                </div>

                <div className="space-y-2 py-6">
                  <div className="flex items-center gap-2 px-3">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Search className="h-4 w-4" />
                      <span className="sr-only">{t('actions.search')}</span>
                    </Button>
                    <LanguageSwitcher currentLocale={locale} />
                    <ThemeToggle />
                  </div>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                      {t('navigation.contact')}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </header>
  )
}
