---
date: 2025-01-30
author: Claude
category: design-system
tags: [web, implementation, next.js, tailwind]
source: compass
---

# Web版（boxlog-web）実装ガイド

## 🎯 対象者
- フロントエンド開発者
- Next.js + Tailwind CSS を使用したプロジェクト

## 📋 実装手順

### **Phase 1: 基盤設定（30分）**

#### 1. デザインシステムファイルの配置
```bash
# Compassからファイルをコピー
mkdir -p src/design-system/tokens
mkdir -p src/design-system/guidelines

# 必要ファイルをコピー
cp boxlog-compass/01-shared/design-system/tokens/colors-neutral.ts src/design-system/tokens/
cp boxlog-compass/01-shared/design-system/tokens/tailwind-neutral.js src/design-system/tokens/
cp boxlog-compass/01-shared/design-system/examples/web-components.tsx src/components/ui/
```

#### 2. Tailwind設定の更新
```javascript
// tailwind.config.js
const neutralConfig = require('./src/design-system/tokens/tailwind-neutral')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...neutralConfig.colors,
        ...neutralConfig.extend.colors
      },
      animation: neutralConfig.extend.animation,
      keyframes: neutralConfig.extend.keyframes
    },
  },
  plugins: [],
}
```

#### 3. CSS変数の設定
```typescript
// src/pages/_app.tsx (Pages Router)
// または src/app/layout.tsx (App Router)

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { generateNeutralCSSVariables } from '@/design-system/tokens/colors-neutral'

export default function App({ Component, pageProps }: AppProps) {
  const { theme } = useTheme()
  
  useEffect(() => {
    const isDarkMode = theme === 'dark'
    const cssVars = generateNeutralCSSVariables(isDarkMode)
    
    // CSS変数をドキュメントルートに適用
    Object.entries(cssVars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }, [theme])

  return <Component {...pageProps} />
}
```

#### 4. テーマプロバイダーの設定
```typescript
// src/pages/_app.tsx
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
```

### **Phase 2: コンポーネント実装（2-3時間）**

#### 1. 基本UIコンポーネントの作成
```typescript
// src/components/ui/index.ts
export { Button } from './button'
export { Card } from './card'
export { Input } from './input'
export { Alert } from './alert'
```

#### 2. ボタンコンポーネント
```typescript
// src/components/ui/button.tsx
import React from 'react'
import { cn } from '@/utils/cn' // classname ユーティリティ

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          // 基本スタイル
          'inline-flex items-center justify-center font-medium rounded-md transition-all duration-150',
          'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-border-focus',
          
          // サイズ
          {
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          
          // バリアント
          {
            'bg-btn-primary hover:bg-btn-primary-hover active:bg-btn-primary-active text-btn-primary-text border border-btn-primary':
              variant === 'primary',
            'bg-btn-secondary hover:bg-btn-secondary-hover active:bg-btn-secondary-active text-btn-secondary-text border border-border-primary':
              variant === 'secondary',
            'bg-btn-ghost hover:bg-btn-ghost-hover active:bg-btn-ghost-active text-btn-ghost-text border border-border-primary':
              variant === 'ghost',
          },
          
          // 状態
          {
            'cursor-not-allowed opacity-60': disabled || loading,
            'cursor-pointer': !disabled && !loading,
          },
          
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
```

#### 3. ユーティリティ関数
```typescript
// src/utils/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### **Phase 3: 既存コンポーネントの移行（1-2日）**

#### 1. ボタンの移行例
```typescript
// 移行前
<button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
  送信
</button>

// 移行後
<Button variant="primary">
  送信
</Button>
```

#### 2. カードの移行例
```typescript
// 移行前
<div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
  <h3 className="text-lg font-semibold text-gray-900">タイトル</h3>
  <p className="text-gray-600">内容</p>
</div>

// 移行後
<Card>
  <h3 className="text-text-primary text-lg font-semibold">タイトル</h3>
  <p className="text-text-secondary">内容</p>
</Card>
```

#### 3. フォームの移行例
```typescript
// 移行前
<input 
  className="border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500"
  placeholder="入力してください"
/>

// 移行後
<Input 
  placeholder="入力してください"
  // 自動的に適切なスタイルが適用される
/>
```

### **Phase 4: 品質確保（半日）**

#### 1. TypeScript型チェック
```bash
npm run type-check
# または
npx tsc --noEmit
```

#### 2. Lintチェック
```bash
npm run lint
# または
npx eslint src/ --ext .ts,.tsx
```

#### 3. アクセシビリティ確認
```bash
# Lighthouse でのアクセシビリティ確認
npm run build
npm run start
npx lighthouse http://localhost:3000 --only-categories=accessibility
```

#### 4. 視覚確認
```typescript
// デバッグページの作成
// src/pages/debug/colors.tsx
import { Button, Card, Input, Alert } from '@/components/ui'

export default function ColorsDebugPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold text-text-primary">カラーシステム確認</h1>
      
      {/* ボタン確認 */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">ボタン</h2>
        <div className="flex gap-4">
          <Button variant="primary">プライマリ</Button>
          <Button variant="secondary">セカンダリ</Button>
          <Button variant="ghost">ゴースト</Button>
          <Button disabled>無効</Button>
        </div>
      </Card>
      
      {/* テキスト階層確認 */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">テキスト階層</h2>
        <p className="text-text-primary mb-2">プライマリテキスト</p>
        <p className="text-text-secondary mb-2">セカンダリテキスト</p>
        <p className="text-text-tertiary">ターシャリテキスト</p>
      </Card>
    </div>
  )
}
```

### **Phase 5: デプロイ準備（30分）**

#### 1. ビルド確認
```bash
npm run build
npm run start
# ビルドエラーがないことを確認
```

#### 2. パフォーマンステスト
```bash
npx lighthouse http://localhost:3000 --chrome-flags="--headless"
# Performance, Accessibility スコアを確認
```

## 🔧 設定ファイル例

### package.json 依存関係
```json
{
  "dependencies": {
    "next": "^13.0.0",
    "react": "^18.0.0",
    "next-themes": "^0.2.0",
    "clsx": "^1.2.0",
    "tailwind-merge": "^1.14.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.0.0",
    "@types/react": "^18.0.0",
    "typescript": "^4.9.0"
  }
}
```

### TypeScript設定
```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/design-system/*": ["./src/design-system/*"]
    }
  }
}
```

## 🎯 完了チェックリスト

### 基本実装
- [ ] Tailwind設定の更新完了
- [ ] CSS変数の設定完了
- [ ] 基本UIコンポーネント実装完了
- [ ] TypeScript型エラーなし

### 品質確保
- [ ] 全ページでライト・ダークモード動作確認
- [ ] Lighthouse アクセシビリティスコア 95+
- [ ] 既存機能の動作確認完了
- [ ] レスポンシブ対応確認完了

### パフォーマンス
- [ ] ビルドサイズ増加 5% 以内
- [ ] Lighthouse Performance スコア 90+
- [ ] テーマ切り替え時のちらつきなし

## 🆘 問題が発生した場合

1. **[トラブルシューティングガイド](./troubleshooting.md)** を確認
2. **Compassの実装例** を参考: `01-shared/design-system/examples/web-components.tsx`
3. **GitHub Issues** で質問: [BoxLog Compass Issues](https://github.com/boxlog/boxlog-compass/issues)

---

**推定作業時間**: 1-2日  
**必要スキル**: React, Next.js, Tailwind CSS の基本知識  
**サポート**: #design-system Slackチャンネル