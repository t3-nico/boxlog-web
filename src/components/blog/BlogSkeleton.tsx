import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

interface BlogSkeletonProps {
  className?: string
}

export function BlogSkeleton({ className }: BlogSkeletonProps) {
  return (
    <div className={cn('space-y-8', className)}>
      {[...Array(6)].map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function BlogCardSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* 画像スケルトン */}
        <Skeleton className="w-full md:w-48 h-32 rounded-lg flex-shrink-0" />

        {/* コンテンツスケルトン */}
        <div className="flex-1 space-y-4">
          {/* タイトル */}
          <Skeleton className="h-6 w-3/4" />

          {/* 説明 */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* メタデータ */}
          <div className="flex flex-wrap gap-4 items-center pt-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* タグ */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-6 rounded-full w-16" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function BlogGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <BlogVerticalCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function BlogVerticalCardSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      {/* 画像スケルトン */}
      <Skeleton className="w-full h-48" />

      {/* コンテンツスケルトン */}
      <div className="p-6 space-y-4">
        {/* タイトル */}
        <Skeleton className="h-6 w-4/5" />

        {/* 説明 */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* メタデータ */}
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* タグ */}
        <div className="flex flex-wrap gap-2">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="h-5 rounded-full w-12" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function FiltersSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-4 w-4" />
      </div>

      {/* 検索バー */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 rounded-lg" />
      </div>

      {/* ソートオプション */}
      <div className="mt-6 space-y-3">
        <Skeleton className="h-4 w-16" />
        <div className="flex flex-wrap gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-8 rounded-lg w-20" />
          ))}
        </div>
      </div>

      {/* タグリスト */}
      <div className="mt-6 space-y-3">
        <Skeleton className="h-4 w-24" />
        <div className="flex flex-wrap gap-2">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-8 rounded-lg w-16" />
          ))}
        </div>
      </div>
    </div>
  )
}
