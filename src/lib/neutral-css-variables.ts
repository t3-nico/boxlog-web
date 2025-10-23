/**
 * Neutral Color System CSS Variables Generator
 * Based on Compass colors-neutral.ts with generateNeutralCSSVariables function
 */

// Neutral color palette (from Compass)
const neutralColors = {
  neutral: {
    0: '#ffffff',
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
    1000: '#000000',
  },
  semantic: {
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      500: '#22c55e',
      600: '#16a34a',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      500: '#f59e0b',
      600: '#d97706',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444',
      600: '#dc2626',
      900: '#7f1d1d',
    },
  }
} as const

// Light mode theme
const lightModeNeutral = {
  background: {
    primary: neutralColors.neutral[0],
    secondary: neutralColors.neutral[50],
    tertiary: neutralColors.neutral[100],
    elevated: neutralColors.neutral[0],
  },
  text: {
    primary: neutralColors.neutral[900],
    secondary: neutralColors.neutral[600],
    tertiary: neutralColors.neutral[400],
    inverse: neutralColors.neutral[0],
    disabled: neutralColors.neutral[300],
  },
  border: {
    primary: neutralColors.neutral[200],
    secondary: neutralColors.neutral[300],
    focus: neutralColors.neutral[500],
  },
  button: {
    primary: {
      default: {
        background: neutralColors.neutral[900],
        text: neutralColors.neutral[0],
      },
      hover: {
        background: neutralColors.neutral[800],
        text: neutralColors.neutral[0],
      },
      active: {
        background: neutralColors.neutral[950],
        text: neutralColors.neutral[0],
      },
    },
    secondary: {
      default: {
        background: neutralColors.neutral[100],
        text: neutralColors.neutral[900],
      },
      hover: {
        background: neutralColors.neutral[200],
        text: neutralColors.neutral[900],
      },
      active: {
        background: neutralColors.neutral[300],
        text: neutralColors.neutral[900],
      },
    },
    ghost: {
      default: {
        background: 'transparent',
        text: neutralColors.neutral[600],
      },
      hover: {
        background: neutralColors.neutral[100],
        text: neutralColors.neutral[600],
      },
      active: {
        background: neutralColors.neutral[200],
        text: neutralColors.neutral[700],
      },
    },
  },
  input: {
    background: neutralColors.neutral[0],
    text: neutralColors.neutral[900],
    placeholder: neutralColors.neutral[400],
    border: neutralColors.neutral[300],
    borderFocus: neutralColors.neutral[500],
  },
}

// Dark mode theme
const darkModeNeutral = {
  background: {
    primary: neutralColors.neutral[950],
    secondary: neutralColors.neutral[900],
    tertiary: neutralColors.neutral[800],
    elevated: neutralColors.neutral[800],
  },
  text: {
    primary: neutralColors.neutral[50],
    secondary: neutralColors.neutral[300],
    tertiary: neutralColors.neutral[500],
    inverse: neutralColors.neutral[900],
    disabled: neutralColors.neutral[600],
  },
  border: {
    primary: neutralColors.neutral[700],
    secondary: neutralColors.neutral[600],
    focus: neutralColors.neutral[400],
  },
  button: {
    primary: {
      default: {
        background: neutralColors.neutral[100],
        text: neutralColors.neutral[900],
      },
      hover: {
        background: neutralColors.neutral[200],
        text: neutralColors.neutral[900],
      },
      active: {
        background: neutralColors.neutral[0],
        text: neutralColors.neutral[900],
      },
    },
    secondary: {
      default: {
        background: neutralColors.neutral[800],
        text: neutralColors.neutral[100],
      },
      hover: {
        background: neutralColors.neutral[700],
        text: neutralColors.neutral[100],
      },
      active: {
        background: neutralColors.neutral[600],
        text: neutralColors.neutral[50],
      },
    },
    ghost: {
      default: {
        background: 'transparent',
        text: neutralColors.neutral[300],
      },
      hover: {
        background: neutralColors.neutral[800],
        text: neutralColors.neutral[300],
      },
      active: {
        background: neutralColors.neutral[700],
        text: neutralColors.neutral[200],
      },
    },
  },
  input: {
    background: neutralColors.neutral[900],
    text: neutralColors.neutral[100],
    placeholder: neutralColors.neutral[500],
    border: neutralColors.neutral[600],
    borderFocus: neutralColors.neutral[400],
  },
}

// Semantic theme
const semanticTheme = {
  light: {
    success: {
      background: neutralColors.semantic.success[50],
      text: neutralColors.semantic.success[900],
    },
    warning: {
      background: neutralColors.semantic.warning[50],
      text: neutralColors.semantic.warning[900],
    },
    error: {
      background: neutralColors.semantic.error[50],
      text: neutralColors.semantic.error[900],
    },
  },
  dark: {
    success: {
      background: neutralColors.semantic.success[900],
      text: neutralColors.semantic.success[100],
    },
    warning: {
      background: neutralColors.semantic.warning[900],
      text: neutralColors.semantic.warning[100],
    },
    error: {
      background: neutralColors.semantic.error[900],
      text: neutralColors.semantic.error[100],
    },
  },
}

// CSS variables generation
export function generateNeutralCSSVariables(isDarkMode: boolean = false) {
  const mode = isDarkMode ? darkModeNeutral : lightModeNeutral
  const semantic = isDarkMode ? semanticTheme.dark : semanticTheme.light
  const cssVars: Record<string, string> = {}
  
  // Background variables
  Object.entries(mode.background).forEach(([key, value]) => {
    cssVars[`--background-${key}`] = value
  })
  
  // Text variables
  Object.entries(mode.text).forEach(([key, value]) => {
    cssVars[`--text-${key}`] = value
  })
  
  // Border variables
  Object.entries(mode.border).forEach(([key, value]) => {
    cssVars[`--border-${key}`] = value
  })
  
  // Button variables
  Object.entries(mode.button).forEach(([variant, states]) => {
    Object.entries(states as Record<string, Record<string, string>>).forEach(([state, colors]) => {
      Object.entries(colors).forEach(([property, value]) => {
        cssVars[`--button-${variant}-${state}-${property}`] = value
      })
    })
  })
  
  // Input variables
  Object.entries(mode.input).forEach(([key, value]) => {
    cssVars[`--input-${key}`] = value
  })
  
  // Semantic variables
  Object.entries(semantic).forEach(([category, colors]) => {
    Object.entries(colors as Record<string, string>).forEach(([key, value]) => {
      cssVars[`--semantic-${category}-${key}`] = value
    })
  })
  
  return cssVars
}

// Export types
export type NeutralColorKey = keyof typeof neutralColors.neutral
export type SemanticColorCategory = keyof typeof neutralColors.semantic