import { Heading, Text } from '@/components/ui/typography'
import { generateAnchorId } from '@/lib/toc'
import { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { CopyCodeButton } from './CopyCodeButton'

type CodeBlockProps = ComponentPropsWithoutRef<'pre'> & {
  children?: ReactNode
  className?: string
}

type InlineCodeProps = ComponentPropsWithoutRef<'code'> & {
  children?: ReactNode
}

type TableProps = ComponentPropsWithoutRef<'table'> & {
  children?: ReactNode
}

type ThProps = ComponentPropsWithoutRef<'th'> & {
  children?: ReactNode
}

type TdProps = ComponentPropsWithoutRef<'td'> & {
  children?: ReactNode
}

type CustomLinkProps = ComponentPropsWithoutRef<'a'> & {
  href?: string
  children?: ReactNode
}

type HeadingComponentProps = ComponentPropsWithoutRef<'h1'> & {
  children?: ReactNode
  id?: string
}

type CodeComponentProps = ComponentPropsWithoutRef<'code'> & {
  children?: ReactNode
  className?: string
}

type PreComponentProps = ComponentPropsWithoutRef<'pre'> & {
  children?: ReactNode
}

// カスタムコードブロックコンポーネント
function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const codeString = typeof children === 'string' ? children : String(children ?? '')
  return (
    <div className="group relative">
      <div className="absolute top-3 right-3 opacity-0 transition-opacity group-hover:opacity-100">
        <CopyCodeButton code={codeString} />
      </div>
      <pre
        className={`hljs ${className || ''} overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100 dark:bg-gray-800 dark:text-gray-200`}
        {...props}
      >
        <code>{children}</code>
      </pre>
    </div>
  )
}

// インラインコード
function InlineCode({ children, ...props }: InlineCodeProps) {
  return (
    <code
      className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200"
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
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200',
    success:
      'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200',
  }

  const icons = {
    info: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
    warning: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    error: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
    success: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  }

  return (
    <div className={`my-4 rounded-lg border p-4 ${styles[type]}`}>
      <div className="flex items-start">
        <div className="mt-0.5 mr-3 flex-shrink-0">{icons[type]}</div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

// カスタムテーブル
function Table({ children, ...props }: TableProps) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props}>
        {children}
      </table>
    </div>
  )
}

function Th({ children, ...props }: ThProps) {
  return (
    <th
      className="bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:bg-gray-800 dark:text-gray-400"
      {...props}
    >
      {children}
    </th>
  )
}

function Td({ children, ...props }: TdProps) {
  return (
    <td
      className="border-b border-gray-200 px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:border-gray-700 dark:text-gray-100"
      {...props}
    >
      {children}
    </td>
  )
}

// カスタムリンク
function CustomLink({ href, children, ...props }: CustomLinkProps) {
  const isExternal = href?.startsWith('http')

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        {...props}
      >
        {children}
        <svg className="ml-1 inline h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      href={href || '#'}
      className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      {...props}
    >
      {children}
    </Link>
  )
}

// MDXコンポーネント定義
export const mdxComponents: MDXComponents = {
  // 見出し（アンカーID自動生成）
  h1: ({ children, id, ...props }: HeadingComponentProps) => {
    const headingText = typeof children === 'string' ? children : String(children)
    const anchorId = id || generateAnchorId(headingText)
    return (
      <Heading as="h1" size="4xl" className="mt-8 mb-6 first:mt-0" id={anchorId} {...props}>
        {children}
      </Heading>
    )
  },
  h2: ({ children, id, ...props }: HeadingComponentProps) => {
    const headingText = typeof children === 'string' ? children : String(children)
    const anchorId = id || generateAnchorId(headingText)
    return (
      <Heading as="h2" size="3xl" className="mt-8 mb-4" id={anchorId} {...props}>
        {children}
      </Heading>
    )
  },
  h3: ({ children, id, ...props }: HeadingComponentProps) => {
    const headingText = typeof children === 'string' ? children : String(children)
    const anchorId = id || generateAnchorId(headingText)
    return (
      <Heading as="h3" size="2xl" className="mt-6 mb-3" id={anchorId} {...props}>
        {children}
      </Heading>
    )
  },
  h4: ({ children, id, ...props }: HeadingComponentProps) => {
    const headingText = typeof children === 'string' ? children : String(children)
    const anchorId = id || generateAnchorId(headingText)
    return (
      <Heading as="h4" size="xl" className="mt-4 mb-2" id={anchorId} {...props}>
        {children}
      </Heading>
    )
  },
  h5: ({ children, id, ...props }: HeadingComponentProps) => {
    const headingText = typeof children === 'string' ? children : String(children)
    const anchorId = id || generateAnchorId(headingText)
    return (
      <Heading as="h5" size="lg" className="mt-3 mb-2" id={anchorId} {...props}>
        {children}
      </Heading>
    )
  },
  h6: ({ children, id, ...props }: HeadingComponentProps) => {
    const headingText = typeof children === 'string' ? children : String(children)
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
    <ul className="mb-4 list-inside list-disc space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-4 list-inside list-decimal space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </li>
  ),

  // コード
  code: ({ children, className }: CodeComponentProps) => {
    if (className) {
      return <CodeBlock className={className}>{children}</CodeBlock>
    }
    return <InlineCode>{children}</InlineCode>
  },
  pre: ({ children }: PreComponentProps) => <div className="my-6">{children}</div>,

  // 引用
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-6 border-l-4 border-gray-300 pl-4 text-gray-600 italic dark:border-gray-600 dark:text-gray-400"
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
  hr: ({ ...props }) => <hr className="my-8 border-gray-200 dark:border-gray-700" {...props} />,

  // 画像
  img: ({ src, alt, title }) => (
    <div className="relative my-6 overflow-hidden rounded-lg">
      <Image
        src={src || '/placeholder.png'}
        alt={alt || ''}
        width={800}
        height={600}
        className="h-auto max-w-full rounded-lg"
        style={{ width: 'auto', height: 'auto' }}
        title={title}
      />
    </div>
  ),

  // カスタムコンポーネント
  Alert,
}
