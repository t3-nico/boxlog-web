# BoxLog Documentation - Linear風実用的構造

## 新しいカテゴリ構成（Linear風）

```
content/docs/
├── index.mdx                           # ドキュメントホーム
├── getting-started/
│   ├── index.mdx                       # Getting Started
│   ├── what-is-boxlog.mdx              # BoxLogとは
│   ├── quick-start.mdx                 # クイックスタート
│   ├── installation.mdx                # インストール
│   └── first-steps.mdx                 # 最初の一歩
├── account/
│   ├── index.mdx                       # Account
│   ├── profile.mdx                     # プロフィール設定
│   ├── billing.mdx                     # 請求とプラン
│   ├── api-keys.mdx                    # API キー管理
│   ├── security.mdx                    # セキュリティ設定
│   └── notifications.mdx               # 通知設定
├── workspace/
│   ├── index.mdx                       # Your Workspace
│   ├── overview.mdx                    # ワークスペース概要
│   ├── projects.mdx                    # プロジェクト管理
│   ├── team-members.mdx                # チームメンバー
│   ├── roles-permissions.mdx           # ロールと権限
│   └── workspace-settings.mdx          # ワークスペース設定
├── dashboard/
│   ├── index.mdx                       # Dashboard
│   ├── overview.mdx                    # ダッシュボード概要
│   ├── customization.mdx               # カスタマイズ
│   ├── widgets.mdx                     # ウィジェット
│   ├── filters.mdx                     # フィルター
│   └── sharing.mdx                     # 共有設定
├── logs/
│   ├── index.mdx                       # Logs
│   ├── sending-logs.mdx                # ログ送信
│   ├── log-levels.mdx                  # ログレベル
│   ├── structured-logging.mdx          # 構造化ログ
│   ├── context.mdx                     # コンテキスト
│   ├── correlation-ids.mdx             # 相関ID
│   └── performance-logging.mdx         # パフォーマンスログ
├── search/
│   ├── index.mdx                       # Find & Filter
│   ├── search-syntax.mdx               # 検索構文
│   ├── advanced-search.mdx             # 高度な検索
│   ├── saved-searches.mdx              # 保存済み検索
│   ├── filters.mdx                     # フィルター機能
│   ├── date-ranges.mdx                 # 日付範囲
│   └── export.mdx                      # エクスポート
├── alerts/
│   ├── index.mdx                       # Alerts & Monitoring
│   ├── alert-rules.mdx                 # アラートルール
│   ├── channels/
│   │   ├── index.mdx                   # 通知チャンネル
│   │   ├── email.mdx                   # メール通知
│   │   ├── slack.mdx                   # Slack通知
│   │   ├── webhooks.mdx                # Webhook通知
│   │   └── custom.mdx                  # カスタム通知
│   ├── escalation.mdx                  # エスカレーション
│   └── maintenance.mdx                 # メンテナンスモード
├── integrations/
│   ├── index.mdx                       # Integrations
│   ├── development/
│   │   ├── index.mdx                   # 開発ツール
│   │   ├── github.mdx                  # GitHub
│   │   ├── gitlab.mdx                  # GitLab
│   │   ├── ci-cd.mdx                   # CI/CD
│   │   └── ides.mdx                    # IDE連携
│   ├── communication/
│   │   ├── index.mdx                   # コミュニケーション
│   │   ├── slack.mdx                   # Slack
│   │   ├── discord.mdx                 # Discord
│   │   ├── teams.mdx                   # Microsoft Teams
│   │   └── pagerduty.mdx               # PagerDuty
│   ├── cloud/
│   │   ├── index.mdx                   # クラウドプラットフォーム
│   │   ├── aws.mdx                     # AWS
│   │   ├── gcp.mdx                     # Google Cloud
│   │   ├── azure.mdx                   # Azure
│   │   └── vercel.mdx                  # Vercel
│   └── monitoring/
│       ├── index.mdx                   # 監視ツール
│       ├── datadog.mdx                 # Datadog
│       ├── newrelic.mdx                # New Relic
│       └── sentry.mdx                  # Sentry
├── sdks/
│   ├── index.mdx                       # SDKs & Libraries
│   ├── javascript.mdx                  # JavaScript/TypeScript
│   ├── python.mdx                      # Python
│   ├── go.mdx                          # Go
│   ├── ruby.mdx                        # Ruby
│   ├── php.mdx                         # PHP
│   ├── java.mdx                        # Java
│   ├── csharp.mdx                      # C#
│   └── frameworks/
│       ├── index.mdx                   # フレームワーク
│       ├── nextjs.mdx                  # Next.js
│       ├── react.mdx                   # React
│       ├── vue.mdx                     # Vue.js
│       ├── django.mdx                  # Django
│       ├── rails.mdx                   # Ruby on Rails
│       └── express.mdx                 # Express.js
├── api/
│   ├── index.mdx                       # API Reference
│   ├── authentication.mdx              # 認証
│   ├── rest/
│   │   ├── index.mdx                   # REST API
│   │   ├── logs.mdx                    # ログAPI
│   │   ├── search.mdx                  # 検索API
│   │   ├── alerts.mdx                  # アラートAPI
│   │   ├── users.mdx                   # ユーザーAPI
│   │   └── analytics.mdx               # 分析API
│   ├── graphql.mdx                     # GraphQL API
│   ├── websocket.mdx                   # WebSocket API
│   └── webhooks.mdx                    # Webhooks
├── guides/
│   ├── index.mdx                       # Guides
│   ├── best-practices.mdx              # ベストプラクティス
│   ├── performance.mdx                 # パフォーマンス最適化
│   ├── security.mdx                    # セキュリティガイド
│   ├── troubleshooting.mdx             # トラブルシューティング
│   ├── migration.mdx                   # 移行ガイド
│   └── architecture.mdx                # アーキテクチャガイド
└── reference/
    ├── index.mdx                       # Reference
    ├── configuration.mdx               # 設定リファレンス
    ├── error-codes.mdx                 # エラーコード
    ├── rate-limits.mdx                 # レート制限
    ├── changelog.mdx                   # 変更履歴
    ├── glossary.mdx                    # 用語集
    └── faq.mdx                         # よくある質問
```

## 新しいカテゴリの説明

### 1. 🚀 Getting Started
**初回ユーザー向けの基本情報**
- BoxLogの紹介から最初のログ送信まで
- 段階的な導入プロセス

### 2. 👤 Account
**個人アカウント管理**
- プロフィール、請求、セキュリティ設定
- API キー管理と通知設定

### 3. 🏢 Your Workspace  
**チーム・組織管理**
- プロジェクト管理、メンバー招待
- ロールベースアクセス制御

### 4. 📊 Dashboard
**ダッシュボード機能**
- カスタマイズ、ウィジェット、フィルター
- データ可視化と共有

### 5. 📝 Logs
**ログ機能の中核**
- ログ送信から構造化まで
- パフォーマンス監視

### 6. 🔍 Find & Filter
**検索・フィルター機能**
- 検索構文、高度な検索
- 保存済み検索とエクスポート

### 7. 🚨 Alerts & Monitoring
**アラート・監視機能**
- アラートルール、通知チャンネル
- エスカレーションとメンテナンス

### 8. 🔌 Integrations
**外部サービス連携**
- 開発、コミュニケーション、クラウド、監視ツール
- カテゴリ別に整理

### 9. 🛠️ SDKs & Libraries
**開発者向けツール**
- 言語別SDK + フレームワーク特化ガイド

### 10. 📡 API Reference
**完全なAPI仕様**
- REST、GraphQL、WebSocket、Webhooks

### 11. 📚 Guides
**実践的なガイド**
- ベストプラクティス、パフォーマンス、セキュリティ

### 12. 📖 Reference
**詳細リファレンス**
- 設定、エラーコード、FAQ

## Linear風の特徴

### 1. **プロダクト中心の構成**
- 実際の機能とUIに対応
- ユーザーの日常的なワークフローに沿った構成

### 2. **直感的なカテゴリ名**
- "Find & Filter" - 実際の機能名
- "Your Workspace" - ユーザー視点の表現
- "Account" - 一般的なUI用語

### 3. **段階的な情報開示**
- Getting Started → Account → Workspace → 実際の機能使用
- 基本 → 応用 → 詳細リファレンス

### 4. **機能別サブカテゴリ**
- Alerts/channels/ - 通知方法別
- Integrations/ - サービス種別
- SDKs/frameworks/ - フレームワーク別

## 総ページ数: 約85ページ

より集約されて実用的な構成になりました。