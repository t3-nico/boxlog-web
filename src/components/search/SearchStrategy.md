# 検索UX改善案

## 現在の課題

1. コードの重複（2つの検索インターフェース）
2. 一貫性のないデザイン
3. モバイル体験の最適化不足

## 提案する統合戦略

### Phase 1: コード統合

```tsx
// 共通の検索ロジック
export const useSearch = (query: string) => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  // 統一された検索API呼び出し
  const search = useCallback(async (q: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const data = await response.json()
      setResults(data.results || [])
    } finally {
      setLoading(false)
    }
  }, [])

  return { results, loading, search }
}
```

### Phase 2: UI統合

```tsx
// 統一された検索コンポーネント
export const UnifiedSearch = ({
  mode: 'dialog' | 'page',
  query: string,
  onQueryChange: (q: string) => void
}) => {
  const { results, loading, search } = useSearch(query)

  if (mode === 'dialog') {
    return <CompactSearchResults results={results.slice(0, 5)} />
  }

  return <FullSearchResults results={results} />
}
```

### Phase 3: UX最適化

1. **レスポンシブ対応**
   - デスクトップ: ポップアップ重視
   - モバイル: ページ重視

2. **検索履歴**
   - LocalStorage活用
   - 個人化された体験

3. **高度な機能**
   - ファセット検索（タイプ、日付でフィルタ）
   - 検索候補のオートコンプリート
   - キーボードショートカット

## 実装優先度

### 高優先度

- [ ] 検索ロジックの統合
- [ ] モバイル体験の改善
- [ ] パフォーマンス最適化

### 中優先度

- [ ] 検索履歴機能
- [ ] フィルタリング機能
- [ ] キーボードナビゲーション

### 低優先度

- [ ] 検索分析
- [ ] A/Bテスト対応
- [ ] 音声検索

## 推奨アプローチ

**現在の実装を維持しつつ、段階的に改善**

理由:

1. 既に動作している
2. ユーザーが慣れ親しんだパターン
3. 大規模なリファクタリングを避けられる
4. 段階的な改善でリスクを最小化
