'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'

interface TocItem {
  id: string
  title: string
  level: number
}

export function TableOfContents() {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  // Generate table of contents from page headings
  useEffect(() => {
    const generateToc = () => {
      const headings = Array.from(
        document.querySelectorAll(
          'main h1, main h2, main h3, main h4, main h5, main h6'
        )
      ) as HTMLHeadingElement[]

      const tocItems: TocItem[] = headings
        .filter((heading) => heading.id) // Only include headings with IDs
        .map((heading) => ({
          id: heading.id,
          title: heading.textContent || '',
          level: parseInt(heading.tagName.charAt(1), 10),
        }))
        .filter((item) => item.level >= 2 && item.level <= 3) // Only h2 and h3

      setToc(tocItems)
    }

    // Generate TOC after component mounts and when content changes
    generateToc()

    // Observe for dynamic content changes
    const observer = new MutationObserver(generateToc)
    const mainElement = document.querySelector('main')

    if (mainElement) {
      observer.observe(mainElement, {
        childList: true,
        subtree: true,
      })
    }

    return () => observer.disconnect()
  }, [])

  // Track scroll position and update active heading
  useEffect(() => {
    if (toc.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)

        if (visibleEntries.length > 0) {
          // Get the entry that's most visible (highest intersection ratio)
          const mostVisible = visibleEntries.reduce((max, entry) =>
            entry.intersectionRatio > max.intersectionRatio ? entry : max
          )
          setActiveId(mostVisible.target.id)
        }
      },
      {
        rootMargin: '-80px 0px -80% 0px', // Adjust based on header height and desired behavior
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    // Observe all headings in the TOC
    toc.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [toc])

  // Handle smooth scroll to heading
  const handleClick = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      // Update URL hash without triggering scroll
      if (history.pushState) {
        history.pushState(null, '', `#${id}`)
      }
    }
  }, [])

  // Don't render if no headings found
  if (toc.length === 0) {
    return (
      <div className="space-y-4">
        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          On This Page
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No headings found
        </p>

        {/* Helpful Links */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="space-y-3">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Helpful Links
            </div>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                Edit this page
              </a>
              <a
                href="#"
                className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                Report an issue
              </a>
              <a
                href="#"
                className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                Give feedback
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        On This Page
      </div>

      <nav className="space-y-1">
        {toc.map((item) => (
          <Button
            key={item.id}
            onClick={() => handleClick(item.id)}
            variant="ghost"
            className={`block w-full text-left py-2 px-3 h-auto justify-start ${
              item.level === 3 ? 'ml-4 text-xs' : ''
            } ${
              activeId === item.id
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium border-l-2 border-blue-600 dark:border-blue-400'
                : 'hover:text-foreground border-l-2 border-transparent'
            }`}
            title={item.title}
          >
            <span className="line-clamp-2">{item.title}</span>
          </Button>
        ))}
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
              className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors group"
            >
              <svg
                className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit this page
            </a>
            <a
              href="#"
              className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors group"
            >
              <svg
                className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              Report an issue
            </a>
            <a
              href="#"
              className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors group"
            >
              <svg
                className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 0v10a2 2 0 002 2h10a2 2 0 002-2V8"
                />
              </svg>
              Give feedback
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
