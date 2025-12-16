import { NextResponse } from 'next/server'
import { getAllTags } from '@/lib/tags-server'

export async function GET() {
  try {
    const tags = await getAllTags()
    return NextResponse.json(tags)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 })
  }
}
