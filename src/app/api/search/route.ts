import { NextRequest, NextResponse } from 'next/server'
import { generateSearchIndex, searchContent } from '@/lib/search'

let searchIndexInitialized = false

/**
 * 検索インデックスの初期化
 */
async function initializeSearchIndex() {
  if (!searchIndexInitialized) {
    await generateSearchIndex()
    searchIndexInitialized = true
  }
}

/**
 * 検索API
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const limit = parseInt(searchParams.get('limit') || '10')
    
    if (!query.trim()) {
      return NextResponse.json({
        results: [],
        query: '',
        total: 0
      })
    }
    
    // 検索インデックスを初期化
    await initializeSearchIndex()
    
    // 検索実行
    const results = searchContent(query, limit)
    
    return NextResponse.json({
      results,
      query,
      total: results.length
    })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * 検索インデックスの更新
 */
export async function POST() {
  try {
    await generateSearchIndex()
    searchIndexInitialized = true
    
    return NextResponse.json({
      success: true,
      message: 'Search index updated successfully'
    })
  } catch (error) {
    console.error('Search index update error:', error)
    return NextResponse.json(
      { error: 'Failed to update search index' },
      { status: 500 }
    )
  }
}