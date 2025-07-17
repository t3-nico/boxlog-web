import { cn } from '@/lib/utils'

interface BlogSkeletonProps {
  className?: string
}

export function BlogSkeleton({ className }: BlogSkeletonProps) {
  return (
    <div className={cn('animate-pulse', className)}>
      <div className="space-y-8">
        {[...Array(6)].map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export function BlogCardSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* 画像スケルトン */}
        <div className="w-full md:w-48 h-32 bg-neutral-200 dark:bg-neutral-700 rounded-lg flex-shrink-0" />
        
        {/* コンテンツスケルトン */}
        <div className="flex-1 space-y-3">
          {/* タイトル */}
          <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4" />
          
          {/* 説明 */}
          <div className="space-y-2">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3" />
          </div>
          
          {/* メタデータ */}
          <div className="flex flex-wrap gap-4 items-center pt-2">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-24" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-16" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-20" />
          </div>
          
          {/* タグ */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full w-16" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function BlogGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
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
      <div className="w-full h-48 bg-neutral-200 dark:bg-neutral-700" />
      
      {/* コンテンツスケルトン */}
      <div className="p-6 space-y-4">
        {/* タイトル */}
        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-4/5" />
        
        {/* 説明 */}
        <div className="space-y-2">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-full" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4" />
        </div>
        
        {/* メタデータ */}
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-20" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-16" />
        </div>
        
        {/* タグ */}
        <div className="flex flex-wrap gap-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded-full w-12" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function FiltersSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 animate-pulse">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded w-16" />
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-4" />
      </div>
      
      {/* 検索バー */}
      <div className="space-y-4">
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-24" />
        <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
      </div>
      
      {/* ソートオプション */}
      <div className="mt-6 space-y-3">
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-16" />
        <div className="flex flex-wrap gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-20" />
          ))}
        </div>
      </div>
      
      {/* タグリスト */}
      <div className="mt-6 space-y-3">
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-24" />
        <div className="flex flex-wrap gap-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-16" />
          ))}
        </div>
      </div>
    </div>
  )
}