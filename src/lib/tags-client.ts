// Client-side tag utilities (without fs module)

import { getTagColorKey, type TagColorKey } from './tag-colors'

export interface TagCount {
  tag: string
  count: number
}

export interface TaggedContent {
  type: 'blog' | 'release' | 'doc'
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  category?: string
  featured?: boolean
  version?: string // For releases
  breaking?: boolean // For releases
}

export interface UnifiedTagData {
  tag: string
  totalCount: number
  blog: TaggedContent[]
  releases: TaggedContent[]
  docs: TaggedContent[]
}

/**
 * タグ名からTailwindクラス名を取得
 * カテゴリ別にマッピングされた色を使用
 *
 * @see ./tag-colors.ts - カテゴリとカラーの定義
 */
export function getTagColor(tag: string): string {
  const colorKey = getTagColorKey(tag)
  return TAG_COLOR_CLASSES[colorKey]
}

/**
 * カラーキー別のTailwindクラス定義
 * CSS変数ベース（globals.cssで定義）でダークモード自動対応
 */
const TAG_COLOR_CLASSES: Record<TagColorKey, string> = {
  blue: 'bg-tag-blue-bg text-tag-blue-text hover:bg-tag-blue-hover',
  green: 'bg-tag-green-bg text-tag-green-text hover:bg-tag-green-hover',
  red: 'bg-tag-red-bg text-tag-red-text hover:bg-tag-red-hover',
  amber: 'bg-tag-amber-bg text-tag-amber-text hover:bg-tag-amber-hover',
  violet: 'bg-tag-violet-bg text-tag-violet-text hover:bg-tag-violet-hover',
  pink: 'bg-tag-pink-bg text-tag-pink-text hover:bg-tag-pink-hover',
  cyan: 'bg-tag-cyan-bg text-tag-cyan-text hover:bg-tag-cyan-hover',
  orange: 'bg-tag-orange-bg text-tag-orange-text hover:bg-tag-orange-hover',
  gray: 'bg-tag-gray-bg text-tag-gray-text hover:bg-tag-gray-hover',
  indigo: 'bg-tag-indigo-bg text-tag-indigo-text hover:bg-tag-indigo-hover',
}

/**
 * フィルター用: 選択状態のタグカラー（濃い背景 + 白テキスト）
 * CSS変数ベース
 */
const TAG_COLOR_CLASSES_SELECTED: Record<TagColorKey, string> = {
  blue: 'bg-tag-blue-solid text-white hover:opacity-90 border-tag-blue-solid',
  green: 'bg-tag-green-solid text-white hover:opacity-90 border-tag-green-solid',
  red: 'bg-tag-red-solid text-white hover:opacity-90 border-tag-red-solid',
  amber: 'bg-tag-amber-solid text-white hover:opacity-90 border-tag-amber-solid',
  violet: 'bg-tag-violet-solid text-white hover:opacity-90 border-tag-violet-solid',
  pink: 'bg-tag-pink-solid text-white hover:opacity-90 border-tag-pink-solid',
  cyan: 'bg-tag-cyan-solid text-white hover:opacity-90 border-tag-cyan-solid',
  orange: 'bg-tag-orange-solid text-white hover:opacity-90 border-tag-orange-solid',
  gray: 'bg-tag-gray-solid text-white hover:opacity-90 border-tag-gray-solid',
  indigo: 'bg-tag-indigo-solid text-white hover:opacity-90 border-tag-indigo-solid',
}

/**
 * フィルター用: 非選択状態のタグカラー（ボーダー + カラーテキスト）
 * CSS変数ベース - ダークモード自動対応
 */
const TAG_COLOR_CLASSES_OUTLINE: Record<TagColorKey, string> = {
  blue: 'border-tag-blue-border text-tag-blue-text hover:bg-tag-blue-bg',
  green: 'border-tag-green-border text-tag-green-text hover:bg-tag-green-bg',
  red: 'border-tag-red-border text-tag-red-text hover:bg-tag-red-bg',
  amber: 'border-tag-amber-border text-tag-amber-text hover:bg-tag-amber-bg',
  violet: 'border-tag-violet-border text-tag-violet-text hover:bg-tag-violet-bg',
  pink: 'border-tag-pink-border text-tag-pink-text hover:bg-tag-pink-bg',
  cyan: 'border-tag-cyan-border text-tag-cyan-text hover:bg-tag-cyan-bg',
  orange: 'border-tag-orange-border text-tag-orange-text hover:bg-tag-orange-bg',
  gray: 'border-tag-gray-border text-tag-gray-text hover:bg-tag-gray-bg',
  indigo: 'border-tag-indigo-border text-tag-indigo-text hover:bg-tag-indigo-bg',
}

/**
 * フィルター用: タグ名から選択状態に応じたクラス名を取得
 */
export function getTagFilterColor(tag: string, isSelected: boolean): string {
  const colorKey = getTagColorKey(tag)
  return isSelected ? TAG_COLOR_CLASSES_SELECTED[colorKey] : TAG_COLOR_CLASSES_OUTLINE[colorKey]
}
