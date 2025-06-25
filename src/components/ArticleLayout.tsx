import Link from 'next/link'
import { TableOfContents } from '@/components/TableOfContents'

export interface Breadcrumb {
  href: string
  label: string
}

export function ArticleLayout({
  breadcrumbs,
  title,
  children,
}: {
  breadcrumbs: Array<Breadcrumb>
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="px-4 pt-6 pb-10 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
        <ol className="flex flex-wrap items-center gap-1">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && <span className="mx-1">/</span>}
              <Link href={crumb.href} className="hover:text-emerald-500">
                {crumb.label}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
        {title}
      </h1>
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
        <div className="min-w-0 flex-auto lg:pr-8">{children}</div>
        <aside className="mt-8 lg:mt-0 lg:w-64 lg:flex-none lg:pt-2">
          <div className="hidden lg:block sticky top-20">
            <TableOfContents />
          </div>
          <details className="lg:hidden" open={false}>
            <summary className="cursor-pointer font-semibold text-zinc-900 dark:text-white">
              目次
            </summary>
            <div className="mt-2 border-l border-zinc-200 pl-4 dark:border-zinc-700">
              <TableOfContents />
            </div>
          </details>
        </aside>
      </div>
    </div>
  )
}
