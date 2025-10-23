'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { Navigation } from '@/components/layout/Navigation'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { LazySearchDialog } from '@/components/search/LazySearchDialog'
import { Search } from '@/lib/icons'
import type { Dictionary } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface HeaderProps {
  locale: string
  dict: Dictionary
}

export function Header({ locale, dict }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

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
        <Navigation locale={locale} dict={dict} />

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

        {/* Mobile Actions */}
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

          <MobileMenu locale={locale} dict={dict} />
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
