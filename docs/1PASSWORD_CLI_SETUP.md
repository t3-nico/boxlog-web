# 1Password CLI セットアップガイド

BoxLogプロジェクトにおける1Password CLIの設定と使用方法について説明します。

## 📋 前提条件

- macOS環境
- 1Passwordアプリがインストール済み
- my.1password.comアカウントでサインイン済み
- 1Passwordアプリで「CLI統合」が有効

## 🚀 セットアップ済み設定

### 1. インストール済みバージョン
```bash
op --version
# 2.31.1
```

### 2. 環境変数設定（~/.zshrc）
```bash
export OP_ACCOUNT="my.1password.com"
eval "$(op completion zsh)"; compdef _op op
```

### 3. 利用可能なスクリプト（package.json）
```json
{
  "scripts": {
    "dev:secure": "op run -- npm run dev",
    "build:secure": "op run -- npm run build", 
    "test:secure": "op run -- npm run test",
    "secrets:inject": "op inject -i .env.template -o .env.local",
    "secrets:validate": "op item list --vault Private"
  }
}
```

## 🔐 使用방法

### 基本コマンド

```bash
# アカウント情報確認
op account list

# Vault一覧
op vault list

# アイテム検索
op item list --vault Private

# 特定アイテム取得
op item get "アイテム名" --vault Private

# パスワードのみ取得
op item get "アイテム名" --field password
```

### 開発時の秘密情報注入

```bash
# 環境変数付きで開発サーバー起動
npm run dev:secure

# または直接実行
op run -- npm run dev
```

### シークレット参照の書き方

`.env.local`で以下の形式で1Passwordのアイテムを参照：

```bash
# 基本形式: op://Vault名/アイテム名/フィールド名
DATABASE_URL="op://Private/Database/credential"
API_KEY="op://Private/API Keys/openai_api_key"
NEXTAUTH_SECRET="op://Private/NextAuth Secret/password"
```

## 📁 Vault構成例

推奨Vault構成：

### Private Vault
- **Database** - データベース接続情報
- **API Keys** - 外部サービスAPI키
- **NextAuth Secret** - JWT署名用秘密키
- **Stripe** - 決済関連키
- **SendGrid** - メール送信API키
- **Google OAuth** - Google認証键
- **GitHub OAuth** - GitHub認証键

## 🛡️ セキュリティベストプラクティス

### 1. シークレット管理ルール
- ❌ `.env.local`にプレーンテキストで秘密情報を保存
- ✅ 1Password内で管理し、参照形式で使用
- ✅ `.env.example`には参照例のみ記載

### 2. 開発チーム共有
- 共通のVault名・アイテム名規則を使用
- 新しいシークレットは`.env.example`に追加
- チーム内で1Password Business利用推奨

### 3. CI/CD環境
- GitHub ActionsではSecrets使用
- 本番環境では環境変数として設定
- 1Password CLI接続は開発環境のみ

## 🔧 トラブルシューティング

### よくある問題

#### 1. "account is not signed in"エラー
```bash
# 解決方法
op signin --account my.1password.com
```

#### 2. Touch ID認証が要求される
- 1Passwordアプリ → 設定 → セキュリティ → Touch ID有効化
- 1Passwordアプリ → 設定 → 開発者 → CLI統合有効化

#### 3. 補完が効かない
```bash
# ~/.zshrcに追加されているか確認
grep "op completion" ~/.zshrc

# 新しいターミナルセッションで試行
source ~/.zshrc
```

## 📝 開発フロー例

### 1. 新しいAPIキー追加時
1. 1Password Private Vaultに新しいアイテム作成
2. `.env.example`に参照例追加
3. チームに共有・ドキュメント更新

### 2. ローカル開発開始時
```bash
# 1Password状態確認
npm run secrets:validate

# 秘密情報付きで開発開始
npm run dev:secure
```

### 3. 本番デプロイ時
- Vercel/AWS等で環境変数として設定
- 1Password参照形式は使用しない

## 🌟 利用可能な高度な機能

### 1. 条件付きアクセス
```bash
# 特定条件でのみアクセス可能なアイテム
op item get "Production DB" --vault Production
```

### 2. テンプレート注入
```bash
# テンプレートファイルから.env.local生成
npm run secrets:inject
```

### 3. アイテム作成
```bash
# 新しいAPIキー保存
op item create --category "API Credential" \
  --title "New Service API" \
  --vault Private \
  API_KEY=secret_value
```

## 📚 参考リンク

- [1Password CLI公式ドキュメント](https://developer.1password.com/docs/cli)
- [シークレット参照ガイド](https://developer.1password.com/docs/cli/secret-references)
- [GitHub Actions連携](https://developer.1password.com/docs/ci-cd/github-actions)

---

**更新日**: 2025-08-05  
**バージョン**: v1.0