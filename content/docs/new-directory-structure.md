# BoxLog Documentation - Linear風ディレクトリ構造

## 新しいディレクトリ構造

```
content/docs/
├── index.mdx                           # ドキュメントホーム
├── getting-started/
│   ├── index.mdx                       # Getting Started ホーム
│   ├── welcome.mdx                     # BoxLogへようこそ
│   ├── quick-start.mdx                 # 5分で始める
│   ├── installation.mdx                # インストール
│   └── your-first-logs.mdx             # 最初のログ
├── setup/
│   ├── index.mdx                       # Setup & Configuration ホーム
│   ├── account.mdx                     # アカウント設定
│   ├── api-keys.mdx                    # API キーと認証
│   ├── environment.mdx                 # 環境設定
│   ├── team-management.mdx             # チーム管理
│   └── workspace.mdx                   # ワークスペース設定
├── logging/
│   ├── index.mdx                       # Logging ホーム
│   ├── sending-logs.mdx                # ログの送信
│   ├── log-levels.mdx                  # ログレベル
│   ├── structured-logging.mdx          # 構造化ログ
│   ├── context-metadata.mdx            # コンテキストとメタデータ
│   ├── error-handling.mdx              # エラーハンドリング
│   ├── performance.mdx                 # パフォーマンスログ
│   └── correlation-tracing.mdx         # 相関ID・トレーシング
├── search/
│   ├── index.mdx                       # Search & Analytics ホーム
│   ├── search-syntax.mdx               # 検索構文
│   ├── filtering.mdx                   # フィルタリング
│   ├── advanced-queries.mdx            # 高度なクエリ
│   ├── dashboards.mdx                  # ダッシュボード
│   ├── metrics.mdx                     # メトリクスと集計
│   ├── custom-views.mdx                # カスタムビュー
│   └── saved-searches.mdx              # 保存済み検索
├── monitoring/
│   ├── index.mdx                       # Monitoring & Alerts ホーム
│   ├── alerts/
│   │   ├── index.mdx                   # アラート設定
│   │   ├── slack.mdx                   # Slack通知
│   │   ├── email.mdx                   # Email通知
│   │   ├── webhooks.mdx                # Webhook通知
│   │   └── custom-channels.mdx         # カスタムチャンネル
│   ├── health-checks.mdx               # ヘルスチェック
│   ├── sla-monitoring.mdx              # SLA監視
│   ├── incident-response.mdx           # インシデント対応
│   └── uptime-monitoring.mdx           # 稼働時間監視
├── integrations/
│   ├── index.mdx                       # Integrations ホーム
│   ├── development/
│   │   ├── index.mdx                   # 開発ツール連携
│   │   ├── github.mdx                  # GitHub連携
│   │   ├── gitlab.mdx                  # GitLab連携
│   │   ├── github-actions.mdx          # GitHub Actions
│   │   ├── gitlab-ci.mdx               # GitLab CI
│   │   └── jenkins.mdx                 # Jenkins
│   ├── communication/
│   │   ├── index.mdx                   # コミュニケーション
│   │   ├── slack.mdx                   # Slack
│   │   ├── discord.mdx                 # Discord
│   │   ├── teams.mdx                   # Microsoft Teams
│   │   └── pagerduty.mdx               # PagerDuty
│   ├── infrastructure/
│   │   ├── index.mdx                   # インフラ連携
│   │   ├── aws.mdx                     # AWS
│   │   ├── gcp.mdx                     # Google Cloud
│   │   ├── azure.mdx                   # Azure
│   │   ├── kubernetes.mdx              # Kubernetes
│   │   ├── docker.mdx                  # Docker
│   │   └── terraform.mdx               # Terraform
│   └── third-party/
│       ├── index.mdx                   # サードパーティ
│       ├── datadog.mdx                 # Datadog
│       ├── newrelic.mdx                # New Relic
│       └── sentry.mdx                  # Sentry
├── sdks/
│   ├── index.mdx                       # SDKs & APIs ホーム
│   ├── javascript.mdx                  # JavaScript/TypeScript
│   ├── python.mdx                      # Python
│   ├── go.mdx                          # Go
│   ├── ruby.mdx                        # Ruby
│   ├── php.mdx                         # PHP
│   ├── java.mdx                        # Java
│   ├── csharp.mdx                      # C#
│   └── rust.mdx                        # Rust
├── api/
│   ├── index.mdx                       # API Reference ホーム
│   ├── rest/
│   │   ├── index.mdx                   # REST API
│   │   ├── authentication.mdx          # 認証
│   │   ├── logs.mdx                    # ログAPI
│   │   ├── users.mdx                   # ユーザーAPI
│   │   ├── projects.mdx                # プロジェクトAPI
│   │   ├── analytics.mdx               # 分析API
│   │   └── alerts.mdx                  # アラートAPI
│   ├── graphql/
│   │   ├── index.mdx                   # GraphQL API
│   │   ├── schema.mdx                  # スキーマ
│   │   └── examples.mdx                # 使用例
│   ├── websocket/
│   │   ├── index.mdx                   # WebSocket API
│   │   ├── real-time.mdx               # リアルタイム
│   │   └── events.mdx                  # イベント
│   └── webhooks/
│       ├── index.mdx                   # Webhook
│       ├── setup.mdx                   # 設定
│       └── security.mdx                # セキュリティ
├── team/
│   ├── index.mdx                       # Team & Administration ホーム
│   ├── user-management.mdx             # ユーザー管理
│   ├── roles-permissions.mdx           # ロールと権限
│   ├── workspaces.mdx                  # ワークスペース
│   ├── billing.mdx                     # 請求と使用量
│   ├── security.mdx                    # セキュリティ設定
│   ├── audit-logs.mdx                  # 監査ログ
│   └── compliance.mdx                  # コンプライアンス
├── guides/
│   ├── index.mdx                       # Guides & Best Practices ホーム
│   ├── best-practices.mdx              # ベストプラクティス
│   ├── performance.mdx                 # パフォーマンス最適化
│   ├── security.mdx                    # セキュリティガイド
│   ├── scaling.mdx                     # スケーリング戦略
│   ├── troubleshooting.mdx             # トラブルシューティング
│   ├── migration.mdx                   # 移行ガイド
│   ├── cost-optimization.mdx           # コスト最適化
│   └── architecture-patterns.mdx      # アーキテクチャパターン
├── use-cases/
│   ├── index.mdx                       # Use Cases ホーム
│   ├── error-tracking.mdx              # エラートラッキング
│   ├── user-analytics.mdx              # ユーザー分析
│   ├── performance-monitoring.mdx      # パフォーマンス監視
│   ├── security-monitoring.mdx         # セキュリティ監視
│   ├── business-intelligence.mdx       # ビジネスインテリジェンス
│   └── compliance-logging.mdx          # コンプライアンスログ
├── advanced/
│   ├── index.mdx                       # Advanced Topics ホーム
│   ├── custom-plugins.mdx              # カスタムプラグイン
│   ├── data-export-import.mdx          # データエクスポート/インポート
│   ├── backup-recovery.mdx             # バックアップとリカバリ
│   ├── multi-tenancy.mdx               # マルチテナンシー
│   ├── custom-dashboards.mdx           # カスタムダッシュボード
│   ├── log-processing.mdx              # ログ処理パイプライン
│   └── scalability.mdx                 # スケーラビリティ
└── reference/
    ├── index.mdx                       # Reference ホーム
    ├── configuration.mdx               # 設定オプション
    ├── environment-variables.mdx       # 環境変数
    ├── error-codes.mdx                 # エラーコード
    ├── rate-limits.mdx                 # レート制限
    ├── changelog.mdx                   # 変更履歴
    ├── glossary.mdx                    # 用語集
    ├── faq.mdx                         # よくある質問
    └── support.mdx                     # サポート
```

## カテゴリ説明

### 1. 🚀 Getting Started (4 pages)
初回ユーザー向けの導入コンテンツ

### 2. 🔧 Setup & Configuration (5 pages)  
アカウントと基本設定

### 3. 📝 Logging (7 pages)
ログ機能の中核コンテンツ

### 4. 🔍 Search & Analytics (7 pages)
検索と分析機能

### 5. 🚨 Monitoring & Alerts (6 pages)
監視とアラート機能

### 6. 🔌 Integrations (16 pages)
外部サービス連携

### 7. 🛠️ SDKs (9 pages)
各言語のSDK

### 8. 📡 API Reference (13 pages)
完全なAPI仕様

### 9. 👥 Team & Administration (7 pages)
チーム管理と権限

### 10. 📚 Guides & Best Practices (8 pages)
実践的なガイド

### 11. 🎯 Use Cases (6 pages)
具体的な活用例

### 12. 🔬 Advanced Topics (7 pages)
高度な機能とカスタマイズ

### 13. 📖 Reference (8 pages)
詳細なリファレンス

**総計: 103ページ**

## ホームページ構成 (docs/index.mdx)

各カテゴリの説明と最初のページへのリンクを含む構成：

```markdown
# BoxLog Documentation

## 🚀 Getting Started
BoxLogを始めるための基本的な手順とセットアップ
→ [BoxLogへようこそ](/docs/getting-started/welcome)

## 🔧 Setup & Configuration
アカウント設定とチーム管理
→ [アカウント設定](/docs/setup/account)

## 📝 Logging
効果的なログ実装のための完全ガイド
→ [ログの送信](/docs/logging/sending-logs)
...
```