/**
 * Tailwind CSS用 統合デザインシステム設定
 * タイポグラフィ・スペーシング・カラーを統合したアクセシビリティ重視設定
 */

const { neutralColors } = require('./colors-neutral')

// タイポグラフィ設定をTailwind用に変換
const typography = {
  fontFamily: {
    sans: [
      '"Noto Sans JP"',
      'Inter', 
      '-apple-system',
      'BlinkMacSystemFont',
      '"Hiragino Kaku Gothic ProN"',
      '"Hiragino Sans"',
      '"Yu Gothic Medium"',
      'Meiryo',
      'sans-serif',
    ],
    system: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ],
    mono: [
      '"JetBrains Mono"',
      '"Fira Code"',
      'Consolas',
      '"Liberation Mono"',
      'Menlo',
      'Courier',
      'monospace',
    ],
  },
  
  fontSize: {
    'xs': ['12px', { lineHeight: '18px', letterSpacing: '0.02em' }],
    'sm': ['14px', { lineHeight: '21px', letterSpacing: '0.01em' }],
    'base': ['16px', { lineHeight: '24px', letterSpacing: '0em' }],
    'lg': ['18px', { lineHeight: '27px', letterSpacing: '0em' }],
    'xl': ['20px', { lineHeight: '30px', letterSpacing: '0em' }],
    '2xl': ['24px', { lineHeight: '36px', letterSpacing: '0em' }],
    '3xl': ['28px', { lineHeight: '42px', letterSpacing: '0em' }],
    '4xl': ['32px', { lineHeight: '48px', letterSpacing: '0em' }],
    '5xl': ['40px', { lineHeight: '60px', letterSpacing: '0em' }],
    '6xl': ['48px', { lineHeight: '72px', letterSpacing: '0em' }],
    '7xl': ['56px', { lineHeight: '84px', letterSpacing: '0em' }],
    '8xl': ['64px', { lineHeight: '96px', letterSpacing: '0em' }],
  },
  
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  lineHeight: {
    tight: '1.25',
    normal: '1.5',    // デジタル庁推奨最低
    relaxed: '1.6',
    loose: '1.75',
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.01em',
    wider: '0.02em',
    widest: '0.1em',
  }
}

// スペーシング設定
const spacing = {
  0: '0px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  14: '56px',
  16: '64px',
  18: '72px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
  36: '144px',
  40: '160px',
  44: '176px',
  48: '192px',
  52: '208px',
  56: '224px',
  60: '240px',
  64: '256px',
  72: '288px',
  80: '320px',
  96: '384px',
}

// 角の丸み設定
const borderRadius = {
  none: '0px',
  xs: '2px',
  sm: '4px',
  md: '6px',
  base: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  '4xl': '32px',
  full: '9999px',
}

// コンポーネント固有の高さ
const height = {
  xs: '24px',
  sm: '32px',
  md: '40px',
  base: '44px',
  lg: '48px',
  xl: '56px',
  '2xl': '64px',
  '3xl': '80px',
}

module.exports = {
  // ベースカラーパレット
  colors: {
    // Neutralカラー - メインパレット
    neutral: neutralColors.neutral,
    
    // セマンティックカラー - 最小限
    success: neutralColors.semantic.success,
    warning: neutralColors.semantic.warning,
    error: neutralColors.semantic.error,
  },
  
  // Tailwindのデフォルト設定を拡張
  extend: {
    // タイポグラフィ
    ...typography,
    
    // スペーシング
    spacing,
    
    // 角の丸み
    borderRadius,
    
    // 高さ
    height,
    
    // カラー拡張（CSS変数ベース）
    colors: {
      // 背景色
      'bg-primary': 'var(--background-primary)',
      'bg-secondary': 'var(--background-secondary)',
      'bg-tertiary': 'var(--background-tertiary)',
      'bg-elevated': 'var(--background-elevated)',
      
      // テキスト色
      'text-primary': 'var(--text-primary)',
      'text-secondary': 'var(--text-secondary)',
      'text-tertiary': 'var(--text-tertiary)',
      'text-inverse': 'var(--text-inverse)',
      'text-disabled': 'var(--text-disabled)',
      
      // ボーダー色
      'border-primary': 'var(--border-primary)',
      'border-secondary': 'var(--border-secondary)',
      'border-focus': 'var(--border-focus)',
      
      // ボタン - プライマリ
      'btn-primary': 'var(--button-primary-default-background)',
      'btn-primary-hover': 'var(--button-primary-hover-background)',
      'btn-primary-active': 'var(--button-primary-active-background)',
      'btn-primary-text': 'var(--button-primary-default-text)',
      
      // ボタン - セカンダリ
      'btn-secondary': 'var(--button-secondary-default-background)',
      'btn-secondary-hover': 'var(--button-secondary-hover-background)',
      'btn-secondary-active': 'var(--button-secondary-active-background)',
      'btn-secondary-text': 'var(--button-secondary-default-text)',
      
      // ボタン - ゴースト
      'btn-ghost': 'var(--button-ghost-default-background)',
      'btn-ghost-hover': 'var(--button-ghost-hover-background)',
      'btn-ghost-active': 'var(--button-ghost-active-background)',
      'btn-ghost-text': 'var(--button-ghost-default-text)',
      
      // フォーム要素
      'input-bg': 'var(--input-background)',
      'input-border': 'var(--input-border)',
      'input-focus': 'var(--input-borderFocus)',
      'input-text': 'var(--input-text)',
      'input-placeholder': 'var(--input-placeholder)',
      
      // セマンティック
      'semantic-success-bg': 'var(--semantic-success-background)',
      'semantic-success-text': 'var(--semantic-success-text)',
      'semantic-warning-bg': 'var(--semantic-warning-background)',
      'semantic-warning-text': 'var(--semantic-warning-text)',
      'semantic-error-bg': 'var(--semantic-error-background)',
      'semantic-error-text': 'var(--semantic-error-text)',
    },
    
    // アニメーション
    animation: {
      'button-press': 'button-press 0.1s ease-in-out',
      'fade-in': 'fade-in 0.2s ease-out',
      'slide-up': 'slide-up 0.3s ease-out',
      'slide-down': 'slide-down 0.3s ease-out',
    },
    
    keyframes: {
      'button-press': {
        '0%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(0.98)' },
        '100%': { transform: 'scale(1)' }
      },
      'fade-in': {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' }
      },
      'slide-up': {
        '0%': { transform: 'translateY(8px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' }
      },
      'slide-down': {
        '0%': { transform: 'translateY(-8px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' }
      }
    },
    
    // ボックスシャドウ（コンポーネント用）
    boxShadow: {
      'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      'base': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      'focus': '0 0 0 3px rgba(59, 130, 246, 0.5)',
    },
    
    // トランジション
    transitionDuration: {
      '50': '50ms',
      '100': '100ms',
      '150': '150ms',
      '200': '200ms',
      '250': '250ms',
      '300': '300ms',
    }
  }
}

/**
 * 使用例（Web版のtailwind.config.js）:
 * 
 * const designSystemConfig = require('@boxlog/design-system/tokens/tailwind-design-system')
 * 
 * module.exports = {
 *   content: [...],
 *   theme: {
 *     colors: designSystemConfig.colors,
 *     extend: designSystemConfig.extend
 *   },
 *   plugins: [...]
 * }
 * 
 * コンポーネントでの使用:
 * 
 * <!-- 見出し（デジタル庁準拠） -->
 * <h1 className="text-6xl font-bold text-text-primary leading-normal">
 *   メインタイトル
 * </h1>
 * 
 * <!-- 本文（16px以上・150%行間） -->
 * <p className="text-base font-normal text-text-secondary leading-normal">
 *   デジタル庁ガイドラインに準拠した読みやすい本文です。
 * </p>
 * 
 * <!-- ボタン（統一されたスペーシング） -->
 * <button className="
 *   bg-btn-primary hover:bg-btn-primary-hover 
 *   text-btn-primary-text font-medium
 *   px-6 py-3 rounded-base
 *   shadow-sm hover:shadow-md
 *   transition-all duration-150
 *   animate-button-press
 * ">
 *   アクションボタン
 * </button>
 * 
 * <!-- カード（精密なスペーシング制御） -->
 * <div className="
 *   bg-bg-elevated border border-border-primary 
 *   rounded-lg p-6 space-y-4
 *   shadow-base animate-fade-in
 * ">
 *   <h3 className="text-2xl font-bold text-text-primary">カードタイトル</h3>
 *   <p className="text-base text-text-secondary leading-relaxed">
 *     カードの説明文です。適切な行間とスペーシングが設定されています。
 *   </p>
 * </div>
 * 
 * <!-- レスポンシブなグリッドレイアウト -->
 * <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 *   <!-- コンテンツ -->
 * </div>
 */