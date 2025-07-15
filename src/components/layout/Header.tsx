'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button, Container } from '@/components/ui'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { SearchDialog } from '@/components/search/SearchDialog'
import { Search, X, Menu } from 'lucide-react'

const navigation = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Docs', href: '/docs' },
  { name: 'Releases', href: '/releases' },
  { name: 'Blog', href: '/blog' },
  { name: 'Tags', href: '/tags' },
  { name: 'About', href: '/about' },
]

export function Header() {
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
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-text-primary hover:text-text-secondary transition-colors"
            >
              YourSaaS
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Global search button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 min-w-[200px] justify-start text-text-secondary border-border-primary hover:border-border-secondary focus:ring-2 focus:ring-accent-primary focus:ring-offset-2"
              aria-label="Open search dialog"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm">Search...</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-bg-tertiary px-1.5 font-mono text-[10px] font-medium text-text-secondary opacity-100 border-border-primary">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
            
            <ThemeToggle />
            
            <Link
              href="/login"
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              Login
            </Link>
            <Button asChild>
              <Link href="/signup">
                Sign Up
              </Link>
            </Button>
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
              <span className="sr-only">Search</span>
            </Button>
            
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
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 pb-2 border-t border-border-primary space-y-2">
                <Link
                  href="/login"
                  className="block px-3 py-2 text-base font-medium text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <div className="px-3">
                  <Button size="sm" className="w-full" asChild>
                    <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
      
      {/* Global search dialog */}
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  )
}