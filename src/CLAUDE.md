# /src/CLAUDE.md - 実装リファレンス

## 📍 この文書の位置づけ

**レベル1**: 実装の基本・コーディング規約
- 上位: `/CLAUDE.md`（意思決定プロトコル）
- 下位: `/src/{ディレクトリ}/CLAUDE.md`（領域特化ルール）

**役割**: 「どう書くか」の実装方法を定義

---

## 🎯 基本原則

### 1. 公式優先
- Next.js 14公式 > プロジェクトルール > 個人の好み
- 不明な場合は公式ドキュメントを確認（推測禁止）

### 2. 既存実装の再利用
- 新規実装前に必ず既存コードを検索
- 同じ問題には同じ解決策を使用

### 3. Server Components優先
- デフォルトはServer Components
- `'use client'`は必要最小限に

---

## 📁 ファイル配置ルール

### ディレクトリ構造
```
src/
├── app/                    # Next.js App Router（ページ・レイアウト）
│   ├── [locale]/          # 多言語対応ルート
│   ├── globals.css        # グローバルスタイル（セマンティックトークン）
│   └── layout.tsx         # ルートレイアウト
├── components/            # UIコンポーネント
│   ├── ui/               # shadcn/ui基盤コンポーネント
│   ├── layout/           # Header, Footer, Navigation
│   ├── blog/             # ブログ関連コンポーネント
│   ├── docs/             # ドキュメント関連コンポーネント
│   ├── releases/         # リリース関連コンポーネント
│   ├── features/         # 機能紹介コンポーネント
│   ├── seo/              # SEO関連コンポーネント
│   ├── analytics/        # 分析関連コンポーネント
│   ├── privacy/          # プライバシー関連コンポーネント
│   └── errors/           # エラー関連コンポーネント
├── hooks/                # カスタムフック
│   ├── useLocale.ts     # ロケール管理
│   └── useSearch.ts     # 検索機能
├── lib/                  # 共通処理・ユーティリティ
│   ├── analytics.ts     # アナリティクス
│   ├── blog.ts          # ブログデータ取得
│   ├── i18n.ts          # 国際化
│   ├── mdx.ts           # MDX処理
│   ├── metadata.ts      # メタデータ生成
│   ├── releases.ts      # リリースデータ取得
│   ├── search.ts        # 検索ロジック
│   ├── theme-utils.ts   # テーマユーティリティ
│   ├── toc.ts           # 目次生成
│   ├── utils.ts         # 汎用ユーティリティ
│   └── navigation.ts    # ナビゲーション設定
├── types/                # 型定義
├── utils/                # ユーティリティ
└── middleware.ts         # ミドルウェア
```

### ファイル命名規則
```typescript
// ✅ 推奨
components/blog/PostCard.tsx        // PascalCase（コンポーネント）
lib/blog.ts                         // kebab-case（ユーティリティ）
hooks/useLocale.ts                  // camelCase with "use" prefix

// ❌ 禁止
components/blog/postCard.tsx        // camelCaseは不可
lib/Blog.ts                         // PascalCaseは不可
hooks/Locale.ts                     // "use"プレフィックスなし
```

---

## 🎨 スタイリング規約

### 必須: globals.css のセマンティックトークン使用

```typescript
// ✅ 推奨: セマンティックトークン使用
<div className="bg-card text-foreground border-border">
  <h1 className="text-primary">Title</h1>
</div>

// ✅ 推奨: カスタムトークン使用
<div className="bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))]">
  Content
</div>

// ❌ 禁止: Tailwindクラスの直接指定
<div className="bg-blue-500 text-white border-gray-300">
  Content
</div>

// ❌ 禁止: style属性
<div style={{ backgroundColor: '#3b82f6' }}>
  Content
</div>
```

### 利用可能なセマンティックトークン

#### shadcn/ui基本トークン
- `bg-background`, `text-foreground`
- `bg-card`, `text-card-foreground`
- `bg-primary`, `text-primary-foreground`
- `bg-secondary`, `text-secondary-foreground`
- `bg-muted`, `text-muted-foreground`
- `bg-accent`, `text-accent-foreground`
- `bg-destructive`, `text-destructive-foreground`
- `border-border`, `border-input`
- `ring-ring`

#### カスタムニュートラルトークン（RGB形式）
- `--bg-primary`, `--bg-secondary`, `--bg-tertiary`
- `--text-primary`, `--text-secondary`, `--text-tertiary`
- `--border-primary`, `--border-secondary`

#### セマンティックカラー
- `--error-color`, `--error-bg`
- `--success-color`, `--success-bg`
- `--warning-color`, `--warning-bg`
- `--info-color`, `--info-bg`
- `--link-color`, `--link-hover`

#### タグカラー
- `--tag-neutral-bg`, `--tag-neutral-text`, `--tag-neutral-hover`
- `--tag-accent-bg`, `--tag-accent-text`, `--tag-accent-hover`

#### リリースタイプカラー
- `--release-new-bg`, `--release-new-text`, `--release-new-border`
- `--release-improvement-bg`, `--release-improvement-text`, `--release-improvement-border`
- `--release-bugfix-bg`, `--release-bugfix-text`, `--release-bugfix-border`
- `--release-breaking-bg`, `--release-breaking-text`, `--release-breaking-border`
- `--release-security-bg`, `--release-security-text`, `--release-security-border`

### 8pxグリッドシステム

```typescript
// ✅ 推奨: 8の倍数使用
className="p-4 gap-6 space-y-8 mt-12 mb-16"
// 4 = 16px, 6 = 24px, 8 = 32px, 12 = 48px, 16 = 64px

// ❌ 禁止: 8の倍数以外
className="p-3 gap-5 space-y-7 mt-11"
```

### レスポンシブデザイン

```typescript
// ✅ 推奨: モバイルファースト
<div className="p-4 sm:p-6 lg:p-8">
  <h1 className="text-xl sm:text-2xl lg:text-3xl">Title</h1>
</div>

// ✅ 推奨: レスポンシブユーティリティ使用
<div className="p-responsive">
  <h1 className="text-responsive-3xl">Title</h1>
</div>

// ❌ 禁止: デスクトップファースト
<div className="p-8 sm:p-6 lg:p-4">
  Content
</div>
```

---

## 🧩 コンポーネント開発

### エクスポート規則

```typescript
// ✅ 推奨: 名前付きエクスポート（コンポーネント）
export function PostCard({ post }: PostCardProps) {
  return <article>...</article>
}

// ✅ 例外: App Routerのページ・レイアウト
export default function Page() {
  return <main>...</main>
}

// ❌ 禁止: React.FC
export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return <article>...</article>
}

// ❌ 禁止: コンポーネントでのデフォルトエクスポート（App Router以外）
export default function PostCard({ post }: PostCardProps) {
  return <article>...</article>
}
```

### 型定義

```typescript
// ✅ 推奨: 明示的な型定義
interface PostCardProps {
  post: {
    title: string
    slug: string
    date: string
    excerpt: string
  }
  locale: 'en' | 'jp'
}

export function PostCard({ post, locale }: PostCardProps) {
  // ...
}

// ❌ 禁止: any, unknown型
function PostCard({ post }: { post: any }) {
  // ...
}
```

### Server Components vs Client Components

```typescript
// ✅ 推奨: デフォルトはServer Components
// app/[locale]/blog/page.tsx
import { getAllPosts } from '@/lib/blog'

export default async function BlogPage() {
  const posts = await getAllPosts()
  return <div>...</div>
}

// ✅ 推奨: 必要な場合のみ'use client'
// components/search/SearchDialog.tsx
'use client'

import { useState } from 'react'
import { useSearch } from '@/hooks/useSearch'

export function SearchDialog() {
  const [query, setQuery] = useState('')
  // ...
}

// ❌ 禁止: 不必要な'use client'
'use client'

export function PostCard({ post }: PostCardProps) {
  return <article>...</article>  // インタラクションなし
}
```

---

## 📦 インポート順序

```typescript
// 1. React/Next.js関連
import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

// 2. 外部ライブラリ
import { format } from 'date-fns'
import { z } from 'zod'

// 3. 内部コンポーネント
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PostCard } from '@/components/blog/PostCard'

// 4. 内部ライブラリ・ユーティリティ
import { getAllPosts } from '@/lib/blog'
import { getDictionary } from '@/lib/i18n'
import { cn } from '@/lib/utils'

// 5. 型定義
import type { Post } from '@/types/blog'

// 6. スタイル（通常は不要）
import './styles.css'
```

---

## 🔧 データフェッチング

### SSG優先（99%のケース）

```typescript
// ✅ 推奨: 静的生成（SSG）
// app/[locale]/blog/page.tsx
import { getAllPosts } from '@/lib/blog'

export default async function BlogPage() {
  const posts = await getAllPosts()  // ビルド時に実行
  return <div>...</div>
}

// ✅ 推奨: 動的ルート + generateStaticParams
// app/[locale]/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  return <article>...</article>
}

// ✅ 推奨: ISR（必要な場合）
export const revalidate = 3600  // 1時間ごとに再生成

export default async function BlogPage() {
  const posts = await getAllPosts()
  return <div>...</div>
}

// ❌ 禁止: useEffectでのfetch
'use client'

import { useEffect, useState } from 'react'

export function BlogPage() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(setPosts)
  }, [])

  return <div>...</div>
}

// ❌ 禁止: getServerSideProps（SSR）
export async function getServerSideProps() {
  const posts = await getAllPosts()
  return { props: { posts } }
}
```

---

## 🌍 多言語対応（next-intl）

```typescript
// ✅ 推奨: next-intl使用
import { getDictionary } from '@/lib/i18n'

export default async function Page({ params }: { params: { locale: 'en' | 'jp' } }) {
  const dict = await getDictionary(params.locale)

  return (
    <div>
      <h1>{dict.title}</h1>
      <p>{dict.description}</p>
    </div>
  )
}

// ❌ 禁止: ハードコードされた翻訳
export default function Page() {
  return (
    <div>
      <h1>Welcome</h1>
      <p>This is a description</p>
    </div>
  )
}
```

---

## 🖼️ 画像最適化

```typescript
// ✅ 推奨: next/image使用
import Image from 'next/image'

<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority  // LCP対策
/>

// ✅ 推奨: /public配下の画像
<Image
  src="/images/logo.png"
  alt="BoxLog logo"
  width={200}
  height={50}
/>

// ❌ 禁止: <img>タグ
<img src="/images/hero.jpg" alt="Hero image" />

// ❌ 禁止: 外部画像URL（ビルド時に最適化できない）
<Image
  src="https://example.com/image.jpg"
  alt="External image"
  width={200}
  height={200}
/>
```

---

## ⚡ パフォーマンス最適化

### Core Web Vitals対策

```typescript
// ✅ LCP対策: priority属性
<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
/>

// ✅ FID対策: 重いコンポーネントの遅延ロード
import dynamic from 'next/dynamic'

const SearchDialog = dynamic(() => import('@/components/search/SearchDialog'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

// ✅ CLS対策: 画像サイズ指定
<Image
  src="/images/post.jpg"
  alt="Post image"
  width={800}
  height={400}
  className="w-full h-auto"
/>
```

### バンドルサイズ最適化

```typescript
// ✅ 推奨: Tree-shakeable import
import { format } from 'date-fns'

// ❌ 禁止: 全体インポート
import * as dateFns from 'date-fns'
```

---

## 🔍 SEO対策

### Metadata API使用

```typescript
// ✅ 推奨: generateMetadata
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}

// ❌ 禁止: metadata省略
export default function Page() {
  return <div>...</div>
}
```

### 構造化データ（JSON-LD）

```typescript
// ✅ 推奨: 構造化データ追加
export function BlogPostSchema({ post }: { post: Post }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'BoxLog',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

---

## 🧪 テスト

```typescript
// ✅ 推奨: Vitest + React Testing Library
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PostCard } from './PostCard'

describe('PostCard', () => {
  it('renders post title', () => {
    const post = {
      title: 'Test Post',
      slug: 'test-post',
      date: '2025-01-23',
      excerpt: 'Test excerpt',
    }

    render(<PostCard post={post} locale="en" />)
    expect(screen.getByText('Test Post')).toBeDefined()
  })
})
```

---

## 🚫 禁止事項まとめ

### コード記述
- ❌ `any`, `unknown`型
- ❌ `style`属性、カラーコード
- ❌ Tailwindクラスの直接指定（`bg-blue-500`等）
- ❌ `React.FC`
- ❌ コンポーネントでの`export default`（App Router以外）
- ❌ `useEffect`でのfetch
- ❌ `getServerSideProps`, `getStaticProps`
- ❌ `<img>`タグ
- ❌ 外部画像URL
- ❌ 外部CDNフォント
- ❌ HTML直書き
- ❌ ハードコードされた翻訳
- ❌ `'use client'`の過剰使用

### 判断
- ❌ 推測での実装
- ❌ 2022年以前の情報を参考にする
- ❌ 公式ドキュメントを確認せずに実装

---

## 📖 関連ドキュメント

- **上位**: `/CLAUDE.md` - 意思決定プロトコル
- **下位**:
  - `/src/components/CLAUDE.md` - UIコンポーネント
  - `/src/hooks/CLAUDE.md` - カスタムフック
  - `/src/lib/CLAUDE.md` - 共通処理
  - `/content/CLAUDE.md` - コンテンツ管理（MDX）

---

**📖 最終更新**: 2025-10-23 | **バージョン**: v1.0
