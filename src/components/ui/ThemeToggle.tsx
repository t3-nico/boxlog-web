'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="w-9 h-9 p-0"
        disabled
      >
        <span className="sr-only">テーマを切り替え</span>
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="w-9 h-9 p-0 border-border-primary hover:border-border-secondary"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="テーマを切り替え"
    >
      {theme === 'dark' ? (
        <Sun 
          className="h-4 w-4 text-accent-warning transition-all duration-200" 
          aria-hidden="true" 
        />
      ) : (
        <Moon 
          className="h-4 w-4 text-text-secondary transition-all duration-200" 
          aria-hidden="true" 
        />
      )}
      <span className="sr-only">
        {theme === 'dark' ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
      </span>
    </Button>
  )
}