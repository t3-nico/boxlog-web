# /content/CLAUDE.md - コンテンツ管理（MDX）ガイド

## 📍 この文書の位置づけ

**レベル2**: 領域特化ルール（コンテンツ管理・MDX）
- 上位: `/src/CLAUDE.md`（実装の基本）
- 上位: `/CLAUDE.md`（意思決定プロトコル）

**役割**: MDXコンテンツの作成・管理方法を定義

---

## 🎯 基本原則

### 1. MDXファイル必須
- **HTML直書き禁止**: すべてのコンテンツはMDXで管理
- **外部画像URL禁止**: `/public/images`配下の画像を使用

### 2. Frontmatter必須
- すべてのMDXファイルにFrontmatterを記述
- 型安全性を確保

### 3. 多言語対応
- 英語・日本語の両方でコンテンツを用意

---

## 📁 contentディレクトリ構造

```
content/
├── blog/                  # ブログ記事
│   ├── nextjs-saas-development-guide.mdx
│   ├── database-design-saas-applications.mdx
│   └── react-hooks-advanced-patterns.mdx
├── docs/                  # ドキュメント
│   ├── getting-started/
│   ├── api-reference/
│   └── guides/
└── releases/              # リリースノート
    ├── v1.0.0.mdx
    ├── v1.1.0.mdx
    └── v2.0.0.mdx
```

---

## 📝 MDXファイル作成ガイド

### ブログ記事（content/blog/*.mdx）

#### Frontmatter構造

```yaml
---
title: "記事タイトル"
description: "記事の説明文（SEO用）"
publishedAt: "2025-01-23"
updatedAt: "2025-01-23"
tags: ["Next.js", "React", "TypeScript"]
category: "Technology"
author: "著者名"
authorAvatar: "/avatars/author.jpg"
coverImage: "/images/blog/cover.jpg"
featured: true
draft: false
---
```

#### フィールド定義

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `title` | string | ✅ | 記事タイトル（SEO重要） |
| `description` | string | ✅ | 記事の説明文（SEO用・meta description） |
| `publishedAt` | string | ✅ | 公開日（ISO 8601形式: `YYYY-MM-DD`） |
| `updatedAt` | string | ❌ | 更新日（ISO 8601形式） |
| `tags` | string[] | ✅ | タグ（検索・分類用） |
| `category` | string | ✅ | カテゴリー（Technology, Business, Design等） |
| `author` | string | ✅ | 著者名 |
| `authorAvatar` | string | ❌ | 著者アバター画像パス（`/avatars/*`） |
| `coverImage` | string | ✅ | カバー画像パス（`/images/blog/*`） |
| `featured` | boolean | ❌ | トップページに表示するか（デフォルト: `false`） |
| `draft` | boolean | ❌ | 下書きか（デフォルト: `false`、`true`の場合非公開） |

#### 完全な例

```mdx
---
title: "Complete Guide to Building SaaS Applications with Next.js 14"
description: "Learn how to build scalable SaaS applications using Next.js 14's latest features. Comprehensive coverage from App Router and Server Components to authentication system implementation."
publishedAt: "2025-01-23"
updatedAt: "2025-01-24"
tags: ["Next.js", "React", "SaaS", "TypeScript", "Development", "Full Stack"]
category: "Technology"
author: "Takeshi Yamada"
authorAvatar: "/avatars/takeshi-yamada.jpg"
coverImage: "/images/blog/nextjs-saas-guide.jpg"
featured: true
draft: false
---

# Complete Guide to Building SaaS Applications with Next.js 14

Next.js 14 provides numerous innovative features for SaaS application development. This article details how to build production-ready SaaS applications with specific code examples.

## Why Next.js 14?

Next.js 14 is ideal for SaaS development for the following reasons:

- **App Router**: New routing system with more intuitive file structure
- **Server Components**: Faster performance through server-side component rendering
- **Streaming**: Improved UX with progressive page loading

## Code Example

```typescript
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}
```

## Conclusion

Next.js 14 is a powerful framework for building modern SaaS applications.
```

---

### ドキュメント（content/docs/**/*.mdx）

#### Frontmatter構造

```yaml
---
title: "ドキュメントタイトル"
description: "ドキュメントの説明"
category: "Getting Started"
order: 1
lastUpdated: "2025-01-23"
tags: ["setup", "configuration"]
---
```

#### フィールド定義

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `title` | string | ✅ | ドキュメントタイトル |
| `description` | string | ✅ | ドキュメントの説明 |
| `category` | string | ✅ | カテゴリー（Getting Started, API Reference等） |
| `order` | number | ✅ | 表示順序（昇順） |
| `lastUpdated` | string | ✅ | 最終更新日（ISO 8601形式） |
| `tags` | string[] | ❌ | タグ |

---

### リリースノート（content/releases/*.mdx）

#### Frontmatter構造

```yaml
---
version: "1.0.0"
title: "First Major Release"
date: "2025-01-23"
type: "major"
featured: true
breaking: false
tags: ["feature", "improvement", "bugfix"]
---
```

#### フィールド定義

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `version` | string | ✅ | バージョン番号（Semantic Versioning） |
| `title` | string | ✅ | リリースタイトル |
| `date` | string | ✅ | リリース日（ISO 8601形式） |
| `type` | string | ✅ | リリースタイプ（`major`, `minor`, `patch`, `prerelease`） |
| `featured` | boolean | ❌ | 注目リリースか（デフォルト: `false`） |
| `breaking` | boolean | ❌ | 破壊的変更を含むか（デフォルト: `false`） |
| `tags` | string[] | ❌ | タグ（new, improvement, bugfix, breaking, security） |

#### 完全な例

```mdx
---
version: "2.0.0"
title: "Major Update - New UI and Performance Improvements"
date: "2025-01-23"
type: "major"
featured: true
breaking: true
tags: ["new", "improvement", "breaking"]
---

# v2.0.0 - Major Update

## 🎉 New Features

- **New Design System**: Completely redesigned UI with modern aesthetics
- **Dark Mode**: System-wide dark mode support
- **Real-time Collaboration**: Work together with your team in real-time

## 🚀 Improvements

- **Performance**: 50% faster page load times
- **Accessibility**: WCAG 2.1 AA compliant
- **Mobile**: Improved mobile experience

## 🔧 Bug Fixes

- Fixed issue with authentication timeout
- Resolved memory leak in dashboard

## ⚠️ Breaking Changes

- **API v1 Deprecated**: Please migrate to API v2
- **Config Format Changed**: Update your configuration files

## 📖 Migration Guide

See our [Migration Guide](/docs/migration-v2) for detailed instructions.
```

---

## 🎨 MDXコンポーネント使用

### カスタムコンポーネント

```mdx
# 記事タイトル

## Callout（注意書き）

<Callout type="info">
  これは情報メッセージです。
</Callout>

<Callout type="warning">
  これは警告メッセージです。
</Callout>

<Callout type="error">
  これはエラーメッセージです。
</Callout>

## Code Block（コードブロック）

```typescript
export function HelloWorld() {
  return <div>Hello World</div>
}
\```

## 画像

![画像の説明](/images/blog/example.jpg)

## リンク

[内部リンク](/about)
[外部リンク](https://example.com)
```

---

## 📏 コンテンツ記述ルール

### 見出し構造

```mdx
# H1: 記事タイトル（1つのみ）

## H2: セクションタイトル

### H3: サブセクション

#### H4: 詳細項目
```

### コードブロック

```mdx
## TypeScript

```typescript
export function example() {
  return "Hello World"
}
\```

## JavaScript

```javascript
function example() {
  return "Hello World"
}
\```

## Bash

```bash
npm install
npm run dev
\```
```

### リスト

```mdx
## 箇条書き

- Item 1
- Item 2
  - Nested Item 2.1
  - Nested Item 2.2
- Item 3

## 番号付きリスト

1. First step
2. Second step
3. Third step

## チェックリスト

- [x] Completed task
- [ ] Incomplete task
- [ ] Another task
```

### 表

```mdx
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

### 引用

```mdx
> これは引用文です。
> 複数行にわたることもできます。
```

---

## 🖼️ 画像管理

### 必須ルール

```mdx
# ✅ 推奨: /public/images配下の画像
![BoxLog Dashboard](/images/blog/dashboard.jpg)

# ❌ 禁止: 外部画像URL
![External Image](https://example.com/image.jpg)
```

### 画像配置規則

```
public/
├── images/
│   ├── blog/              # ブログ記事用画像
│   │   ├── post-1.jpg
│   │   └── post-2.jpg
│   ├── docs/              # ドキュメント用画像
│   │   ├── screenshot-1.jpg
│   │   └── diagram-1.svg
│   ├── releases/          # リリースノート用画像
│   │   ├── v1.0.0.jpg
│   │   └── v2.0.0.jpg
│   └── avatars/           # 著者アバター
│       ├── takeshi-yamada.jpg
│       └── yuki-tanaka.jpg
```

### 画像最適化

- **推奨フォーマット**: JPEG（写真）、PNG（スクリーンショット）、SVG（図表）
- **推奨サイズ**: 最大1200px幅
- **圧縮**: TinyPNG等で圧縮済み画像を使用
- **alt属性**: 必ず記述（アクセシビリティ・SEO）

---

## 🌍 多言語対応

### ファイル命名規則

```
content/
├── blog/
│   ├── en/              # 英語版
│   │   └── nextjs-guide.mdx
│   └── jp/              # 日本語版
│       └── nextjs-guide.mdx
```

### Frontmatter言語指定

```yaml
---
title: "Next.js 14でSaaSアプリを構築する完全ガイド"
description: "Next.js 14の最新機能を使ってスケーラブルなSaaSアプリケーションを構築する方法を学びます。"
lang: "jp"
---
```

---

## 🚫 禁止事項

### コンテンツ記述
- ❌ HTML直書き（`<div>`, `<span>`等）
- ❌ インラインスタイル（`style="..."`）
- ❌ 外部画像URL
- ❌ ハードコードされたリンク（多言語対応不可）

### 画像
- ❌ 1MB超え画像
- ❌ 圧縮されていない画像
- ❌ alt属性なし

### Frontmatter
- ❌ 必須フィールドの省略
- ❌ 不正な日付形式（ISO 8601形式必須）
- ❌ 空のタグ配列（`tags: []`は削除）

---

## 🎓 新規コンテンツ作成チェックリスト

- [ ] Frontmatterはすべて記述したか？
- [ ] 日付はISO 8601形式か？（`YYYY-MM-DD`）
- [ ] タグは適切に設定したか？（3-6個推奨）
- [ ] カバー画像は`/public/images`配下か？
- [ ] すべての画像にalt属性を記述したか？
- [ ] 外部画像URLを使用していないか？
- [ ] 見出し構造は適切か？（H1は1つのみ）
- [ ] コードブロックに言語指定したか？
- [ ] リンクは正しく機能するか？
- [ ] 多言語対応は必要か？（必要な場合は両言語版を作成）

---

## 📚 MDXコンポーネントカタログ

### 利用可能なコンポーネント

```typescript
// components/docs/MDXComponents.tsx で定義済み
export const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: Paragraph,
  a: Link,
  code: Code,
  pre: Pre,
  img: Image,
  // ...
}
```

詳細は`/src/components/docs/MDXComponents.tsx`を参照

---

## 📖 関連ドキュメント

- **上位**: `/src/CLAUDE.md` - 実装の基本
- **上位**: `/CLAUDE.md` - 意思決定プロトコル
- **参考**: `/src/lib/mdx.ts` - MDX処理ロジック
- **参考**: [MDX公式](https://mdxjs.com/)

---

**📖 最終更新**: 2025-10-23 | **バージョン**: v1.0
