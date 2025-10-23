/**
 * BoxLog Web版専用タイポグラフィシステム
 * デスクトップ環境での読みやすさとアクセシビリティを重視
 */

// Web版フォントファミリー（日本語最適化・パフォーマンス重視）
export const webFontFamilies = {
  // 日本語対応フォント（Webフォント + システムフォント）
  sans: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    '"Hiragino Kaku Gothic ProN"',
    '"Hiragino Sans"',
    '"Yu Gothic Medium"',
    'Meiryo',
    // Webフォントは最後（パフォーマンス考慮）
    '"Noto Sans JP"',
    'sans-serif',
  ],
  
  // 高速表示用システムフォント
  system: [
    'system-ui',
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
} as const

// Web版フォントサイズ（デスクトップ最適化）
export const webFontSizes = {
  // 12px - UI要素・メタ情報
  xs: {
    fontSize: '12px',
    lineHeight: '18px', // 150%
    letterSpacing: '0.02em',
  },
  // 13px - サブテキスト・補助情報
  sm: {
    fontSize: '13px',
    lineHeight: '20px', // 154%
    letterSpacing: '0.01em',
  },
  // 14px - 小さめテキスト
  md: {
    fontSize: '14px',
    lineHeight: '21px', // 150%
    letterSpacing: '0.005em',
  },
  // 15px - 標準テキスト（Web版基準）
  base: {
    fontSize: '15px',
    lineHeight: '23px', // 153%
    letterSpacing: '0em',
  },
  // 16px - 読みやすい本文
  lg: {
    fontSize: '16px',
    lineHeight: '24px', // 150%
    letterSpacing: '0em',
  },
  // 18px - 大きめ本文
  xl: {
    fontSize: '18px',
    lineHeight: '27px', // 150%
    letterSpacing: '0em',
  },
  // 20px - 小見出し
  '2xl': {
    fontSize: '20px',
    lineHeight: '30px', // 150%
    letterSpacing: '0em',
  },
  // 24px - 中見出し
  '3xl': {
    fontSize: '24px',
    lineHeight: '36px', // 150%
    letterSpacing: '0em',
  },
  // 28px - 大見出し
  '4xl': {
    fontSize: '28px',
    lineHeight: '42px', // 150%
    letterSpacing: '0em',
  },
  // 32px - 主要見出し
  '5xl': {
    fontSize: '32px',
    lineHeight: '48px', // 150%
    letterSpacing: '0em',
  },
  // 40px - インパクト見出し
  '6xl': {
    fontSize: '40px',
    lineHeight: '60px', // 150%
    letterSpacing: '0em',
  },
  // 48px - 最大見出し
  '7xl': {
    fontSize: '48px',
    lineHeight: '72px', // 150%
    letterSpacing: '0em',
  },
} as const

// Web版フォントウェイト
export const webFontWeights = {
  light: '300',
  normal: '400', // 標準テキスト
  medium: '500', // 中間的な強調
  semibold: '600', // セミボールド
  bold: '700', // 強調・見出し
} as const

// Web版タイポグラフィスケール
export const webTypography = {
  // 見出し階層（H1-H6）
  h1: {
    ...webFontSizes['6xl'], // 40px
    fontWeight: webFontWeights.bold,
  },
  h2: {
    ...webFontSizes['5xl'], // 32px
    fontWeight: webFontWeights.bold,
  },
  h3: {
    ...webFontSizes['4xl'], // 28px
    fontWeight: webFontWeights.bold,
  },
  h4: {
    ...webFontSizes['3xl'], // 24px
    fontWeight: webFontWeights.semibold,
  },
  h5: {
    ...webFontSizes['2xl'], // 20px
    fontWeight: webFontWeights.semibold,
  },
  h6: {
    ...webFontSizes.xl, // 18px
    fontWeight: webFontWeights.medium,
  },
  
  // Web版特化のコンテンツテキスト
  'page-title': {
    ...webFontSizes['4xl'], // 28px - ページタイトル
    fontWeight: webFontWeights.bold,
  },
  'section-title': {
    ...webFontSizes['2xl'], // 20px - セクション見出し
    fontWeight: webFontWeights.semibold,
  },
  'card-title': {
    ...webFontSizes.lg, // 16px - カードタイトル
    fontWeight: webFontWeights.medium,
  },
  
  // タスク管理機能用（Web版）
  'task-title': {
    ...webFontSizes.base, // 15px - タスクタイトル
    fontWeight: webFontWeights.normal,
  },
  'task-description': {
    ...webFontSizes.md, // 14px - タスク詳細
    fontWeight: webFontWeights.normal,
  },
  'task-meta': {
    ...webFontSizes.sm, // 13px - 日付等のメタ情報
    fontWeight: webFontWeights.normal,
  },
  
  // 本文バリエーション
  'body-large': {
    ...webFontSizes.lg, // 16px - 読みやすい本文
    fontWeight: webFontWeights.normal,
  },
  body: {
    ...webFontSizes.base, // 15px - 標準本文
    fontWeight: webFontWeights.normal,
  },
  'body-small': {
    ...webFontSizes.md, // 14px - 小さめ本文
    fontWeight: webFontWeights.normal,
  },
  
  // UI要素
  button: {
    ...webFontSizes.base, // 15px - ボタンテキスト
    fontWeight: webFontWeights.medium,
  },
  'button-small': {
    ...webFontSizes.md, // 14px - 小さなボタン
    fontWeight: webFontWeights.medium,
  },
  label: {
    ...webFontSizes.md, // 14px - フォームラベル
    fontWeight: webFontWeights.medium,
  },
  caption: {
    ...webFontSizes.sm, // 13px - キャプション
    fontWeight: webFontWeights.normal,
  },
  footnote: {
    ...webFontSizes.xs, // 12px - 注釈
    fontWeight: webFontWeights.normal,
  },
  
  // コード表示
  code: {
    fontSize: webFontSizes.md.fontSize, // 14px
    lineHeight: webFontSizes.md.lineHeight,
    fontFamily: webFontFamilies.mono.join(', '),
    fontWeight: webFontWeights.normal,
  },
  'code-small': {
    fontSize: webFontSizes.sm.fontSize, // 13px
    lineHeight: webFontSizes.sm.lineHeight,
    fontFamily: webFontFamilies.mono.join(', '),
    fontWeight: webFontWeights.normal,
  },
} as const

// Web版CSS変数生成
export const generateWebTypographyCSSVariables = () => {
  const cssVars: Record<string, string> = {}
  
  // フォントファミリー
  cssVars['--font-family-sans'] = webFontFamilies.sans.join(', ')
  cssVars['--font-family-system'] = webFontFamilies.system.join(', ')
  cssVars['--font-family-mono'] = webFontFamilies.mono.join(', ')
  
  // フォントサイズ
  Object.entries(webFontSizes).forEach(([key, { fontSize, lineHeight, letterSpacing }]) => {
    cssVars[`--font-size-${key}`] = fontSize
    cssVars[`--line-height-${key}`] = lineHeight
    cssVars[`--letter-spacing-${key}`] = letterSpacing
  })
  
  // フォントウェイト
  Object.entries(webFontWeights).forEach(([key, value]) => {
    cssVars[`--font-weight-${key}`] = value
  })
  
  return cssVars
}

// Web版ユーティリティ関数
export const getWebFontSize = (size: keyof typeof webFontSizes) => webFontSizes[size]
export const getWebTypography = (variant: keyof typeof webTypography) => webTypography[variant]

// 型定義
export type WebFontSize = keyof typeof webFontSizes
export type WebFontWeight = keyof typeof webFontWeights
export type WebTypographyVariant = keyof typeof webTypography

/**
 * 使用例（Web版）:
 * 
 * // Tailwind CSS
 * <h1 className="text-6xl font-bold">ページタイトル</h1>
 * <div className="text-base">標準テキスト（15px）</div>
 * <div className="text-md text-gray-600">サブテキスト（14px）</div>
 * 
 * // CSS-in-JS
 * const styles = {
 *   pageTitle: webTypography['page-title'],
 *   taskTitle: webTypography['task-title'],
 *   taskMeta: webTypography['task-meta'],
 * }
 */