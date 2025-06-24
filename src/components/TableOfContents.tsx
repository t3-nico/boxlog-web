'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useSectionStore } from '@/components/SectionProvider'

export function TableOfContents({ className }: { className?: string }) {
  let sections = useSectionStore((s) => s.sections)
  let visibleSections = useSectionStore((s) => s.visibleSections)
  let current = visibleSections[0]

  if (sections.length === 0) {
    return null
  }

  return (
    <nav className={clsx('text-sm leading-6', className)} aria-label="目次">
      <h2 className="font-semibold text-zinc-900 dark:text-white">目次</h2>
      <ul className="mt-4 space-y-3 border-l border-zinc-200 pl-3 dark:border-zinc-700">
        {sections.map((section) => (
          <li key={section.id}>
            <Link
              href={`#${section.id}`}
              className={clsx(
                'block -ml-1 hover:text-emerald-500',
                section.id === current
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

