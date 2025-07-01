import { getAllContent, getMDXContentForRSC } from '@/lib/mdx'

export default async function DebugPage() {
  console.log('Debug page rendering...')
  
  try {
    // すべてのコンテンツを取得してテスト
    const allContent = await getAllContent()
    console.log('All content:', allContent)
    
    // 特定のページをテスト
    const testContent = await getMDXContentForRSC('getting-started/introduction')
    console.log('Test content:', testContent)
    
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Debug Page</h1>
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">All Content ({allContent.length} items)</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(allContent.map(c => ({ 
              slug: c.slug, 
              title: c.frontMatter.title,
              tags: c.frontMatter.tags 
            })), null, 2)}
          </pre>
        </div>
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Test Content</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(testContent ? {
              title: testContent.frontMatter.title,
              tags: testContent.frontMatter.tags,
              author: testContent.frontMatter.author,
              hasContent: !!testContent.content
            } : 'null', null, 2)}
          </pre>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Debug error:', error)
    
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Debug Error</h1>
        <pre className="bg-red-100 p-4 rounded text-sm">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      </div>
    )
  }
}