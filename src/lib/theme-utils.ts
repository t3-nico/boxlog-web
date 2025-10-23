/**
 * テーマ関連のユーティリティ関数
 * CSS変数への型安全なアクセスとテーマカラーの管理
 */

/**
 * テーマカラーの種類定義
 */
export type ThemeColorType = 
  // 基本カラー
  | 'bg-primary' | 'bg-secondary' | 'bg-tertiary'
  | 'text-primary' | 'text-secondary' | 'text-tertiary'
  | 'border-primary' | 'border-secondary'
  // セマンティックカラー
  | 'error-color' | 'error-bg'
  | 'success-color' | 'success-bg'
  | 'warning-color' | 'warning-bg'
  | 'info-color' | 'info-bg'
  | 'link-color' | 'link-hover'
  // インタラクション
  | 'focus-ring' | 'selection'
  // タグカラー
  | 'tag-neutral-bg' | 'tag-neutral-text' | 'tag-neutral-hover'
  | 'tag-accent-bg' | 'tag-accent-text' | 'tag-accent-hover'
  // リリースタイプ
  | 'release-new-bg' | 'release-new-text' | 'release-new-border'
  | 'release-improvement-bg' | 'release-improvement-text' | 'release-improvement-border'
  | 'release-bugfix-bg' | 'release-bugfix-text' | 'release-bugfix-border'
  | 'release-breaking-bg' | 'release-breaking-text' | 'release-breaking-border'
  | 'release-security-bg' | 'release-security-text' | 'release-security-border'
  // その他
  | 'highlight-bg' | 'highlight-text'
  | 'icon-bg-primary' | 'icon-bg-secondary' | 'icon-bg-tertiary'
  | 'signup-btn-bg' | 'signup-btn-text'

/**
 * CSS変数のRGB値を取得する関数
 * 
 * @param colorType - 取得したいカラーのタイプ
 * @returns CSS変数として使用可能なrgb値のストリング
 * 
 * @example
 * ```typescript
 * // Tailwind CSSのクラスで使用
 * `text-[rgb(var(--${getThemeColor('text-primary')}))]`
 * 
 * // インラインスタイルで使用
 * { color: `rgb(var(--${getThemeColor('text-primary')}))` }
 * ```
 */
export function getThemeColor(colorType: ThemeColorType): string {
  return colorType
}

/**
 * テーマカラーをrgb()形式で取得する関数
 * 
 * @param colorType - 取得したいカラーのタイプ
 * @returns rgb(var(--color-name))形式のストリング
 * 
 * @example
 * ```typescript
 * // インラインスタイルで直接使用
 * { backgroundColor: getThemeColorValue('bg-primary') }
 * ```
 */
export function getThemeColorValue(colorType: ThemeColorType): string {
  return `rgb(var(--${colorType}))`
}

/**
 * Tailwindクラスでテーマカラーを使用するための関数
 * 
 * @param property - CSSプロパティ (bg, text, border等)
 * @param colorType - 使用するカラータイプ
 * @returns Tailwindクラス用のストリング
 * 
 * @example
 * ```typescript
 * // 背景色を設定
 * getTailwindThemeClass('bg', 'bg-primary')
 * // => 'bg-[rgb(var(--bg-primary))]'
 * 
 * // テキスト色を設定
 * getTailwindThemeClass('text', 'text-secondary')
 * // => 'text-[rgb(var(--text-secondary))]'
 * 
 * // フォーカスリングを設定
 * getTailwindThemeClass('focus:ring', 'focus-ring')
 * // => 'focus:ring-[rgb(var(--focus-ring))]'
 * ```
 */
export function getTailwindThemeClass(
  property: string, 
  colorType: ThemeColorType
): string {
  return `${property}-[rgb(var(--${colorType}))]`
}

/**
 * リリースタイプに応じたカラー設定を取得
 * 
 * @param type - リリースタイプ
 * @returns リリースタイプに対応するカラー設定
 */
export function getReleaseColors(type: 'new' | 'improvement' | 'bugfix' | 'breaking' | 'security') {
  const colorMap = {
    new: {
      bg: 'release-new-bg' as const,
      text: 'release-new-text' as const,
      border: 'release-new-border' as const
    },
    improvement: {
      bg: 'release-improvement-bg' as const,
      text: 'release-improvement-text' as const,
      border: 'release-improvement-border' as const
    },
    bugfix: {
      bg: 'release-bugfix-bg' as const,
      text: 'release-bugfix-text' as const,
      border: 'release-bugfix-border' as const
    },
    breaking: {
      bg: 'release-breaking-bg' as const,
      text: 'release-breaking-text' as const,
      border: 'release-breaking-border' as const
    },
    security: {
      bg: 'release-security-bg' as const,
      text: 'release-security-text' as const,
      border: 'release-security-border' as const
    }
  }
  
  return colorMap[type]
}

/**
 * リリースタイプのTailwindクラスを生成
 * 
 * @param type - リリースタイプ
 * @returns リリースタイプに応じたTailwindクラス
 */
export function getReleaseTypeClasses(type: 'new' | 'improvement' | 'bugfix' | 'breaking' | 'security'): string {
  const colors = getReleaseColors(type)
  return [
    getTailwindThemeClass('bg', colors.bg),
    getTailwindThemeClass('text', colors.text),
    getTailwindThemeClass('border', colors.border)
  ].join(' ')
}

/**
 * アクセシビリティ対応のフォーカス可能要素のクラスを取得
 * 
 * @param baseClasses - 基本のクラス
 * @returns フォーカス状態を含むクラス
 */
export function getFocusableClasses(baseClasses: string = ''): string {
  const focusClasses = [
    'focus:outline-none',
    'focus:ring-2',
    getTailwindThemeClass('focus:ring', 'focus-ring'),
    'focus:ring-offset-2'
  ].join(' ')
  
  return baseClasses ? `${baseClasses} ${focusClasses}` : focusClasses
}

/**
 * テーマに応じた状態クラスを生成
 * 
 * @param state - 状態タイプ
 * @returns 状態に応じたクラス
 */
export function getStateClasses(state: 'error' | 'success' | 'warning' | 'info'): string {
  const stateMap = {
    error: {
      bg: 'error-bg' as const,
      text: 'error-color' as const,
    },
    success: {
      bg: 'success-bg' as const,
      text: 'success-color' as const,
    },
    warning: {
      bg: 'warning-bg' as const,
      text: 'warning-color' as const,
    },
    info: {
      bg: 'info-bg' as const,
      text: 'info-color' as const,
    }
  }
  
  const colors = stateMap[state]
  return [
    getTailwindThemeClass('bg', colors.bg),
    getTailwindThemeClass('text', colors.text)
  ].join(' ')
}