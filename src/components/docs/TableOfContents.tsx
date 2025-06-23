'use client';

import React from 'react';
import type { Heading } from '@/lib/parseHeadings';

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (!headings.length) return null;
  return (
    <nav className="sticky top-8 text-sm text-zinc-400 select-none">
      <ul className="space-y-1 border-l border-zinc-700 pl-3">
        {headings.map((heading) => (
          <li key={heading.id} className="relative">
            <a
              href={`#${heading.id}`}
              className={
                (heading.level === 3 ? 'ml-4 ' : '') +
                'block py-0.5 pr-2 transition-colors text-zinc-400 hover:text-white'
              }
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
} 