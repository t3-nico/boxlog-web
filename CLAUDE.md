# CLAUDE.md - BoxLog Web Project

**📍 開発の詳細情報はCompassで一元管理されています**

## 🎯 開発方針

**重要: 今後の開発では必ずCompassを参照しながら進めてください**

### 📚 Compass中心の開発アプローチ
- **設計決定**: `compass/architecture/decisions/` の記録を参照
- **デザインシステム**: `compass/design-system/` の統一トークンを使用
- **既存パターン**: `compass/knowledge/web-docs/` で類似実装を確認
- **命名規則**: `compass/knowledge/web-docs/NAMING_CONVENTIONS.md` に従う
- **開発フロー**: `compass/knowledge/web-docs/development/git-workflow.md` の通りに実行

### 🔍 Compass検索活用
**Cmd+K** (Windows: Ctrl+K) でCompass全体を検索：
- "design" → デザインシステム
- "component" → コンポーネントガイド  
- "workflow" → 開発フロー
- "testing" → テストガイドライン

### 📚 重要なドキュメント
- **詳細開発ガイド**: `compass/ai-context/web/CLAUDE.md`
- **統合ガイド**: `compass/knowledge/web-docs/compass-integration-guide.md`
- **デザインシステム**: `compass/design-system/`

### 🎨 統一デザインシステム
```typescript
// Web・App共通デザイントークン使用必須
import { colors, typography, spacing } from '@compass/design-system'
```

## ⚡ 開発コマンド
```bash
npm run dev         # 開発サーバー起動
npm run build      # プロダクションビルド  
npm run lint       # ESLint実行
npm run type-check # TypeScript型チェック
```

## 📋 開発前チェックリスト
1. **Compass検索**: 既存の類似実装やガイドラインを確認
2. **アーキテクチャ**: 技術選択が `compass/architecture/` の方針と一致するか
3. **デザイントークン**: 統一されたスタイリングを使用しているか
4. **命名規則**: ファイル・変数名が規則に準拠しているか
5. **テスト**: `compass/knowledge/web-docs/testing/guidelines.md` に従っているか

---

**💡 重要**: 新機能開発・バグ修正前に必ずCompass内の関連ドキュメントを確認し、統一された開発方針に従って実装してください。

**📖 詳細情報**: `compass/ai-context/web/CLAUDE.md`を参照