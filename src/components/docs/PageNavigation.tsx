import { ContentData } from '@/types/content'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface PageNavigationProps {
  previousPage?: ContentData
  nextPage?: ContentData
}

export function PageNavigation({ previousPage, nextPage }: PageNavigationProps) {
  if (!previousPage && !nextPage) {
    return null
  }

  return (
    <div className="border-border mt-12 border-t pt-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Previous Page */}
        <div className="flex justify-start">
          {previousPage && (
            <Link
              href={`/docs/${previousPage.slug}`}
              className="group border-border bg-card hover:border-foreground hover:bg-muted flex max-w-sm items-center rounded-lg border p-4 transition-colors"
            >
              <div className="flex items-center">
                <ChevronLeft className="text-muted-foreground group-hover:text-foreground mr-3 h-5 w-5" />
                <div>
                  <div className="text-muted-foreground mb-1 text-sm">Previous</div>
                  <div className="text-foreground group-hover:text-primary font-medium transition-colors">
                    {previousPage.frontMatter.title}
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* Next Page */}
        <div className="flex justify-end">
          {nextPage && (
            <Link
              href={`/docs/${nextPage.slug}`}
              className="group border-border bg-card hover:border-foreground hover:bg-muted flex max-w-sm items-center rounded-lg border p-4 transition-colors"
            >
              <div className="flex items-center text-right">
                <div>
                  <div className="text-muted-foreground mb-1 text-sm">Next</div>
                  <div className="text-foreground group-hover:text-primary font-medium transition-colors">
                    {nextPage.frontMatter.title}
                  </div>
                </div>
                <ChevronRight className="text-muted-foreground group-hover:text-foreground ml-3 h-5 w-5" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
