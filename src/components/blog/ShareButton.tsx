'use client'

import { Twitter, Facebook, Linkedin, Link2, Copy } from 'lucide-react'

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
      color: 'hover:text-blue-400'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:text-blue-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:text-blue-700'
    }
  ]

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      alert(locale === 'jp' ? 'URLをコピーしました' : 'URL copied to clipboard')
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({ title, url })
    } else {
      handleCopyLink()
    }
  }

  return (
    <div className="flex items-center gap-3">
        {shareLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-500 dark:text-gray-400 ${social.color} transition-colors p-1 rounded`}
            title={`Share on ${social.name}`}
            aria-label={`Share on ${social.name}`}
          >
            <social.icon className="w-5 h-5" />
          </a>
        ))}
        <button
          onClick={handleCopyLink}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors p-1 rounded"
          title="Copy link"
          aria-label="Copy link"
        >
          <Copy className="w-5 h-5" />
        </button>
        {navigator.share && (
          <button
            onClick={handleNativeShare}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors p-1 rounded"
            title="Share"
            aria-label="Share"
          >
            <Link2 className="w-5 h-5" />
          </button>
        )}
    </div>
  )
}