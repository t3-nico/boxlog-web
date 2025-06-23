"use client"

import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-zinc-900 text-white mt-8">
      <div className="container mx-auto flex flex-col items-center px-4 py-6">
        <nav className="space-x-4 text-sm mb-2">
          <Link href="/blog" className="hover:underline">Blog</Link>
          <Link href="/docs" className="hover:underline">Docs</Link>
          <Link href="/release" className="hover:underline">Release</Link>
        </nav>
        <p className="text-xs text-zinc-400">&copy; {year} BoxLog</p>
      </div>
    </footer>
  )
}
