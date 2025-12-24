'use client'

import { ErrorLayout } from '@/components/errors/ErrorLayout'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <ErrorLayout
      title={t('errors.general.title')}
      description={t('errors.general.description')}
      showBackButton={false}
    >
      <div className="mt-10 space-y-4">
        <Button onClick={reset} className="w-full sm:w-auto">
          {t('common.actions.tryAgain')}
        </Button>

        <Button variant="outline" asChild className="w-full sm:ml-4 sm:w-auto">
          <Link href="/">{t('common.actions.backToHome')}</Link>
        </Button>
      </div>

      {/* Error details for development */}
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-8">
          <summary className="text-muted-foreground hover:text-foreground cursor-pointer text-sm">
            Error details (dev only)
          </summary>
          <pre className="bg-muted text-destructive mt-2 overflow-auto rounded p-4 text-xs">
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
