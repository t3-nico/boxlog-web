'use client'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

const themeOptions = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
] as const

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = themeOptions.find((t) => t.value === theme) || themeOptions[2]
  const CurrentIcon = currentTheme.icon

  if (!mounted) {
    return (
      <button
        className="border-border text-muted-foreground flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm"
        disabled
      >
        <Sun className="size-4" />
        <ChevronDown className="size-3" />
      </button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="border-border text-muted-foreground hover:bg-state-hover hover:text-foreground flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors"
          aria-label="Change theme"
        >
          <CurrentIcon className="size-4" />
          <ChevronDown className="size-3" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themeOptions.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={theme === option.value}
            onCheckedChange={() => setTheme(option.value)}
          >
            <span className="flex items-center gap-2">
              <option.icon className="size-4" />
              {option.label}
            </span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
