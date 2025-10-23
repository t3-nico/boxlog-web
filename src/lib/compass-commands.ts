export interface CompassDoc {
  id: string
  title: string
  path: string
  content: string
  category: string
}

export async function getCompassDocs(query?: string): Promise<CompassDoc[]> {
  try {
    const url = new URL('/api/compass-docs', window.location.origin)
    if (query) {
      url.searchParams.set('q', query)
    }

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch compass docs: ${response.statusText}`)
    }

    const data = await response.json()
    return data.docs || []
  } catch (error) {
    console.error('Failed to load compass docs:', error)
    return []
  }
}

export function searchCompassDocs(docs: CompassDoc[], query: string): CompassDoc[] {
  const lowercaseQuery = query.toLowerCase()
  
  return docs.filter(doc => 
    doc.title.toLowerCase().includes(lowercaseQuery) ||
    doc.content.toLowerCase().includes(lowercaseQuery) ||
    doc.path.toLowerCase().includes(lowercaseQuery)
  ).sort((a, b) => {
    // タイトルマッチを優先
    const aInTitle = a.title.toLowerCase().includes(lowercaseQuery)
    const bInTitle = b.title.toLowerCase().includes(lowercaseQuery)
    
    if (aInTitle && !bInTitle) return -1
    if (!aInTitle && bInTitle) return 1
    
    // アルファベット順
    return a.title.localeCompare(b.title)
  })
}