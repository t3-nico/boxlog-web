'use client'

interface ShareButtonProps {
  title: string
  version: string
}

export function ShareButton({ title, version }: ShareButtonProps) {
  const handleShare = () => {
    const url = window.location.href
    const fullTitle = `${title} - v${version}`
    
    if (navigator.share) {
      navigator.share({ title: fullTitle, url })
    } else {
      navigator.clipboard.writeText(url)
      alert('URLをコピーしました')
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
      </svg>
      共有
    </button>
  )
}