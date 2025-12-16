'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Search } from '@/lib/icons'
import type { Dictionary } from '@/lib/i18n'

// SearchDialogを動的インポート
const SearchDialog = dynamic(
  () => import('./SearchDialog').then((mod) => ({ default: mod.SearchDialog })),
  {
    ssr: false,
    loading: () => (
      <Dialog open onOpenChange={() => {}}>
        <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden [&>button]:hidden">
          <div className="flex items-center gap-4 p-4 border-b">
            <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <Skeleton className="h-6 flex-1" />
          </div>
          <div className="p-4 space-y-4">
            <Skeleton className="h-4" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </DialogContent>
      </Dialog>
    ),
  }
)

interface LazySearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  dict: Dictionary
  locale: string
}

export function LazySearchDialog({
  open,
  onOpenChange,
  dict,
  locale,
}: LazySearchDialogProps) {
  if (!open) return null

  return (
    <Suspense fallback={null}>
      <SearchDialog
        open={open}
        onOpenChange={onOpenChange}
        dict={dict}
        locale={locale}
      />
    </Suspense>
  )
}
