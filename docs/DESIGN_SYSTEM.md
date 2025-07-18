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

## Icon Guidelines
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