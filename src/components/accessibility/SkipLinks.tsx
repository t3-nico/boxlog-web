'use client'

import Link from 'next/link'
import { SKIP_LINKS, SCREEN_READER } from '@/lib/accessibility'

export function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only">
      {SKIP_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${SCREEN_READER.FOCUSABLE} inline-block mb-2 mr-4 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          {link.text}
        </Link>
      ))}
    </div>
  )
}