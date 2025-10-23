'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from '@/lib/icons'
import type { Dictionary } from '@/lib/i18n'

interface MobileMenuProps {
  locale: string
  dict: Dictionary
}

export function MobileMenu({ locale, dict }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: dict.common.features, href: '/features' },
    { name: dict.common.pricing, href: '/pricing' },
    {
      name: 'Resources',
      items: [
        { name: dict.common.docs, href: '/docs' },
        { name: dict.common.blog, href: '/blog' },
        { name: dict.common.releases, href: '/releases' },
      ]
    },
    { name: dict.common.about, href: '/about' },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
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
                      onClick={() => setIsOpen(false)}
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
                onClick={() => setIsOpen(false)}
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
                onClick={() => setIsOpen(false)}
              >
                {dict.common.contact || 'Contact'}
              </Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
