// Client-side tag utilities (without fs module)

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
 * タグのTailwindクラス名を取得
 * セマンティックカラー（muted）を使用
 */
export function getTagColor(_tag: string): string {
  return TAG_COLOR_CLASS;
}

/**
 * タグ用のTailwindクラス定義
 * セマンティックカラーのみを使用
 */
const TAG_COLOR_CLASS = 'bg-muted text-muted-foreground hover:bg-muted/80';

/**
 * フィルター用: 選択状態のタグカラー（primary使用）
 */
const TAG_COLOR_CLASS_SELECTED =
  'bg-primary text-primary-foreground hover:bg-primary-hover border-primary';

/**
 * フィルター用: 非選択状態のタグカラー（outline使用）
 */
const TAG_COLOR_CLASS_OUTLINE = 'border-border text-foreground hover:bg-muted';

/**
 * フィルター用: タグ名から選択状態に応じたクラス名を取得
 */
export function getTagFilterColor(_tag: string, isSelected: boolean): string {
  return isSelected ? TAG_COLOR_CLASS_SELECTED : TAG_COLOR_CLASS_OUTLINE;
}
