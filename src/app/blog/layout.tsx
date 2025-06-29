import { ArticleLayout } from '@/components/ArticleLayout'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <ArticleLayout showPattern={false}>{children}</ArticleLayout>
}
