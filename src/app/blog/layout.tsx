export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="prose prose-lg dark:prose-invert max-w-none [&>div]:not-prose">
        {children}
      </div>
    </div>
  )
}