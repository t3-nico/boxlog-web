import type { Metadata } from 'next'

// This layout is shared across locales, so metadata should be handled in individual pages
// Remove static metadata to avoid conflicts with page-level generateMetadata

export default function ReleasesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">{children}</div>
  )
}
