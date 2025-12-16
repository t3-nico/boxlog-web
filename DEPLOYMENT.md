# デプロイガイド

このガイドでは、BoxLogマーケティングウェブサイトの各環境へのデプロイ方法を説明します。

## 🌍 環境概要

| 環境 | URL | ブランチ | 自動デプロイ | 用途 |
|------|-----|----------|--------------|------|
| 開発 | `localhost:3000` | `dev` | ❌ | ローカル開発 |
| ステージング | `staging.yoursite.com` | `staging` | ✅ | テスト・QA |
| 本番 | `yoursite.com` | `main` | ✅ | ライブサイト |

## 🚀 Vercelデプロイ（推奨）

### 初期セットアップ

1. **リポジトリを接続**
   - [vercel.com](https://vercel.com)にアクセス
   - GitHubリポジトリをインポート
   - プロジェクトのルートディレクトリを選択

2. **ビルド設定**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "installCommand": "npm install",
     "framework": "nextjs"
   }
   ```

3. **環境変数**
   Vercelダッシュボードで以下を設定：

   **本番環境:**
   ```bash
   NEXT_PUBLIC_SITE_URL=https://yoursite.com
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   NODE_ENV=production
   CONTACT_EMAIL=contact@yoursite.com
   ```

   **ステージング:**
   ```bash
   NEXT_PUBLIC_SITE_URL=https://staging.yoursite.com
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-STAGING-ID
   NODE_ENV=staging
   CONTACT_EMAIL=staging@yoursite.com
   ```

### ブランチ設定

1. **本番ブランチ**: `main`
   - 自動デプロイ
   - カスタムドメイン: `yoursite.com`
   - 本番環境変数を使用

2. **ステージングブランチ**: `staging`
   - 自動デプロイ
   - プレビュードメイン: `staging.yoursite.com`
   - ステージング環境変数を使用

3. **開発ブランチ**: `dev`
   - 手動デプロイのみ
   - テスト用プレビュードメイン

### カスタムドメイン

1. Vercelダッシュボードで**ドメインを追加**
2. **DNS設定**:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com

   Type: A
   Name: @
   Value: 76.76.19.61
   ```
3. **SSL証明書** - Vercelで自動発行

## 🔧 代替デプロイオプション

### Netlify

1. **ビルド設定**
   ```toml
   [build]
     command = "npm run build && npm run export"
     publish = "out"

   [build.environment]
     NODE_VERSION = "18"
   ```

2. **リダイレクト** (`_redirects`ファイル)
   ```
   /api/* /.netlify/functions/:splat 200
   /* /index.html 200
   ```

### AWS Amplify

1. **ビルド仕様** (`amplify.yml`)
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

### Dockerデプロイ

1. **Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS deps
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production

   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY . .
   COPY --from=deps /app/node_modules ./node_modules
   RUN npm run build

   FROM node:18-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV production

   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next ./.next
   COPY --from=builder /app/node_modules ./node_modules
   COPY --from=builder /app/package.json ./package.json

   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **ビルドと実行**
   ```bash
   docker build -t boxlog-web .
   docker run -p 3000:3000 boxlog-web
   ```

## ⚙️ 環境設定

### 環境別の環境変数

#### 開発環境 (`.env.local`)
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-DEV-ID
ANALYZE=false
NEXT_PUBLIC_ENABLE_BETA_FEATURES=true
SKIP_TYPE_CHECK=false
```

#### ステージング環境
```bash
NEXT_PUBLIC_SITE_URL=https://staging.yoursite.com
NODE_ENV=staging
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-STAGING-ID
CONTACT_EMAIL=staging@yoursite.com
NEXT_PUBLIC_ENABLE_BETA_FEATURES=true
```

#### 本番環境
```bash
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NODE_ENV=production
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-PROD-ID
CONTACT_EMAIL=contact@yoursite.com
SENDGRID_API_KEY=SG.production-key
SENTRY_DSN=https://production@sentry.io/project
```

## 🔐 セキュリティ設定

### 本番用セキュリティヘッダー

デプロイ時に以下のヘッダーを設定してください：

```javascript
// セキュリティヘッダー（middleware.tsで設定済み）
{
  "X-DNS-Prefetch-Control": "on",
  "X-XSS-Protection": "1; mode=block",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-eval' https://www.googletagmanager.com;",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload"
}
```

### SSL/TLS設定

- **TLS 1.2以上**必須
- **HTTP/2**有効化
- **HSTS**プリロード付き
- **証明書の透明性**ログ記録

## 📊 パフォーマンス最適化

### ビルド最適化

1. **バンドル分析**
   ```bash
   npm run analyze
   ```

2. **型チェック**
   ```bash
   npm run type-check
   ```

3. **リント**
   ```bash
   npm run lint
   ```

### CDN設定

#### Vercel Edge Network
- グローバルCDN自動設定
- Edge Functions対応
- 画像最適化

#### CloudFront（AWS用）
```json
{
  "cacheBehaviors": [
    {
      "pathPattern": "/_next/static/*",
      "cachePolicyId": "caching-optimized",
      "compress": true
    },
    {
      "pathPattern": "/api/*",
      "cachePolicyId": "caching-disabled"
    }
  ]
}
```

## 🧪 デプロイ前テスト

### 自動テストパイプライン

1. **テストスイート実行**
   ```bash
   npm run test
   npm run type-check
   npm run lint
   ```

2. **パフォーマンステスト**
   ```bash
   npm run test:lighthouse
   ```

3. **セキュリティスキャン**
   ```bash
   npm audit
   ```

### 手動テストチェックリスト

- [ ] すべてのページが正しく読み込まれる
- [ ] 検索機能が動作する
- [ ] フォームが正しく送信される
- [ ] モバイルレスポンシブ対応
- [ ] スクリーンリーダーでのアクセシビリティ
- [ ] パフォーマンススコア（Lighthouse 90以上）
- [ ] SEOメタデータが正しい
- [ ] アナリティクスのトラッキング

## 🚨 監視とアラート

### パフォーマンス監視

1. **Core Web Vitals**
   - LCP < 2.5秒
   - FID < 100ms
   - CLS < 0.1

2. **稼働監視**
   - ステータスページチェック
   - APIエンドポイント監視
   - 地理的監視

### エラートラッキング

1. **Sentry設定**
   ```javascript
   import * as Sentry from "@sentry/nextjs"

   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: process.env.NODE_ENV,
     tracesSampleRate: 1.0,
   })
   ```

2. **アラート設定**
   - エラー率 > 1%
   - パフォーマンス低下
   - 稼働率 < 99.9%

## 🔄 ロールバック戦略

### Vercelロールバック

1. **ダッシュボードから**
   - Deploymentsタブに移動
   - 以前のデプロイを選択
   - 「Promote to Production」をクリック

2. **CLIから**
   ```bash
   vercel --prod --force
   ```

### 緊急時の手順

1. **即時ロールバック**
   - 最後の正常なデプロイに戻す
   - 関係者に連絡
   - 問題を調査

2. **ホットフィックスプロセス**
   - mainからhotfixブランチを作成
   - 最小限の修正を適用
   - テストを迅速に実行
   - 本番にデプロイ

## 📋 デプロイチェックリスト

### デプロイ前
- [ ] コードレビュー完了
- [ ] テスト通過
- [ ] パフォーマンス指標確認
- [ ] セキュリティスキャン完了
- [ ] 環境変数更新
- [ ] データベースマイグレーション（必要な場合）

### デプロイ中
- [ ] ステージングにデプロイ
- [ ] ステージングで動作確認
- [ ] 本番にデプロイ
- [ ] 本番デプロイを確認
- [ ] エラー監視

### デプロイ後
- [ ] パフォーマンス監視
- [ ] エラートラッキング
- [ ] ユーザーフィードバック監視
- [ ] アナリティクス確認
- [ ] SEOインデックス状況

## 📞 サポート・トラブルシューティング

### よくある問題

1. **ビルド失敗**
   - Node.jsバージョンを確認（18以上）
   - 環境変数を確認
   - ビルドキャッシュをクリア

2. **パフォーマンス問題**
   - バンドルアナライザーを実行
   - 画像最適化を確認
   - CDN設定を確認

3. **SEO問題**
   - メタタグを確認
   - サイトマップ生成を確認
   - 構造化データを検証

### ヘルプ

- **ドキュメント**: 内部Wiki参照
- **サポート**: DevOpsチームに連絡
- **緊急時**: オンコールエンジニアに連絡

---

詳細情報は[README.md](README.md)を参照するか、開発チームに連絡してください。

**最終更新**: 2025年1月
