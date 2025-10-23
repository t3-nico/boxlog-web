'use client'

import { SKIP_LINKS, SCREEN_READER } from '@/lib/accessibility'

export function SkipNavigation() {
  return (
    <nav aria-label="Skip navigation">
      <ul className="skip-nav-list">
        {SKIP_LINKS.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className={`skip-nav-link ${SCREEN_READER.FOCUSABLE}`}
              onFocus={(e) => {
                // Ensure the link is visible when focused
                e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .skip-nav-list {
          position: absolute;
          top: -40px;
          left: 0;
          list-style: none;
          margin: 0;
          padding: 0;
          z-index: 9999;
        }
        .skip-nav-link {
          position: absolute;
          transform: translateY(-100%);
          transition: transform 0.3s;
          background: #1e40af;
          color: white;
          padding: 8px 16px;
          text-decoration: none;
          border-radius: 0 0 4px 4px;
          font-weight: 600;
          white-space: nowrap;
        }
        .skip-nav-link:focus {
          transform: translateY(0%);
          outline: 2px solid #fbbf24;
          outline-offset: 2px;
        }
        .skip-nav-link:hover {
          background: #1d4ed8;
        }
      `}</style>
    </nav>
  )
}

export default SkipNavigation