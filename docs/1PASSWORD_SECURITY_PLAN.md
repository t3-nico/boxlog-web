# 1Password セキュリティ・運用計画

BoxLogプロジェクトにおける1Password利用のセキュリティポリシーと運用計画です。

## 🛡️ セキュリティポリシー

### アクセス制御原則

#### 最小権限の原則
- ✅ 開発者は必要最小限のVaultにのみアクセス
- ✅ 本番環境のシークレットは本番運用担当者のみ
- ✅ 定期的なアクセス権限レビュー（四半期ごと）

#### 職務分離
```
役割                     | 権限範囲
------------------------|------------------
開発者                   | Private Vault（開発用）
DevOpsエンジニア         | Production Vault
プロジェクト管理者       | 全Vault（読み取り専用）
1Password管理者          | 全Vault（管理権限）
```

### Vault構成

#### 推奨Vault構造
```
📁 Development Vault（開発環境用）
  ├── NextAuth Secret (dev)
  ├── Database (dev) 
  ├── SendGrid (test)
  ├── Stripe (test keys)
  └── Third-party APIs (test)

📁 Staging Vault（ステージング環境用）
  ├── NextAuth Secret (staging)
  ├── Database (staging)
  ├── SendGrid (staging)
  └── External APIs (staging)

📁 Production Vault（本番環境用）
  ├── NextAuth Secret (prod)
  ├── Database (prod)
  ├── SendGrid (prod)
  ├── Stripe (live keys)
  ├── Vercel Deploy Token
  └── Monitoring APIs
```

## 🔄 シークレット・ローテーション計画

### ローテーション頻度

#### 高リスク（月次ローテーション）
- **本番データベース認証情報**
- **決済API秘密鍵（Stripe Live keys）**
- **管理者アクセストークン**

#### 中リスク（四半期ローテーション）
- **JWT秘密鍵（NextAuth）**
- **外部API keys（SendGrid、Analytics等）**
- **CI/CDデプロイトークン**

#### 低リスク（半年ローテーション）
- **開発環境データベース**
- **テスト用API keys**
- **サードパーティ統合（非決済系）**

### ローテーション手順

#### 自動ローテーション対応
```bash
# ローテーション管理スクリプト例
scripts/
├── rotate-secrets.sh          # メインローテーションスクリプト
├── check-secret-age.sh        # 期限チェック
├── notify-rotation-due.sh     # ローテーション通知
└── backup-before-rotation.sh  # ローテーション前バックアップ
```

#### 手動ローテーション手順
1. **事前通知**: チーム内でローテーション予定を共有
2. **バックアップ**: 現在のシークレットを安全にバックアップ
3. **新シークレット生成**: 各サービスで新しいキーを生成
4. **1Password更新**: 新しいシークレットを1Password内で更新
5. **テスト**: 新しいシークレットでの動作確認
6. **旧シークレット無効化**: 各サービスで旧キーを無効化
7. **チーム通知**: ローテーション完了をチーム内で共有

## 📊 監視・監査計画

### アクセス監査

#### 月次チェック項目
- [ ] 不要なアカウントの棚卸し
- [ ] 過剰なアクセス権限の確認
- [ ] 未使用シークレットの特定
- [ ] ログイン異常パターンのチェック

#### 四半期レビュー
- [ ] 全アクセス権限の見直し
- [ ] Vault構成の最適化検討
- [ ] セキュリティポリシーの更新
- [ ] インシデント対応手順の見直し

### アラート設定

#### 即座の対応が必要
- 🔴 **不正ログイン試行**
- 🔴 **予期しない場所からのアクセス**
- 🔴 **大量シークレット取得**
- 🔴 **権限外Vaultへのアクセス試行**

#### 注意が必要
- 🟡 **新しいデバイスからのアクセス**
- 🟡 **通常時間外のアクセス**
- 🟡 **シークレット変更頻度の異常**

## 🚨 インシデント対応手順

### レベル1: シークレット漏洩疑い
```bash
即座の対応:
1. 該当シークレットの即座無効化
2. 関連サービスへの影響調査
3. ログ分析・攻撃範囲特定
4. チーム・ステークホルダーへの報告

フォローアップ:
1. 新しいシークレット生成・配布
2. 影響を受けたサービスの監視強化
3. 根本原因分析・再発防止策実装
4. インシデント後レビューの実施
```

### レベル2: 1Passwordアカウント侵害
```bash
緊急対応:
1. 全1Passwordアカウントの一時停止
2. 全シークレットの緊急ローテーション
3. 本番環境への影響評価・対応
4. 法務・経営陣への即座報告

復旧プロセス:
1. セキュリティ監査の実施
2. 新しい1Password環境構築
3. 段階的なサービス復旧
4. 強化されたセキュリティ設定の適用
```

## 📋 運用チェックリスト

### 日次運用
- [ ] 開発環境での1Password CLI動作確認
- [ ] エラーログの確認
- [ ] 異常アクセスパターンのチェック

### 週次運用
- [ ] アクセスログのレビュー
- [ ] 新規ユーザー・権限変更の承認
- [ ] バックアップ状況の確認

### 月次運用
- [ ] シークレット使用状況レビュー
- [ ] ローテーション対象シークレットの実行
- [ ] セキュリティ指標の報告

### 四半期運用
- [ ] 全体セキュリティ監査
- [ ] ポリシー・手順の見直し
- [ ] チーム研修の実施
- [ ] ツール・プロセスの改善検討

## 📚 教育・研修計画

### 新メンバー研修内容
1. **1Passwordセキュリティ基礎**: パスワード管理の重要性
2. **BoxLog固有の運用ルール**: Vault構成・命名規則
3. **インシデント対応**: 緊急時の連絡・対応手順
4. **ベストプラクティス**: 日常的なセキュリティ習慣

### 定期研修（半年ごと）
- 最新のセキュリティ脅威
- 1Password新機能・ベストプラクティス
- 過去のインシデント事例・教訓
- チーム内での運用改善事例

## 🔧 技術的実装

### 監視スクリプト例
```bash
#!/bin/bash
# scripts/security-check.sh

# 1Password接続確認
op whoami > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ 1Password CLI connection failed"
    exit 1
fi

# シークレット年齢チェック
for item in $(op item list --format json | jq -r '.[].id'); do
    updated=$(op item get $item --format json | jq -r '.updated_at')
    # 90日以上古いシークレットを警告
    age_days=$((($(date +%s) - $(date -d "$updated" +%s)) / 86400))
    if [ $age_days -gt 90 ]; then
        echo "⚠️  Secret older than 90 days: $item"
    fi
done

echo "✅ Security check completed"
```

### 自動バックアップ
```bash
#!/bin/bash
# scripts/backup-secrets.sh

BACKUP_DIR="./backups/$(date +%Y%m%d)"
mkdir -p "$BACKUP_DIR"

# Vault情報のエクスポート（機密データ除く）
op vault list --format json > "$BACKUP_DIR/vaults.json"
op item list --format json > "$BACKUP_DIR/items_metadata.json"

echo "✅ Backup completed: $BACKUP_DIR"
```

## 📞 緊急時連絡先

### 技術的問題
- **1Password管理者**: [管理者連絡先]
- **DevOps緊急**: [24時間対応連絡先]

### セキュリティインシデント
- **CISO**: [緊急連絡先]
- **法務担当**: [緊急連絡先]
- **経営陣**: [緊急エスカレーション]

---

**このドキュメントは機密情報を含みます。適切なアクセス制御の下で管理してください。**

**更新日**: 2025-08-05  
**バージョン**: v1.0  
**次回レビュー予定**: 2025-11-05