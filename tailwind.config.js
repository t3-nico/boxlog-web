/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    // 8pxグリッドシステムの適用
    spacing: {
      0: '0px',
      1: '4px',     // 0.5×8px (最小単位)
      2: '8px',     // 1×8px
      3: '12px',    // 1.5×8px
      4: '16px',    // 2×8px
      5: '20px',    // 2.5×8px
      6: '24px',    // 3×8px
      8: '32px',    // 4×8px
      10: '40px',   // 5×8px
      12: '48px',   // 6×8px
      16: '64px',   // 8×8px
      20: '80px',   // 10×8px
      24: '96px',   // 12×8px
      32: '128px',  // 16×8px
      40: '160px',  // 20×8px
      48: '192px',  // 24×8px
      56: '224px',  // 28×8px
      64: '256px',  // 32×8px
      // .5クラスの8pxグリッド準拠版（非準拠値を準拠値にマップ）
      '0.5': '4px',   // 2px -> 4px
      '1.5': '8px',   // 6px -> 8px  
      '2.5': '12px',  // 10px -> 12px
      '3.5': '16px',  // 14px -> 16px
    },
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
      // 8pxグリッド準拠のボーダー半径
      borderRadius: {
        none: '0px',
        sm: '4px',   // 0.5×8px
        md: '6px',   // 実用性重視
        lg: '8px',   // 1×8px
        xl: '12px',  // 1.5×8px
        '2xl': '16px', // 2×8px
        '3xl': '24px', // 3×8px
        full: '9999px',
        // shadcn/ui互換性のため既存の設定も維持
        'radius-lg': 'var(--radius)',
        'radius-md': 'calc(var(--radius) - 2px)',
        'radius-sm': 'calc(var(--radius) - 4px)',
      },
      // コンポーネント高さ（8pxグリッド準拠）
      height: {
        xs: '24px',    // 3×8px
        sm: '32px',    // 4×8px
        md: '40px',    // 5×8px (標準)
        lg: '48px',    // 6×8px
        xl: '64px',    // 8×8px
        '2xl': '80px', // 10×8px
      },
      // アイコンサイズ（8pxグリッド準拠）
      width: {
        'icon-xs': '12px',  // 1.5×8px
        'icon-sm': '16px',  // 2×8px
        'icon-md': '20px',  // 業界標準
        'icon-lg': '24px',  // 3×8px
        'icon-xl': '32px',  // 4×8px
        'icon-2xl': '40px', // 5×8px
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