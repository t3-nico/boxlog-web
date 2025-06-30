import { cn } from '@/lib/utils'
import React, { useState } from 'react'

export interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
}

export interface AccordionProps {
  items: AccordionItem[]
}

export function Accordion({ items }: AccordionProps) {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="border border-zinc-200 rounded-md">
          <button
            className={cn('w-full px-4 py-2 text-left font-medium flex justify-between items-center', open === item.id && 'bg-zinc-100 dark:bg-zinc-800')}
            onClick={() => setOpen(open === item.id ? null : item.id)}
          >
            {item.title}
            <span>{open === item.id ? '-' : '+'}</span>
          </button>
          {open === item.id && <div className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700">{item.content}</div>}
        </div>
      ))}
    </div>
  )
}
