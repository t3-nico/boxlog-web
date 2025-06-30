'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Logo } from '@/components/Logo'
import { Navigation } from '@/components/Navigation'
import { SectionProvider, type Section } from '@/components/SectionProvider'

function BlogHeader() {
  return (
    <header className="bg-white shadow-sm dark:bg-zinc-900 dark:shadow-zinc-800/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-auto" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Protocol</span>
            </Link>
          </div>
          <nav className="hidden space-x-8 md:flex">
            <Link 
              href="/docs" 
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Documentation
            </Link>
            <Link 
              href="/blog" 
              className="text-emerald-600 font-medium dark:text-emerald-400"
            >
              Blog
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export function Layout({
  children,
  allSections,
}: {
  children: React.ReactNode
  allSections: Record<string, Array<Section>>
}) {
  let pathname = usePathname()
  let isBlogPage = pathname?.startsWith('/blog')

  // Blog pages use a different layout
  if (isBlogPage) {
    return (
      <SectionProvider sections={[]}>
        <div className="flex min-h-screen flex-col">
          <BlogHeader />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </SectionProvider>
    )
  }

  // Documentation pages use the original layout
  return (
    <SectionProvider sections={allSections[pathname] ?? []}>
      <div className="h-full lg:ml-72 xl:ml-80">
        <motion.header
          layoutScroll
          className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
        >
          <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pt-4 lg:pb-8 xl:w-80 lg:dark:border-white/10">
            <div className="hidden lg:flex">
              <Link href="/docs" aria-label="Home">
                <Logo className="h-6" />
              </Link>
            </div>
            <Header />
            <Navigation className="hidden lg:mt-10 lg:block" />
          </div>
        </motion.header>
        <div className="relative flex h-full flex-col pt-14 pl-4 pr-0 sm:pl-6 sm:pr-0 lg:pl-12 lg:pr-0">
          <main className="flex-auto">{children}</main>
          <Footer />
        </div>
      </div>
    </SectionProvider>
  )
}