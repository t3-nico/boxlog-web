'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { Globe } from '@/lib/icons'
import * as React from 'react'

interface LanguageSwitcherProps {
  className?: string
  currentLocale?: string
}

const localeNames: Record<Locale, { name: string; nativeName: string }> = {
  en: { name: 'English', nativeName: 'English' },
  ja: { name: 'Japanese', nativeName: '日本語' },
}

export function LanguageSwitcher({ className, currentLocale: providedLocale }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  const currentLocale = (providedLocale || 'en') as Locale
  const validCurrentLocale = routing.locales.includes(currentLocale) ? currentLocale : routing.defaultLocale

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale })
  }

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className={`h-8 w-8 p-0 ${className}`} disabled>
        <Globe className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={`h-8 w-8 p-0 ${className}`} aria-label="Change language">
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            className={`cursor-pointer ${validCurrentLocale === locale ? 'bg-accent' : ''}`}
          >
            <span className="flex items-center gap-2">
              <span className="text-sm font-medium">{localeNames[locale].nativeName}</span>
              {validCurrentLocale === locale && <span className="text-muted-foreground text-xs">✓</span>}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
