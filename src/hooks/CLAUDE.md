# /src/hooks/CLAUDE.md - カスタムフック実装ガイド

## 📍 この文書の位置づけ

**レベル2**: 領域特化ルール（カスタムフック）

- 上位: `/src/CLAUDE.md`（実装の基本）
- 上位: `/CLAUDE.md`（意思決定プロトコル）

**役割**: カスタムフックの実装方法・パターンを定義

---

## 🎯 カスタムフック基本原則

### 1. 命名規則

- **必須**: `use`プレフィックス
- **形式**: `useCamelCase`

```typescript
// ✅ 推奨
useLocale.ts
useSearch.ts
useTheme.ts
useMediaQuery.ts

// ❌ 禁止
Locale.ts // "use"プレフィックスなし
use - locale.ts // kebab-caseは不可
UseLocale.ts // PascalCaseは不可
```

### 2. Client Component専用

- すべてのカスタムフックは`'use client'`ディレクティブ必須
- React Hooksルールに従う

```typescript
// ✅ 必須
'use client'

import { useState, useEffect } from 'react'

export function useLocale() {
  // ...
}
```

### 3. 型安全性

- 戻り値の型を明示的に定義
- `any`型禁止

```typescript
// ✅ 推奨: 明示的な型定義
interface UseSearchReturn {
  results: SearchResult[]
  loading: boolean
  error: string | null
  search: (query: string) => Promise<void>
  clearResults: () => void
}

export function useSearch(): UseSearchReturn {
  // ...
}

// ❌ 禁止: 型定義なし
export function useSearch() {
  // ...
}
```

---

## 📁 既存カスタムフック

### useLocale - ロケール管理

```typescript
// hooks/useLocale.ts
'use client'

import { useState, useEffect } from 'react'
import { type Locale, defaultLocale, isValidLocale } from '@/lib/i18n'

export function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale')

    if (storedLocale && isValidLocale(storedLocale)) {
      setLocale(storedLocale as Locale)
    } else {
      const browserLang = navigator.language.split('-')[0]
      if (browserLang === 'ja' || browserLang === 'jp') {
        setLocale('jp')
      } else {
        setLocale('en')
      }
    }
  }, [])

  return locale
}
```

**使用例**:

```typescript
'use client'

import { useLocale } from '@/hooks/useLocale'

export function MyComponent() {
  const locale = useLocale()
  return <div>Current locale: {locale}</div>
}
```

---

### useSearch - 検索機能

```typescript
// hooks/useSearch.ts
'use client'

import { useState, useCallback } from 'react'

export interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  type: 'blog' | 'release' | 'docs'
  breadcrumbs: string[]
  lastModified: string
  tags: string[]
}

interface UseSearchReturn {
  results: SearchResult[]
  loading: boolean
  error: string | null
  search: (query: string) => Promise<void>
  clearResults: () => void
}

export function useSearch(): UseSearchReturn {
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error('Search failed')
      }

      const data = await response.json()
      setResults(data.results || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const clearResults = useCallback(() => {
    setResults([])
    setError(null)
  }, [])

  return {
    results,
    loading,
    error,
    search,
    clearResults,
  }
}
```

**使用例**:

```typescript
'use client'

import { useSearch } from '@/hooks/useSearch'

export function SearchComponent() {
  const { results, loading, error, search } = useSearch()

  return (
    <div>
      <input onChange={(e) => search(e.target.value)} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {results.map((result) => (
        <div key={result.id}>{result.title}</div>
      ))}
    </div>
  )
}
```

---

## 🧩 カスタムフック実装パターン

### パターン1: State管理フック

```typescript
// hooks/useToggle.ts
'use client'

import { useState, useCallback } from 'react'

interface UseToggleReturn {
  value: boolean
  toggle: () => void
  setTrue: () => void
  setFalse: () => void
}

export function useToggle(initialValue = false): UseToggleReturn {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue((prev) => !prev)
  }, [])

  const setTrue = useCallback(() => {
    setValue(true)
  }, [])

  const setFalse = useCallback(() => {
    setValue(false)
  }, [])

  return { value, toggle, setTrue, setFalse }
}
```

**使用例**:

```typescript
export function MyComponent() {
  const { value, toggle } = useToggle()

  return (
    <Button onClick={toggle}>
      {value ? 'ON' : 'OFF'}
    </Button>
  )
}
```

---

### パターン2: API呼び出しフック

```typescript
// hooks/useFetch.ts
'use client'

import { useState, useEffect } from 'react'

interface UseFetchReturn<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useFetch<T>(url: string): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [url])

  return { data, loading, error, refetch: fetchData }
}
```

**使用例**:

```typescript
export function MyComponent() {
  const { data, loading, error } = useFetch<{ title: string }>('/api/data')

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return <h1>{data?.title}</h1>
}
```

---

### パターン3: メディアクエリフック

```typescript
// hooks/useMediaQuery.ts
'use client'

import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    }
    // Legacy browsers
    else {
      mediaQuery.addListener(handler)
      return () => mediaQuery.removeListener(handler)
    }
  }, [query])

  return matches
}
```

**使用例**:

```typescript
export function MyComponent() {
  const isMobile = useMediaQuery('(max-width: 640px)')

  return (
    <div>
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  )
}
```

---

### パターン4: ローカルストレージフック

```typescript
// hooks/useLocalStorage.ts
'use client'

import { useState, useEffect } from 'react'

interface UseLocalStorageReturn<T> {
  value: T
  setValue: (value: T) => void
  removeValue: () => void
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> {
  const [value, setValue] = useState<T>(initialValue)

  // Read from localStorage on mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setValue(JSON.parse(item))
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
    }
  }, [key])

  // Update localStorage when value changes
  const setStoredValue = (newValue: T) => {
    try {
      setValue(newValue)
      window.localStorage.setItem(key, JSON.stringify(newValue))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  const removeValue = () => {
    try {
      setValue(initialValue)
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }

  return { value, setValue: setStoredValue, removeValue }
}
```

**使用例**:

```typescript
export function MyComponent() {
  const { value, setValue } = useLocalStorage('theme', 'light')

  return (
    <Button onClick={() => setValue(value === 'light' ? 'dark' : 'light')}>
      Toggle Theme: {value}
    </Button>
  )
}
```

---

### パターン5: デバウンスフック

```typescript
// hooks/useDebounce.ts
'use client'

import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
```

**使用例**:

```typescript
export function SearchComponent() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const { search } = useSearch()

  useEffect(() => {
    if (debouncedQuery) {
      search(debouncedQuery)
    }
  }, [debouncedQuery])

  return <Input onChange={(e) => setQuery(e.target.value)} />
}
```

---

## 🧪 カスタムフックテスト

```typescript
// hooks/useToggle.test.ts
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useToggle } from './useToggle'

describe('useToggle', () => {
  it('initializes with false by default', () => {
    const { result } = renderHook(() => useToggle())
    expect(result.current.value).toBe(false)
  })

  it('initializes with provided value', () => {
    const { result } = renderHook(() => useToggle(true))
    expect(result.current.value).toBe(true)
  })

  it('toggles value', () => {
    const { result } = renderHook(() => useToggle())

    act(() => {
      result.current.toggle()
    })

    expect(result.current.value).toBe(true)

    act(() => {
      result.current.toggle()
    })

    expect(result.current.value).toBe(false)
  })

  it('sets value to true', () => {
    const { result } = renderHook(() => useToggle())

    act(() => {
      result.current.setTrue()
    })

    expect(result.current.value).toBe(true)
  })

  it('sets value to false', () => {
    const { result } = renderHook(() => useToggle(true))

    act(() => {
      result.current.setFalse()
    })

    expect(result.current.value).toBe(false)
  })
})
```

---

## 🚫 よくある間違いと修正例

### ❌ 間違い: 'use client'ディレクティブなし

```typescript
import { useState } from 'react'

export function useToggle() {
  const [value, setValue] = useState(false)
  // ...
}
```

### ✅ 修正: 'use client'追加

```typescript
'use client'

import { useState } from 'react'

export function useToggle() {
  const [value, setValue] = useState(false)
  // ...
}
```

---

### ❌ 間違い: 型定義なし

```typescript
export function useSearch() {
  const [results, setResults] = useState([])
  // ...
  return { results, loading, error }
}
```

### ✅ 修正: 明示的な型定義

```typescript
interface SearchResult {
  id: string
  title: string
  // ...
}

interface UseSearchReturn {
  results: SearchResult[]
  loading: boolean
  error: string | null
}

export function useSearch(): UseSearchReturn {
  const [results, setResults] = useState<SearchResult[]>([])
  // ...
  return { results, loading, error }
}
```

---

### ❌ 間違い: useCallback未使用（不必要な再レンダリング）

```typescript
export function useSearch() {
  const search = async (query: string) => {
    // ...
  }
  return { search }
}
```

### ✅ 修正: useCallbackでメモ化

```typescript
export function useSearch() {
  const search = useCallback(async (query: string) => {
    // ...
  }, [])

  return { search }
}
```

---

## 🎓 実装前チェックリスト

- [ ] ファイル名は`use`プレフィックスで始まるか？
- [ ] `'use client'`ディレクティブを追加したか？
- [ ] 戻り値の型を明示的に定義したか？
- [ ] `any`型を使用していないか？
- [ ] 既存のフックで代替できないか確認したか？
- [ ] useCallbackでメモ化が必要な関数はメモ化したか？
- [ ] エラーハンドリングを実装したか？
- [ ] テストを書いたか？

---

## 📖 関連ドキュメント

- **上位**: `/src/CLAUDE.md` - 実装の基本
- **上位**: `/CLAUDE.md` - 意思決定プロトコル
- **参考**: [React公式 - Hooks](https://react.dev/reference/react)

---

**📖 最終更新**: 2025-10-23 | **バージョン**: v1.0
