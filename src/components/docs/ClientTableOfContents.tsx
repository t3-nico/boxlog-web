'use client'

import { useState, useEffect } from 'react'
import { AutoTableOfContents } from './AutoTableOfContents'

export function ClientTableOfContents() {
  const [mdxContent, setMdxContent] = useState<string>('')

  useEffect(() => {
    // MDXコンテンツを取得
    const content = (window as any).__mdxContent
    if (content) {
      setMdxContent(content)
    }
  }, [])

  if (!mdxContent) {
    return (
      <div className="space-y-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          On This Page
        </div>
        <div className="text-sm text-gray-500">Loading...</div>
      </div>
    )
  }

  return <AutoTableOfContents content={mdxContent} />
}