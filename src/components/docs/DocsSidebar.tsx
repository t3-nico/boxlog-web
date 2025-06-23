"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { docsNavigation } from '@/lib/docsNavigation'

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <nav className="p-6 text-sm">
      <div className="mb-6 text-xs font-bold text-zinc-400 tracking-widest">ドキュメント</div>
      <div className="space-y-8">
        {docsNavigation.map((section) => (
          <div key={section.title}>
            <div className="mb-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              {section.title}
            </div>
            <div className="relative">
              <div className="absolute left-0 top-0 h-full w-px bg-zinc-700" />
              <ul className="space-y-1 pl-4">
                {section.links.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <li key={link.href} className="relative">
                      {isActive && (
                        <div className="absolute -left-4 top-0 h-full w-px bg-white rounded" />
                      )}
                      <Link
                        href={link.href}
                        className={clsx(
                          'block py-1 pr-2 transition-colors',
                          isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white',
                        )}
                      >
                        {link.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </nav>
  )
} 