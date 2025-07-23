'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { locales, type Locale, getLocaleConfig, isValidLocale } from '@/lib/i18n'
import { Globe } from '@/lib/icons'
import { useLocale, setLocale } from '@/hooks/useLocale'

interface LanguageSwitcherProps {
  className?: string
  currentLocale?: string
}

export function LanguageSwitcher({ className, currentLocale: providedLocale }: LanguageSwitcherProps) {
  const hookLocale = useLocale()
  const currentLocaleString = providedLocale || hookLocale
  const currentLocale = isValidLocale(currentLocaleString) ? currentLocaleString : 'en'
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale)
    // Force a page reload to apply the new locale
    window.location.reload()
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

  const currentConfig = getLocaleConfig(currentLocale)

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
            className={`cursor-pointer ${currentLocale === locale.code ? 'bg-accent' : ''}`}
          >
            <span className="flex items-center gap-2">
              <span className="text-sm font-medium">{locale.nativeName}</span>
              {currentLocale === locale.code && (
                <span className="text-xs text-muted-foreground">✓</span>
              )}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}