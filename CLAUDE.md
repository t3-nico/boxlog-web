# CLAUDE.md - Dayopt Web Project

This file provides guidance to Claude Code (claude.ai/code) when working with the Dayopt Web project.

## Communication Language

**IMPORTANT: Always respond in Japanese (日本語) unless specifically requested otherwise by the user.**

## 開発方針

### デザイン原則

- **Neutral-Centric**: ニュートラルカラー中心のUI
- **8px Grid System**: 8pxの倍数によるスペーシング
- **Accessibility First**: WCAG 2.1 AA準拠
- **Performance Optimized**: Core Web Vitals 90+維持

### 開発アプローチ

- **設計**: 一貫性のある設計原則に従う
- **実装**: 既存パターンの再利用を優先
- **スタイリング**: Tailwind CSS v4 + shadcn/uiを使用
- **ドキュメント**: 新機能・重要な決定は適切に記録

## Project Architecture

### Tech Stack

- **Framework**: Next.js 16 with App Router and Server Components
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **UI Components**: shadcn/ui + Radix UI primitives
- **Content**: MDX for blog posts, docs, and releases
- **Internationalization**: next-intl with English and Japanese locales
- **Theme**: next-themes with system/dark/light mode support

### Key Features

- **Performance**: Bundle splitting, Core Web Vitals 90+
- **Accessibility**: WCAG 2.1 AA compliant
- **Security**: CSP headers, security middleware
- **SEO**: Structured data, meta tags, sitemap
- **PWA**: Service Worker, offline capabilities

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   └── [locale]/           # 多言語対応ルート
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/             # Header, Footer
│   └── ...
├── i18n/                   # 国際化設定（next-intl）
│   ├── routing.ts          # ルーティング設定
│   ├── request.ts          # メッセージローダー
│   └── navigation.ts       # ナビゲーション関数
├── lib/                    # Utilities and helpers
└── ...

messages/
├── en/                     # 英語翻訳ファイル
└── ja/                     # 日本語翻訳ファイル
```

## Development Commands

### Primary Development

```bash
npm run dev         # 開発サーバー起動 (localhost:3000)
npm run build      # プロダクションビルド
npm run start      # プロダクションサーバー起動
npm run lint       # ESLint実行
npm run type-check # TypeScript型チェック
```

### Quality Assurance

```bash
npm run lint:fix            # ESLint自動修正
npm run format              # Prettier実行
npm run format:check        # Prettierチェック
npm run audit:accessibility # アクセシビリティ監査
npm run audit:performance   # パフォーマンス監査
```

### Analysis & Optimization

```bash
npm run analyze              # バンドルアナライザー
npm run build:production    # プロダクションビルド
npm run prepare:production  # 本番準備（lint + 型チェック + ビルド）
```

## Component Development Guidelines

### Component Priority (必須)

1. **shadcn/ui (第一選択)**: Button, Dialog, Command, Select, Input
2. **shadcn/ui組み合わせ**: 複数コンポーネントでの拡張
3. **カスタム実装 (最後の手段)**: 既存で対応できない場合のみ

### 実装例

```typescript
// ✅ 推奨: shadcn/ui使用
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

// ❌ 避ける: カスタム実装・ハードコーディング
const CustomButton = ({ children }) => (
  <button className="bg-neutral-900 px-4 py-2">
    {children}
  </button>
)
```

## Internationalization

### 対応言語

- **English**: `/` または `/en/*` routes（デフォルト）
- **Japanese**: `/ja/*` routes

### ルーティング設定

```typescript
// src/i18n/routing.ts
export const routing = defineRouting({
  locales: ['en', 'ja'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', // デフォルト言語では/enを省略
});
```

### 実装パターン

#### Server Component

```typescript
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('common')
  return <h1>{t('navigation.home')}</h1>
}
```

#### Client Component

```typescript
'use client'
import { useTranslations } from 'next-intl'

export function Navigation() {
  const t = useTranslations('common')
  return <nav>{t('navigation.home')}</nav>
}
```

### 翻訳ファイル構造

```
messages/
├── en/
│   ├── common.json    # 共通UI翻訳
│   ├── legal.json     # 法的文書
│   ├── marketing.json # マーケティング
│   └── search.json    # 検索機能
└── ja/
    └── (同構造)
```

## Web版特有の機能

### Content Management

- **MDX Files**: `content/` ディレクトリ
- **ブログ**: `content/blog/*.mdx`
- **ドキュメント**: `content/docs/*.mdx`
- **リリース**: `content/releases/*.mdx`

### SEO & Performance

- **Structured Data**: 自動生成
- **Sitemap**: 動的生成
- **Meta Tags**: 多言語対応
- **Core Web Vitals**: 90+スコア維持

### PWA機能

- **Service Worker**: `public/sw.js`
- **Manifest**: `public/manifest.json`
- **Offline**: `public/offline.html`

## AI開発ベストプラクティス

Claude 4モデルの特性を活かした効果的な開発のためのガイドライン。

**詳細**: [docs/development/CLAUDE_4_BEST_PRACTICES.md](docs/development/CLAUDE_4_BEST_PRACTICES.md)

### 核心原則

1. **明示的な指示**: 具体的で詳細な要件を提供する
2. **背景と動機**: 「なぜ」を説明して適切な一般化を促す
3. **良い例のみ**: 望ましいパターンだけを提示する
4. **段階的アプローチ**: Explore → Plan → Code → Commit
5. **Thinkツール活用**: 複雑な問題には `think hard` / `ultrathink` を使用

### ワークフローパターン

```markdown
1. Explore（探索）: コードベースを調査し、影響範囲を把握
2. Plan（計画）: 実装戦略を策定し、承認を得る
3. Code（実装）: 計画に基づいてコードを書く
4. Commit（コミット）: 変更を記録し、進捗を報告
```

---

## 重要な開発ルール

### 開発ワークフロー（役割分担）

```bash
# AI（Claude Code）の責務
npm run type-check   # 型エラーチェック（コード変更後）
npm run lint         # コード品質チェック（コミット前のみ）

# ユーザーの責務
npm run dev          # 開発サーバー起動・停止
```

### 開発サーバー管理（ユーザー責務）

**AIは開発サーバーを起動・停止しない**

- **理由**:
  - ユーザーが既に起動している可能性が高い
  - 複数サーバー起動によるリソース無駄・ポート競合を防止
  - ユーザーの確認環境（localhost:3000）と一致
- **AIの対応**:
  - コード変更後: 「localhost:3000 で動作を確認してください」と依頼
  - サーバー未起動の場合: 「npm run dev で開発サーバーを起動してください」と依頼

### Development Workflow

- **統一パターン**: 既存の実装パターンを優先的に再利用
- **必須**: コミット前に `npm run lint` 実行
- **テーマ**: ライト・ダークモード両方で動作確認
- **ブランチ**: `feature/[name]`, `fix/[name]`, `refactor/[name]`
- **8pxグリッド**: 新規コンポーネントは8pxの倍数使用
- **ドキュメント化**: 新機能・重要な決定は適切に記録

---

## 📚 詳細ドキュメント参照先

| カテゴリ           | ドキュメント                                                              | 内容                               |
| ------------------ | ------------------------------------------------------------------------- | ---------------------------------- |
| **AI開発**         | [CLAUDE_4_BEST_PRACTICES.md](docs/development/CLAUDE_4_BEST_PRACTICES.md) | Claude 4プロンプトエンジニアリング |
| **ドキュメント**   | [DOCUMENTATION_GUIDE.md](docs/DOCUMENTATION_GUIDE.md)                     | ドキュメント作成ガイド             |
| **パフォーマンス** | [PERFORMANCE_GUIDE.md](docs/PERFORMANCE_GUIDE.md)                         | Core Web Vitals最適化              |
| **テスト**         | [TESTING_AND_CICD_GUIDE.md](docs/TESTING_AND_CICD_GUIDE.md)               | テスト・CI/CD                      |
| **デザイン**       | [design-system/CLAUDE.md](docs/design-system/CLAUDE.md)                   | デザインシステム                   |

---

**このドキュメントについて**: Web版Dayoptの完全開発ガイド
**最終更新**: 2025年12月
**バージョン**: v3.1
