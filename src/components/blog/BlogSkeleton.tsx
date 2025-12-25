import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface BlogSkeletonProps {
  className?: string;
}

export function BlogSkeleton({ className }: BlogSkeletonProps) {
  return (
    <div className={cn('space-y-8', className)}>
      {[...Array(6)].map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="border-border bg-card rounded-xl border p-6">
      <div className="flex flex-col gap-6 md:flex-row">
        {/* 画像スケルトン */}
        <Skeleton className="h-32 w-full flex-shrink-0 rounded-lg md:w-48" />

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
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* タグ */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-16 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlogGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <BlogVerticalCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function BlogVerticalCardSkeleton() {
  return (
    <div className="border-border bg-card overflow-hidden rounded-xl border">
      {/* 画像スケルトン */}
      <Skeleton className="h-48 w-full" />

      {/* コンテンツスケルトン */}
      <div className="space-y-4 p-6">
        {/* タイトル */}
        <Skeleton className="h-6 w-4/5" />

        {/* 説明 */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* メタデータ */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* タグ */}
        <div className="flex flex-wrap gap-2">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="h-5 w-12 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FiltersSkeleton() {
  return (
    <div className="border-border bg-card rounded-xl border p-6">
      {/* ヘッダー */}
      <div className="mb-6 flex items-center justify-between">
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
            <Skeleton key={i} className="h-8 w-20 rounded-lg" />
          ))}
        </div>
      </div>

      {/* タグリスト */}
      <div className="mt-6 space-y-3">
        <Skeleton className="h-4 w-24" />
        <div className="flex flex-wrap gap-2">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-16 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
