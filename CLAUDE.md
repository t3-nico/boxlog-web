# CLAUDE.md - BoxLog Web Project

**📍 メインドキュメントはCompassで一元管理されています**

## 🚀 クイックアクセス

### 🔍 Compass検索
**Cmd+K** (Windows: Ctrl+K) でCompass全体を検索：
- "CLAUDE" → 開発ガイド  
- "web" → Web版ドキュメント
- "app" → App版ドキュメント
- "design" → デザインシステム

### 📚 主要ドキュメント場所
- **Web版ガイド**: `compass/knowledge/web-docs/CLAUDE.md`
- **App版ガイド**: `compass/knowledge/app-docs/CLAUDE.md`  
- **デザインシステム**: `compass/design-system/`
- **統合ガイド**: `compass/knowledge/web-docs/compass-integration-guide.md`

### 🎨 統一デザインシステム
```typescript
// Web・App共通デザイントークン
import { colors, typography, spacing } from '@compass/design-system'
```

## ⚡ 開発コマンド
```bash
npm run dev         # 開発サーバー起動
npm run build      # プロダクションビルド  
npm run lint       # ESLint実行
npm run type-check # TypeScript型チェック
```

---

**📖 詳細情報**: `compass/knowledge/web-docs/CLAUDE.md`を参照