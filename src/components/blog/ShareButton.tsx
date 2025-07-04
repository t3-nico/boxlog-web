'use client'

interface ShareButtonProps {
  title: string
  slug: string
}

export function ShareButton({ title, slug }: ShareButtonProps) {
  const handleShare = () => {
    const url = `${window.location.origin}/blog/${slug}`
    
    if (navigator.share) {
      navigator.share({ title, url })
    } else {
      navigator.clipboard.writeText(url)
      alert('URLをコピーしました')
    }
  }

  return (
    <button
      onClick={handleShare}
      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
    >
      この記事をシェア
    </button>
  )
}