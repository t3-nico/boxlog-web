/**
 * Tailwind CSS用カラー設定
 * Web版で使用するTailwind設定にextendする
 */

const { colorsV2 } = require('./colors-v2')

module.exports = {
  // カラーパレット
  colors: {
    // ブランドカラー
    primary: colorsV2.primary,
    secondary: colorsV2.secondary,
    
    // アクセントカラー
    purple: colorsV2.accent.purple,
    teal: colorsV2.accent.teal,
    
    // ニュートラルカラー
    neutral: colorsV2.neutral,
    
    // セマンティックカラー
    error: colorsV2.semantic.error,
    success: colorsV2.semantic.success,
    warning: colorsV2.semantic.warning,
    info: colorsV2.semantic.info,
    
    // 特殊用途
    time: colorsV2.special.timeSelection,
    progress: colorsV2.special.progress,
  },
  
  // CSS変数を使用したダイナミックカラー
  extend: {
    colors: {
      // 背景色
      'bg-primary': 'var(--background-primary)',
      'bg-secondary': 'var(--background-secondary)',
      'bg-tertiary': 'var(--background-tertiary)',
      'bg-elevated': 'var(--background-elevated)',
      'bg-brand': 'var(--background-brand)',
      'bg-accent': 'var(--background-accent)',
      
      // テキスト色
      'text-primary': 'var(--text-primary)',
      'text-secondary': 'var(--text-secondary)',
      'text-tertiary': 'var(--text-tertiary)',
      'text-brand': 'var(--text-brand)',
      'text-accent': 'var(--text-accent)',
      'text-inverse': 'var(--text-inverse)',
      
      // ボーダー色
      'border-primary': 'var(--border-primary)',
      'border-secondary': 'var(--border-secondary)',
      'border-brand': 'var(--border-brand)',
      'border-focus': 'var(--border-focus)',
      
      // インタラクション
      'interaction-primary': 'var(--interaction-primary)',
      'interaction-primary-hover': 'var(--interaction-primaryHover)',
      'interaction-secondary': 'var(--interaction-secondary)',
      'interaction-secondary-hover': 'var(--interaction-secondaryHover)',
      'interaction-disabled': 'var(--interaction-disabled)',
    }
  }
}

/**
 * 使用例:
 * 
 * // tailwind.config.js
 * const colorConfig = require('@boxlog/design-system/tokens/tailwind-config-colors')
 * 
 * module.exports = {
 *   theme: {
 *     extend: {
 *       colors: {
 *         ...colorConfig.colors,
 *         ...colorConfig.extend.colors
 *       }
 *     }
 *   }
 * }
 * 
 * // コンポーネントでの使用
 * <button className="bg-primary-600 hover:bg-primary-700 text-white">
 *   プライマリボタン
 * </button>
 * 
 * <div className="bg-bg-primary text-text-primary border-border-primary">
 *   テーマ対応コンテナ
 * </div>
 */