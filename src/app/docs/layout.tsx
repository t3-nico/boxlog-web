import { Sidebar } from '@/components/docs/Sidebar'
import { TableOfContents } from '@/components/docs/TableOfContents'
import { Container } from '@/components/ui'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen pt-16 bg-white">
      <Container>
        <div className="flex">
          {/* Left Sidebar - Navigation */}
          <aside className="w-[280px] flex-shrink-0 hidden lg:block">
            <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pr-6 py-8">
              <Sidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 px-6 lg:px-8 py-8">
            <div className="max-w-4xl">
              {children}
            </div>
          </main>

          {/* Right Sidebar - Table of Contents */}
          <aside className="w-[240px] flex-shrink-0 hidden xl:block">
            <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pl-6 py-8">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </Container>

      {/* Mobile Navigation Toggle - Could be added later */}
      <div className="lg:hidden fixed bottom-4 right-4">
        {/* Mobile menu button placeholder */}
      </div>
    </div>
  )
}