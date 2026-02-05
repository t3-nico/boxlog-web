import { Button } from '@/components/ui/button';
import { ContentData } from '@/types/content';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PageNavigationProps {
  previousPage?: ContentData;
  nextPage?: ContentData;
}

export function PageNavigation({ previousPage, nextPage }: PageNavigationProps) {
  if (!previousPage && !nextPage) {
    return null;
  }

  return (
    <div className="border-border mt-12 border-t pt-8">
      <div className="flex justify-between gap-4">
        {/* Previous Page */}
        <div className="flex-1">
          {previousPage && (
            <Button
              variant="outline"
              size="lg"
              asChild
              className="h-auto w-full justify-start px-4 py-4"
            >
              <Link href={`/docs/${previousPage.slug}`}>
                <ChevronLeft className="mr-2 size-4 shrink-0" />
                <div className="text-left">
                  <div className="text-muted-foreground text-xs">Previous</div>
                  <div className="text-foreground text-sm font-bold">
                    {previousPage.frontMatter.title}
                  </div>
                </div>
              </Link>
            </Button>
          )}
        </div>

        {/* Next Page */}
        <div className="flex-1">
          {nextPage && (
            <Button
              variant="outline"
              size="lg"
              asChild
              className="h-auto w-full justify-end px-4 py-4"
            >
              <Link href={`/docs/${nextPage.slug}`}>
                <div className="text-right">
                  <div className="text-muted-foreground text-xs">Next</div>
                  <div className="text-foreground text-sm font-bold">
                    {nextPage.frontMatter.title}
                  </div>
                </div>
                <ChevronRight className="ml-2 size-4 shrink-0" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
