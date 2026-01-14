# i18n 実装ガイド

## ディレクトリ構造

```
messages/
├── en/                    # 英語
│   ├── common.json        # 共通UI
│   ├── legal.json         # 法的文書
│   └── marketing.json     # マーケティング
└── ja/                    # 日本語
    └── (同構造)

src/i18n/
├── routing.ts             # ルーティング設定
├── request.ts             # メッセージローダー
├── navigation.ts          # next-intl ナビゲーション
└── CLAUDE.md              # 本ドキュメント
```

## 命名規則

### ファイル名

| ルール                    | 例                                    |
| ------------------------- | ------------------------------------- |
| **1ファイル = 1ドメイン** | `common.json` → `common` ドメインのみ |
| **単数形**                | `tag.json` ✅ / `tags.json` ❌        |
| **camelCase**             | `aiChat.json` ✅ / `ai-chat.json` ❌  |

**例外**: `settings`, `stats` は英語で複数形が自然なため許容

### キー構造

```
domain.section.key
```

| 階層 | 説明                         | 例                            |
| ---- | ---------------------------- | ----------------------------- |
| 1    | ドメイン（ファイル名と一致） | `common`                      |
| 2    | 画面名 or UIセクション名     | `navigation`, `actions`       |
| 3    | 具体的な意味                 | `home`, `login`               |
| 4    | 特殊ケースのみ               | `blog.filters.searchArticles` |

**section の許容値**:

- 画面名: `login`, `dashboard`, `detail`, `list`
- UIセクション: `header`, `sidebar`, `modal`, `form`, `toolbar`
- 例外: `validation`, `errors`, `actions` は概念セクションとして許容

### 良い例 / 悪い例

```json
// ✅ 良い例 (common.json)
{
  "common": {
    "navigation": {
      "home": "Home",
      "about": "About"
    }
  },
  "actions": {
    "save": "Save",
    "cancel": "Cancel"
  }
}

// ❌ 悪い例
{
  "nav_home": "Home",              // フラット過ぎる
  "common.navigation.home": "Home", // ドット区切りの文字列キー
  "Common": { ... }                 // PascalCase
}
```

## 使用方法

### Server Component

```typescript
import { getTranslations } from 'next-intl/server'

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return <h1>{t('common.navigation.home')}</h1>
}
```

### Client Component

```typescript
'use client'

import { useTranslations } from 'next-intl'

export function Navigation() {
  const t = useTranslations()

  return <nav>{t('common.navigation.home')}</nav>
}
```

### ネームスペース指定

```typescript
// 特定ネームスペースのみ使用
const t = await getTranslations({ locale, namespace: 'common' });
t('navigation.home'); // common.navigation.home
```

## ネームスペース一覧

| ネームスペース | 用途                   |
| -------------- | ---------------------- |
| `common`       | 共通UI・ナビゲーション |
| `legal`        | 法的文書               |
| `marketing`    | マーケティングページ   |

## 新規ネームスペース追加

1. `messages/en/{namespace}.json` を作成
2. `messages/ja/{namespace}.json` を作成
3. `src/i18n/request.ts` の `NAMESPACES` 配列に追加

```typescript
const NAMESPACES = [
  // ... 既存
  'newNamespace', // 追加
] as const;
```

## appとの同期

このプロジェクト（web）の翻訳は、dayopt-appと共通化されています。

### 同期対象ファイル

| ファイル         | 同期元        | 備考                           |
| ---------------- | ------------- | ------------------------------ |
| `common.json`    | app + web独自 | app構造ベース、web固有キー追加 |
| `legal.json`     | app           | 完全同期                       |
| `marketing.json` | web独自       | web固有                        |

### 同期ルール

1. **app が正**：共通キーはappの翻訳を使用
2. **web独自キー**：`navigation`, `footer`, `blog`, `releases` はweb固有
3. **構造統一**：キー構造はappに合わせる（`common.*`, `actions.*` など）

### 同期手順

```bash
# Claude Codeで両リポジトリを開いた状態で
# appのmessages/を読み込み、webに反映
```

## 参考

- [next-intl 公式ドキュメント](https://next-intl-docs.vercel.app/)
- [App Router での使用](https://next-intl-docs.vercel.app/docs/getting-started/app-router)
- [dayopt-app/src/i18n/CLAUDE.md](../../dayopt-app/src/i18n/CLAUDE.md) - app側のi18nガイド
