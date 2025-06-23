import { notFound } from 'next/navigation'
import { getAllDocs, getDocBySlug } from '@/lib/docsApi'
import markdownToHtml from '@/lib/markdownToHtml'
import type { Metadata } from 'next'
import type { JSX } from 'react'

interface PageProps {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params.slug.join('/')
  const doc = getDocBySlug(slug, ['title', 'excerpt'])

  if (!doc) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    }
  }

  return {
    title: doc.title,
    description: doc.excerpt,
  }
}

export default async function DocPage({ params }: PageProps): Promise<JSX.Element> {
  const slug = params.slug.join('/')
  const doc = getDocBySlug(slug, ['title', 'content'])

  if (!doc || !doc.title) {
    return notFound()
  }

  const content = await markdownToHtml(doc.content || '')

  return (
    <main className="py-12">
      <div className="container mx-auto px-5">
        <article className="prose prose-invert lg:prose-xl mx-auto">
          <h1>{doc.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  const docs = getAllDocs(['slug'])
  return docs.map((doc) => ({
    slug: doc.slug?.split('/'),
  }))
} 