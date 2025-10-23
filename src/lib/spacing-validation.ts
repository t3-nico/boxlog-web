/**
 * BoxLog Web 8pxグリッドシステム検証ユーティリティ
 * Compassデザインシステム準拠の検証機能
 */

import { BASE_UNIT, spacing, isGridCompliant } from './spacing-tokens'

// 非準拠クラスのパターン
const NON_COMPLIANT_PATTERNS = [
  // .5系のクラス（8pxグリッドに非準拠）
  /[pmwh]-[0-9]+\.5/g,
  /gap-[0-9]+\.5/g,
  /space-[xy]-[0-9]+\.5/g,
  /size-[0-9]+\.5/g,
  // Tailwindのデフォルト7（28px = 3.5×8px）は準拠だが、Compassでは推奨しない
  /[pmwh]-7/g,
  /gap-7/g,
  /space-[xy]-7/g,
]

// 推奨されるクラスのマッピング
const RECOMMENDED_MAPPING: Record<string, string> = {
  // .5クラスの8px準拠版へのマッピング
  'p-0.5': 'p-1',   // 2px -> 4px
  'm-0.5': 'm-1',   // 2px -> 4px
  'px-0.5': 'px-1', // 2px -> 4px
  'py-0.5': 'py-1', // 2px -> 4px
  'gap-0.5': 'gap-1', // 2px -> 4px
  
  'p-1.5': 'p-2',   // 6px -> 8px
  'm-1.5': 'm-2',   // 6px -> 8px
  'px-1.5': 'px-2', // 6px -> 8px
  'py-1.5': 'py-2', // 6px -> 8px
  'gap-1.5': 'gap-2', // 6px -> 8px
  
  'p-2.5': 'p-3',   // 10px -> 12px
  'm-2.5': 'm-3',   // 10px -> 12px
  'px-2.5': 'px-3', // 10px -> 12px
  'py-2.5': 'py-3', // 10px -> 12px
  'gap-2.5': 'gap-3', // 10px -> 12px
  
  'p-3.5': 'p-4',   // 14px -> 16px
  'm-3.5': 'm-4',   // 14px -> 16px
  'px-3.5': 'px-4', // 14px -> 16px
  'py-3.5': 'py-4', // 14px -> 16px
  'gap-3.5': 'gap-4', // 14px -> 16px
  
  // サイズクラス
  'w-0.5': 'w-2',   // 2px -> 8px
  'h-0.5': 'h-2',   // 2px -> 8px
  'w-1.5': 'w-2',   // 6px -> 8px
  'h-1.5': 'h-2',   // 6px -> 8px
  'w-2.5': 'w-3',   // 10px -> 12px
  'h-2.5': 'h-3',   // 10px -> 12px
  'w-3.5': 'w-4',   // 14px -> 16px
  'h-3.5': 'h-4',   // 14px -> 16px
  'size-3.5': 'size-4', // 14px -> 16px
}

/**
 * 文字列内の非準拠クラスを検証
 */
export function validateSpacingClasses(content: string): {
  isCompliant: boolean
  violations: Array<{
    class: string
    recommended: string
    line?: number
  }>
} {
  const violations: Array<{ class: string; recommended: string; line?: number }> = []
  
  // 行ごとに分割して行番号も取得
  const lines = content.split('\n')
  
  lines.forEach((line, lineIndex) => {
    NON_COMPLIANT_PATTERNS.forEach(pattern => {
      const matches = line.match(pattern)
      if (matches) {
        matches.forEach(match => {
          const recommended = RECOMMENDED_MAPPING[match] || `${match} (要確認)`
          violations.push({
            class: match,
            recommended,
            line: lineIndex + 1
          })
        })
      }
    })
  })
  
  return {
    isCompliant: violations.length === 0,
    violations
  }
}

/**
 * ファイル内の非準拠クラスを検索・報告
 */
export function generateSpacingReport(content: string, filePath?: string): string {
  const validation = validateSpacingClasses(content)
  
  if (validation.isCompliant) {
    return `✅ ${filePath || 'Content'} は8pxグリッドに完全準拠しています。`
  }
  
  let report = `❌ ${filePath || 'Content'} で ${validation.violations.length} 件の非準拠クラスが見つかりました:\n\n`
  
  validation.violations.forEach(violation => {
    const location = violation.line ? `(行 ${violation.line})` : ''
    report += `  - ${violation.class} → ${violation.recommended} ${location}\n`
  })
  
  return report
}

/**
 * 8pxグリッド準拠のクラス名生成ヘルパー
 */
export const spacingHelpers = {
  // パディング
  padding: (multiplier: number) => `p-${getSpacingKey(multiplier)}`,
  paddingX: (multiplier: number) => `px-${getSpacingKey(multiplier)}`,
  paddingY: (multiplier: number) => `py-${getSpacingKey(multiplier)}`,
  
  // マージン
  margin: (multiplier: number) => `m-${getSpacingKey(multiplier)}`,
  marginX: (multiplier: number) => `mx-${getSpacingKey(multiplier)}`,
  marginY: (multiplier: number) => `my-${getSpacingKey(multiplier)}`,
  
  // ギャップ
  gap: (multiplier: number) => `gap-${getSpacingKey(multiplier)}`,
  
  // サイズ
  width: (multiplier: number) => `w-${getSpacingKey(multiplier)}`,
  height: (multiplier: number) => `h-${getSpacingKey(multiplier)}`,
  size: (multiplier: number) => `size-${getSpacingKey(multiplier)}`,
}

/**
 * 8pxの倍数からTailwindのキーを取得
 */
function getSpacingKey(multiplier: number): string {
  const pixelValue = multiplier * BASE_UNIT
  
  // spacingオブジェクトから対応するキーを探す
  for (const [key, value] of Object.entries(spacing)) {
    if (value === `${pixelValue}px`) {
      return key
    }
  }
  
  // 見つからない場合は計算値を返す
  return `[${pixelValue}px]`
}

/**
 * コンポーネント用の事前定義スペーシング
 */
export const componentSpacingClasses = {
  // ボタン
  button: {
    sm: 'px-3 py-1',      // 12px 4px
    md: 'px-4 py-2',      // 16px 8px
    lg: 'px-6 py-3',      // 24px 12px
  },
  // カード
  card: {
    padding: 'p-6',       // 24px
    gap: 'space-y-4',     // 16px
  },
  // フォーム
  form: {
    input: 'px-3 py-2',   // 12px 8px
    gap: 'space-y-4',     // 16px
  },
  // ナビゲーション
  nav: {
    padding: 'p-4',       // 16px
    gap: 'gap-2',         // 8px
  },
} as const

/**
 * 開発時の検証用関数
 */
export function logSpacingValidation(content: string, identifier: string) {
  if (process.env.NODE_ENV === 'development') {
    const report = generateSpacingReport(content, identifier)
    console.log(`[8px Grid Validation] ${report}`)
  }
}

// 型定義
export type SpacingValidationResult = ReturnType<typeof validateSpacingClasses>
export type SpacingHelpers = typeof spacingHelpers
export type ComponentSpacingClasses = typeof componentSpacingClasses