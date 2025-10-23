# Design System Guide

boxlog-webプロジェクトのデザインシステムとコンポーネント開発ガイドライン

## Color System Rules

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

## UI/UX デザイン方針とコンポーネント開発ガイドライン

### **基本方針: shadcn/ui中心のデザインシステム**
このプロジェクトは **shadcn/ui** を中心としたデザインシステムを採用しています。一貫性とアクセシビリティを保つため、すべてのUI開発において以下の方針に従ってください。

### **コンポーネント選択の優先順位**
1. **第一選択**: 既存の shadcn/ui コンポーネント（Button、Card、Form、Input、Dialog、Select、Switch など）
2. **第二選択**: shadcn/ui コンポーネントの組み合わせ（composition patterns）による拡張
3. **最後の手段**: プロジェクト固有の機能で shadcn/ui では対応できない場合のみカスタムコンポーネント作成

### **shadcn/ui優先の理由**
- **メインアプリケーションとの一貫性**: 同じ shadcn/ui + Radix UI の組み合わせを使用
- **アクセシビリティ**: Radix UI のプリミティブにより WCAG 2.1 AA 準拠が保証
- **メンテナンス性**: 標準化されたコンポーネントライブラリによる保守性向上
- **開発効率**: 既存のコンポーネントの再利用による開発スピード向上

### **カスタムコンポーネントの作成指針**
- **必要最小限**: プロジェクト固有の機能でのみカスタムコンポーネントを作成
- **shadcn/ui パターンに準拠**: カスタムコンポーネントも shadcn/ui の設計パターンと Tailwind 規則に従う
- **Radix UI ベース**: shadcn/ui にないコンポーネントは Radix UI プリミティブを基盤として使用
- **アクセシビリティ必須**: すべてのカスタムコンポーネントは WCAG 2.1 AA 基準を満たす

### **既存コンポーネントの現状**
- **shadcn/ui コンポーネント (74%)**:
  - UI/UX: Button、Card、Input、Form、Dialog、Select、Switch、Badge、Checkbox、RadioGroup
  - フォーム: React Hook Form との統合、Zod バリデーション
  - レイアウト: Responsive グリッド、Flexbox ユーティリティ

- **カスタムコンポーネント (26%)**:
  - Container: プロジェクト固有のレイアウト制約
  - Typography: 独自のタイポグラフィスケール
  - ThemeToggle: プロジェクト固有のテーマ切り替え機能
  - ErrorBoundary: エラー処理とフォールバック UI

### **今後のデザイン変更方針**
- **shadcn/ui エコシステム内での進化**: 新しいデザイン要求は shadcn/ui の機能範囲内で解決
- **コンポーネントライブラリの拡張**: 必要に応じて shadcn/ui に新しいコンポーネントを追加
- **デザインチームとの協力**: 新しいデザインが既存のコンポーネントライブラリを活用できるよう調整
- **段階的移行**: 既存カスタムコンポーネントの shadcn/ui への移行を設計更新時に実施

### **実装ガイドライン**
```typescript
// ✅ 推奨: shadcn/ui コンポーネントを使用
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// ✅ 推奨: 組み合わせによる拡張
<Card>
  <CardHeader>
    <CardTitle>タイトル</CardTitle>
  </CardHeader>
  <CardContent>
    <Button variant="outline">アクション</Button>
  </CardContent>
</Card>

// ❌ 避けるべき: 不要なカスタムコンポーネント
const CustomButton = ({ children, ...props }) => (
  <button className="custom-styles" {...props}>
    {children}
  </button>
)
```

### **品質保証**
- **コンポーネントレビュー**: 新しいコンポーネントは shadcn/ui 優先の原則に従っているか確認
- **アクセシビリティテスト**: すべてのコンポーネントは WCAG 2.1 AA 基準でテスト
- **一貫性チェック**: デザインシステムの一貫性を維持するための定期的な監査

## Spacing System - 8px Grid System

### **基本原則**
すべてのスペーシング（余白、パディング、マージン）は8pxの倍数を使用します。これにより視覚的なリズムと一貫性を保ち、デザインの品質を向上させます。

**例外**: アイコンサイズは実用性を優先し、業界標準の20px（`h-5 w-5`）を推奨します。

### **8px Grid System の利点**
- **視覚的統一感**: 一貫したスペーシングによる美しいレイアウト
- **デザイナーとの協力**: 多くのデザインツールで採用されている標準
- **スケーラビリティ**: レスポンシブデザインでの一貫した比率維持
- **開発効率**: 迷いのないスペーシング選択

### **スペーシング値対応表**

| 用途 | Tailwind Class | px値 | 8px倍数 |
|------|----------------|------|---------|
| 極小間隔 | `space-y-1`, `p-1`, `m-1` | 4px | 0.5× |
| 小間隔 | `space-y-2`, `p-2`, `m-2` | 8px | 1× |
| 通常間隔 | `space-y-3`, `p-3`, `m-3` | 12px | 1.5× |
| 標準間隔 | `space-y-4`, `p-4`, `m-4` | 16px | 2× |
| 中間隔 | `space-y-6`, `p-6`, `m-6` | 24px | 3× |
| 大間隔 | `space-y-8`, `p-8`, `m-8` | 32px | 4× |
| 特大間隔 | `space-y-12`, `p-12`, `m-12` | 48px | 6× |
| 最大間隔 | `space-y-16`, `p-16`, `m-16` | 64px | 8× |

### **要素別ガイドライン**

#### **コンポーネント内部**
```typescript
// ✅ 推奨: 8の倍数を使用
<Card className="p-6">        // 24px padding
  <div className="space-y-4"> // 16px間隔
    <h2>タイトル</h2>
    <p>コンテンツ</p>
  </div>
</Card>

// ❌ 避けるべき: 不規則な値
<Card className="p-5">        // 20px - 8の倍数ではない
  <div className="space-y-5"> // 20px - 8の倍数ではない
```

#### **セクション間のスペーシング**
- セクション間: `space-y-12` (48px) または `space-y-16` (64px)
- カード間: `gap-6` (24px) または `gap-8` (32px)
- リスト項目間: `space-y-2` (8px) または `space-y-3` (12px)

#### **レスポンシブスペーシング**
```typescript
// ✅ 推奨: レスポンシブユーティリティを活用
<div className="p-responsive">     // sm:p-6 lg:p-8
<div className="space-responsive"> // space-y-4 sm:space-y-6 lg:space-y-8
<div className="gap-responsive">   // gap-4 sm:gap-6 lg:gap-8
```

### **フォントサイズと行間**

#### **8pxグリッドに適合したタイポグラフィ**
| Tailwind Class | フォントサイズ | 行間 | 8px倍数行間 |
|----------------|----------------|------|-------------|
| `text-xs` | 12px | 16px | 2× |
| `text-sm` | 14px | 20px | 2.5× |
| `text-base` | 16px | 24px | 3× |
| `text-lg` | 18px | 28px | 3.5× |
| `text-xl` | 20px | 28px | 3.5× |
| `text-2xl` | 24px | 32px | 4× |
| `text-3xl` | 30px | 36px | 4.5× |

#### **カスタム行間調整**
```typescript
// ✅ 推奨: 8の倍数に調整された行間
<h1 className="text-3xl leading-10"> // 40px行間 (5×8px)
<p className="text-base leading-6">  // 24px行間 (3×8px)
```

### **UI要素の高さ**

#### **ボタンとフォーム要素**
- 小ボタン: `h-8` (32px) - 4×8px
- 標準ボタン: `h-10` (40px) - 5×8px
- 大ボタン: `h-12` (48px) - 6×8px
- 入力フィールド: `h-10` (40px) - 5×8px
- テキストエリア: `h-24` (96px) - 12×8px

#### **コンテナ要素**
- ヘッダー: `h-16` (64px) - 8×8px
- フッター: 最小 `h-32` (128px) - 16×8px
- カード: 最小 `h-24` (96px) - 12×8px

### **実装チェックリスト**
- [ ] すべてのパディング値が8の倍数
- [ ] すべてのマージン値が8の倍数
- [ ] コンポーネント間のスペーシングが統一
- [ ] ボタンとフォーム要素の高さが8の倍数
- [ ] 行間が8pxグリッドに適合
- [ ] レスポンシブ時も8の倍数を維持
- [ ] アイコンサイズは標準20px（`h-5 w-5`）を使用（8pxグリッドの例外として認める）

## Icon Guidelines
- **Library**: Use Lucide React exclusively for all icons
- **Import**: Import specific icons from 'lucide-react' (e.g., `import { Search, User } from 'lucide-react'`)
- **Sizing**: Balanced approach prioritizing usability over strict 8px grid:
  - Small: `h-4 w-4` (16px - 2×8px) - Dense layouts, favicons
  - **Standard**: `h-5 w-5` (20px - industry standard) - Default for most UI icons
  - Large: `h-6 w-6` (24px - 3×8px, Lucide default) - Headers, prominent features
  - Extra Large: `h-8 w-8` (32px - 4×8px) - Hero sections, CTAs
- **Rationale**: 20px provides optimal balance with 16px text and follows IBM/industry standards
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