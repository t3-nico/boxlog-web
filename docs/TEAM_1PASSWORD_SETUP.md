# チーム向け1Password CLI セットアップ完全ガイド

新しいチームメンバーが1Password CLIを使用してBoxLogプロジェクトで開発を開始するための完全ガイドです。

## 🎯 前提条件チェックリスト

### 必須要件
- [ ] macOS または Linux環境
- [ ] 1Passwordアプリがインストール済み
- [ ] BoxLogチームの1Password Businessアカウントへのアクセス権
- [ ] Node.js 18+ がインストール済み

### アカウント準備
- [ ] 1Passwordアプリで適切なアカウント（my.1password.com）にサインイン済み
- [ ] Private Vaultへのアクセス権限確認済み

## 🔧 ステップ1: 1Password CLI インストール

### macOSの場合
```bash
# Homebrewでインストール
brew install 1password-cli

# バージョン確認
op --version  # 2.31.1以上を確認
```

### Linuxの場合
```bash
# 公式インストーラー使用
curl -sS https://downloads.1password.com/linux/keys/1password.asc | sudo gpg --dearmor --output /usr/share/keyrings/1password-archive-keyring.gpg
echo 'deb [arch=amd64 signed-by=/usr/share/keyrings/1password-archive-keyring.gpg] https://downloads.1password.com/linux/debian/amd64 stable main' | sudo tee /etc/apt/sources.list.d/1password.list
sudo apt update && sudo apt install 1password-cli
```

## 🔑 ステップ2: 1Passwordアプリ統合設定

### 1Passwordアプリの設定
1. **1Passwordアプリを起動**
2. **設定 → セキュリティ**
   - Touch ID/Face ID を有効化
3. **設定 → 開発者**
   - ✅ "1Password CLIと統合" をオンにする

### アカウント確認
```bash
# 利用可能なアカウント確認
op account list

# 期待される出力:
# URL                    EMAIL                        USER ID
# my.1password.com       your-email@domain.com        xxxxxxxxxx
```

## 🚀 ステップ3: プロジェクト固有の設定

### 環境変数設定
```bash
# シェル設定ファイルに追加（zshの場合）
echo 'export OP_ACCOUNT="my.1password.com"' >> ~/.zshrc
echo 'eval "$(op completion zsh)"; compdef _op op' >> ~/.zshrc

# 設定を再読み込み
source ~/.zshrc
```

### プロジェクトクローン・セットアップ
```bash
# リポジトリクローン
git clone [repository-url]
cd boxlog-web

# 依存関係インストール
npm install

# 1Password接続テスト
npm run secrets:validate
```

## 📦 ステップ4: 必要なシークレット作成

### Private Vaultに作成すべきアイテム

#### 開発環境用（必須）
```bash
# 以下のアイテムをPrivate Vaultに作成：

1. NextAuth Secret
   - タイトル: "NextAuth Secret"
   - パスワード: [32文字以上のランダム文字列]

2. Database (開発用)
   - タイトル: "Database"
   - credential: "postgresql://user:pass@localhost:5432/boxlog_dev"

3. SendGrid (メール配信)
   - タイトル: "SendGrid"
   - api_key: "SG.xxxxxxxxxxxxxxxx"
```

#### 外部サービス用（オプション）
```bash
4. Stripe (決済テスト)
   - タイトル: "Stripe"
   - secret_key: "sk_test_xxxxxxxx"
   - publishable_key: "pk_test_xxxxxxxx"

5. Google Analytics
   - タイトル: "Google Analytics"
   - measurement_id: "G-XXXXXXXXXX"

6. Contentful (CMS)
   - タイトル: "Contentful"
   - space_id: "xxxxxxxxxx"
   - access_token: "xxxxxxxxxx"
```

## 🧪 ステップ5: 動作確認

### 基本テスト
```bash
# 1Password接続確認
op whoami

# Vaultアクセス確認
npm run secrets:validate

# 環境変数注入テスト
npm run secrets:inject

# 開発サーバー起動（シークレット付き）
npm run dev:secure
```

### 期待される結果
- ✅ `op whoami` でアカウント情報表示
- ✅ `secrets:validate` でアイテム一覧表示
- ✅ `dev:secure` で localhost:3000 が起動
- ❌ エラーが出る場合はトラブルシューティングを参照

## 🛠️ トラブルシューティング

### よくある問題と解決方法

#### 1. "account is not signed in" エラー
```bash
# 解決手順:
op signin --account my.1password.com

# 1Passwordアプリの統合設定を再確認
# 設定 → 開発者 → CLI統合がオンになっているか確認
```

#### 2. "could not find item" エラー
```bash
# アイテムが存在するか確認
op item list --vault Private | grep "アイテム名"

# アイテムが存在しない場合は作成
op item create --category "Login" --title "アイテム名" --vault Private
```

#### 3. 権限エラー
```bash
# Vault権限確認
op vault list

# Private Vaultが表示されない場合は管理者に権限付与を依頼
```

#### 4. 補完が効かない
```bash
# シェル設定再確認
grep "op completion" ~/.zshrc

# 新しいターミナルセッションで試行
exec zsh -l
```

## 🔐 セキュリティベストプラクティス

### ✅ 推奨事項
- **定期的なトークンローテーション**: 3ヶ月ごと
- **最小権限の原則**: 必要最小限のアクセス権限のみ
- **開発環境と本番環境の分離**: 異なるキーを使用
- **チーム内での統一**: 共通のVault・アイテム名規則

### ❌ 禁止事項
- 本番環境のキーを開発環境で使用
- .env.localファイルのコミット
- シークレット情報のSlack等での共有
- 1Passwordアカウントの共有

## 👥 チーム開発フロー

### 新しいシークレット追加時
1. **1Password管理者がアイテム作成**
2. **`.env.template` を更新**（プルリクエスト）
3. **チーム内でアイテム名・構造を共有**
4. **ドキュメント更新**

### シークレット変更時
1. **1Password内でキーをローテーション**
2. **チーム内に変更を通知**
3. **各メンバーが `npm run secrets:validate` で確認**

## 📞 サポート・問い合わせ

### 技術的な問題
- **1Password CLI**: [公式ドキュメント](https://developer.1password.com/docs/cli)
- **プロジェクト固有**: `docs/1PASSWORD_CLI_SETUP.md` 参照

### アクセス権限の問題
- **1Password管理者**: [管理者メールアドレス]
- **プロジェクト管理者**: [管理者Slack]

## ✅ セットアップ完了チェックリスト

最終確認として、以下が全て動作することを確認してください：

- [ ] `op whoami` でアカウント情報表示
- [ ] `npm run secrets:validate` でエラーなし
- [ ] `npm run dev:secure` で開発サーバー起動
- [ ] ブラウザで localhost:3000 にアクセス可能
- [ ] 1Passwordアプリでアイテム編集後、即座に反映される

---

**セットアップ完了後は、このドキュメントを他のチームメンバーと共有し、統一された開発環境を維持してください。**

**更新日**: 2025-08-05  
**バージョン**: v1.0