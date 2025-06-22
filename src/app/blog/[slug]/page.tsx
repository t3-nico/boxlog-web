import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '../../../../lib/api'
import markdownToHtml from '../../../../lib/markdownToHtml'
import type { Metadata } from 'next'

type PageProps = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug, ['title', 'content'])

  if (!post) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    }
  }

  const description = post.content
    ? post.content.substring(0, 120)
    : 'BoxLogのブログ記事'

  return {
    title: post.title,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'content',
    'coverImage',
  ])

  if (!post || !post.title) {
    return notFound()
  }

  const content = await markdownToHtml(post.content || '')

  return (
    <main className="py-12">
      <div className="container mx-auto px-5">
        <article className="prose prose-invert lg:prose-xl mx-auto">
          <h1>{post.title}</h1>
          {post.date && (
            <div className="text-zinc-400 mb-8">
              {new Date(post.date).toLocaleDateString('ja-JP')}
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  const posts = getAllPosts(['slug'])
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
