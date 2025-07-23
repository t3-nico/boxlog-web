'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Search } from '@/lib/icons'
import type { Dictionary } from '@/lib/i18n'

// SearchDialogを動的インポート
const SearchDialog = dynamic(() => import('./SearchDialog').then(mod => ({ default: mod.SearchDialog })), {
  ssr: false,
  loading: () => (
    <Dialog open onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden bg-white shadow-2xl border-0 dark:bg-gray-900 dark:border dark:border-gray-700 [&>button]:hidden">
        <div className="flex items-center gap-4 p-4 border-b border-gray-100 dark:border-gray-700">
          <Search className="h-5 w-5 text-gray-400 flex-shrink-0 dark:text-gray-500" />
          <div className="h-6 bg-gray-200 rounded animate-pulse flex-1 dark:bg-gray-700" />
        </div>
        <div className="p-4 space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 dark:bg-gray-700" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 dark:bg-gray-700" />
        </div>
      </DialogContent>
    </Dialog>
  )
})

interface LazySearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  dict: Dictionary
  locale: string
}

export function LazySearchDialog({ open, onOpenChange, dict, locale }: LazySearchDialogProps) {
  if (!open) return null

  return (
    <Suspense fallback={null}>
      <SearchDialog open={open} onOpenChange={onOpenChange} dict={dict} locale={locale} />
    </Suspense>
  )
}