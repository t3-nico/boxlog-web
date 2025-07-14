# 統一カラーシステム実装ガイド

## 概要

Webサイトとアプリでカラーシステムを統一するための実装が完了しました。このシステムにより、ライトモード・ダークモード・システムテーマの自動切り替えに対応し、一貫した色彩設計を実現できます。

## 実装されたファイル

### 1. `src/styles/theme.css`
- 基本的な色定義（RGB値）
- ライトモード・ダークモードの色設定
- システムテーマ対応
- High Contrast モード対応
- Reduced Motion 対応

### 2. `tailwind.config.js`
- 新しいカラーシステムの Tailwind 設定
- 既存の shadcn/ui カラーとの共存

### 3. `src/app/globals.css`
- テーマファイルのインポート
- 既存 Tailwind クラスの自動オーバーライド

### 4. `src/lib/theme-provider.tsx`
- 統一テーマプロバイダーの設定
- `data-theme` 属性を使用

## 使用方法

### 新しいカラークラス

```jsx
// 背景色
<div className="bg-bg-primary">     // 主要背景色
<div className="bg-bg-secondary">   // 副背景色
<div className="bg-bg-tertiary">    // 第三背景色

// テキスト色
<span className="text-text-primary">     // 主要テキスト
<span className="text-text-secondary">   // 副テキスト
<span className="text-text-tertiary">    // 第三テキスト

// ボーダー色
<div className="border-border-primary">   // 主要ボーダー
<div className="border-border-secondary"> // 副ボーダー

// アクセント色
<button className="bg-accent-primary">   // プライマリアクセント
<button className="bg-accent-success">   // 成功色
<button className="bg-accent-warning">   // 警告色
<button className="bg-accent-error">     // エラー色

// サーフェス色
<div className="bg-surface-elevated">    // 浮き上がった要素
<div className="bg-surface-card">        // カード背景
```

### 既存のTailwindクラス（自動対応）

既存のクラスはそのまま使用でき、自動的に新しいカラーシステムに対応されます：

```jsx
// 自動的に統一カラーシステムに変換される
<div className="bg-white text-gray-900 border-gray-200">
<button className="bg-blue-500 hover:bg-blue-600">ボタン</button>
```

### カスタムカラー（タグなど）

```jsx
// CSS変数を直接使用
<div style={{'--tag-color': '#ef4444'}} className="tag-custom">
  <span className="text-[var(--tag-color)]">カスタムタグ</span>
</div>
```

## テーマ切り替え

```jsx
import { useTheme } from '@/lib/theme-provider'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      テーマ切り替え
    </button>
  )
}
```

## 色定義一覧

### ライトモード
- **背景**: white, gray-50, gray-100
- **テキスト**: gray-900, gray-500, gray-400
- **ボーダー**: gray-200, gray-300
- **アクセント**: blue-500, indigo-500, green-500, yellow-500, red-500
- **ホバー**: blue-600, indigo-600, green-600, yellow-600, red-600

### ダークモード
- **背景**: neutral-950, neutral-900, neutral-800 ⚠️ Tailwind標準のneutralカラーのみ使用
- **テキスト**: neutral-50, neutral-300, neutral-400 ⚠️ Tailwind標準のneutralカラーのみ使用
- **ボーダー**: neutral-700, neutral-600 ⚠️ Tailwind標準のneutralカラーのみ使用
- **アクセント**: blue-500, indigo-500, green-500, yellow-500, red-500 ⚠️ ライトモードと同じ色を使用
- **ホバー**: blue-600, indigo-600, green-600, yellow-600, red-600 ⚠️ ライトモードと同じ色を使用

**重要**: アクセントカラーは、ライトモードとダークモードで同じ色（blue-500、green-500など）を使用します。これにより、ブランドカラーの一貫性を保ちます。

## アクセシビリティ対応

- WCAG 2.1 AA準拠のコントラスト比
- High Contrast モード対応
- Reduced Motion 対応
- フォーカスリング色の統一

## ブラウザサポート

- CSS Variables をサポートするすべてのモダンブラウザ
- IE11 は非対応（CSS Variables 未対応のため）

## 今後の拡張

このシステムはCSS変数ベースなので、新しい色を追加する際は以下の手順で行ってください：

1. `src/styles/theme.css` に新しい色変数を追加
2. `tailwind.config.js` に対応するTailwindクラスを追加
3. 必要に応じて `globals.css` にオーバーライドを追加

これにより、アプリとWebサイトで完全に統一されたカラーシステムが実現できます。