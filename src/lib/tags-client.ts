// Client-side tag utilities (without fs module)

import { getTagColorKey, type TagColorKey } from './tag-colors';

export interface TagCount {
  tag: string;
  count: number;
}

export interface TaggedContent {
  type: 'blog' | 'release' | 'doc';
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category?: string;
  featured?: boolean;
  version?: string; // For releases
  breaking?: boolean; // For releases
}

export interface UnifiedTagData {
  tag: string;
  totalCount: number;
  blog: TaggedContent[];
  releases: TaggedContent[];
  docs: TaggedContent[];
}

/**
 * タグ名からTailwindクラス名を取得
 * カテゴリ別にマッピングされた色を使用
 *
 * @see ./tag-colors.ts - カテゴリとカラーの定義
 */
export function getTagColor(tag: string): string {
  const colorKey = getTagColorKey(tag);
  return TAG_COLOR_CLASSES[colorKey];
}

/**
 * カラーキー別のTailwindクラス定義
 * 背景色は透明度10%、ホバー時は20%
 */
const TAG_COLOR_CLASSES: Record<TagColorKey, string> = {
  blue: 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 dark:text-blue-400',
  green: 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400',
  red: 'bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:text-red-400',
  amber: 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 dark:text-amber-400',
  violet: 'bg-violet-500/10 text-violet-600 hover:bg-violet-500/20 dark:text-violet-400',
  pink: 'bg-pink-500/10 text-pink-600 hover:bg-pink-500/20 dark:text-pink-400',
  cyan: 'bg-cyan-500/10 text-cyan-600 hover:bg-cyan-500/20 dark:text-cyan-400',
  orange: 'bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 dark:text-orange-400',
  gray: 'bg-neutral-500/10 text-neutral-600 hover:bg-neutral-500/20 dark:text-neutral-400',
  indigo: 'bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20 dark:text-indigo-400',
};

/**
 * フィルター用: 選択状態のタグカラー（濃い背景 + 白テキスト）
 */
const TAG_COLOR_CLASSES_SELECTED: Record<TagColorKey, string> = {
  blue: 'bg-blue-500 text-white hover:bg-blue-600 border-blue-500',
  green: 'bg-emerald-500 text-white hover:bg-emerald-600 border-emerald-500',
  red: 'bg-red-500 text-white hover:bg-red-600 border-red-500',
  amber: 'bg-amber-500 text-white hover:bg-amber-600 border-amber-500',
  violet: 'bg-violet-500 text-white hover:bg-violet-600 border-violet-500',
  pink: 'bg-pink-500 text-white hover:bg-pink-600 border-pink-500',
  cyan: 'bg-cyan-500 text-white hover:bg-cyan-600 border-cyan-500',
  orange: 'bg-orange-500 text-white hover:bg-orange-600 border-orange-500',
  gray: 'bg-neutral-500 text-white hover:bg-neutral-600 border-neutral-500',
  indigo: 'bg-indigo-500 text-white hover:bg-indigo-600 border-indigo-500',
};

/**
 * フィルター用: 非選択状態のタグカラー（ボーダー + カラーテキスト）
 */
const TAG_COLOR_CLASSES_OUTLINE: Record<TagColorKey, string> = {
  blue: 'border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-950',
  green:
    'border-emerald-300 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-950',
  red: 'border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950',
  amber:
    'border-amber-300 text-amber-600 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-950',
  violet:
    'border-violet-300 text-violet-600 hover:bg-violet-50 dark:border-violet-700 dark:text-violet-400 dark:hover:bg-violet-950',
  pink: 'border-pink-300 text-pink-600 hover:bg-pink-50 dark:border-pink-700 dark:text-pink-400 dark:hover:bg-pink-950',
  cyan: 'border-cyan-300 text-cyan-600 hover:bg-cyan-50 dark:border-cyan-700 dark:text-cyan-400 dark:hover:bg-cyan-950',
  orange:
    'border-orange-300 text-orange-600 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-400 dark:hover:bg-orange-950',
  gray: 'border-neutral-300 text-neutral-600 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-950',
  indigo:
    'border-indigo-300 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-700 dark:text-indigo-400 dark:hover:bg-indigo-950',
};

/**
 * フィルター用: タグ名から選択状態に応じたクラス名を取得
 */
export function getTagFilterColor(tag: string, isSelected: boolean): string {
  const colorKey = getTagColorKey(tag);
  return isSelected ? TAG_COLOR_CLASSES_SELECTED[colorKey] : TAG_COLOR_CLASSES_OUTLINE[colorKey];
}
