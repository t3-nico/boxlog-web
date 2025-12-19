import { ClientSidebar } from '@/components/docs/ClientSidebar'
import { Container } from '@/components/ui/container'
import { generateDocsNavigation } from '@/lib/navigation'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  // サーバーサイドで動的にナビゲーションを生成
  const navigation = generateDocsNavigation()
  return (
    <div className="bg-background min-h-screen pt-16">
      <Container>
        <div className="flex">
          {/* Left Sidebar - Navigation */}
          <aside className="hidden w-[280px] flex-shrink-0 lg:block">
            <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto py-8 pr-6">
              <ClientSidebar navigation={navigation} />
            </div>
          </aside>

          {/* Main Content - Table of Contents moved to page level */}
          <main className="min-w-0 flex-1 px-6 py-8 lg:px-8">{children}</main>
        </div>
      </Container>

      {/* Mobile Navigation Toggle - Could be added later */}
      <div className="fixed right-4 bottom-4 lg:hidden">{/* Mobile menu button placeholder */}</div>
    </div>
  )
}
