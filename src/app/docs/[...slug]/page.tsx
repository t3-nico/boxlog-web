import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { 
  getAllContent, 
  getMDXContentForRSC, 
  getRelatedContent 
} from '@/lib/mdx'
import { mdxComponents } from '@/components/docs/MDXComponents'
import { Breadcrumbs } from '@/components/docs/Breadcrumbs'
import { PageNavigation } from '@/components/docs/PageNavigation'
import { ClientTableOfContents } from '@/components/docs/ClientTableOfContents'
import { Heading, Text } from '@/components/ui'
import { ContentData } from '@/types/content'

interface PageParams {
  slug: string[]
}

interface DocPageProps {
  params: PageParams
}

// 静的パラメータ生成（SEO最適化）
export async function generateStaticParams(): Promise<PageParams[]> {
  try {
    const allContent = await getAllContent()
    
    return allContent.map((content) => ({
      slug: content.slug.split('/')
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// メタデータ生成
export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  try {
    const slug = params.slug.join('/')
    const category = params.slug[0] as any
    const contentSlug = params.slug.slice(1).join('/')
    
    const content = await getMDXContentForRSC(`${category}/${contentSlug}`)
    
    if (!content) {
      return {
        title: 'Page Not Found - YourSaaS Documentation',
        description: 'The requested documentation page could not be found.'
      }
    }

    const { frontMatter } = content
    
    return {
      title: `${frontMatter.title} - YourSaaS Documentation`,
      description: frontMatter.description,
      keywords: frontMatter.tags?.join(', '),
      authors: frontMatter.author ? [{ name: frontMatter.author }] : undefined,
      openGraph: {
        title: frontMatter.title,
        description: frontMatter.description,
        type: 'article',
        publishedTime: frontMatter.publishedAt,
        modifiedTime: frontMatter.updatedAt,
        tags: frontMatter.tags,
        authors: frontMatter.author ? [frontMatter.author] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: frontMatter.title,
        description: frontMatter.description,
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Documentation - YourSaaS',
      description: 'YourSaaS documentation and guides'
    }
  }
}

// 前後ページを取得
async function getAdjacentPages(slug: string): Promise<{
  previousPage?: ContentData
  nextPage?: ContentData
}> {
  try {
    const allContent = await getAllContent()
    const currentIndex = allContent.findIndex(content => content.slug === slug)
    
    if (currentIndex === -1) {
      return {}
    }
    
    return {
      previousPage: currentIndex > 0 ? allContent[currentIndex - 1] : undefined,
      nextPage: currentIndex < allContent.length - 1 ? allContent[currentIndex + 1] : undefined
    }
  } catch (error) {
    console.error('Error getting adjacent pages:', error)
    return {}
  }
}

// メインページコンポーネント
export default async function DocPage({ params }: DocPageProps) {
  try {
    const slug = params.slug.join('/')
    const category = params.slug[0] as any
    const contentSlug = params.slug.slice(1).join('/')
    
    
    // MDXコンテンツを取得
    let content;
    
    // まず完全なslugで試す
    content = await getMDXContentForRSC(slug)
    
    // 見つからない場合、他のパターンを試す
    if (!content && contentSlug) {
      // カテゴリ/ファイル形式
      content = await getMDXContentForRSC(`${category}/${contentSlug}`)
    }
    
    if (!content && !contentSlug) {
      // 単一ファイル形式
      content = await getMDXContentForRSC(category)
    }
    
    
    if (!content) {
      console.log('Content not found, calling notFound()')
      notFound()
    }

    const { content: mdxContent, frontMatter } = content
    
    // 前後ページを取得
    const { previousPage, nextPage } = await getAdjacentPages(slug)
    
    // 関連コンテンツを取得
    const relatedContent = await getRelatedContent(
      frontMatter.category, 
      slug, 
      3
    )

    return (
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 max-w-4xl">
          {/* パンくずナビゲーション */}
          <Breadcrumbs slug={slug} title={frontMatter.title} />
          
          {/* MDXコンテンツ */}
          <article className="prose prose-gray max-w-none">
            <MDXRemote 
              source={mdxContent} 
              components={mdxComponents}
            />
          </article>

          {/* 関連コンテンツ */}
          {relatedContent.length > 0 && (
            <aside className="mt-12 pt-8 border-t border-gray-200">
              <Heading as="h2" size="xl" className="mb-6">
                Related Articles
              </Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedContent.map((related) => (
                  <a
                    key={related.slug}
                    href={`/docs/${related.slug}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <Heading as="h3" size="lg" className="mb-2">
                      {related.frontMatter.title}
                    </Heading>
                    <Text size="sm" variant="muted" className="line-clamp-2">
                      {related.frontMatter.description}
                    </Text>
                    <div className="flex items-center gap-2 mt-3">
                      {related.frontMatter.tags?.slice(0, 2).map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </aside>
          )}

          {/* 前後ページナビゲーション */}
          <PageNavigation 
            previousPage={previousPage}
            nextPage={nextPage}
          />
        </div>

        {/* Right Sidebar - Table of Contents */}
        <aside className="w-[240px] flex-shrink-0 hidden xl:block">
          <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pl-6">
            <ClientTableOfContents content={mdxContent} />
          </div>
        </aside>
      </div>
    )
  } catch (error) {
    console.error('Error rendering doc page:', error)
    
    // エラーページ
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heading as="h1" size="3xl" className="mb-4">
            Something went wrong
          </Heading>
          <Text variant="muted" className="mb-6">
            We encountered an error while loading this page.
          </Text>
          <a 
            href="/docs"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Documentation
          </a>
        </div>
      </div>
    )
  }
}