'use client'

import { useState, useEffect } from 'react'
import { TocItem, generateTableOfContents, truncateHeading } from '@/lib/toc'

interface AutoTableOfContentsProps {
  content: string
  className?: string
}

interface TocListProps {
  items: TocItem[]
  level?: number
  activeId: string
  onItemClick: (id: string) => void
}

function TocList({ items, level = 0, activeId, onItemClick }: TocListProps) {
  return (
    <ul className={`space-y-2 ${level > 0 ? 'ml-4' : ''}`}>
      {items.map((item) => (
        <li key={item.id}>
          <button
            onClick={() => onItemClick(item.id)}
            className={`block w-full text-left py-1 px-2 text-sm rounded-md transition-colors ${
              level === 0 ? 'font-medium' : 'text-sm'
            } ${
              activeId === item.id
                ? 'text-blue-600 bg-blue-50 border-l-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-l-2 border-transparent'
            }`}
            title={item.title}
          >
            <span className="line-clamp-2">
              {truncateHeading(item.title, level === 0 ? 40 : 35)}
            </span>
          </button>
          {item.children && item.children.length > 0 && (
            <TocList
              items={item.children}
              level={level + 1}
              activeId={activeId}
              onItemClick={onItemClick}
            />
          )}
        </li>
      ))}
    </ul>
  )
}

export function AutoTableOfContents({ content, className = '' }: AutoTableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isLoaded, setIsLoaded] = useState(false)

  // コンテンツから目次を生成
  useEffect(() => {
    try {
      const tocItems = generateTableOfContents(content)
      setToc(tocItems)
      setIsLoaded(true)
    } catch (error) {
      console.error('Failed to generate table of contents:', error)
      setIsLoaded(true)
    }
  }, [content])

  // アクティブな見出しを追跡
  useEffect(() => {
    if (toc.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // 画面内に見える見出し要素をフィルタリング
        const visibleEntries = entries.filter(entry => entry.isIntersecting)
        
        if (visibleEntries.length > 0) {
          // 最も上に見える要素を選択
          const topEntry = visibleEntries.reduce((top, entry) => {
            const topRect = top.boundingClientRect
            const entryRect = entry.boundingClientRect
            return entryRect.top < topRect.top ? entry : top
          })
          setActiveId(topEntry.target.id)
        } else {
          // 見える要素がない場合、最も上に近い要素を探す
          const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
          let activeElement: Element | null = null
          let minDistance = Infinity

          allHeadings.forEach((heading) => {
            const rect = heading.getBoundingClientRect()
            const distance = Math.abs(rect.top - 100) // ヘッダー高さを考慮
            if (distance < minDistance && rect.top <= 200) {
              minDistance = distance
              activeElement = heading
            }
          })

          if (activeElement && (activeElement as HTMLElement).id) {
            setActiveId((activeElement as HTMLElement).id)
          }
        }
      },
      {
        rootMargin: '-100px 0px -70% 0px',
        threshold: [0, 0.1, 0.5, 1],
      }
    )

    // すべての見出し要素を監視
    const flatTocItems = flattenTocItems(toc)
    flatTocItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    // 初期状態でアクティブな見出しを設定
    const setInitialActive = () => {
      const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      let activeElement: Element | null = null
      let minDistance = Infinity

      allHeadings.forEach((heading) => {
        const rect = heading.getBoundingClientRect()
        const distance = Math.abs(rect.top - 100)
        if (distance < minDistance && rect.top <= 200) {
          minDistance = distance
          activeElement = heading
        }
      })

      if (activeElement && (activeElement as HTMLElement).id) {
        setActiveId((activeElement as HTMLElement).id)
      }
    }

    // 少し遅延させてから初期設定
    setTimeout(setInitialActive, 100)

    // スクロールイベントも追加（バックアップ）
    const handleScroll = () => {
      const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      let activeElement: Element | null = null
      let minDistance = Infinity

      allHeadings.forEach((heading) => {
        const rect = heading.getBoundingClientRect()
        const distance = Math.abs(rect.top - 100)
        if (distance < minDistance && rect.top <= 200) {
          minDistance = distance
          activeElement = heading
        }
      })

      if (activeElement && (activeElement as HTMLElement).id) {
        setActiveId((activeElement as HTMLElement).id)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [toc])

  // スムーズスクロール
  const handleItemClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100 // 固定ヘッダーの高さを考慮
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      // URLハッシュを更新（履歴には追加しない）
      if (history.replaceState) {
        history.replaceState(null, '', `#${id}`)
      }
    }
  }

  // 目次が空の場合は非表示
  if (!isLoaded || toc.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          On This Page
        </div>
        {!isLoaded ? (
          <div className="text-sm text-gray-500">Loading...</div>
        ) : (
          <div className="text-sm text-gray-500">No headings found</div>
        )}
        
        {/* Helpful Links */}
        <div className="border-t border-gray-200 pt-4">
          <div className="space-y-3">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Helpful Links
            </div>
            <div className="space-y-2">
              <a
                href="#"
                className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit this page
              </a>
              <a
                href="#"
                className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Report an issue
              </a>
              <a
                href="#"
                className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 0v10a2 2 0 002 2h10a2 2 0 002-2V8" />
                </svg>
                Give feedback
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        On This Page
      </div>
      
      <nav className="space-y-1">
        <TocList
          items={toc}
          activeId={activeId}
          onItemClick={handleItemClick}
        />
      </nav>

      {/* Helpful Links */}
      <div className="border-t border-gray-200 pt-4">
        <div className="space-y-3">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Helpful Links
          </div>
          <div className="space-y-2">
            <a
              href="#"
              className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit this page
            </a>
            <a
              href="#"
              className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Report an issue
            </a>
            <a
              href="#"
              className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 0v10a2 2 0 002 2h10a2 2 0 002-2V8" />
              </svg>
              Give feedback
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// 階層化された目次をフラットなリストに変換
function flattenTocItems(items: TocItem[]): TocItem[] {
  const flattened: TocItem[] = []
  
  for (const item of items) {
    flattened.push(item)
    if (item.children) {
      flattened.push(...flattenTocItems(item.children))
    }
  }
  
  return flattened
}