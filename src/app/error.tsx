'use client'

import { ErrorLayout } from '@/components/errors/ErrorLayout'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // 開発環境のみコンソール出力（本番環境ではエラー監視サービスに送信推奨）
    if (process.env.NODE_ENV === 'development') {
      console.error('Application error:', error)
    }
  }, [error])

  return (
    <ErrorLayout
      title="Something went wrong"
      description="We encountered an unexpected error. Please try again or contact support if the problem persists."
      showBackButton={false}
    >
      <div className="mt-10 space-y-4">
        <Button onClick={reset} className="w-full sm:w-auto">
          Try again
        </Button>

        <Button variant="outline" asChild className="w-full sm:ml-4 sm:w-auto">
          <Link href="/">Go home</Link>
        </Button>
      </div>

      {/* Error details for development */}
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-8">
          <summary className="cursor-pointer text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300">
            Error details (dev only)
          </summary>
          <pre className="mt-2 overflow-auto rounded bg-neutral-100 p-4 text-xs text-red-600 dark:bg-neutral-800 dark:text-red-400">
            {error.message}
            {error.stack && (
              <>
                {'\n\n'}
                {error.stack}
              </>
            )}
          </pre>
        </details>
      )}
    </ErrorLayout>
  )
}
