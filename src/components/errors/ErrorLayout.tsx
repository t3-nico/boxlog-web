import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface ErrorLayoutProps {
  code?: string
  title: string
  description: string
  showBackButton?: boolean
  children?: React.ReactNode
}

export function ErrorLayout({
  code,
  title,
  description,
  showBackButton = true,
  children
}: ErrorLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 grid-rows-[1fr_auto_1fr] bg-white lg:grid-cols-[max(50%,36rem)_1fr] dark:bg-neutral-900">
      {/* Header */}
      <header className="mx-auto w-full max-w-7xl px-6 pt-6 sm:pt-10 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:px-8">
        <Link href="/" className="inline-block">
          <span className="sr-only">BoxLog</span>
          <div className="text-2xl font-bold text-neutral-900 dark:text-white">
            BoxLog
          </div>
        </Link>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
        <div className="max-w-lg">
          {code && (
            <p className="text-base font-semibold text-neutral-900 dark:text-neutral-400">
              {code}
            </p>
          )}
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-neutral-900 sm:text-6xl dark:text-white">
            {title}
          </h1>
          <p className="mt-6 text-lg font-medium text-neutral-500 sm:text-xl dark:text-neutral-400">
            {description}
          </p>

          {children}

          {showBackButton && (
            <div className="mt-10">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="self-end lg:col-span-2 lg:col-start-1 lg:row-start-3">
        <div className="border-t border-neutral-100 bg-neutral-50 py-10 dark:border-neutral-800 dark:bg-neutral-800/50">
          <nav className="mx-auto flex w-full max-w-7xl items-center gap-x-4 px-6 text-sm text-neutral-600 lg:px-8 dark:text-neutral-400">
            <Link href="/contact" className="hover:text-neutral-900 dark:hover:text-neutral-300">
              Contact support
            </Link>
            <svg viewBox="0 0 2 2" aria-hidden="true" className="h-0.5 w-0.5 fill-neutral-300 dark:fill-neutral-600">
              <circle r={1} cx={1} cy={1} />
            </svg>
            <Link href="/docs" className="hover:text-neutral-900 dark:hover:text-neutral-300">
              Documentation
            </Link>
          </nav>
        </div>
      </footer>

      {/* Background Image */}
      <div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
      </div>
    </div>
  )
}
