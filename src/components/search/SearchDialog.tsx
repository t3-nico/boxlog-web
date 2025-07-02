'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, Input, Button, Badge } from '@/components/ui'

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    } else {
      setQuery('')
    }
  }, [open])

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return
    
    onOpenChange(false)
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onOpenChange(false)
      return
    }

    if (e.key === 'Enter' && query.trim()) {
      handleSearch(query)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-4 pb-2">
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Input
              ref={inputRef}
              placeholder="ドキュメント、ブログ、リリースを検索..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-0 shadow-none text-lg placeholder:text-gray-400 focus-visible:ring-0"
            />
            {query && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setQuery('')}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="border-t border-gray-200">
          <div className="p-4">
            {!query ? (
              <div className="text-center py-8">
                <svg className="h-12 w-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  検索を開始してください
                </h3>
                <p className="text-gray-500 mb-4">
                  ドキュメント、ブログ記事、リリースノートを検索できます
                </p>
                <div className="flex justify-center gap-2">
                  <Badge variant="outline">ドキュメント</Badge>
                  <Badge variant="outline">ブログ</Badge>
                  <Badge variant="outline">リリース</Badge>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-4">
                  「{query}」の検索結果を表示するには Enter を押してください
                </p>
                <Button
                  onClick={() => handleSearch(query)}
                  className="w-full"
                >
                  検索結果を表示
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* フッター */}
        <div className="p-3 border-t bg-gray-50 text-xs text-gray-500 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>Enter で検索</span>
            <span>Esc で閉じる</span>
          </div>
          <span>Powered by Global Search</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}