# Security Policy

## Supported Versions

現在サポートされているバージョン:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

セキュリティ脆弱性を発見した場合、**公開Issueとして報告しないでください**。

### 報告方法

1. **プライベートに報告**
   - GitHubのPrivate Security Advisoryを使用: [Report a vulnerability](https://github.com/t3-nico/dayopt-web/security/advisories/new)
   - または、プロジェクトメンテナーに直接連絡

2. **報告内容**
   - 脆弱性の詳細な説明
   - 再現手順
   - 影響範囲
   - 可能であれば、修正案

### 対応プロセス

1. **確認**: 報告後48時間以内に確認
2. **調査**: 脆弱性の深刻度を評価
3. **修正**: 修正パッチの開発
4. **公開**: 修正後、適切なタイミングで公開

### 脆弱性の評価基準

- **Critical**: 即座に対応（24時間以内）
- **High**: 優先対応（1週間以内）
- **Medium**: 通常対応（1ヶ月以内）
- **Low**: 計画的対応（次回リリース）

## セキュリティ対策

このプロジェクトで実装されているセキュリティ対策:

### 実装済み

- ✅ **CSRF保護**: Origin/Refererヘッダー検証
- ✅ **レート制限**: IP ベースの制限（Upstash）
- ✅ **DoS対策**: タイムアウト設定と長さ制限
- ✅ **個人情報保護**: メールアドレスマスキング（GDPR準拠）
- ✅ **CSP**: Content Security Policy ヘッダー
- ✅ **セキュリティヘッダー**: HSTS, X-Frame-Options, X-Content-Type-Options
- ✅ **入力検証**: Zodスキーマによる検証
- ✅ **環境変数の型安全性**: 実行時バリデーション

### 定期的な更新

- 依存関係の定期更新（Dependabot）
- npm audit による脆弱性チェック
- GitHub Security Alerts の監視

## セキュリティベストプラクティス

開発者向けのガイドライン:

1. **環境変数**
   - `.env.local` をコミットしない
   - 本番環境の秘密情報を開発環境で使用しない

2. **依存関係**
   - 定期的に `npm audit` を実行
   - 脆弱性のあるパッケージは即座に更新

3. **API エンドポイント**
   - すべての入力を検証
   - レート制限を実装
   - CSRF 保護を適用

4. **個人情報**
   - 最小限のデータのみ収集
   - ログに個人情報を記録しない
   - GDPR 要件を遵守

## 連絡先

セキュリティに関する質問:

- GitHub Security Advisory
- プロジェクトメンテナー

---

**セキュリティ報告に感謝します！**
