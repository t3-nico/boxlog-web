# 多言語システム実装ガイド

このドキュメントでは、boxlog-webに実装された包括的な多言語システムについて説明します。

## 📋 概要

- **対応言語**: 英語 (en) / 日本語 (jp)
- **ルーティング**: `/en/*` と `/jp/*` の自動生成
- **SEO対応**: hreflang、メタデータ、サイトマップ完全対応
- **ユーザー体験**: 自動言語検出、スムーズな言語切り替え

## 🏗️ システム構成

### 1. ファイル構造
```
src/
├── app/[locale]/           # 動的ロケールルーティング
│   ├── page.tsx           # ホームページ（両言語対応）
│   ├── blog/
│   │   ├── page.tsx       # ブログ一覧（両言語対応）
│   │   └── [slug]/page.tsx # 個別記事（両言語対応）
│   └── features/page.tsx   # 機能ページ（両言語対応）
├── lib/i18n.ts            # 翻訳辞書とロケール設定
├── middleware.ts          # 言語検出・リダイレクト処理
└── components/
    ├── layout/Header.tsx   # 多言語ナビゲーション
    ├── layout/Footer.tsx   # 多言語フッター
    └── ui/language-switcher.tsx # 言語切り替えUI
```

### 2. 主要コンポーネント

#### 翻訳システム (`src/lib/i18n.ts`)
```typescript
// 辞書型定義
export interface Dictionary {
  common: { home: string, about: string, ... }
  pages: { 
    home: { title: string, subtitle: string, cta: string }
    blog: { title: string, subtitle: string, ... }
  }
  // ...
}

// 翻訳関数
export function getDictionary(locale: Locale): Dictionary
export function formatLocalizedDate(date: Date, locale: Locale): string
```

#### ミドルウェア (`src/middleware.ts`)
- **自動言語検出**: Accept-Languageヘッダー解析
- **リダイレクト処理**: `/` → `/en/` または `/jp/`
- **Cookie管理**: 言語設定の永続化
- **セキュリティヘッダー**: CSP、HSTS等の設定

#### メタデータシステム (`src/lib/metadata.ts`)
- **hreflangタグ**: `en-US` / `ja-JP` 相互参照
- **OpenGraph**: 言語別OGP情報
- **サイトマップ**: 両言語URL自動生成

## 🚀 新しいページの作成方法

### Step 1: ページファイル作成
```typescript
// src/app/[locale]/new-page/page.tsx
import { getDictionary } from '@/lib/i18n'
import { generateSEOMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'

interface PageProps {
  params: { locale: string }
}

// メタデータ生成（SEO対応）
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = params
  const dict = await getDictionary(locale as 'en' | 'jp')
  
  return generateSEOMetadata({
    title: dict.pages.newPage.title,
    description: dict.pages.newPage.description,
    url: `/${locale}/new-page`,
    locale: locale,
    keywords: locale === 'jp' 
      ? ['日本語', 'キーワード']
      : ['english', 'keywords'],
    type: 'website'
  })
}

// 静的パラメータ生成
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'jp' }
  ]
}

// ページコンポーネント
export default async function NewPage({ params }: PageProps) {
  const { locale } = params
  const dict = await getDictionary(locale as 'en' | 'jp')
  
  return (
    <div>
      <h1>{dict.pages.newPage.title}</h1>
      <p>{dict.pages.newPage.description}</p>
      <button>{dict.common.getStarted}</button>
    </div>
  )
}
```

### Step 2: 翻訳追加
```typescript
// src/lib/i18n.ts の Dictionary interface に追加
export interface Dictionary {
  pages: {
    newPage: {
      title: string
      description: string
    }
  }
}

// 英語翻訳
export const en: Dictionary = {
  pages: {
    newPage: {
      title: 'New Page',
      description: 'This is a new page with multilingual support.'
    }
  }
}

// 日本語翻訳
export const jp: Dictionary = {
  pages: {
    newPage: {
      title: '新しいページ',
      description: '多言語対応の新しいページです。'
    }
  }
}
```

### Step 3: 自動生成される機能
✅ **URL**: `/en/new-page` と `/jp/new-page` が自動生成  
✅ **メタデータ**: 言語別title/description  
✅ **hreflang**: 両言語の相互参照タグ  
✅ **サイトマップ**: sitemap.xmlに両言語URL追加  
✅ **ナビゲーション**: Header/Footerでのリンク（必要に応じて）

## 🔧 開発時のベストプラクティス

### 1. 翻訳キーの命名規則
```typescript
// ✅ Good - 階層的で意味が明確
dict.pages.pricing.plans.enterprise.title
dict.common.buttons.submit
dict.forms.validation.required

// ❌ Bad - フラットで意味が不明確  
dict.title1
dict.text
dict.button
```

### 2. 条件分岐の使用
```typescript
// ✅ Good - 辞書システム活用
<h1>{dict.pages.contact.title}</h1>

// ⚠️ 必要な場合のみ - 複雑なロジック
{locale === 'jp' ? (
  <ComplexJapaneseComponent />
) : (
  <ComplexEnglishComponent />
)}
```

### 3. 日付・数値のローカライズ
```typescript
import { formatLocalizedDate, formatLocalizedNumber } from '@/lib/i18n'

// 日付
const displayDate = formatLocalizedDate(new Date(), locale as 'en' | 'jp')
// 英語: January 15, 2024
// 日本語: 2024年1月15日

// 数値
const displayNumber = formatLocalizedNumber(1234.56, locale as 'en' | 'jp')
// 英語: 1,234.56
// 日本語: 1,234.56
```

## 🧪 テスト・品質保証

### 開発時チェックリスト
- [ ] `npm run type-check` - 型エラーなし
- [ ] `npm run lint` - コード品質OK
- [ ] `npm run build` - ビルド成功
- [ ] 両言語でページ表示確認
- [ ] 言語切り替え動作確認
- [ ] メタデータ・hreflang確認

### 本格テスト項目
```bash
# 1. 日本語ブラウザでの自動リダイレクト
curl -H "Accept-Language: ja" http://localhost:3000/ # → /jp/

# 2. 英語ブラウザでの自動リダイレクト  
curl -H "Accept-Language: en-US" http://localhost:3000/ # → /en/

# 3. 直接アクセス
curl http://localhost:3000/jp/new-page # → 200 OK
curl http://localhost:3000/en/new-page # → 200 OK

# 4. 404処理
curl http://localhost:3000/jp/invalid # → 404 Not Found
```

## 🚀 本番デプロイ

### ビルド時の自動生成
```bash
npm run build
# → 273 static pages generated (両言語分)
# → sitemap.xml with both languages
# → proper hreflang meta tags
```

### パフォーマンス最適化
- **静的生成**: 全ページがbuild時に生成
- **最小リダイレクト**: 1回のみの効率的なリダイレクト
- **CDN対応**: 両言語のURL構造がCDNキャッシュに最適

## 🔧 トラブルシューティング

### よくある問題と解決法

#### 1. 翻訳が表示されない
**原因**: 翻訳キーの不一致  
**解決法**: 
```bash
# 使用されているキーを確認
grep -r "dict\." src/app/ src/components/

# i18n.tsの定義と照合
grep -A10 "pages:" src/lib/i18n.ts
```

#### 2. 型エラーが発生
**原因**: locale型の推論エラー  
**解決法**:
```typescript
// ✅ 明示的な型アサーション
const dict = await getDictionary(locale as 'en' | 'jp')

// ✅ 型ガード使用
if (locale === 'en' || locale === 'jp') {
  const dict = await getDictionary(locale)
}
```

#### 3. リダイレクトループ
**原因**: middleware設定の問題  
**解決法**:
```typescript
// middleware.ts のマッチャー確認
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sw.js|manifest.json).*)',
  ]
}
```

## 📈 メンテナンス・拡張

### 新しい言語の追加
1. `src/lib/i18n.ts` にロケール追加
2. 翻訳辞書作成 
3. `generateStaticParams` に追加
4. middleware更新

### パフォーマンス監視
- ビルド時間: `npm run build`
- バンドルサイズ: `npm run analyze`
- Core Web Vitals: 本番環境での測定

---

## 📚 関連リソース

- **Next.js i18n**: https://nextjs.org/docs/app/building-your-application/routing/internationalization
- **hreflang SEO**: https://developers.google.com/search/docs/specialty/international/localized-versions
- **MDN Intl API**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl

---

**実装日**: 2024年7月
**最終更新**: 2025年1月
**対応言語**: EN / JP
**実装完了度**: 100% ✅