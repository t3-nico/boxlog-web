import { MDXRemoteSerializeResult } from 'next-mdx-remote'

/**
 * AI検索・RAG用のメタデータ
 * チャットボットやベクトル検索で使用される追加情報
 */
export interface AIMetadata {
  /**
   * 検索用キーワード（日本語・英語両方を含める）
   * 例: ["インストール", "install", "npm", "セットアップ"]
   */
  keywords?: string[]

  /**
   * このドキュメントで回答できる想定質問
   * RAGでの関連性判断に使用
   * 例: ["BoxLogをインストールする方法は？", "How to install BoxLog?"]
   */
  relatedQuestions?: string[]

  /**
   * このドキュメントを読む前に必要な前提知識
   * 例: ["Node.js 18以上", "npmまたはyarnの基本操作"]
   */
  prerequisites?: string[]

  /**
   * 関連ドキュメントへのパス（内部リンク）
   * 例: ["/docs/getting-started/quick-start", "/docs/api/configuration"]
   */
  relatedDocs?: string[]

  /**
   * AI用の要約（200文字程度）
   * ベクトル埋め込み時の追加コンテキストとして使用
   */
  aiSummary?: string

  /**
   * コンテンツのチャンク戦略
   * - "h2": 見出し2レベルで分割
   * - "h3": 見出し3レベルで分割
   * - "paragraph": 段落ごとに分割
   * - "full": 分割せず全体を1チャンクに
   */
  chunkStrategy?: 'h2' | 'h3' | 'paragraph' | 'full'

  /**
   * AI検索の対象に含めるか
   * falseの場合、ベクトルDBへの登録をスキップ
   */
  searchable?: boolean

  /**
   * コンテンツの難易度
   * AI回答時の説明レベル調整に使用
   */
  difficulty?: 'beginner' | 'intermediate' | 'advanced'

  /**
   * コンテンツの種類
   * AI回答のフォーマット選択に使用
   */
  contentType?: 'tutorial' | 'reference' | 'guide' | 'troubleshooting' | 'concept'
}

export interface FrontMatter {
  title: string
  description: string
  tags?: string[]
  author?: string
  publishedAt?: string
  updatedAt?: string
  slug: string
  category: string
  order?: number
  draft?: boolean
  featured?: boolean

  // === AI/RAG用メタデータ ===
  ai?: AIMetadata
}

export interface ContentData {
  frontMatter: FrontMatter
  content: string
  slug: string
  path: string
}

export interface SerializedContent {
  mdxSource: MDXRemoteSerializeResult
  frontMatter: FrontMatter
}

export interface ContentCollection {
  [key: string]: ContentData[]
}

export interface TableOfContentsItem {
  id: string
  title: string
  level: number
  children?: TableOfContentsItem[]
}

export interface NavigationItem {
  title: string
  href?: string
  items?: NavigationItem[]
  badge?: string
  external?: boolean
}

export interface CategoryInfo {
  name: string
  description: string
  slug: string
  order: number
}

export type ContentCategory =
  | 'getting-started'
  | 'api-reference'
  | 'guides'
  | 'examples'
  | 'resources'
