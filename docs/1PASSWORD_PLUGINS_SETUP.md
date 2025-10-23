# 1Password CLI プラグイン設定ガイド

プロジェクトで使用する外部ツールとの1Password CLI連携設定です。

## 🔧 推奨プラグイン

### 1. GitHub CLI (gh)
GitHubリポジトリの操作時に1Passwordから認証情報を自動取得

```bash
# プラグイン初期化
op plugin init gh

# 必要な1Passwordアイテム:
# - Private/GitHub/token (Personal Access Token)
```

### 2. Vercel CLI
デプロイ時にVercelトークンを自動取得

```bash
# プラグイン初期化  
op plugin init vercel

# 必要な1Passwordアイテム:
# - Private/Vercel/token
```

### 3. Stripe CLI
決済機能開発時にStripe認証情報を自動取得

```bash
# プラグイン初期化
op plugin init stripe

# 必要な1Passwordアイテム:
# - Private/Stripe/Key (Secret Key)
```

### 4. AWS CLI
インフラ管理でAWS認証情報を自動取得

```bash
# プラグイン初期化
op plugin init aws

# 必要な1Passwordアイテム:
# - Private/AWS/Access Key ID
# - Private/AWS/Secret Access Key
```

## 📁 1Password Vault構成

### Private Vault推奨アイテム構成:

#### GitHub
- **タイトル**: GitHub
- **フィールド**:
  - `token`: Personal Access Token

#### Vercel  
- **タイトル**: Vercel
- **フィールド**:
  - `token`: Vercel Token

#### Stripe
- **タイトル**: Stripe  
- **フィールド**:
  - `Key`: Secret Key (sk_test_... または sk_live_...)

#### AWS (使用する場合)
- **タイトル**: AWS
- **フィールド**:
  - `Access Key ID`: AWS Access Key
  - `Secret Access Key`: AWS Secret Key

## 🚀 使用方法

### 基本的な使い方

```bash
# GitHubにログイン（1Passwordから自動取得）
gh auth status

# Vercelにデプロイ（1Passwordから自動取得）  
vercel --prod

# Stripe CLI（1Passwordから自動取得）
stripe listen --forward-to localhost:3000/api/webhooks
```

### プラグイン確認

```bash
# 設定済みプラグインの確認
op plugin list

# 特定プラグインの状態確認
op plugin init gh --dry-run
```

## ⚙️ 設定手順

### 1. 必要なツールのインストール

```bash
# GitHub CLI
brew install gh

# Vercel CLI  
npm install -g vercel

# Stripe CLI (必要に応じて)
brew install stripe/stripe-cli/stripe
```

### 2. 1Passwordアイテム作成

各サービスのAPIキー・トークンを1Password Private Vaultに保存：

1. **GitHub Personal Access Token取得**:
   - GitHub Settings → Developer settings → Personal access tokens
   - 必要なスコープ: `repo`, `workflow`, `admin:repo_hook`

2. **Vercel Token取得**:
   - Vercel Dashboard → Settings → Tokens
   - Create Token で新しいトークン作成

3. **Stripe API Keys取得**:
   - Stripe Dashboard → Developers → API keys
   - Secret keyをコピー

### 3. プラグイン初期化

```bash
# 対話形式でプラグイン設定
op plugin init gh
op plugin init vercel
op plugin init stripe
```

## 🔒 セキュリティ考慮事項

### ✅ 推奨事項
- プラグイン使用は開発環境のみ
- 本番環境では環境変数として直接設定
- 定期的なトークンローテーション
- 最小権限の原則でトークン作成

### ❌ 注意事項
- 本番トークンと開発トークンの混同を避ける
- CI/CD環境でのプラグイン使用は避ける
- チーム共有時は適切な権限設定

## 🧪 動作確認

### GitHub CLI連携テスト
```bash
# 認証状態確認
gh auth status

# リポジトリ情報取得
gh repo view boxlog/boxlog-web
```

### Vercel CLI連携テスト  
```bash
# ログイン状態確認
vercel whoami

# プロジェクト一覧
vercel ls
```

### Stripe CLI連携テスト
```bash
# ログイン状態確認
stripe config --list

# Webhook listen
stripe listen --forward-to localhost:3000/api/webhooks
```

## 📚 追加設定可能なプラグイン

プロジェクトの成長に応じて以下のプラグインも追加可能：

- **OpenAI**: AI機能開発時
- **Sentry**: エラー監視設定
- **PostgreSQL**: データベース直接操作
- **Docker**: コンテナ関連操作

## 🆘 トラブルシューティング

### プラグイン初期化エラー
```bash
# キャッシュクリア
op plugin remove gh
op plugin init gh
```

### 認証エラー
```bash
# 1Password再認証
op signin --account my.1password.com

# プラグイン再初期化
op plugin init [plugin-name]
```

---

**更新日**: 2025-08-05  
**バージョン**: v1.0