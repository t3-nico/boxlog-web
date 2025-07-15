# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Primary Development
- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler without emitting files

### Analysis & Optimization
- `npm run analyze` - Run bundle analyzer (requires ANALYZE=true env var)
- `npm run build:production` - Production build with NODE_ENV=production
- `npm run test:lighthouse` - Run Lighthouse CI performance tests

## Project Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router and Server Components
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with CSS variables for theming
- **Content**: MDX for blog posts, docs, and releases
- **Internationalization**: next-intl with English and Japanese locales
- **Theme**: next-themes with system/dark/light mode support

### Key Features
- **Performance**: Bundle splitting, image optimization, Core Web Vitals monitoring
- **Accessibility**: WCAG 2.1 AA compliant with comprehensive a11y components
- **Security**: CSP headers, security middleware, input validation
- **SEO**: Structured data, meta tags, sitemap generation
- **PWA**: Service Worker, offline capabilities

### Directory Structure
```
src/
├── app/                    # Next.js App Router (pages & API routes)
├── components/
│   ├── accessibility/      # A11y components (focus, screen reader support)
│   ├── analytics/         # GA4, Core Web Vitals tracking
│   ├── performance/       # Code splitting, lazy loading
│   ├── layout/           # Header, Footer
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities and configurations
├── middleware.ts         # Security headers & i18n routing
└── types/               # TypeScript type definitions
```

### Content Management
- **MDX Files**: Located in `content/` directory
- **Supported Types**: blog posts, docs, releases
- **Frontmatter**: Includes title, description, tags, dates, category
- **Processing**: Uses next-mdx-remote with remark-gfm and rehype-highlight

### Internationalization
- **Locales**: `en` (English), `jp` (Japanese)
- **Messages**: Stored in `messages/` directory as JSON files
- **Routing**: Automatic locale detection with fallback to English
- **Configuration**: Handled via `src/lib/i18n.ts`

### Performance Architecture
- **Bundle Analysis**: Webpack bundle analyzer with vendor chunk splitting
- **Image Optimization**: WebP/AVIF formats with responsive sizes
- **Font Loading**: Preloaded Inter font variants
- **Code Splitting**: Dynamic imports for non-critical components
- **Core Web Vitals**: Real-time monitoring and optimization

### Security Features
- **CSP**: Strict Content Security Policy in production
- **Headers**: X-Frame-Options, X-XSS-Protection, HSTS
- **Middleware**: Security headers applied via Next.js middleware
- **Input Validation**: XSS prevention and CSRF protection

### Accessibility Implementation
- **Focus Management**: Comprehensive focus trap and restoration
- **Screen Readers**: ARIA labels and semantic HTML structure
- **Keyboard Navigation**: Full directional support
- **Color Contrast**: Real-time validation
- **Motion**: Respects user's reduced motion preferences

### Theming System
- **CSS Variables**: Custom properties for consistent theming
- **Tailwind Config**: Extended with semantic color tokens
- **Theme Toggle**: Supports system, dark, and light modes
- **Persistence**: Theme preference stored in localStorage

### Color System Rules
- **Neutral-Only Palette**: Strictly use Tailwind's `neutral-50` to `neutral-950` for all UI elements
- **Light Mode Colors**:
  - Backgrounds: `neutral-50` (primary), `neutral-100` (secondary), `neutral-200` (tertiary)
  - Text: `neutral-900` (primary), `neutral-600` (secondary), `neutral-400` (tertiary)
  - Borders: `neutral-200` (primary), `neutral-300` (secondary)
- **Dark Mode Colors**:
  - Backgrounds: `neutral-900` (primary), `neutral-800` (secondary), `neutral-700` (tertiary)
  - Text: `neutral-50` (primary), `neutral-300` (secondary), `neutral-500` (tertiary)
  - Borders: `neutral-700` (primary), `neutral-600` (secondary)
- **Semantic Colors** (only for meaningful information):
  - Error: `red-500` (text), `red-50/red-900` (background)
  - Success: `green-500` (text), `green-50/green-900` (background)
  - Warning: `yellow-500` (text), `yellow-50/yellow-900` (background)
  - Link: `blue-500` (default), `blue-600` (hover)
  - Info: `indigo-500` (text), `indigo-50/indigo-900` (background)
- **Forbidden Colors**: Never use `gray-*`, `slate-*`, `zinc-*`, `stone-*` or any decorative blues, purples, etc.
- **Implementation**: Color overrides in `src/app/globals.css` force all non-semantic colors to neutral palette

### Development Patterns
- **Component Organization**: Grouped by feature/domain
- **TypeScript**: Strict mode with comprehensive type definitions
- **Error Handling**: Error boundaries and graceful degradation
- **Testing**: Accessibility and performance testing integrated

### Build & Deployment
- **Platform**: Optimized for Vercel deployment
- **Environments**: Development, staging, production configurations
- **Caching**: Strategic caching for static assets and API routes
- **Monitoring**: Built-in analytics and performance tracking

## Important Notes

### Code Style
- Uses TypeScript strict mode - all types must be properly defined
- Tailwind CSS with utility-first approach
- Component-based architecture with clear separation of concerns
- Accessibility-first development with WCAG 2.1 AA compliance

### Content Guidelines
- All MDX content must include proper frontmatter
- Images should use optimized formats (WebP/AVIF)
- Internationalization keys should be defined in message files
- Blog posts and docs support code highlighting and GFM

## ドキュメントガイドライン
Web向けドキュメント・記事作成の統一基準

### 目次
1. [文体とトーン](#文体とトーン)
2. [記事の構成](#記事の構成)
3. [表記ルール](#表記ルール)
4. [フォーマットと装飾](#フォーマットと装飾)
5. [ビジュアル要素](#ビジュアル要素)
6. [SEOとアクセシビリティ](#seoとアクセシビリティ)
7. [記事タイプ別ガイドライン](#記事タイプ別ガイドライン)
8. [品質基準とレビュー](#品質基準とレビュー)

---

### 文体とトーン

#### 基本原則
- **明確で簡潔に**: 不要な言葉を避け、要点を的確に伝える
- **読者視点で**: 「〜できます」より「〜してください」のような能動的な表現を使用
- **親しみやすく専門的に**: カジュアルになりすぎず、かつ堅苦しくない文体を心がける

#### 敬語レベル
- **技術ドキュメント**: です・ます調を基本とする
- **ブログ記事**: です・ます調、または「だ・である調」（記事の性質により選択）
- **エラーメッセージ・警告**: です・ます調で丁寧に

#### 避けるべき表現
- 「簡単に」「すぐに」などの主観的な表現
- 「〜することができます」→「〜できます」にシンプル化
- 冗長な敬語（「させていただく」の多用）
- 曖昧な代名詞（「これ」「それ」）の多用

#### 推奨される表現
```
❌ このページでは、APIの使い方について説明させていただきます。
✅ APIの使い方を説明します。

❌ ユーザー様におかれましては、以下の手順に従っていただければ幸いです。
✅ 以下の手順に従ってください。
```

---

### 記事の構成

#### 基本テンプレート

##### 1. メタデータ
```yaml
---
title: 記事タイトル
description: 記事の概要（150文字以内）
date: 2025-01-14
author: 著者名
tags: [タグ1, タグ2, タグ3]
category: カテゴリー名
---
```

##### 2. 導入部（リード文）
- **目的**: 読者の興味を引き、記事の価値を伝える
- **構成要素**:
  - この記事で解決できる課題
  - 読者が得られるメリット
  - 記事の概要（3-5文）

##### 3. 目次
- 3つ以上の大見出しがある場合は必須
- 階層は2レベルまで（H2とH3）

##### 4. 本文
- **見出しの階層**:
  - H1: 記事タイトル（1つのみ）
  - H2: 大見出し
  - H3: 中見出し
  - H4: 小見出し（できるだけ使用を避ける）

##### 5. まとめ
- 重要なポイントの要約
- 次のアクション（CTA）
- 関連リソースへのリンク

#### 段落の構成
- 1段落は3-5文を目安とする
- 1文は60文字以内を推奨
- 重要な情報は段落の最初に配置

---

### 表記ルール

#### 数字
- **半角数字を使用**: 1, 2, 3
- **3桁区切り**: 1,000円、10,000件
- **単位との間**: スペースなし（10GB、5分）

#### 英数字・カタカナ
- **半角英数字**: API、URL、JavaScript
- **カタカナ語末の長音**: 
  - 3音以上は長音符号なし: コンピュータ、サーバ
  - 2音以下は長音符号あり: キー、データー

#### 記号
- **括弧**: 半角 () を基本とする
- **中黒（・）**: 並列項目の区切りに使用
- **コロン（：）**: 説明や定義の前に使用

#### 専門用語
- 初出時は正式名称を記載し、略語を併記
  ```
  Application Programming Interface（API）
  ```
- 2回目以降は略語のみで可
- 業界標準の用語を使用

#### 表記の統一例
| 推奨 | 非推奨 |
|------|--------|
| ウェブ | Web、ウエブ |
| メール | Eメール、e-mail |
| ユーザー | ユーザ |
| ブラウザー | ブラウザ |

---

### フォーマットと装飾

#### テキストの強調
- **太字**: 重要な用語、初出の専門用語
- *斜体*: 使用を避ける（日本語では効果が薄い）
- `コード`: インラインコード、ファイル名、コマンド

#### リスト
##### 順序なしリスト
- 並列の情報
- 順序が重要でない項目
- 選択肢の列挙

##### 順序付きリスト
1. 手順の説明
2. ランキング
3. 時系列の情報

#### コードブロック
```javascript
// 言語を指定してシンタックスハイライトを適用
function greet(name) {
  return `こんにちは、${name}さん！`;
}
```

#### 引用
> 重要な注意事項や他のソースからの引用に使用
> 
> 複数行の引用も可能

#### テーブル
| 項目 | 説明 | 例 |
|------|------|-----|
| GET | データの取得 | /api/users |
| POST | データの作成 | /api/users |
| PUT | データの更新 | /api/users/1 |
| DELETE | データの削除 | /api/users/1 |

---

### ビジュアル要素

#### 画像
- **形式**: PNG（スクリーンショット）、SVG（図表）
- **サイズ**: 幅1000px以下、高さ500px以下
- **ファイル名**: 説明的な名前を使用 `api-response-example.png`
- **alt属性**: 必須、画像の内容を簡潔に説明

#### スクリーンショット
- UIの重要な部分のみをキャプチャ
- 個人情報はマスキングまたは架空のデータを使用
- 矢印や枠線で注目箇所を強調（色: #EE2604）

#### 図表・ダイアグラム
- Mermaidまたは draw.io を使用
- シンプルで理解しやすいデザイン
- 色数は3-4色に制限
- フォントは統一（推奨: Noto Sans JP）

#### 動画
- 複雑な操作の説明に限定
- 長さは3分以内を推奨
- キャプション（字幕）を提供

---

### SEOとアクセシビリティ

#### タイトルタグ
- **文字数**: 30-60文字
- **構成**: `主要キーワード - サブキーワード | サイト名`
- **例**: `REST API設計のベストプラクティス - 実装ガイド | TechDocs`

#### メタディスクリプション
- **文字数**: 120-160文字
- **内容**: 記事の要約と読者へのメリットを含む
- **キーワード**: 自然に組み込む（詰め込み過ぎない）

#### 見出しタグ
- H1は1ページに1つのみ
- 階層を飛ばさない（H2→H4は避ける）
- キーワードを適切に含める

#### 内部リンク
- 関連記事への適切なリンク
- アンカーテキストは説明的に
- 同じページへの重複リンクは避ける

#### アクセシビリティ
- 画像には必ずalt属性
- 色だけで情報を伝えない
- リンクテキストは「こちら」を避け、具体的に記述

---

### 記事タイプ別ガイドライン

#### 技術ドキュメント
- **目的**: 正確な情報提供と実装支援
- **構成**:
  1. 概要
  2. 前提条件
  3. 手順
  4. コード例
  5. トラブルシューティング
  6. 関連リソース

#### チュートリアル
- **目的**: 段階的な学習支援
- **構成**:
  1. 学習目標
  2. 必要な環境・ツール
  3. ステップバイステップの手順
  4. 各ステップの説明とコード
  5. 動作確認方法
  6. 次のステップ

#### APIリファレンス
- **目的**: API仕様の正確な記述
- **構成**:
  1. エンドポイント一覧
  2. 認証方法
  3. リクエスト/レスポンス形式
  4. エラーコード
  5. 使用例（cURL、各言語のSDK）

#### ブログ記事
- **目的**: 知見の共有、製品アップデート
- **構成**:
  1. 課題や背景
  2. 解決方法や新機能
  3. 実装例や使用例
  4. 結果や効果
  5. まとめと今後の展望

---

### 品質基準とレビュー

#### 文章の品質基準
- **明確性**: 専門知識がない読者でも理解できる
- **正確性**: 技術的に正しい情報のみを記載
- **完全性**: 必要な情報がすべて含まれている
- **一貫性**: 用語や表記が統一されている

#### セルフチェックリスト
- [ ] 誤字脱字がない
- [ ] 専門用語の説明がある
- [ ] コード例が動作する
- [ ] リンクが正しく機能する
- [ ] 画像が適切に表示される
- [ ] 文体が統一されている
- [ ] SEO要件を満たしている

#### レビュープロセス
1. **執筆者によるセルフレビュー**
   - チェックリストに基づく確認
   - 音読による文章の流れ確認

2. **技術レビュー**
   - コード例の動作確認
   - 技術的正確性の検証

3. **編集レビュー**
   - 文体・表記の統一
   - 構成の改善提案

4. **最終確認**
   - 公開前の総合チェック
   - メタデータの確認

#### 更新管理
- 最終更新日を記載
- 大幅な変更時は更新履歴を追加
- 古い情報には警告を表示
- 定期的な見直し（四半期ごと）

---

### 付録: よく使うマークダウン記法

#### 基本記法
```markdown
# 見出し1
## 見出し2
### 見出し3

**太字**
*斜体*
`インラインコード`

[リンクテキスト](URL)
![画像の説明](画像URL)

- リスト項目1
- リスト項目2

1. 番号付きリスト1
2. 番号付きリスト2
```

#### 拡張記法
```markdown
```言語名
コードブロック
```

| 列1 | 列2 |
|-----|-----|
| データ1 | データ2 |

> 引用文

---  // 水平線

- [ ] チェックボックス（未完了）
- [x] チェックボックス（完了）
```

#### 注意事項の記法
```markdown
> **Note**: 一般的な注意事項

> **Warning**: 重要な警告

> **Tip**: 便利な情報やコツ

> **Important**: 特に重要な情報
```

---

このガイドラインは定期的に見直し、必要に応じて更新してください。

### Icon Guidelines
- **Library**: Use Lucide React exclusively for all icons
- **Import**: Import specific icons from 'lucide-react' (e.g., `import { Search, User } from 'lucide-react'`)
- **Sizing**: Use consistent sizing classes:
  - Small: `h-3 w-3` or `h-4 w-4`
  - Medium: `h-5 w-5` or `h-6 w-6`
  - Large: `h-8 w-8` or larger
- **Colors**: Apply colors through className (e.g., `text-blue-500`, `text-gray-400`)
- **Stroke Width**: Use `strokeWidth={1.5}` for thinner icons, default (2) for normal weight
- **Accessibility**: Always include `aria-hidden="true"` for decorative icons, or proper `aria-label` for interactive icons
- **Standard Icons**:
  - Search: `Search`
  - Navigation: `Menu`, `X`
  - Content Types: `FileText` (docs), `Edit` (blog), `Package` (releases)
  - Errors: `AlertTriangle`
  - Social: `Twitter`, `Github`, `Linkedin`
  - Actions: `Clock`, `Tag`, `Wifi`
- **Never**: Use inline SVG or other icon libraries to maintain consistency

### Performance Requirements
- Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Bundle size monitoring with automatic analysis
- Image optimization and lazy loading by default
- Critical CSS inlined for above-the-fold content