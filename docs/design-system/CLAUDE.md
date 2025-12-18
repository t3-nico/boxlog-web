# デザインシステム - boxlog-web

## 概要

boxlog-web のデザインシステムは **boxlog-app と共通化** されています。
共通トークンは app が正（ソースオブトゥルース）です。

## カラーシステム

### カラー形式

**OKLCH** を使用（モダンで広い色域をサポート）

```css
/* 例 */
--primary: oklch(0.6231 0.188 259.8145);
--background: oklch(0.99 0 0);
```

### トークン構成

| カテゴリ            | 同期元 | 説明                                                                                                                                         |
| ------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **共通トークン**    | app    | background, foreground, primary, card, popover, secondary, muted, accent, destructive, warning, success, info, border, input, ring, chart-\* |
| **web固有トークン** | web    | sidebar-_, release-_, tag-_, highlight-_, icon-bg-_, signup-btn-_                                                                            |

### 共通トークン（appと同期）

```css
/* 背景・前景 */
--background, --foreground

/* カード・ポップオーバー */
--card, --card-foreground
--popover, --popover-foreground

/* プライマリ */
--primary, --primary-foreground

/* セカンダリ・ミュート */
--secondary, --secondary-foreground
--muted, --muted-foreground

/* アクセント */
--accent, --accent-foreground

/* セマンティックカラー */
--destructive, --destructive-foreground
--warning, --warning-foreground
--success, --success-foreground
--info, --info-foreground

/* ボーダー・インプット */
--border, --input, --ring

/* チャート */
--chart-1 〜 --chart-5
```

### web固有トークン

```css
/* サイドバー */
--sidebar-background, --sidebar-foreground
--sidebar-primary, --sidebar-primary-foreground
--sidebar-accent, --sidebar-accent-foreground
--sidebar-border, --sidebar-ring

/* リリースタイプ色 */
--release-new-bg, --release-new-text, --release-new-border
--release-improvement-*, --release-bugfix-*
--release-breaking-*, --release-security-*

/* タグ色 */
--tag-neutral-bg, --tag-neutral-text, --tag-neutral-hover
--tag-accent-bg, --tag-accent-text, --tag-accent-hover

/* 検索ハイライト */
--highlight-bg, --highlight-text

/* アイコン背景 */
--icon-bg-primary, --icon-bg-secondary, --icon-bg-tertiary

/* ボタン色 */
--signup-btn-bg, --signup-btn-text
```

## Tailwind v4 構成

### @theme inline マッピング

CSS変数をTailwindクラスで使用できるようにマッピング：

```css
@theme inline {
  --color-background: var(--background);
  --color-primary: var(--primary);
  /* ... */
}
```

### 使用例

```tsx
// Tailwindクラスで使用
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground">送信</button>
</div>
```

## 角丸（Border Radius）

8pxグリッド準拠、appと同期：

| トークン        | 値     | 用途   |
| --------------- | ------ | ------ |
| `--radius-sm`   | 4px    | 小要素 |
| `--radius-md`   | 8px    | 標準   |
| `--radius-xl`   | 16px   | 大要素 |
| `--radius-2xl`  | 24px   | 特大   |
| `--radius-full` | 9999px | 円形   |

## ダークモード

`.dark` クラスでダークモード切り替え：

```tsx
// next-themes 使用
<html className={theme === 'dark' ? 'dark' : ''}>
```

## 同期ルール

### 共通トークン更新時

1. **app で変更**（app が正）
2. **web に反映**（globals.css の「共通トークン」セクション）

### web固有トークン更新時

1. web の globals.css を直接編集
2. app への反映は不要

## 参照

- **app スタイルガイド**: `boxlog-app/docs/design-system/STYLE_GUIDE.md`
- **globals.css**: `src/app/globals.css`

---

**最終更新**: 2025-12-18
