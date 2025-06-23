"use client"

import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-zinc-900 text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold">BoxLog</Link>
        <nav className="space-x-4 text-sm">
          <Link href="/blog" className="hover:underline">Blog</Link>
          <Link href="/docs" className="hover:underline">Docs</Link>
          <Link href="/release" className="hover:underline">Release</Link>
        </nav>
      </div>
    </header>
  )
}
