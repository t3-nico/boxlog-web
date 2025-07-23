'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { LazySearchDialog } from '@/components/search/LazySearchDialog'
import { Search, X, Menu } from '@/lib/icons'
import type { Dictionary } from '@/lib/i18n'

interface HeaderProps {
  locale: string
  dict: Dictionary
}

export function Header({ locale, dict }: HeaderProps) {
  const navigation = [
    { name: dict.common.features, href: '/features' },
    { name: dict.common.pricing, href: '/pricing' },
    { name: dict.common.docs, href: '/docs' },
    { name: dict.common.releases, href: '/releases' },
    { name: dict.common.blog, href: '/blog' },
    { name: dict.common.tags, href: '/tags' },
    { name: dict.common.about, href: '/about' },
  ]
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
      id="navigation"
      className="fixed top-0 left-0 right-0 z-[9999] bg-bg-primary/95 backdrop-blur-sm"
      role="banner"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <Link
              href={`/${locale}`}
              className="text-xl font-bold text-text-primary hover:text-text-secondary transition-colors"
            >
              YourSaaS
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 ml-10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={`/${locale}${item.href}`}
                  className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center">
            {/* Global search button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 min-w-[200px] justify-start text-text-secondary border-border-primary hover:border-border-secondary focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 mr-4"
              aria-label="Open search dialog"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm">{dict.common.search}...</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-bg-tertiary px-1.5 font-mono text-[10px] font-medium text-text-secondary opacity-100 border-border-primary">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
            
            <Button 
              variant="ghost" 
              className="text-text-secondary hover:text-text-primary hover:bg-bg-tertiary ml-4"
              asChild
            >
              <Link href={`/${locale}/login`}>
                {dict.common.login}
              </Link>
            </Button>
            <Button 
              asChild
              style={{
                backgroundColor: 'var(--signup-btn-bg, #171717)',
                color: 'var(--signup-btn-text, #ffffff)',
                border: 'none'
              }}
              className="hover:opacity-90"
            >
              <Link href={`/${locale}/signup`}>
                {dict.common.signup}
              </Link>
            </Button>
            
            <div className="ml-6 flex items-center gap-2">
              <LanguageSwitcher currentLocale={locale} />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile actions */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile search button */}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="p-2"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">{dict.common.search}</span>
            </Button>
            
            <LanguageSwitcher currentLocale={locale} />
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="border-0 bg-transparent hover:bg-bg-tertiary"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-bg-primary border-t border-border-primary shadow-lg">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={`/${locale}${item.href}`}
                  className="block px-3 py-2 text-base font-medium text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 pb-2 border-t border-border-primary space-y-2 px-3">
                <Button 
                  variant="ghost" 
                  className="w-full justify-center text-text-secondary hover:text-text-primary hover:bg-bg-tertiary" 
                  asChild
                >
                  <Link href={`/${locale}/login`} onClick={() => setIsMobileMenuOpen(false)}>
                    {dict.common.login}
                  </Link>
                </Button>
                <Button 
                  className="w-full hover:opacity-90" 
                  style={{
                    backgroundColor: 'var(--signup-btn-bg, #171717)',
                    color: 'var(--signup-btn-text, #ffffff)',
                    border: 'none'
                  }}
                  asChild
                >
                  <Link href={`/${locale}/signup`} onClick={() => setIsMobileMenuOpen(false)}>
                    {dict.common.signup}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Global search dialog */}
      <LazySearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  )
}