'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Dialog, DialogPanel, Popover, PopoverButton, PopoverPanel, PopoverGroup } from '@headlessui/react'
import { Menu, X, ChevronDown, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import type { Dictionary } from '@/lib/i18n'
import { getNavigationConfig } from '@/lib/navigation'
import { cn } from '@/lib/utils'

interface HeaderProps {
  locale: string
  dict: Dictionary
}

export function Header({ locale, dict }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigation = getNavigationConfig(dict)

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
        'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow',
        isScrolled && 'shadow-sm'
      )}
    >
      <nav className="mx-auto flex max-w-screen-2xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href={`/${locale}`} className="-m-1.5 p-1.5">
            <span className="sr-only">BoxLog</span>
            <span className="text-lg font-bold">BoxLog</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-8">
          {navigation.main.map((item) => (
            item.items ? (
              <Popover key={item.name} className="relative">
                <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-foreground hover:text-foreground/80 outline-none">
                  {item.name}
                  <ChevronDown className="h-4 w-4 flex-none text-muted-foreground" aria-hidden="true" />
                </PopoverButton>

                <PopoverPanel
                  transition
                  className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-xl bg-popover shadow-lg ring-1 ring-border transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="p-4">
                    {item.items.map((subItem) => (
                      <div
                        key={subItem.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-accent"
                      >
                        <div className="flex-auto">
                          <Link
                            href={`/${locale}${subItem.href}`}
                            className="block font-semibold text-foreground"
                          >
                            {subItem.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-muted-foreground">{subItem.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverPanel>
              </Popover>
            ) : (
              <Link
                key={item.name}
                href={`/${locale}${item.href}`}
                className="text-sm font-semibold leading-6 text-foreground hover:text-foreground/80"
              >
                {item.name}
              </Link>
            )
          ))}
        </PopoverGroup>

        {/* Right side actions */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Search className="h-4 w-4" />
            <span className="sr-only">{dict.common.search}</span>
          </Button>

          <LanguageSwitcher currentLocale={locale} />
          <ThemeToggle />

          <Button variant="ghost" size="sm" asChild>
            <Link href={`/${locale}/contact`}>
              {dict.common.contact || 'Contact'}
            </Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border">
          <div className="flex items-center justify-between">
            <Link href={`/${locale}`} className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">BoxLog</span>
              <span className="text-lg font-bold">BoxLog</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-foreground"
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-border">
              <div className="space-y-2 py-6">
                {navigation.main.map((item) => (
                  item.items ? (
                    <div key={item.name} className="space-y-2">
                      <div className="px-3 py-2 text-base font-semibold leading-7 text-foreground">
                        {item.name}
                      </div>
                      <div className="space-y-2 pl-4">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={`/${locale}${subItem.href}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block rounded-lg py-2 px-3 text-sm leading-7 text-foreground hover:bg-accent"
                          >
                            <div className="font-semibold">{subItem.name}</div>
                            <div className="text-xs text-muted-foreground">{subItem.description}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={`/${locale}${item.href}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-accent"
                    >
                      {item.name}
                    </Link>
                  )
                ))}
              </div>

              <div className="py-6 space-y-2">
                <div className="flex items-center gap-2 px-3">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">{dict.common.search}</span>
                  </Button>
                  <LanguageSwitcher currentLocale={locale} />
                  <ThemeToggle />
                </div>

                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/${locale}/contact`} onClick={() => setMobileMenuOpen(false)}>
                    {dict.common.contact || 'Contact'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
