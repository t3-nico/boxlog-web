import { TagDetailClient } from '@/components/tags/TagDetailClient'
import { Container } from '@/components/ui/container'
import { routing } from '@/i18n/routing'
import { getAllTags, getContentByTag } from '@/lib/tags-server'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

interface TagPageProps {
  params: Promise<{ tag: string; locale: string }>
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const tagData = await getContentByTag(decodedTag)

  if (tagData.totalCount === 0) {
    return {
      title: 'Tag not found',
      description: 'The tag you are looking for could not be found.',
    }
  }

  return {
    title: `#${tagData.tag} - Tagged Content`,
    description: `Browse all content tagged with "${tagData.tag}". ${tagData.blog.length} blog posts, ${tagData.releases.length} releases, ${tagData.docs.length} docs.`,
    openGraph: {
      title: `#${tagData.tag} - Tagged Content | BoxLog`,
      description: `Browse all content tagged with "${tagData.tag}". ${tagData.blog.length} blog posts, ${tagData.releases.length} releases, ${tagData.docs.length} docs.`,
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  const allTags = await getAllTags()

  const params = []
  for (const locale of routing.locales) {
    for (const tagItem of allTags) {
      params.push({ locale, tag: encodeURIComponent(tagItem.tag) })
    }
  }

  return params
}

export default async function TagDetailPage({ params }: TagPageProps) {
  const { tag, locale } = await params
  setRequestLocale(locale)

  const decodedTag = decodeURIComponent(tag)
  const [tagData, allTags] = await Promise.all([getContentByTag(decodedTag), getAllTags()])

  if (tagData.totalCount === 0) {
    notFound()
  }

  const popularTags = allTags.slice(0, 10)

  return (
    <div className="bg-background min-h-screen">
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-6xl">
            <TagDetailClient
              tag={tagData.tag}
              blogContent={tagData.blog}
              releaseContent={tagData.releases}
              docsContent={tagData.docs}
              popularTags={popularTags}
              locale={locale}
            />
          </div>
        </Container>
      </section>
    </div>
  )
}
