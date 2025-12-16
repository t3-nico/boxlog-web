'use client'

import { Twitter, Facebook, Linkedin, Link2, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

interface ShareButtonProps {
  title: string
  slug: string
  locale?: string
}

export function ShareButton({ title, slug, locale = 'en' }: ShareButtonProps) {
  const url = `${typeof window !== 'undefined' ? window.location.origin : ''}${locale === 'jp' ? '/jp' : ''}/blog/${slug}`
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hover:text-blue-400',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:text-blue-600',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:text-blue-700',
    },
  ]

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success(
        locale === 'jp' ? 'URLをコピーしました' : 'URL copied to clipboard'
      )
    } catch (err) {
      console.error('Failed to copy URL:', err)
      toast.error(
        locale === 'jp' ? 'URLのコピーに失敗しました' : 'Failed to copy URL'
      )
    }
  }

  const handleNativeShare = () => {
    if (typeof window !== 'undefined' && 'share' in navigator) {
      navigator.share({ title, url })
    } else {
      handleCopyLink()
    }
  }

  return (
    <div className="flex items-center gap-2">
      {shareLinks.map((social) => (
        <Button
          key={social.name}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          asChild
        >
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${social.name}`}
            aria-label={`Share on ${social.name}`}
          >
            <social.icon className="h-4 w-4" />
          </a>
        </Button>
      ))}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={handleCopyLink}
        title="Copy link"
        aria-label="Copy link"
      >
        <Copy className="h-4 w-4" />
      </Button>
      {typeof window !== 'undefined' && 'share' in navigator && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleNativeShare}
          title="Share"
          aria-label="Share"
        >
          <Link2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
