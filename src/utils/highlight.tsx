import React from 'react'

interface HighlightProps {
  text: string
  query: string
  className?: string
}

export function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  
  return parts.map((part, index) => 
    regex.test(part) ? (
      <mark key={index} className="bg-yellow-200 text-yellow-900 px-0.5 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  )
}

export function Highlight({ text, query, className = '' }: HighlightProps) {
  return (
    <span className={className}>
      {highlightText(text, query)}
    </span>
  )
}