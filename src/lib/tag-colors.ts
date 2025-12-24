/**
 * タグカラー設定
 *
 * タグをカテゴリ別に分類し、boxlog-appと同じカラーパレットを使用
 * 新しいタグを追加する場合は、適切なカテゴリに追加してください
 *
 * @see boxlog-app/src/config/ui/colors.ts - カラーパレットの定義元
 */

// ========================================
// カラーパレット（boxlog-appと同期）
// ========================================

export const TAG_COLOR_PALETTE = {
  blue: '#3B82F6',
  green: '#10B981',
  red: '#EF4444',
  amber: '#F59E0B',
  violet: '#8B5CF6',
  pink: '#EC4899',
  cyan: '#06B6D4',
  orange: '#F97316',
  gray: '#6B7280',
  indigo: '#6366F1',
} as const

export type TagColorKey = keyof typeof TAG_COLOR_PALETTE

// ========================================
// カテゴリ定義
// ========================================

/**
 * タグカテゴリの定義
 *
 * | カテゴリ | 色 | 用途 |
 * |---------|-----|------|
 * | technology | Blue | 技術/フレームワーク（React, Next.js, TypeScript等） |
 * | feature | Green | 機能/領域（frontend, backend, api等） |
 * | security | Red | セキュリティ/重要（security, breaking等） |
 * | business | Amber | ビジネス（SaaS, Strategy等） |
 * | docs | Violet | ドキュメント（tutorial, guide, getting-started等） |
 * | ui | Pink | UI/デザイン（ui, forms, charts等） |
 * | data | Cyan | データ/分析（analytics, database, performance等） |
 * | automation | Orange | 自動化/統合（automation, workflow, integration等） |
 * | sdk | Indigo | SDK/開発ツール（sdk, libraries等） |
 * | default | Gray | その他/未分類 |
 */
export const TAG_CATEGORIES = {
  // 技術/フレームワーク - Blue
  technology: {
    color: 'blue' as TagColorKey,
    tags: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'Node.js', 'Hooks', 'PostgreSQL'],
  },

  // 機能/領域 - Green
  feature: {
    color: 'green' as TagColorKey,
    tags: ['frontend', 'backend', 'api', 'rest-api', 'architecture', 'Full Stack'],
  },

  // セキュリティ/重要 - Red
  security: {
    color: 'red' as TagColorKey,
    tags: ['security', 'breaking', 'access-control', 'authentication'],
  },

  // ビジネス - Amber
  business: {
    color: 'amber' as TagColorKey,
    tags: ['SaaS', 'Business Strategy', 'Growth Strategy', 'Customer Success', 'PLG'],
  },

  // ドキュメント - Violet
  docs: {
    color: 'violet' as TagColorKey,
    tags: [
      'tutorial',
      'guide',
      'getting-started',
      'quickstart',
      'introduction',
      'overview',
      'documentation',
      'basics',
      'first-logs',
      'reference',
      'best-practices',
      '5-minutes',
    ],
  },

  // UI/デザイン - Pink
  ui: {
    color: 'pink' as TagColorKey,
    tags: ['ui', 'forms', 'charts', 'dashboard', 'validation', 'Blog', 'Web Development'],
  },

  // データ/分析 - Cyan
  data: {
    color: 'cyan' as TagColorKey,
    tags: [
      'analytics',
      'database',
      'performance',
      'Database',
      'Design',
      'Scalability',
      'reporting',
      'data',
      'query',
      'filter',
      'search',
      'logs',
    ],
  },

  // 自動化/統合 - Orange
  automation: {
    color: 'orange' as TagColorKey,
    tags: ['automation', 'workflow', 'integration', 'productivity', 'collaboration', 'schedule', 'calendar'],
  },

  // SDK/開発ツール - Indigo
  sdk: {
    color: 'indigo' as TagColorKey,
    tags: [
      'sdk',
      'sdks',
      'libraries',
      'programming-languages',
      'browser',
      'installation',
      'setup',
      'configuration',
      'Development',
      'Frontend',
      'Tailwind CSS',
      'AI',
      'infrastructure',
      'system-design',
    ],
  },
} as const

// ========================================
// タグ→カラーのマッピング生成
// ========================================

type TagColorMap = Record<string, TagColorKey>

function buildTagColorMap(): TagColorMap {
  const map: TagColorMap = {}

  for (const category of Object.values(TAG_CATEGORIES)) {
    for (const tag of category.tags) {
      map[tag.toLowerCase()] = category.color
    }
  }

  return map
}

const TAG_COLOR_MAP = buildTagColorMap()

// ========================================
// エクスポート関数
// ========================================

/**
 * タグ名からカラーキーを取得
 * マッピングにない場合は 'gray' を返す
 */
export function getTagColorKey(tag: string): TagColorKey {
  return TAG_COLOR_MAP[tag.toLowerCase()] ?? 'gray'
}

/**
 * タグ名からHEXカラーコードを取得
 */
export function getTagColorHex(tag: string): string {
  const colorKey = getTagColorKey(tag)
  return TAG_COLOR_PALETTE[colorKey]
}

/**
 * カラーキーからHEXカラーコードを取得
 */
export function getColorHex(colorKey: TagColorKey): string {
  return TAG_COLOR_PALETTE[colorKey]
}
