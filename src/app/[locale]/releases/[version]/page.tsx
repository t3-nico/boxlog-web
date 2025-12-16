import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { ReleaseHeader } from '@/components/releases/ReleaseHeader'
import { ChangeTypeSection } from '@/components/releases/ChangeTypeList'
import { ReleaseCard } from '@/components/releases/ReleaseCard'
import { getRelease, getAllReleaseMetas, getRelatedReleases, changeTypes } from '@/lib/releases'

interface ReleasePageProps {
  params: {
    locale: string
    version: string
  }
}

// Generate metadata
export async function generateMetadata({ params }: ReleasePageProps): Promise<Metadata> {
  const release = await getRelease(params.version)
  
  if (!release) {
    return {
      title: 'Release not found',
    }
  }

  const { frontMatter } = release
  const releaseDate = new Date(frontMatter.date).toISOString()

  return {
    title: `${frontMatter.title} - v${frontMatter.version}`,
    description: frontMatter.description,
    keywords: frontMatter.tags.join(', '),
    authors: frontMatter.author ? [{ name: frontMatter.author }] : undefined,
    openGraph: {
      title: `${frontMatter.title} - v${frontMatter.version}`,
      description: frontMatter.description,
      type: 'article',
      publishedTime: releaseDate,
      authors: frontMatter.author ? [frontMatter.author] : undefined,
      tags: frontMatter.tags,
      images: frontMatter.coverImage ? [
        {
          url: frontMatter.coverImage,
          width: 1200,
          height: 630,
          alt: frontMatter.title,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${frontMatter.title} - v${frontMatter.version}`,
      description: frontMatter.description,
      images: frontMatter.coverImage ? [frontMatter.coverImage] : undefined,
    },
    alternates: {
      canonical: `/releases/${params.version}`,
    }
  }
}

// Generate static paths
export async function generateStaticParams() {
  const releases = await getAllReleaseMetas()
  const locales = ['en', 'jp']
  const params = []
  
  for (const locale of locales) {
    for (const release of releases) {
      params.push({ locale, version: release.frontMatter.version })
    }
  }
  
  return params
}

// MDX Components
const mdxComponents = {
  h1: (props: any) => (
    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4 first:mt-0" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-6 mb-3" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3" {...props} />
  ),
  p: (props: any) => (
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4" {...props} />
  ),
  a: (props: any) => (
    <a 
      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-2" 
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props} 
    />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2 my-6 bg-blue-50 dark:bg-blue-900 text-gray-700 dark:text-gray-300 italic rounded-r-lg" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto my-6 text-sm" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300" {...props} />
  ),
  li: (props: any) => (
    <li className="leading-relaxed" {...props} />
  ),
  img: (props: any) => (
    <Image
      className="rounded-lg shadow-lg my-6 max-w-full h-auto"
      width={800}
      height={600}
      loading="lazy"
      alt={props.alt || 'Release image'}
      {...props}
    />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />
  ),
  td: (props: any) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-t border-gray-200" {...props} />
  ),

  // Release notes specific components
  ChangeLog: ({ type, children }: { type: string, children: React.ReactNode }) => {
    const changeType = changeTypes.find(ct => ct.id === type)
    if (!changeType) return <div>{children}</div>

    return (
      <div className={`border-l-4 p-4 my-6 rounded-r-lg ${changeType.color.replace('text-', 'border-').replace('bg-', 'bg-').replace('border-', 'border-l-')}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg" role="img" aria-label={changeType.label}>
            {changeType.icon}
          </span>
          <h4 className="font-semibold">{changeType.label}</h4>
        </div>
        <div className="prose prose-sm max-w-none">{children}</div>
      </div>
    )
  },

  // Warning component
  Warning: ({ children }: { children: React.ReactNode }) => (
    <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 my-6">
      <div className="flex items-start">
        <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L5.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <div className="prose prose-sm max-w-none text-yellow-800 dark:text-yellow-200">{children}</div>
      </div>
    </div>
  ),

  // Info component
  Info: ({ children }: { children: React.ReactNode }) => (
    <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4 my-6">
      <div className="flex items-start">
        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="prose prose-sm max-w-none text-blue-800 dark:text-blue-200">{children}</div>
      </div>
    </div>
  ),

  // Migration guide
  Migration: ({ children }: { children: React.ReactNode }) => (
    <div className="bg-purple-50 dark:bg-purple-900 border border-purple-200 dark:border-purple-700 rounded-lg p-4 my-6">
      <div className="flex items-start">
        <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        <div>
          <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Migration Information</h4>
          <div className="prose prose-sm max-w-none text-purple-700 dark:text-purple-300">{children}</div>
        </div>
      </div>
    </div>
  ),
}

export default async function ReleaseDetailPage({ params }: ReleasePageProps) {
  const { locale, version } = params
  const release = await getRelease(version)
  
  if (!release) {
    notFound()
  }

  const relatedReleases = await getRelatedReleases(version, 3)

  // Structured data (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'YourSaaS Platform',
    applicationCategory: 'BusinessApplication',
    releaseNotes: {
      '@type': 'TechArticle',
      headline: release.frontMatter.title,
      description: release.frontMatter.description,
      author: {
        '@type': 'Person',
        name: release.frontMatter.author || 'YourSaaS Team',
      },
      datePublished: release.frontMatter.date,
      keywords: release.frontMatter.tags.join(', '),
      about: {
        '@type': 'SoftwareApplication',
        name: 'YourSaaS Platform',
        softwareVersion: release.frontMatter.version,
      },
    },
  }

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen">
        {/* Release header */}
        <ReleaseHeader frontMatter={release.frontMatter} version={params.version} />

        {/* Cover image */}
        {release.frontMatter.coverImage && (
          <section className="py-8 bg-gray-50 dark:bg-gray-800">
            <Container>
              <div className="max-w-4xl mx-auto">
                <Image
                  src={release.frontMatter.coverImage}
                  alt={release.frontMatter.title}
                  width={1200}
                  height={630}
                  className="w-full h-auto rounded-xl shadow-lg"
                  priority
                />
              </div>
            </Container>
          </section>
        )}

        {/* Release content */}
        <article id="changes" className="py-16 bg-white dark:bg-gray-900">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <MDXRemote 
                  source={release.content} 
                  components={mdxComponents}
                />
              </div>

              {/* Release end marker */}
              <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Release information footer */}
              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      This release takes approximately <strong>{release.readingTime} minutes</strong> to read
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Release date: {new Date(release.frontMatter.date).toLocaleDateString('en-US')}
                      {release.frontMatter.author && (
                        <span className="ml-4">
                          Release manager: {release.frontMatter.author}
                        </span>
                      )}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Link
                      href="/releases"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                    >
                      View all releases
                    </Link>
                    
                    <a
                      href={`https://github.com/yoursaas/platform/releases/tag/v${release.frontMatter.version}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:text-gray-800 font-medium"
                    >
                      View on GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </article>

        {/* Related releases */}
        {relatedReleases.length > 0 && (
          <section className="py-16 bg-gray-50">
            <Container>
              <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Related Releases
                  </h2>
                  <p className="text-gray-600">
                    Other updates related to this release
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedReleases.map((relatedRelease) => (
                    <ReleaseCard 
                      key={relatedRelease.frontMatter.version}
                      release={relatedRelease}
                      compact={true}
                    />
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Link
                    href="/releases"
                    className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    View all releases
                  </Link>
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* Feedback & Support */}
        <section className="py-16 bg-blue-50 border-t border-blue-100">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Share Your Feedback
              </h2>
              <p className="text-gray-600 mb-8">
                If you have any questions or feedback about this new feature, please feel free to share it with us.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:support@yoursaas.com"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Support
                </a>
                
                <Link
                  href="/feedback"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Send Feedback
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}