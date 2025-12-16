import { Heading, Text } from '@/components/ui/typography'
import Link from 'next/link'
import Image from 'next/image'
import { MDXComponents } from 'mdx/types'
import { CopyCodeButton } from './CopyCodeButton'
import { generateAnchorId } from '@/lib/toc'

// カスタムコードブロックコンポーネント
function CodeBlock({ children, className, ...props }: any) {
  const language = className?.replace('language-', '') || 'text'

  return (
    <div className="relative group">
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyCodeButton code={children} />
      </div>
      <pre
        className={`hljs ${className || ''} overflow-x-auto p-4 rounded-lg bg-gray-900 dark:bg-gray-800 text-gray-100 dark:text-gray-200`}
        {...props}
      >
        <code>{children}</code>
      </pre>
    </div>
  )
}

// インラインコード
function InlineCode({ children, ...props }: any) {
  return (
    <code
      className="px-1.5 py-0.5 text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded font-mono"
      {...props}
    >
      {children}
    </code>
  )
}

// カスタムアラートボックス
function Alert({
  type = 'info',
  children,
}: {
  type?: 'info' | 'warning' | 'error' | 'success'
  children: React.ReactNode
}) {
  const styles = {
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200',
    warning:
      'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700 text-amber-800 dark:text-amber-200',
    error:
      'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200',
    success:
      'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200',
  }

  const icons = {
    info: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
    success: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  }

  return (
    <div className={`border rounded-lg p-4 my-4 ${styles[type]}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3 mt-0.5">{icons[type]}</div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

// カスタムテーブル
function Table({ children, ...props }: any) {
  return (
    <div className="overflow-x-auto my-6">
      <table
        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
        {...props}
      >
        {children}
      </table>
    </div>
  )
}

function Th({ children, ...props }: any) {
  return (
    <th
      className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
      {...props}
    >
      {children}
    </th>
  )
}

function Td({ children, ...props }: any) {
  return (
    <td
      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700"
      {...props}
    >
      {children}
    </td>
  )
}

// カスタムリンク
function CustomLink({ href, children, ...props }: any) {
  const isExternal = href?.startsWith('http')

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline"
        {...props}
      >
        {children}
        <svg
          className="inline w-3 h-3 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    )
  }

  return (
    <Link
      href={href}
      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline"
      {...props}
    >
      {children}
    </Link>
  )
}

// MDXコンポーネント定義
export const mdxComponents: MDXComponents = {
  // 見出し（アンカーID自動生成）
  h1: ({ children, id, ...props }: any) => {
    const headingText =
      typeof children === 'string' ? children : String(children)
    const anchorId = id || generateAnchorId(headingText)
    return (
      <Heading
        as="h1"
        size="4xl"
        className="mt-8 mb-6 first:mt-0"
        id={anchorId}
        {...props}
      >
        {children}
      </Heading>
    )
  },
  h2: ({ children, id, ...props }: any) => {
    const headingText =
      typeof children === 'string' ? children : String(children)
    const anchorId = id || generateAnchorId(headingText)
    return (
      <Heading
        as="h2"
        size="3xl"
        className="mt-8 mb-4"
        id={anchorId}
        {...props}
      >
        {children}
      </Heading>
    )
  },
  h3: ({ children, id, ...props }: any) => {
    const headingText =
      typeof children === 'string' ? children : String(children)
    const anchorId = id || generateAnchorId(headingText)
    return (
      <Heading
        as="h3"
        size="2xl"
        className="mt-6 mb-3"
        id={anchorId}
        {...props}
      >
        {children}
      </Heading>
    )
  },
  h4: ({ children, id, ...props }: any) => {
    const headingText =
      typeof children === 'string' ? children : String(children)
    const anchorId = id || generateAnchorId(headingText)
    return (
      <Heading as="h4" size="xl" className="mt-4 mb-2" id={anchorId} {...props}>
        {children}
      </Heading>
    )
  },
  h5: ({ children, id, ...props }: any) => {
    const headingText =
      typeof children === 'string' ? children : String(children)
    const anchorId = id || generateAnchorId(headingText)
    return (
      <Heading as="h5" size="lg" className="mt-3 mb-2" id={anchorId} {...props}>
        {children}
      </Heading>
    )
  },
  h6: ({ children, id, ...props }: any) => {
    const headingText =
      typeof children === 'string' ? children : String(children)
    const anchorId = id || generateAnchorId(headingText)
    return (
      <Heading as="h6" size="md" className="mt-2 mb-1" id={anchorId} {...props}>
        {children}
      </Heading>
    )
  },

  // 段落とテキスト
  p: ({ children, ...props }) => (
    <Text className="mb-4 leading-7" {...props}>
      {children}
    </Text>
  ),

  // リスト
  ul: ({ children, ...props }) => (
    <ul className="mb-4 space-y-2 list-disc list-inside" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-4 space-y-2 list-decimal list-inside" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </li>
  ),

  // コード
  code: ({ children, className, ...props }: any) => {
    if (className) {
      return (
        <CodeBlock className={className} {...props}>
          {children}
        </CodeBlock>
      )
    }
    return <InlineCode {...props}>{children}</InlineCode>
  },
  pre: ({ children, ...props }: any) => <div className="my-6">{children}</div>,

  // 引用
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-6 italic text-gray-600 dark:text-gray-400"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // テーブル
  table: Table,
  th: Th,
  td: Td,

  // リンク
  a: CustomLink,

  // 水平線
  hr: ({ ...props }) => (
    <hr className="my-8 border-gray-200 dark:border-gray-700" {...props} />
  ),

  // 画像
  img: ({ src, alt, title, ...props }) => (
    <div className="relative my-6 rounded-lg overflow-hidden">
      <Image
        src={src || '/placeholder.png'}
        alt={alt || ''}
        width={800}
        height={600}
        className="rounded-lg max-w-full h-auto"
        style={{ width: 'auto', height: 'auto' }}
        title={title}
      />
    </div>
  ),

  // カスタムコンポーネント
  Alert,
}
