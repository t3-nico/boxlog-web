/**
 * Tailwind CSS用 Neutralベースカラー設定
 * デジタル庁の設計思想に基づいたシンプルで統一されたカラーシステム
 */

const { neutralColors } = require('./colors-neutral')

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
  
  // テーマ対応のCSS変数ベースカラー
  extend: {
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
    
    // ボタンコンポーネント用のユーティリティクラス
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
  }
}

/**
 * 使用例（Web版のtailwind.config.js）:
 * 
 * const neutralConfig = require('@boxlog/design-system/tokens/tailwind-neutral')
 * 
 * module.exports = {
 *   theme: {
 *     extend: {
 *       colors: {
 *         ...neutralConfig.colors,
 *         ...neutralConfig.extend.colors
 *       },
 *       animation: neutralConfig.extend.animation,
 *       keyframes: neutralConfig.extend.keyframes
 *     }
 *   }
 * }
 * 
 * コンポーネントでの使用:
 * 
 * <!-- プライマリボタン -->
 * <button className="bg-btn-primary hover:bg-btn-primary-hover active:bg-btn-primary-active text-btn-primary-text border border-btn-primary focus:outline-none focus:ring-2 focus:ring-border-focus transition-colors duration-150 animate-button-press">
 *   プライマリアクション
 * </button>
 * 
 * <!-- セカンダリボタン -->
 * <button className="bg-btn-secondary hover:bg-btn-secondary-hover active:bg-btn-secondary-active text-btn-secondary-text border border-border-primary">
 *   セカンダリアクション
 * </button>
 * 
 * <!-- カード -->
 * <div className="bg-bg-elevated border border-border-primary rounded-lg p-4">
 *   <h3 className="text-text-primary">見出し</h3>
 *   <p className="text-text-secondary">本文</p>
 * </div>
 * 
 * <!-- フォーム -->
 * <input className="bg-input-bg border border-input-border focus:border-input-focus text-input-text placeholder:text-input-placeholder" 
 *        placeholder="入力してください" />
 */