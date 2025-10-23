/**
 * BoxLog Web 8pxグリッドシステム
 * Compassデザインシステムに基づく統一されたスペーシングトークン
 */

// Compassスペーシングシステムからのインポート
export const BASE_UNIT = 8 // 8px

// 8pxグリッドに準拠したスペーシングスケール
export const spacing = {
  0: '0px',
  1: '4px',   // 0.5×8px (最小単位)
  2: '8px',   // 1×8px
  3: '12px',  // 1.5×8px
  4: '16px',  // 2×8px
  5: '20px',  // 2.5×8px
  6: '24px',  // 3×8px
  8: '32px',  // 4×8px
  10: '40px', // 5×8px
  12: '48px', // 6×8px
  16: '64px', // 8×8px
  20: '80px', // 10×8px
  24: '96px', // 12×8px
  32: '128px', // 16×8px
  40: '160px', // 20×8px
  48: '192px', // 24×8px
  56: '224px', // 28×8px
  64: '256px', // 32×8px
} as const

// Tailwind互換のスペーシング設定
export const tailwindSpacing = {
  ...spacing,
  // Tailwindのデフォルト値を上書き（8pxグリッド準拠版）
  '0.5': '4px',   // 0.5を4pxに変更（2px -> 4px）
  '1.5': '8px',   // 1.5を8pxに変更（6px -> 8px）
  '2.5': '12px',  // 2.5を12pxに変更（10px -> 12px）
  '3.5': '16px',  // 3.5を16pxに変更（14px -> 16px）
} as const

// コンポーネント高さ（8pxグリッド準拠）
export const heights = {
  xs: spacing[6],    // 24px - 3×8px
  sm: spacing[8],    // 32px - 4×8px
  md: spacing[10],   // 40px - 5×8px (標準)
  lg: spacing[12],   // 48px - 6×8px
  xl: spacing[16],   // 64px - 8×8px
  '2xl': spacing[20], // 80px - 10×8px
} as const

// アイコンサイズ（8pxグリッドベース）
export const iconSizes = {
  xs: '12px',  // 1.5×8px
  sm: '16px',  // 2×8px
  md: '20px',  // 業界標準（実用性重視）
  lg: '24px',  // 3×8px
  xl: '32px',  // 4×8px
  '2xl': '40px', // 5×8px
} as const

// ボーダー半径（8pxベース）
export const borderRadius = {
  none: '0px',
  sm: '4px',   // 0.5×8px
  md: '6px',   // 実用性重視
  lg: '8px',   // 1×8px
  xl: '12px',  // 1.5×8px
  '2xl': '16px', // 2×8px
  '3xl': '24px', // 3×8px
  full: '9999px',
} as const

// レスポンシブスペーシング（各ブレークポイント用）
export const responsiveSpacing = {
  xs: {
    padding: spacing[3],    // 12px
    margin: spacing[2],     // 8px
    gap: spacing[2],        // 8px
  },
  sm: {
    padding: spacing[4],    // 16px
    margin: spacing[3],     // 12px
    gap: spacing[3],        // 12px
  },
  md: {
    padding: spacing[6],    // 24px
    margin: spacing[4],     // 16px
    gap: spacing[4],        // 16px
  },
  lg: {
    padding: spacing[8],    // 32px
    margin: spacing[6],     // 24px
    gap: spacing[6],        // 24px
  },
  xl: {
    padding: spacing[12],   // 48px
    margin: spacing[8],     // 32px
    gap: spacing[8],        // 32px
  },
} as const

// セクション間スペーシング
export const sectionSpacing = {
  tight: spacing[8],      // 32px
  normal: spacing[12],    // 48px
  loose: spacing[16],     // 64px
  extraLoose: spacing[24], // 96px
} as const

// コンテナスペーシング
export const containerSpacing = {
  mobile: spacing[4],     // 16px
  tablet: spacing[6],     // 24px
  desktop: spacing[8],    // 32px
  wide: spacing[12],      // 48px
} as const

// ユーティリティ関数
export const getSpacing = (multiplier: number): string => {
  return `${multiplier * BASE_UNIT}px`
}

export const isGridCompliant = (value: number): boolean => {
  return value % BASE_UNIT === 0 || value % (BASE_UNIT / 2) === 0
}

// 8pxグリッド準拠チェック
export const validateSpacing = (value: string): boolean => {
  const numValue = parseFloat(value)
  return isGridCompliant(numValue)
}

// CSS変数生成（将来のCSS-in-JS対応用）
export const generateSpacingCSSVariables = () => {
  const cssVars: Record<string, string> = {}
  
  Object.entries(spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${key}`] = value
  })
  
  Object.entries(heights).forEach(([key, value]) => {
    cssVars[`--height-${key}`] = value
  })
  
  return cssVars
}

// 型定義
export type SpacingKey = keyof typeof spacing
export type HeightKey = keyof typeof heights
export type IconSizeKey = keyof typeof iconSizes
export type BorderRadiusKey = keyof typeof borderRadius
export type ResponsiveSpacingKey = keyof typeof responsiveSpacing

// コンポーネント用の事前定義スペーシング
export const componentSpacing = {
  // ボタン
  button: {
    sm: { px: spacing[3], py: spacing[1] },    // px-3 py-1
    md: { px: spacing[4], py: spacing[2] },    // px-4 py-2
    lg: { px: spacing[6], py: spacing[3] },    // px-6 py-3
  },
  // カード
  card: {
    padding: spacing[6],    // p-6
    gap: spacing[4],        // space-y-4
  },
  // フォーム
  form: {
    input: { px: spacing[3], py: spacing[2] }, // px-3 py-2
    gap: spacing[4],        // space-y-4
  },
  // ナビゲーション
  nav: {
    padding: spacing[4],    // p-4
    gap: spacing[2],        // gap-2
  },
} as const