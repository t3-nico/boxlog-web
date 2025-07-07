'use client'

import { useState } from 'react'

interface CopyCodeButtonProps {
  code: string
}

export function CopyCodeButton({ code }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      }
  }

  return (
    <button
      className="px-2 py-1 text-xs bg-gray-700 dark:bg-gray-600 text-gray-300 dark:text-gray-200 rounded hover:bg-gray-600 dark:hover:bg-gray-500 transition-colors"
      onClick={handleCopy}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}