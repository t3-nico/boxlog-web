'use client'

import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import { toast } from 'sonner'

interface ShareButtonProps {
  title: string
  version: string
}

export function ShareButton({ title, version }: ShareButtonProps) {
  const handleShare = async () => {
    const url = window.location.href
    const fullTitle = `${title} - v${version}`

    if (navigator.share) {
      try {
        await navigator.share({ title: fullTitle, url })
      } catch {
        // User cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        toast.success('URL copied to clipboard')
      } catch {
        toast.error('Failed to copy URL')
      }
    }
  }

  return (
    <Button onClick={handleShare} variant="outline" className="gap-2">
      <Share2 className="h-4 w-4" />
      Share
    </Button>
  )
}
