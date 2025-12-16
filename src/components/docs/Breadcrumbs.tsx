import Link from 'next/link'
import { generateBreadcrumbs } from '@/lib/mdx'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

interface BreadcrumbsProps {
  slug: string
  title?: string
}

export function Breadcrumbs({ slug, title }: BreadcrumbsProps) {
  const breadcrumbs = generateBreadcrumbs(slug)

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <BreadcrumbItem key={`${crumb.href}-${index}`}>
            {index === breadcrumbs.length - 1 ? (
              <BreadcrumbPage>{title || crumb.title}</BreadcrumbPage>
            ) : crumb.clickable === false ? (
              <span className="text-muted-foreground">{crumb.title}</span>
            ) : (
              <BreadcrumbLink asChild>
                <Link href={crumb.href}>{crumb.title}</Link>
              </BreadcrumbLink>
            )}
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
