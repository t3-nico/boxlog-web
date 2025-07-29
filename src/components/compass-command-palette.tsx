"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { BookOpen, Copy, ExternalLink } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { CompassDoc, getCompassDocs, searchCompassDocs } from "@/lib/compass-commands"
import { toast } from "sonner"

export function CompassCommandPalette() {
  const [open, setOpen] = useState(false)
  const [docs, setDocs] = useState<CompassDoc[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    if (open && docs.length === 0) {
      loadDocs()
    }
  }, [open, docs.length])

  const loadDocs = async (searchQuery?: string) => {
    setLoading(true)
    try {
      const compassDocs = await getCompassDocs(searchQuery)
      if (searchQuery) {
        setDocs(compassDocs)
      } else {
        setDocs(compassDocs)
      }
    } catch (error) {
      console.error('Failed to load compass docs:', error)
      toast.error('Compassドキュメントの読み込みに失敗しました')
    } finally {
      setLoading(false)
    }
  }

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        loadDocs(query)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const filteredDocs = docs

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('パスをクリップボードにコピーしました')
  }

  const groupedDocs = filteredDocs.reduce((acc, doc) => {
    const category = doc.category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(doc)
    return acc
  }, {} as Record<string, CompassDoc[]>)

  return (
    <>
      <Button
        variant="outline"
        className="relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <BookOpen className="mr-2 h-4 w-4" />
        Search docs...
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="CompassドキュメントをCLAUDE、database、authなどで検索..." 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>
            {loading ? "読み込み中..." : "ドキュメントが見つかりません"}
          </CommandEmpty>

          {Object.entries(groupedDocs).map(([category, categoryDocs]) => (
            <CommandGroup key={category} heading={category}>
              {categoryDocs.slice(0, 8).map((doc) => (
                <CommandItem
                  key={doc.id}
                  value={`${doc.title} ${doc.path} ${doc.content}`}
                  onSelect={() => {
                    copyToClipboard(doc.path)
                    setOpen(false)
                  }}
                  className="flex items-center gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{doc.title}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {doc.path}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Copy className="h-3 w-3" />
                    <CommandShortcut>copy</CommandShortcut>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          
          {query && filteredDocs.length === 0 && !loading && (
            <CommandGroup heading="📚 検索のヒント">
              <CommandItem disabled>
                <div className="text-sm text-muted-foreground">
                  <div>• "CLAUDE" - 開発ガイド</div>
                  <div>• "database" - データベース関連</div>
                  <div>• "auth" - 認証設定</div>
                  <div>• "component" - UIコンポーネント</div>
                </div>
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}