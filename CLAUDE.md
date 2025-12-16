# CLAUDE.md - BoxLog Web Project

This file provides guidance to Claude Code (claude.ai/code) when working with the BoxLog Web project.

## 🗣️ Communication Language

**IMPORTANT: Always respond in Japanese (日本語) unless specifically requested otherwise by the user.**

## 🎯 開発方針

### デザイン原則
- **Neutral-Centric**: ニュートラルカラー中心のUI
- **8px Grid System**: 8pxの倍数によるスペーシング
- **Accessibility First**: WCAG 2.1 AA準拠
- **Performance Optimized**: Core Web Vitals 90+維持

### 開発アプローチ
- **設計**: 一貫性のある設計原則に従う
- **実装**: 既存パターンの再利用を優先
- **スタイリング**: Tailwind CSS + shadcn/uiを使用
- **ドキュメント**: 新機能・重要な決定は適切に記録

## 📁 Project Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router and Server Components
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS + shadcn/ui
- **UI Components**: shadcn/ui + Radix UI primitives
- **Content**: MDX for blog posts, docs, and releases
- **Internationalization**: next-intl with English and Japanese locales
- **Theme**: next-themes with system/dark/light mode support
- **Testing**: Vitest with React Testing Library

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
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/            # Header, Footer
│   └── ...
├── lib/                   # Utilities and helpers
└── ...
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

### Testing & Quality Assurance
```bash
npm run test       # Vitest テスト実行
npm run test:ui    # Vitest UI interface
npm run test:run   # テスト一回実行 (CI mode)
npm run test:watch # テスト監視モード
```

### Analysis & Optimization
```bash
npm run analyze              # バンドルアナライザー
npm run build:production    # プロダクションビルド
npm run test:lighthouse     # Lighthouse CI テスト
```


## 🧩 Component Development Guidelines

### Component Priority (必須)
1. **🥇 shadcn/ui (第一選択)**: Button, Dialog, Command, Select, Input
2. **🥈 shadcn/ui組み合わせ**: 複数コンポーネントでの拡張
3. **🥉 カスタム実装 (最後の手段)**: 既存で対応できない場合のみ

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

## 🌍 Internationalization

### 対応言語
- **English**: `/en/*` routes
- **Japanese**: `/jp/*` routes

### 実装パターン
```typescript
// ページでのdictionary使用
import { getDictionary } from '@/lib/i18n'

export default async function Page({ params: { locale } }) {
  const dict = getDictionary(locale)
  return <h1>{dict.title}</h1>
}

// 新規翻訳追加
// src/lib/i18n.ts に追加
export const dictionaries = {
  en: { newKey: 'New Text' },
  jp: { newKey: '新しいテキスト' }
}
```

## 🎨 Web版特有の機能

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

## 📋 重要な開発ルール

### 🎯 Development Workflow
- **統一パターン**: 既存の実装パターンを優先的に再利用
- **必須**: コミット前に `npm run lint` 実行
- **テーマ**: ライト・ダークモード両方で動作確認
- **ブランチ**: `feature/[name]`, `fix/[name]`, `refactor/[name]`
- **8pxグリッド**: 新規コンポーネントは8pxの倍数使用
- **ドキュメント化**: 新機能・重要な決定は適切に記録

---

**📖 このドキュメントについて**: Web版BoxLogの完全開発ガイド
**最終更新**: 2025年1月
**バージョン**: v2.1