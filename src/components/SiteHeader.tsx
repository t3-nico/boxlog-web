import Link from 'next/link'

import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 bg-white shadow-sm dark:bg-zinc-900 dark:shadow-zinc-800/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-8 w-auto" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Protocol</span>
          </Link>
          <nav className="hidden space-x-8 md:flex">
            <Link href="/pricing" className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Pricing</Link>
            <Link href="/docs" className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Docs</Link>
            <Link href="/blog" className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Blog</Link>
            <Link href="/contact" className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Contact</Link>
          </nav>
          <div className="hidden space-x-4 md:flex">
            <Button href="/auth/login" variant="secondary">Log in</Button>
            <Button href="/auth/signup">Sign up</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
