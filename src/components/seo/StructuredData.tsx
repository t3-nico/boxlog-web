import { generateStructuredData } from '@/lib/metadata'

/**
 * Component for rendering structured data
 */
export function StructuredData({ type, data }: { type: string; data: any }) {
  const structuredData = generateStructuredData(type, data)

  if (!structuredData) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

export default StructuredData
