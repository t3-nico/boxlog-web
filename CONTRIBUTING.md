# Contributing to BoxLog Web

BoxLog Webへの貢献に興味を持っていただき、ありがとうございます！このガイドでは、プロジェクトへの貢献方法について説明します。

## 目次

- [開発環境のセットアップ](#開発環境のセットアップ)
- [開発ワークフロー](#開発ワークフロー)
- [コーディング規約](#コーディング規約)
- [コミットメッセージ](#コミットメッセージ)
- [プルリクエスト](#プルリクエスト)
- [テスト](#テスト)

## 開発環境のセットアップ

### 前提条件

- **Node.js**: 18.0以上
- **npm**: 8.0以上
- **Git**: 最新版

### セットアップ手順

1. **リポジトリのフォーク**
   ```bash
   # GitHubでリポジトリをフォーク後、クローン
   git clone https://github.com/YOUR_USERNAME/boxlog-web.git
   cd boxlog-web
   ```

2. **依存関係のインストール**
   ```bash
   npm ci
   ```

3. **環境変数の設定**
   ```bash
   cp .env.example .env.local
   # .env.local を編集（詳細は docs/ENVIRONMENT_VARIABLES.md を参照）
   ```

4. **開発サーバーの起動**
   ```bash
   npm run dev
   ```

   ブラウザで http://localhost:3000 を開く

### 推奨VSCode拡張機能

`.vscode/extensions.json` に記載されている拡張機能をインストールしてください：

- Prettier（コードフォーマッター）
- ESLint（リンター）
- Tailwind CSS IntelliSense
- Pretty TypeScript Errors
- MDX

## 開発ワークフロー

### 1. ブランチの作成

機能開発、バグ修正、リファクタリングごとにブランチを作成：

```bash
# 機能開発
git checkout -b feature/your-feature-name

# バグ修正
git checkout -b fix/bug-description

# リファクタリング
git checkout -b refactor/what-you-refactor
```

### 2. コード変更

- **自動フォーマット**: 保存時に自動実行（VSCode設定済み）
- **手動フォーマット**: `npm run format`
- **Lint**: `npm run lint`（コミット前に自動実行）

### 3. コミット前チェック

Huskyが自動的に実行：

```bash
# pre-commit フック
- Prettier（自動フォーマット）
- ESLint（自動修正可能なエラーを修正）
```

手動確認：

```bash
# 型チェック
npm run type-check

# ビルド確認
npm run build
```

### 4. プッシュ

```bash
git push origin feature/your-feature-name
```

## コーディング規約

### TypeScript

- **厳格モード有効**: `strict: true`
- **型注釈**: 型推論が効かない場合のみ明示
- **any禁止**: `unknown` または適切な型を使用
- **オプショナルチェーン**: `?.` を積極的に使用

**良い例:**
```typescript
// ✅ 型推論を活用
const user = { name: 'John', age: 30 };

// ✅ unknown型で安全に処理
function handleError(error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}

// ✅ オプショナルチェーン
const userName = user?.profile?.name ?? 'Anonymous';
```

**悪い例:**
```typescript
// ❌ 不要な型注釈
const user: { name: string; age: number } = { name: 'John', age: 30 };

// ❌ any型の使用
function handleError(error: any) {
  console.error(error.message);
}
```

### React

- **関数コンポーネント**: アロー関数を使用
- **Hooks**: ルールに従う（トップレベルのみ）
- **Props**: インターフェースで定義
- **export**: `export default` より名前付きexportを推奨

**良い例:**
```typescript
// ✅ 関数コンポーネント + 型定義
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return <button onClick={onClick}>{children}</button>;
};
```

### CSS/Tailwind

- **Tailwind優先**: カスタムCSSは最小限に
- **cn()ヘルパー**: 条件付きクラスに使用
- **8pxグリッド**: スペーシングは8の倍数

```typescript
import { cn } from '@/lib/utils';

// ✅ 条件付きクラス
<button className={cn(
  'px-4 py-2 rounded-lg',
  isActive && 'bg-blue-500',
  isDisabled && 'opacity-50 cursor-not-allowed'
)}>
```

### ファイル命名規則

- **コンポーネント**: PascalCase（例: `SearchDialog.tsx`）
- **ユーティリティ**: kebab-case（例: `error-utils.ts`）
- **ページ**: Next.js規約に従う（例: `page.tsx`）

## コミットメッセージ

[Conventional Commits](https://www.conventionalcommits.org/) 形式を使用：

### フォーマット

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント変更
- `style`: コードスタイル（機能変更なし）
- `refactor`: リファクタリング
- `perf`: パフォーマンス改善
- `test`: テスト追加・修正
- `chore`: ビルド・設定変更

### 例

```
feat(search): Add keyboard navigation support

- Implement arrow key navigation
- Add Enter key to select result
- Support Escape key to close dialog

Closes #123
```

```
fix(api): Fix rate limiting for search endpoint

Rate limit was not applied correctly for authenticated users.
This commit fixes the issue by checking IP address first.
```

## プルリクエスト

### チェックリスト

プルリクエストを作成する前に確認：

- [ ] `npm run type-check` が成功
- [ ] `npm run lint` が成功
- [ ] `npm run build` が成功
- [ ] 新機能には適切なコメント・ドキュメントを追加
- [ ] 破壊的変更がある場合は明記
- [ ] テストを追加（該当する場合）

### PRテンプレート

```markdown
## 概要

この PR の目的を簡潔に説明してください。

## 変更内容

- 変更点1
- 変更点2

## スクリーンショット（該当する場合）

UIの変更がある場合、スクリーンショットを追加してください。

## 関連Issue

Closes #123
```

### レビュープロセス

1. CI/CDが自動的に実行
   - Lint
   - TypeScript型チェック
   - ビルド

2. レビュアーが確認
   - コード品質
   - パフォーマンス
   - セキュリティ

3. 承認後にマージ

## テスト

### 型チェック

```bash
npm run type-check
```

### Lint

```bash
# チェックのみ
npm run lint

# 自動修正
npm run lint:fix
```

### フォーマット

```bash
# チェックのみ
npm run format:check

# 自動修正
npm run format
```

### アクセシビリティ

```bash
npm run test:a11y
```

### パフォーマンス

```bash
npm run test:performance
```

## ヘルプ

質問がある場合：

- **Issue**: [GitHub Issues](https://github.com/t3-nico/boxlog-web/issues)
- **ドキュメント**: `docs/` ディレクトリを確認

---

**貢献に感謝します！** 🎉
