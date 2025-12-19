import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface ErrorLayoutProps {
  code?: string
  title: string
  description: string
  showBackButton?: boolean
  children?: React.ReactNode
}

export function ErrorLayout({ code, title, description, showBackButton = true, children }: ErrorLayoutProps) {
  return (
    <div className="bg-background grid min-h-screen grid-cols-1 grid-rows-[1fr_auto_1fr] lg:grid-cols-[max(50%,36rem)_1fr]">
      {/* Header */}
      <header className="mx-auto w-full max-w-7xl px-6 pt-6 sm:pt-10 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:px-8">
        <Link href="/" className="inline-block">
          <span className="sr-only">BoxLog</span>
          <div className="text-foreground text-2xl font-bold">BoxLog</div>
        </Link>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
        <div className="max-w-lg">
          {code && <p className="text-muted-foreground text-base font-semibold">{code}</p>}
          <h1 className="text-foreground mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">{title}</h1>
          <p className="text-muted-foreground mt-6 text-lg font-medium sm:text-xl">{description}</p>

          {children}

          {showBackButton && (
            <div className="mt-10">
              <Link
                href="/"
                className="text-foreground hover:text-muted-foreground inline-flex items-center gap-2 text-sm font-semibold"
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
        <div className="border-border bg-muted border-t py-10">
          <nav className="text-muted-foreground mx-auto flex w-full max-w-7xl items-center gap-x-4 px-6 text-sm lg:px-8">
            <Link href="/contact" className="hover:text-foreground">
              Contact support
            </Link>
            <svg viewBox="0 0 2 2" aria-hidden="true" className="fill-border h-0.5 w-0.5">
              <circle r={1} cx={1} cy={1} />
            </svg>
            <Link href="/docs" className="hover:text-foreground">
              Documentation
            </Link>
          </nav>
        </div>
      </footer>

      {/* Background Image */}
      <div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
        <div className="from-muted to-background absolute inset-0 bg-gradient-to-br" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
      </div>
    </div>
  )
}
