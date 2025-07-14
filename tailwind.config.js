/** @type {import('tailwindcss').Config} */
module.exports = {
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
        
        // New unified color system
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
        'accent': {
          'primary': 'rgb(var(--accent-primary) / <alpha-value>)',
          'secondary': 'rgb(var(--accent-secondary) / <alpha-value>)',
          'success': 'rgb(var(--accent-success) / <alpha-value>)',
          'warning': 'rgb(var(--accent-warning) / <alpha-value>)',
          'error': 'rgb(var(--accent-error) / <alpha-value>)',
        },
        'surface': {
          'elevated': 'rgb(var(--surface-elevated) / <alpha-value>)',
          'card': 'rgb(var(--surface-card) / <alpha-value>)',
          'overlay': 'rgb(var(--surface-overlay) / <alpha-value>)',
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