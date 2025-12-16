'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { locales, type Locale, isValidLocale } from '@/lib/i18n'
import { Globe } from '@/lib/icons'
import { useRouter, usePathname } from 'next/navigation'

interface LanguageSwitcherProps {
  className?: string
  currentLocale?: string
}

export function LanguageSwitcher({
  className,
  currentLocale: providedLocale,
}: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  // Extract current locale from pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  const currentLocale = (providedLocale || pathSegments[0] || 'en') as Locale
  const validCurrentLocale = isValidLocale(currentLocale) ? currentLocale : 'en'

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleLocaleChange = (newLocale: Locale) => {
    // Get the path without the current locale
    const pathWithoutLocale = pathname.startsWith(`/${validCurrentLocale}`)
      ? pathname.slice(`/${validCurrentLocale}`.length) || '/'
      : pathname

    // Create new path with the new locale
    const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`

    // Set locale cookie for persistence
    document.cookie = `locale=${newLocale}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=lax`

    // Navigate to the new path
    router.push(newPath)
  }

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className={`h-8 w-8 p-0 ${className}`}
        disabled
      >
        <Globe className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`h-8 w-8 p-0 ${className}`}
          aria-label="Change language"
        >
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            onClick={() => handleLocaleChange(locale.code)}
            className={`cursor-pointer ${validCurrentLocale === locale.code ? 'bg-accent' : ''}`}
          >
            <span className="flex items-center gap-2">
              <span className="text-sm font-medium">{locale.nativeName}</span>
              {validCurrentLocale === locale.code && (
                <span className="text-xs text-muted-foreground">✓</span>
              )}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
