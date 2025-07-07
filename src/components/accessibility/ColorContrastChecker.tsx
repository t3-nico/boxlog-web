'use client'

import { useEffect, useState, createContext, useContext, ReactNode, useCallback } from 'react'

interface ColorContrastResult {
  ratio: number
  level: 'AAA' | 'AA' | 'A' | 'FAIL'
  foreground: string
  background: string
  isValid: boolean
}

interface ColorContrastContextType {
  checkContrast: (foreground: string, background: string, fontSize?: number) => ColorContrastResult
  validatePage: () => Promise<ColorContrastResult[]>
  getContrastIssues: () => ColorContrastResult[]
}

const ColorContrastContext = createContext<ColorContrastContextType | null>(null)

export function useColorContrast() {
  const context = useContext(ColorContrastContext)
  if (!context) {
    throw new Error('useColorContrast must be used within a ColorContrastProvider')
  }
  return context
}

interface ColorContrastProviderProps {
  children: ReactNode
  autoCheck?: boolean
}

export function ColorContrastProvider({ children, autoCheck = true }: ColorContrastProviderProps) {
  const [contrastIssues, setContrastIssues] = useState<ColorContrastResult[]>([])

  const hexToRgb = useCallback((hex: string): [number, number, number] | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : null
  }, [])

  const rgbStringToArray = useCallback((rgb: string): [number, number, number] | null => {
    const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    return match ? [
      parseInt(match[1], 10),
      parseInt(match[2], 10),
      parseInt(match[3], 10)
    ] : null
  }, [])

  const parseColor = useCallback((color: string): [number, number, number] | null => {
    if (color.startsWith('#')) {
      return hexToRgb(color)
    } else if (color.startsWith('rgb')) {
      return rgbStringToArray(color)
    }
    return null
  }, [hexToRgb, rgbStringToArray])

  const getLuminance = useCallback((r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }, [])

  const getContrastRatio = useCallback((color1: [number, number, number], color2: [number, number, number]): number => {
    const lum1 = getLuminance(...color1)
    const lum2 = getLuminance(...color2)
    const brightest = Math.max(lum1, lum2)
    const darkest = Math.min(lum1, lum2)
    return (brightest + 0.05) / (darkest + 0.05)
  }, [getLuminance])

  const checkContrast = useCallback((foreground: string, background: string, fontSize: number = 16): ColorContrastResult => {
    const fgColor = parseColor(foreground)
    const bgColor = parseColor(background)

    if (!fgColor || !bgColor) {
      return {
        ratio: 0,
        level: 'FAIL',
        foreground,
        background,
        isValid: false
      }
    }

    const ratio = getContrastRatio(fgColor, bgColor)
    
    // WCAG 2.1 AA requirements
    const isLargeText = fontSize >= 18 || fontSize >= 14 // 14pt bold text is considered large
    const aaThreshold = isLargeText ? 3 : 4.5
    const aaaThreshold = isLargeText ? 4.5 : 7

    let level: 'AAA' | 'AA' | 'A' | 'FAIL'
    if (ratio >= aaaThreshold) {
      level = 'AAA'
    } else if (ratio >= aaThreshold) {
      level = 'AA'
    } else if (ratio >= 3) {
      level = 'A'
    } else {
      level = 'FAIL'
    }

    return {
      ratio: Math.round(ratio * 100) / 100,
      level,
      foreground,
      background,
      isValid: level === 'AA' || level === 'AAA'
    }
  }, [parseColor, getContrastRatio])

  const getComputedColor = (element: Element, property: string): string => {
    const computed = window.getComputedStyle(element)
    return computed.getPropertyValue(property)
  }

  const validatePage = useCallback(async (): Promise<ColorContrastResult[]> => {
    const issues: ColorContrastResult[] = []
    
    // Get all text elements
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button, label, li')
    
    for (let i = 0; i < textElements.length; i++) {
      const element = textElements[i]
      const foreground = getComputedColor(element, 'color')
      const background = getComputedColor(element, 'background-color')
      const fontSize = parseInt(getComputedColor(element, 'font-size'))
      
      // Skip if background is transparent
      if (background === 'rgba(0, 0, 0, 0)' || background === 'transparent') {
        continue
      }

      const result = checkContrast(foreground, background, fontSize)
      
      if (!result.isValid) {
        issues.push({
          ...result,
          foreground,
          background
        })
      }
    }

    setContrastIssues(issues)
    return issues
  }, [checkContrast])

  const getContrastIssues = (): ColorContrastResult[] => {
    return contrastIssues
  }

  useEffect(() => {
    if (autoCheck && process.env.NODE_ENV === 'development') {
      const timer = setTimeout(() => {
        validatePage().then(issues => {
          if (issues.length > 0) {
            console.group('🎨 Color Contrast Issues Found')
            issues.forEach((issue, index) => {
              console.warn(`Issue ${index + 1}:`, {
                ratio: issue.ratio,
                level: issue.level,
                foreground: issue.foreground,
                background: issue.background,
                recommendation: `Minimum ratio needed: ${issue.ratio < 3 ? '3:1' : '4.5:1'}`
              })
            })
            console.groupEnd()
          } else {
            console.log('✅ No color contrast issues found')
          }
        })
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [autoCheck, validatePage])

  const contextValue: ColorContrastContextType = {
    checkContrast,
    validatePage,
    getContrastIssues
  }

  return (
    <ColorContrastContext.Provider value={contextValue}>
      {children}
    </ColorContrastContext.Provider>
  )
}

export function ColorContrastChecker() {
  const { validatePage, getContrastIssues } = useColorContrast()
  const [issues, setIssues] = useState<ColorContrastResult[]>([])

  const handleCheck = async () => {
    const results = await validatePage()
    setIssues(results)
  }

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleCheck}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Check color contrast on this page"
      >
        Check Contrast
      </button>
      
      {issues.length > 0 && (
        <div className="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Contrast Issues: {issues.length}</strong>
          <div className="text-sm mt-1">
            Check console for details
          </div>
        </div>
      )}
    </div>
  )
}

export default ColorContrastProvider