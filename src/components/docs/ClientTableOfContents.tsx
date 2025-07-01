'use client'

import { AutoTableOfContents } from './AutoTableOfContents'

interface ClientTableOfContentsProps {
  content?: string
}

export function ClientTableOfContents({ content }: ClientTableOfContentsProps) {
  if (!content) {
    return (
      <div className="space-y-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          On This Page
        </div>
        <div className="text-sm text-gray-500">No headings found</div>
      </div>
    )
  }

  return <AutoTableOfContents content={content} />
}