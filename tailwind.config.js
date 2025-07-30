/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Existing shadcn/ui colors (maintained for compatibility)
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        
        // Compass Neutral Color System Integration
        // Neutral color palette
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
        
        // Background colors (theme-aware)
        'bg-primary': 'var(--background-primary)',
        'bg-secondary': 'var(--background-secondary)',
        'bg-tertiary': 'var(--background-tertiary)',
        'bg-elevated': 'var(--background-elevated)',
        
        // Text colors (theme-aware)
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'text-inverse': 'var(--text-inverse)',
        'text-disabled': 'var(--text-disabled)',
        
        // Border colors (theme-aware)
        'border-primary': 'var(--border-primary)',
        'border-secondary': 'var(--border-secondary)',
        'border-focus': 'var(--border-focus)',
        
        // Button colors - Primary
        'btn-primary': 'var(--button-primary-default-background)',
        'btn-primary-hover': 'var(--button-primary-hover-background)',
        'btn-primary-active': 'var(--button-primary-active-background)',
        'btn-primary-text': 'var(--button-primary-default-text)',
        
        // Button colors - Secondary
        'btn-secondary': 'var(--button-secondary-default-background)',
        'btn-secondary-hover': 'var(--button-secondary-hover-background)',
        'btn-secondary-active': 'var(--button-secondary-active-background)',
        'btn-secondary-text': 'var(--button-secondary-default-text)',
        
        // Button colors - Ghost
        'btn-ghost': 'var(--button-ghost-default-background)',
        'btn-ghost-hover': 'var(--button-ghost-hover-background)',
        'btn-ghost-active': 'var(--button-ghost-active-background)',
        'btn-ghost-text': 'var(--button-ghost-default-text)',
        
        // Form elements
        'input-bg': 'var(--input-background)',
        'input-border': 'var(--input-border)',
        'input-focus': 'var(--input-borderFocus)',
        'input-text': 'var(--input-text)',
        'input-placeholder': 'var(--input-placeholder)',
        
        // Semantic colors
        'semantic-success-bg': 'var(--semantic-success-background)',
        'semantic-success-text': 'var(--semantic-success-text)',
        'semantic-warning-bg': 'var(--semantic-warning-background)',
        'semantic-warning-text': 'var(--semantic-warning-text)',
        'semantic-error-bg': 'var(--semantic-error-background)',
        'semantic-error-text': 'var(--semantic-error-text)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      // Button animations from neutral system
      animation: {
        'button-press': 'button-press 0.1s ease-in-out',
      },
      keyframes: {
        'button-press': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.98)' },
          '100%': { transform: 'scale(1)' }
        }
      }
    },
  },
  plugins: [],
}