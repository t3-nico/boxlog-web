'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { LazySearchDialog } from '@/components/search/LazySearchDialog'
import { Search, Menu } from '@/lib/icons'
import type { Dictionary } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface HeaderProps {
  locale: string
  dict: Dictionary
}

export function Header({ locale, dict }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: dict.common.features, href: '/features' },
    { name: dict.common.pricing, href: '/pricing' },
    {
      name: 'Resources',
      items: [
        { name: dict.common.docs, href: '/docs', description: 'Documentation and guides' },
        { name: dict.common.blog, href: '/blog', description: 'Latest articles and tutorials' },
        { name: dict.common.releases, href: '/releases', description: 'Release notes and changelog' },
      ]
    },
    { name: dict.common.about, href: '/about' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        isScrolled && 'shadow-sm'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center space-x-2"
        >
          <span className="text-xl font-bold">BoxLog</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navigation.map((item) => (
              <NavigationMenuItem key={item.name}>
                {'items' in item ? (
                  <>
                    <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                        {item.items.map((subItem) => (
                          <li key={subItem.name}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={`/${locale}${subItem.href}`}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {subItem.name}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {subItem.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link href={`/${locale}${item.href}`} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {item.name}
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-2">
          {/* Search Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSearchOpen(true)}
            className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
          >
            <Search className="h-4 w-4 xl:mr-2" aria-hidden="true" />
            <span className="hidden xl:inline-flex">{dict.common.search}...</span>
            <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>

          <LanguageSwitcher currentLocale={locale} />
          <ThemeToggle />

          <Button variant="ghost" asChild>
            <Link href={`/${locale}/contact`}>
              {dict.common.contact || 'Contact'}
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">{dict.common.search}</span>
          </Button>

          <LanguageSwitcher currentLocale={locale} />
          <ThemeToggle />

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-6">
                {navigation.map((item) => (
                  'items' in item ? (
                    <div key={item.name} className="space-y-2">
                      <div className="font-medium text-sm text-muted-foreground px-2">
                        {item.name}
                      </div>
                      <div className="space-y-1 pl-4">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={`/${locale}${subItem.href}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-2 py-1.5 text-sm rounded-md hover:bg-accent"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={`/${locale}${item.href}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-2 py-1.5 text-sm font-medium rounded-md hover:bg-accent"
                    >
                      {item.name}
                    </Link>
                  )
                ))}
                <div className="pt-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <Link
                      href={`/${locale}/contact`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {dict.common.contact || 'Contact'}
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Search Dialog */}
      <LazySearchDialog
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        dict={dict}
        locale={locale}
      />
    </header>
  )
}
