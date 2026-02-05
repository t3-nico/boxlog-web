# デザインシステム - dayopt-web

## 概要

dayopt-web のデザインシステムは **dayopt-app と共通化** されています。
共通トークンは app が正（ソースオブトゥルース）です。
Storybook（`dayopt-app/src/stories/tokens/`）が各トークンの定義元です。

## カラーシステム

### カラー形式

**OKLCH** を使用（モダンで広い色域をサポート）

```css
--primary: oklch(0.6231 0.188 259.8145);
--background: oklch(0.99 0 0);
```

### Surface 階層（4段階）

| トークン        | 用途                               |
| --------------- | ---------------------------------- |
| `bg-background` | ページ全体の背景                   |
| `bg-container`  | セクション・エリア背景             |
| `bg-card`       | カード・パネル背景                 |
| `bg-overlay`    | モーダル・シートの背景オーバーレイ |

### テキストカラー

| トークン                | 用途               |
| ----------------------- | ------------------ |
| `text-foreground`       | メインテキスト     |
| `text-muted-foreground` | 補助・説明テキスト |
| `text-card-foreground`  | カード内テキスト   |

### セマンティックカラー

| カテゴリ        | 背景             | テキスト                      | ホバー                       |
| --------------- | ---------------- | ----------------------------- | ---------------------------- |
| **Primary**     | `bg-primary`     | `text-primary-foreground`     | `hover:bg-primary-hover`     |
| **Destructive** | `bg-destructive` | `text-destructive-foreground` | `hover:bg-destructive-hover` |
| **Warning**     | `bg-warning`     | `text-warning`                | `hover:bg-warning-hover`     |
| **Success**     | `bg-success`     | `text-success`                | `hover:bg-success-hover`     |
| **Info**        | `bg-info`        | `text-info`                   | `hover:bg-info-hover`        |

### ホバーパターン（重要）

**不透明度ベースのホバーは禁止**。専用ホバートークンを使用すること。

```tsx
// ✅ 塗りボタンのホバー
<button className="bg-primary hover:bg-primary-hover">送信</button>
<button className="bg-destructive hover:bg-destructive-hover">削除</button>

// ✅ Ghostボタンのホバー（薄い背景色）
<button className="text-primary hover:bg-primary-state-hover">編集</button>
<button className="text-destructive hover:bg-destructive-state-hover">削除</button>

// ✅ ニュートラルホバー（汎用）
<div className="hover:bg-state-hover">リスト項目</div>

// ✅ Secondaryホバー
<span className="bg-muted hover:bg-secondary-hover">タグ</span>

// ❌ 禁止: 不透明度ベース
<button className="bg-primary hover:bg-primary/90">...</button>
<div className="hover:bg-muted/80">...</div>
```

### ボーダー・入力

| トークン        | 用途               |
| --------------- | ------------------ |
| `border-border` | 汎用ボーダー       |
| `bg-input`      | 入力フィールド背景 |
| `ring-ring`     | フォーカスリング   |

## タイポグラフィ

### フォントウェイト（2種類のみ）

| クラス        | 用途                         |
| ------------- | ---------------------------- |
| `font-bold`   | 見出し、ボタン、ラベル、強調 |
| `font-normal` | 本文、説明文                 |

```tsx
// ❌ 禁止
<span className="font-semibold">...</span>
<span className="font-medium">...</span>
```

### フォントサイズ

Tailwindデフォルト: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`

### テキストカラー

セマンティックトークンのみ使用。ハードコード禁止。

```tsx
// ✅ 推奨
<h1 className="text-foreground">タイトル</h1>
<p className="text-muted-foreground">説明</p>
<span className="text-destructive">エラー</span>

// ❌ 禁止
<h1 className="text-neutral-900 dark:text-neutral-100">...</h1>
<span className="text-red-600 dark:text-red-400">...</span>
```

## Z-Index（セマンティックレイヤー）

| トークン     | 値   | 用途                               |
| ------------ | ---- | ---------------------------------- |
| `z-dropdown` | 50   | ドロップダウン、ヘッダー           |
| `z-popover`  | 100  | ポップオーバー、日付選択           |
| `z-sheet`    | 150  | シート、ドロワー、モバイルメニュー |
| `z-modal`    | 200  | ダイアログ・モーダル               |
| `z-toast`    | 300  | トースト通知                       |
| `z-tooltip`  | 9999 | ツールチップ（最前面）             |

```tsx
// ✅ 推奨
<div className="z-modal">...</div>

// ❌ 禁止
<div className="z-50">...</div>
<div className="z-[200]">...</div>
```

## モーション

### アニメーション

| クラス            | 用途                             |
| ----------------- | -------------------------------- |
| `animate-shimmer` | スケルトンローダー               |
| `animate-shake`   | エラーフィードバック             |
| `animate-spin`    | ローディング（要 motion-reduce） |

### デュレーション（許可値）

`duration-75`, `duration-150`, `duration-200`, `duration-300`

### アクセシビリティ

```tsx
// ✅ animate-spin には必ず motion-reduce を付与
<Loader2 className="animate-spin motion-reduce:animate-none" />

// ✅ スケルトンは animate-shimmer を使用
<div className="animate-shimmer rounded-lg" />
```

## スペーシング（8ptグリッド）

許可値: `1`(4px), `2`(8px), `4`(16px), `6`(24px), `8`(32px), `12`(48px), `16`(64px)

```tsx
// ✅ 推奨
<div className="p-4 gap-6 space-y-8 mt-12">

// ❌ 禁止
<div className="p-3 gap-5 space-y-7">
```

微調整用: `0.5`(2px), `1`(4px), `1.5`(6px) は許可

## 角丸（5種類のみ）

| クラス         | 用途        |
| -------------- | ----------- |
| `rounded-none` | 角丸なし    |
| `rounded`      | 微小（4px） |
| `rounded-lg`   | 標準（8px） |
| `rounded-2xl`  | 大（16px）  |
| `rounded-full` | 円形        |

```tsx
// ❌ 禁止
<div className="rounded-sm">...</div>
<div className="rounded-md">...</div>
<div className="rounded-xl">...</div>
```

## シャドウ（6段階）

`shadow-none`, `shadow-xs`, `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`

## ダークモード

`.dark` クラスでダークモード切り替え。
セマンティックトークンを使用していれば `dark:` プレフィックスは不要。

```tsx
// ✅ セマンティックトークン → dark: 不要
<div className="bg-background text-foreground">

// ❌ dark: プレフィックスでのハードコード
<div className="bg-white dark:bg-gray-900">
```

## 同期ルール

### 共通トークン更新時

1. **app で変更**（app が正）
2. **web に反映**（globals.css の共通トークンセクション）

### web固有トークン更新時

1. web の globals.css を直接編集
2. app への反映は不要

## 参照

- **app Storybook**: `dayopt-app/src/stories/tokens/` （Colors, Typography, ZIndex, Motion, Shadows, etc.）
- **globals.css**: `src/app/globals.css`

---

**最終更新**: 2026-02
