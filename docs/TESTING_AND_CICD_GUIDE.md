# テスト・CI/CDガイド

このドキュメントでは、BoxLog Webプロジェクトのテスト戦略、CI/CDワークフロー、開発プラクティスについて説明します。

## 概要

プロジェクトでは以下を使用した堅牢なテストと継続的インテグレーション/デプロイ（CI/CD）システムを実装しています：
- **Vitest** - ユニット・統合テスト
- **React Testing Library** - コンポーネントテスト
- **GitHub Actions** - 自動CI/CDパイプライン
- **ESMモジュール** - モダンJavaScript互換性

## テストインフラストラクチャ

### テストフレームワークスタック

- **Vitest** - ネイティブESMサポートの高速ユニットテストランナー
- **React Testing Library** - コンポーネントテストユーティリティ
- **jsdom** - ブラウザ環境シミュレーション
- **@testing-library/user-event** - ユーザーインタラクションシミュレーション
- **@testing-library/jest-dom** - カスタムJestマッチャー

### テスト設定

```typescript
// vitest.config.ts
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    css: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
```

### テストコマンド

| コマンド | 説明 |
|---------|------|
| `npm run test` | インタラクティブウォッチモードでテスト実行 |
| `npm run test:run` | 全テスト一回実行（CI用） |
| `npm run test:ui` | Vitest UIインターフェース起動 |
| `npm run test:watch` | ウォッチモードでテスト実行 |

## テスト構造

### 現在のテストカバレッジ

```
src/components/__tests__/
├── sample.test.tsx          # 基本テストセットアップ確認
├── button.test.tsx          # Buttonコンポーネントテスト
├── theme-toggle.test.tsx    # テーマ切替機能
└── error-boundary.test.tsx  # エラーバウンダリ動作
```

**総テスト数**: 4テストファイル、17テスト

### テストカテゴリ

#### 1. **コンポーネントテスト**
- **Buttonコンポーネント**: バリアント、サイズ、アクセシビリティ、ユーザーインタラクション
- **テーマトグル**: テーマ切替、マウント動作、アクセシビリティ
- **エラーバウンダリ**: エラーハンドリング、フォールバックUI、リカバリーメカニズム

#### 2. **統合テスト**
- 外部ライブラリ（next-themes）とのコンポーネント連携
- エラー状態管理とリカバリー
- ユーザーイベントシミュレーションとレスポンス

#### 3. **アクセシビリティテスト**
- 適切なARIA属性
- キーボードナビゲーション
- スクリーンリーダー互換性

### テストの書き方

#### ベストプラクティス

```typescript
// 例: コンポーネントテスト構造
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { ComponentName } from '@/components/ui/component-name'

describe('ComponentName', () => {
  it('正しくレンダリングされる', () => {
    render(<ComponentName />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('ユーザーインタラクションを処理する', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<ComponentName onClick={handleClick} />)

    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })
})
```

#### テストガイドライン

1. **実装ではなく動作をテスト**
   - ユーザーに見える動作に焦点を当てる
   - コンポーネントの出力と副作用をテスト
   - 内部状態や実装詳細のテストを避ける

2. **適切なクエリを使用**
   - `getByTestId()`より`getByRole()`を優先
   - ユーザーインタラクションに合致するセマンティッククエリを使用
   - React Testing Libraryのクエリ優先順位に従う

3. **外部依存関係のモック**
   - 必要に応じてサードパーティライブラリをモック
   - モジュールレベルのモックには`vi.mock()`を使用
   - 現実的なモック実装を提供

4. **アクセシビリティをテスト**
   - 適切なARIA属性を検証
   - キーボードナビゲーションをテスト
   - スクリーンリーダー互換性を確保

## CI/CDパイプライン

### ワークフロー概要

プロジェクトでは3つのメインGitHub Actionsワークフローを使用：

#### 1. **CIワークフロー** (`ci.yml`)
**トリガー**: `dev`/`main`へのpush、`dev`/`main`へのPR

**ジョブ**:
- **Testジョブ** (Node.js 18.x & 20.xマトリックス)
  - 依存関係インストール (`npm ci`)
  - リント実行 (`npm run lint`)
  - 型チェック実行 (`npm run type-check`)
  - **Vitestテスト実行** (`npm run test:run`)
  - アプリケーションビルド (`npm run build`)

- **Lighthouseジョブ** (テスト通過後)
  - パフォーマンス監査
  - SEO分析
  - ベストプラクティス検証

- **アクセシビリティジョブ** (テスト通過後)
  - WCAG準拠チェック
  - スクリーンリーダー互換性
  - 色コントラスト検証

- **パフォーマンスジョブ** (テスト通過後)
  - バンドルサイズ分析
  - Core Web Vitals測定
  - パフォーマンス回帰検出

#### 2. **デプロイワークフロー** (`deploy.yml`)
**トリガー**: `main`ブランチへのpush、手動ディスパッチ

**ジョブ**:
- **Deployジョブ**
  - 本番ビルド準備
  - Vercelデプロイ
  - 環境設定

- **Post-Deployジョブ**
  - 本番環境テスト
  - ライブサイトのLighthouse監査
  - アクセシビリティ検証

#### 3. **PRプレビューワークフロー** (`pr-preview.yml`)
**トリガー**: PRイベント（opened、synchronized、reopened）

**ジョブ**:
- **Previewジョブ**
  - プレビューバージョンビルド
  - Vercelプレビュー環境へデプロイ
  - PRにプレビューURLをコメント

### 自動品質ゲート

#### テスト要件
- すべてのVitestテストが通過（17/17）
- TypeScriptコンパイル成功
- ESLintがエラーなしで通過
- ビルドプロセス正常完了

#### パフォーマンス要件
- Lighthouseパフォーマンススコア > 90
- First Contentful Paint < 1.8秒
- Largest Contentful Paint < 2.5秒
- Cumulative Layout Shift < 0.1

#### アクセシビリティ要件
- WCAG 2.1 AA準拠
- 色コントラスト比 > 4.5:1
- キーボードナビゲーション対応
- スクリーンリーダー互換性

### ブランチ保護ルール

#### `main`ブランチ:
- PRレビュー必須
- ステータスチェック通過必須
- ブランチが最新であること必須
- 特定ロールへのpush制限

#### `dev`ブランチ:
- ステータスチェック通過必須
- マージコミットとスカッシュマージを許可
- ステージング環境への自動デプロイ

## 開発ワークフロー

### 1. **ローカル開発**

```bash
# 開発サーバー起動
npm run dev

# ウォッチモードでテスト実行
npm run test

# 完全品質チェック実行
npm run lint && npm run type-check && npm run test:run && npm run build
```

### 2. **フィーチャー開発**

```bash
# フィーチャーブランチ作成
git checkout -b feat/your-feature-name

# テスト付きでフィーチャー実装
# ローカルテスト実行
npm run test:run

# 変更をコミット
git add .
git commit -m "feat: フィーチャーの説明"

# pushしてPR作成
git push origin feat/your-feature-name
```

### 3. **プルリクエストプロセス**

1. **PR作成** - `dev`ブランチをターゲット
2. **自動チェック**が自動実行：
   - CIパイプラインが全テスト実行
   - プレビューデプロイ作成
   - 品質ゲート評価
3. チームメンバーによる**コードレビュー**
4. 承認とチェック成功後に**マージ**

### 4. **リリースプロセス**

1. `dev`ブランチで**フィーチャー完了**
2. `dev`から`main`への**リリースPR作成**
3. ステージング環境での**本番テスト**
4. `main`へのマージで**本番デプロイ**
5. 自動テストによる**デプロイ後検証**

## 監視とメンテナンス

### テストメンテナンス

#### 定期タスク
- **週次**: テストカバレッジレポートレビュー
- **月次**: テスト依存関係更新
- **リリースごと**: 新機能の統合テスト追加
- **四半期**: パフォーマンステストレビューと最適化

#### テスト拡張領域
1. **API統合テスト**
   - ルートハンドラテスト
   - データベース統合
   - 外部サービスモック

2. **E2Eテスト**（将来）
   - ユーザージャーニーテスト
   - クロスブラウザ互換性
   - モバイルレスポンシブ

3. **ビジュアル回帰テスト**（将来）
   - コンポーネントビジュアル一貫性
   - テーマ切替検証
   - レスポンシブデザイン検証

### CI/CD監視

#### 主要メトリクス
- **ビルド成功率**: 目標95%以上
- **テスト実行時間**: 目標2分以内
- **デプロイ頻度**: 追跡・最適化
- **リカバリー時間**: インシデント対応監視

#### アラート
- ビルド失敗時に開発チームへ通知
- パフォーマンス回帰でアラート発火
- セキュリティ脆弱性でデプロイブロック
- アクセシビリティ問題でマージ防止

## トラブルシューティング

### よくある問題

#### 1. **CIでのテスト失敗**
```bash
# ローカルテスト実行確認
npm run test:run

# ESM互換性確認
node --version  # 18.xまたは20.xであること

# 依存関係インストール確認
rm -rf node_modules package-lock.json
npm install
```

#### 2. **ビルド失敗**
```bash
# TypeScriptコンパイル確認
npm run type-check

# ESLintエラー確認
npm run lint

# 全依存関係確認
npm audit --audit-level=moderate
```

#### 3. **ESMモジュール問題**
- `package.json`に`"type": "module"`があることを確認
- 設定ファイルでES import/export構文を使用
- `vitest.config.ts`のパス解決を確認

#### 4. **不安定なテスト**
- ユーザーイベントには`user.setup()`を使用
- 外部依存関係を適切にモック
- 非同期操作には適切な`waitFor()`を追加

### ヘルプ

#### ドキュメントリソース
- [Vitestドキュメント](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [GitHub Actions](https://docs.github.com/en/actions)

#### 内部リソース
- `CLAUDE.md` - プロジェクト概要とコマンド
- `docs/DOCUMENTATION_GUIDE.md` - ドキュメントガイドライン
- `docs/PERFORMANCE_GUIDE.md` - 最適化戦略

## 将来のロードマップ

### 短期（1-2ヶ月）
- [ ] コンポーネントテストカバレッジを90%以上に拡張
- [ ] APIルート統合テスト追加
- [ ] ビジュアル回帰テスト実装
- [ ] パフォーマンス予算設定

### 中期（3-6ヶ月）
- [ ] Playwrightによる完全E2Eテストスイート
- [ ] 自動セキュリティスキャン
- [ ] マルチ環境テスト（ステージング/本番）
- [ ] テスト結果分析ダッシュボード

### 長期（6ヶ月以上）
- [ ] AI駆動テスト生成
- [ ] カオスエンジニアリング実践
- [ ] 高度なパフォーマンス監視
- [ ] クロスプラットフォームテスト自動化

---

*このガイドはコードベースと共にメンテナンスされています。質問や改善提案はissueを作成するかPRを提出してください。*

**最終更新**: 2025年1月
