'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Heading, Text } from '@/components/ui/typography'
import { PostCard } from '@/components/blog/PostCard'
import { BlogFilters, type BlogFilterState } from '@/components/blog/BlogFilters'
import { BlogPagination } from '@/components/blog/BlogPagination'
import { BlogSkeleton } from '@/components/blog/BlogSkeleton'
// import { searchBlogPosts } from '@/lib/blog' // サーバー専用関数のため削除
import type { BlogPostMeta } from '@/lib/blog'

const POSTS_PER_PAGE = 12

interface FilteredBlogClientProps {
  initialPosts: BlogPostMeta[]
  tags: string[]
}

export function FilteredBlogClient({ initialPosts, tags }: FilteredBlogClientProps) {
  const searchParams = useSearchParams()
  const [filteredAndSortedPosts, setFilteredAndSortedPosts] = useState<BlogPostMeta[]>(initialPosts)
  const [isProcessing, setIsProcessing] = useState(false)
  const [filters, setFilters] = useState<BlogFilterState>({
    selectedTags: [],
    searchQuery: '',
    sortBy: 'date',
    sortOrder: 'desc',
    tagOperator: 'OR'
  })

  const currentPage = Number(searchParams?.get('page')) || 1

  // URLパラメータから初期状態を復元
  useEffect(() => {
    const tagsParam = searchParams?.get('tags')
    const searchParam = searchParams?.get('search')
    const sortParam = searchParams?.get('sort')
    const orderParam = searchParams?.get('order')
    const operatorParam = searchParams?.get('operator')

    const initialFilters: BlogFilterState = {
      selectedTags: tagsParam ? tagsParam.split(',') : [],
      searchQuery: searchParam || '',
      sortBy: (sortParam as BlogFilterState['sortBy']) || 'date',
      sortOrder: (orderParam as BlogFilterState['sortOrder']) || 'desc',
      tagOperator: (operatorParam as BlogFilterState['tagOperator']) || 'OR'
    }

    setFilters(initialFilters)
  }, [searchParams])

  // フィルタリングとソート処理
  useEffect(() => {
    const processPosts = () => {
      setIsProcessing(true)
      try {
        let filtered = [...initialPosts]

        // 検索クエリによるフィルタリング（クライアント側実装）
        if (filters.searchQuery) {
          const searchTerm = filters.searchQuery.toLowerCase()
          filtered = filtered.filter(post => {
            const titleMatch = post.frontMatter.title.toLowerCase().includes(searchTerm)
            const descriptionMatch = post.frontMatter.description?.toLowerCase().includes(searchTerm)
            const tagMatch = post.frontMatter.tags.some(tag => 
              tag.toLowerCase().includes(searchTerm)
            )
            const categoryMatch = post.frontMatter.category.toLowerCase().includes(searchTerm)
            const excerptMatch = post.excerpt.toLowerCase().includes(searchTerm)

            return titleMatch || descriptionMatch || tagMatch || categoryMatch || excerptMatch
          })
        }

        // タグによるフィルタリング
        if (filters.selectedTags.length > 0) {
          if (filters.tagOperator === 'AND') {
            // すべてのタグが含まれる記事のみ
            filtered = filtered.filter(post =>
              filters.selectedTags.every(tag => post.frontMatter.tags?.includes(tag))
            )
          } else {
            // いずれかのタグが含まれる記事
            filtered = filtered.filter(post =>
              filters.selectedTags.some(tag => post.frontMatter.tags?.includes(tag))
            )
          }
        }

        // ソート処理
        filtered.sort((a, b) => {
          let comparison = 0

          switch (filters.sortBy) {
            case 'date':
              comparison = new Date(a.frontMatter.publishedAt).getTime() - new Date(b.frontMatter.publishedAt).getTime()
              break
            case 'popularity':
              // タグ数でポピュラリティを判定（タグが多い = より多くのトピックに関連）
              comparison = (a.frontMatter.tags?.length || 0) - (b.frontMatter.tags?.length || 0)
              break
            case 'category':
              comparison = a.frontMatter.category.localeCompare(b.frontMatter.category)
              break
          }

          return filters.sortOrder === 'asc' ? comparison : -comparison
        })

        setFilteredAndSortedPosts(filtered)
      } catch (error) {
        console.error('Failed to process posts:', error)
      } finally {
        setIsProcessing(false)
      }
    }

    processPosts()
  }, [initialPosts, filters])

  // ページネーション
  const totalPosts = filteredAndSortedPosts.length
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const currentPosts = filteredAndSortedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  const handleFiltersChange = (newFilters: BlogFilterState) => {
    setFilters(newFilters)
  }

  return (
    <>
      {/* フィルター情報 */}
      <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-6">
        <span>
          {totalPosts} article{totalPosts !== 1 ? 's' : ''} found
        </span>
        {filters.selectedTags.length > 0 && (
          <span>
            • Filtered by: {filters.selectedTags.join(', ')}
          </span>
        )}
        {filters.searchQuery && (
          <span>
            • Search: &quot;{filters.searchQuery}&quot;
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 記事一覧 */}
        <div className="lg:col-span-2">
          {isProcessing ? (
            <BlogSkeleton />
          ) : currentPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-8">
                {currentPosts.map((post, index) => (
                  <PostCard
                    key={post.slug}
                    post={post}
                    priority={currentPage === 1 && index < 3}
                    layout="horizontal"
                  />
                ))}
              </div>

              {/* ページネーション */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <BlogPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    basePath="/blog"
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-neutral-400 dark:text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <Heading as="h3" size="lg" className="mb-2">
                No Articles Found
              </Heading>
              <Text variant="muted" className="mb-4">
                Try adjusting your filters or search terms
              </Text>
              <button
                onClick={() => setFilters({
                  selectedTags: [],
                  searchQuery: '',
                  sortBy: 'date',
                  sortOrder: 'desc',
                  tagOperator: 'OR'
                })}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* サイドバー */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <BlogFilters
              tags={tags}
              onFiltersChange={handleFiltersChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}