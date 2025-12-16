import { Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getDictionary } from '@/lib/i18n'
import { generateSEOMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'

interface PageProps {
  params: {
    locale: string
  }
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'jp' }]
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params
  const dict = await getDictionary(locale as 'en' | 'jp')

  return generateSEOMetadata({
    title: dict.pages.docs.title,
    description: dict.pages.docs.subtitle,
    url: `/${locale}/docs`,
    locale: locale,
    keywords:
      locale === 'jp'
        ? ['ドキュメント', 'API', 'ガイド', 'チュートリアル', 'SaaS', '開発']
        : [
            'documentation',
            'API',
            'guides',
            'tutorials',
            'SaaS',
            'development',
          ],
    type: 'website',
  })
}

export default async function DocsPage({ params }: PageProps) {
  const { locale } = params
  const dict = await getDictionary(locale as 'en' | 'jp')
  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="space-y-4">
        <Heading
          as="h1"
          size="4xl"
          className="text-gray-900 dark:text-gray-100"
        >
          {dict.pages.docs.title}
        </Heading>
        <Text size="xl" variant="muted" className="max-w-3xl">
          {dict.pages.docs.subtitle}
        </Text>
      </div>

      {/* Quick Start Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-600 transition-colors bg-white dark:bg-gray-800">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <Heading as="h3" size="lg">
              {dict.pages.docs.quickStart.title}
            </Heading>
          </div>
          <Text variant="muted" className="mb-4">
            {dict.pages.docs.quickStart.description}
          </Text>
          <Link
            href={`/${locale}/docs/quick-start`}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            {dict.pages.docs.quickStart.link}
          </Link>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-600 transition-colors bg-white dark:bg-gray-800">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <Heading as="h3" size="lg">
              {dict.pages.docs.apiReference.title}
            </Heading>
          </div>
          <Text variant="muted" className="mb-4">
            {dict.pages.docs.apiReference.description}
          </Text>
          <Link
            href={`/${locale}/docs/api`}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            {dict.pages.docs.apiReference.link}
          </Link>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-600 transition-colors bg-white dark:bg-gray-800">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <Heading as="h3" size="lg">
              {dict.pages.docs.guides.title}
            </Heading>
          </div>
          <Text variant="muted" className="mb-4">
            {dict.pages.docs.guides.description}
          </Text>
          <Link
            href={`/${locale}/docs/guides`}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            {dict.pages.docs.guides.link}
          </Link>
        </div>
      </div>

      {/* Popular Topics */}
      <div className="space-y-6">
        <Heading
          as="h2"
          size="2xl"
          className="text-gray-900 dark:text-gray-100"
        >
          {dict.pages.docs.popularTopics.title}
        </Heading>

        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <Link
              href={`/${locale}/docs/authentication`}
              className="block hover:bg-gray-50 dark:hover:bg-gray-800 -ml-4 -mr-4 pl-4 pr-4 py-2 rounded"
            >
              <Heading
                as="h3"
                size="lg"
                className="text-gray-900 dark:text-gray-100 mb-1"
              >
                {dict.pages.docs.popularTopics.authentication.title}
              </Heading>
              <Text variant="muted">
                {dict.pages.docs.popularTopics.authentication.description}
              </Text>
            </Link>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <Link
              href={`/${locale}/docs/integrations`}
              className="block hover:bg-gray-50 dark:hover:bg-gray-800 -ml-4 -mr-4 pl-4 pr-4 py-2 rounded"
            >
              <Heading
                as="h3"
                size="lg"
                className="text-gray-900 dark:text-gray-100 mb-1"
              >
                {dict.pages.docs.popularTopics.integrations.title}
              </Heading>
              <Text variant="muted">
                {dict.pages.docs.popularTopics.integrations.description}
              </Text>
            </Link>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <Link
              href={`/${locale}/docs/webhooks`}
              className="block hover:bg-gray-50 dark:hover:bg-gray-800 -ml-4 -mr-4 pl-4 pr-4 py-2 rounded"
            >
              <Heading
                as="h3"
                size="lg"
                className="text-gray-900 dark:text-gray-100 mb-1"
              >
                {dict.pages.docs.popularTopics.webhooks.title}
              </Heading>
              <Text variant="muted">
                {dict.pages.docs.popularTopics.webhooks.description}
              </Text>
            </Link>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
        <Heading
          as="h2"
          size="xl"
          className="text-gray-900 dark:text-gray-100 mb-4"
        >
          {dict.pages.docs.help.title}
        </Heading>
        <Text variant="muted" className="mb-6 max-w-2xl mx-auto">
          {dict.pages.docs.help.description}
        </Text>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link href={`/${locale}/docs/faq`}>
              {dict.pages.docs.help.faqButton}
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/${locale}/docs/support`}>
              {dict.pages.docs.help.supportButton}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
