# GitHub Actions ワークフロー

BoxLog Web（マーケティングサイト）のCI/CDシステム

## ワークフロー構成

| ワークフロー     | ファイル                               | トリガー       | 役割                            |
| ---------------- | -------------------------------------- | -------------- | ------------------------------- |
| **CI Pipeline**  | [`ci.yml`](ci.yml)                     | Push/PR (main) | lint + typecheck + build |
| **Lighthouse**   | [`lighthouse.yml`](lighthouse.yml)     | Push (main)    | パフォーマンス・SEO監視         |
| **Bundle Check** | [`bundle-check.yml`](bundle-check.yml) | PR作成時       | バンドルサイズ監視              |
| **PR Labeler**   | [`pr-labeler.yml`](pr-labeler.yml)     | PR作成/更新時  | 自動ラベル付与                  |

## CI Pipeline ([ci.yml](ci.yml))

**Phase 1: Quick Checks (並列実行)**

- ESLint + Prettier
- TypeScript型チェック

**Phase 2: Build Check**

- Next.jsビルド

**Phase 3: Quality Gate**

- 全チェック結果集約
- PR Summary自動投稿

## Lighthouse CI ([lighthouse.yml](lighthouse.yml))

mainブランチマージ後に実行：

- パフォーマンス監査
- アクセシビリティ監査
- Core Web Vitals計測（SEOに重要）

## Bundle Check ([bundle-check.yml](bundle-check.yml))

PR作成時に実行：

- バンドルサイズ分析
- PRコメント自動投稿

## PR Labeler ([pr-labeler.yml](pr-labeler.yml))

- Conventional Commitsタイトル検証
- type/area/sizeラベル自動付与

## デプロイ

Vercel GitHubインテグレーションによる自動デプロイ：

- **main ブランチへのpush** → 本番デプロイ
- **PR作成** → プレビューデプロイ（自動生成）

## セキュリティ

- すべてのactionsはSHAでピン留め
- 最小権限の原則（permissions）
- concurrencyによる重複実行防止

## ローカル品質チェック

```bash
npm run lint          # ESLint
npm run format:check  # Prettier
npm run type-check    # TypeScript
npm run build         # ビルド確認
```
