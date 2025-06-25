import { ArticleLayout, type Breadcrumb } from '@/components/ArticleLayout'
import { Heading } from '@/components/Heading'

export const metadata = {
  title: 'Audit log',
  description: 'Example page demonstrating breadcrumb and 2-column layout.',
  tags: ['docs', 'guide'],
}

export const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'usage', title: 'Usage' },
]

export default function Page() {
  const breadcrumbs: Breadcrumb[] = [
    { href: '', label: 'Guides' },
    { href: '/docs/audit-log', label: 'Audit log' },
  ]

  return (
    <ArticleLayout breadcrumbs={breadcrumbs} title="Audit log">
      <p className="mb-6">
        This is a demo page showcasing how to combine breadcrumbs, a title, and a
        two-column layout with a sticky table of contents.
      </p>
      <Heading level={2} id="overview">
        Overview
      </Heading>
      <p className="mt-2">Content for the overview section.</p>
      <Heading level={2} id="usage">
        Usage
      </Heading>
      <p className="mt-2">Details about using the audit log feature.</p>
    </ArticleLayout>
  )
}
