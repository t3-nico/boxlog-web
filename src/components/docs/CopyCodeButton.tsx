'use client'

import { Button } from '@/components/ui/button'
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
      console.error('Failed to copy code:', error)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-auto rounded bg-gray-700 px-2 py-1 text-xs text-gray-300 hover:bg-gray-600 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
      onClick={handleCopy}
    >
      {copied ? 'Copied!' : 'Copy'}
    </Button>
  )
}
