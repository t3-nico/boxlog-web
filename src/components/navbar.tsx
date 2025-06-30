import Link from 'next/link'

export function Navbar() {
  return (
    <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold">MySite</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/features" className="hover:underline">Features</Link>
          <Link href="/pricing" className="hover:underline">Pricing</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>
      </nav>
    </header>
  )
}
