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
        // Existing shadcn/ui colors
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
        
        // Unified neutral-based color system
        'bg': {
          'primary': 'rgb(var(--bg-primary) / <alpha-value>)',
          'secondary': 'rgb(var(--bg-secondary) / <alpha-value>)',
          'tertiary': 'rgb(var(--bg-tertiary) / <alpha-value>)',
        },
        'text': {
          'primary': 'rgb(var(--text-primary) / <alpha-value>)',
          'secondary': 'rgb(var(--text-secondary) / <alpha-value>)',
          'tertiary': 'rgb(var(--text-tertiary) / <alpha-value>)',
        },
        'border': {
          'primary': 'rgb(var(--border-primary) / <alpha-value>)',
          'secondary': 'rgb(var(--border-secondary) / <alpha-value>)',
        },
        // Semantic colors for meaningful information only
        'error': {
          'color': 'rgb(var(--error-color) / <alpha-value>)',
          'bg': 'rgb(var(--error-bg) / <alpha-value>)',
        },
        'success': {
          'color': 'rgb(var(--success-color) / <alpha-value>)',
          'bg': 'rgb(var(--success-bg) / <alpha-value>)',
        },
        'warning': {
          'color': 'rgb(var(--warning-color) / <alpha-value>)',
          'bg': 'rgb(var(--warning-bg) / <alpha-value>)',
        },
        'link': {
          'color': 'rgb(var(--link-color) / <alpha-value>)',
          'hover': 'rgb(var(--link-hover) / <alpha-value>)',
        },
        'info': {
          'color': 'rgb(var(--info-color) / <alpha-value>)',
          'bg': 'rgb(var(--info-bg) / <alpha-value>)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}