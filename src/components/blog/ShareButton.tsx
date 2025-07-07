'use client'

interface ShareButtonProps {
  title: string
  slug: string
  locale?: string
}

export function ShareButton({ title, slug, locale = 'en' }: ShareButtonProps) {
  const handleShare = () => {
    const url = `${window.location.origin}${locale === 'jp' ? '/jp' : ''}/blog/${slug}`
    
    if (navigator.share) {
      navigator.share({ title, url })
    } else {
      navigator.clipboard.writeText(url)
      alert(locale === 'jp' ? 'URLをコピーしました' : 'URL copied to clipboard')
    }
  }

  return (
    <button
      onClick={handleShare}
      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
    >
      {locale === 'jp' ? 'この記事をシェア' : 'Share this article'}
    </button>
  )
}