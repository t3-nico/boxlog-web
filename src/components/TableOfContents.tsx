'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useSectionStore } from '@/components/SectionProvider'

export function TableOfContents({ className }: { className?: string }) {
  let sections = useSectionStore((s) => s.sections)
  let visibleSections = useSectionStore((s) => s.visibleSections)

  if (sections.length === 0) {
    return null
  }

  return (
    <nav className={clsx('text-sm leading-6', className)} aria-label="On this page">
      <h2 className="font-semibold text-zinc-900 dark:text-white">On this page</h2>
      <ul className="mt-4 space-y-3">
        {sections.map((section) => (
          <li key={section.id}>
            <Link
              href={`#${section.id}`}
              className={clsx(
                'block hover:text-emerald-500',
                visibleSections.includes(section.id)
                  ? 'text-emerald-500'
                  : 'text-zinc-700 dark:text-zinc-300'
              )}
            >
              {section.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

