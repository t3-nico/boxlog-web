import { ClientSidebar } from '@/components/docs/ClientSidebar'
import { Container } from '@/components/ui/container'
import { generateDocsNavigation } from '@/lib/navigation'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // サーバーサイドで動的にナビゲーションを生成
  const navigation = generateDocsNavigation()
  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-900">
      <Container>
        <div className="flex">
          {/* Left Sidebar - Navigation */}
          <aside className="w-[280px] flex-shrink-0 hidden lg:block">
            <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pr-6 py-8">
              <ClientSidebar navigation={navigation} />
            </div>
          </aside>

          {/* Main Content - Table of Contents moved to page level */}
          <main className="flex-1 min-w-0 px-6 lg:px-8 py-8">{children}</main>
        </div>
      </Container>

      {/* Mobile Navigation Toggle - Could be added later */}
      <div className="lg:hidden fixed bottom-4 right-4">
        {/* Mobile menu button placeholder */}
      </div>
    </div>
  )
}
