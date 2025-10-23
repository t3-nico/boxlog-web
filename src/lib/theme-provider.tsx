'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { generateNeutralCSSVariables } from '@/lib/neutral-css-variables'

type ThemeProviderProps = {
  children: React.ReactNode
  attribute?: any
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

// Dynamic CSS Variables Component
function DynamicCSSVariables() {
  const { theme, resolvedTheme } = useTheme()
  
  React.useEffect(() => {
    // Wait for theme to be resolved
    if (!resolvedTheme) return
    
    const isDarkMode = resolvedTheme === 'dark'
    const cssVars = generateNeutralCSSVariables(isDarkMode)
    
    // Apply CSS variables to document root
    Object.entries(cssVars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }, [resolvedTheme])
  
  return null
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      {...props}
    >
      <DynamicCSSVariables />
      {children}
    </NextThemesProvider>
  )
}

// Hook for accessing theme context with unified color system support
export { useTheme } from 'next-themes'