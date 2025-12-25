'use client';

import { BlogFilters, type BlogFilterState } from '@/components/blog/BlogFilters';
import { BlogPagination } from '@/components/blog/BlogPagination';
import { BlogSkeleton } from '@/components/blog/BlogSkeleton';
import { PostCard } from '@/components/blog/PostCard';
import { Button } from '@/components/ui/button';
import { PillSwitcher } from '@/components/ui/pill-switcher';
import { Heading, Text } from '@/components/ui/typography';
import type { BlogPostMeta } from '@/lib/blog';
import { Grid3X3, List, Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type ViewMode = 'list' | 'grid';

const POSTS_PER_PAGE = 12;

interface FilteredBlogClientProps {
  initialPosts: BlogPostMeta[];
  tags: string[];
  locale: string;
}

export function FilteredBlogClient({ initialPosts, tags, locale }: FilteredBlogClientProps) {
  const t = useTranslations('blog');
  const searchParams = useSearchParams();
  const [filteredAndSortedPosts, setFilteredAndSortedPosts] =
    useState<BlogPostMeta[]>(initialPosts);
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [filters, setFilters] = useState<BlogFilterState>({
    selectedTags: [],
    searchQuery: '',
    sortBy: 'date',
    sortOrder: 'desc',
    tagOperator: 'OR',
  });

  const currentPage = Number(searchParams?.get('page')) || 1;

  // URLパラメータから初期状態を復元
  useEffect(() => {
    const tagsParam = searchParams?.get('tags');
    const searchParam = searchParams?.get('search');
    const sortParam = searchParams?.get('sort');
    const orderParam = searchParams?.get('order');
    const operatorParam = searchParams?.get('operator');

    const initialFilters: BlogFilterState = {
      selectedTags: tagsParam ? tagsParam.split(',') : [],
      searchQuery: searchParam || '',
      sortBy: (sortParam as BlogFilterState['sortBy']) || 'date',
      sortOrder: (orderParam as BlogFilterState['sortOrder']) || 'desc',
      tagOperator: (operatorParam as BlogFilterState['tagOperator']) || 'OR',
    };

    setFilters(initialFilters);
  }, [searchParams]);

  // フィルタリングとソート処理
  useEffect(() => {
    const processPosts = () => {
      setIsProcessing(true);
      try {
        let filtered = [...initialPosts];

        // 検索クエリによるフィルタリング（クライアント側実装）
        if (filters.searchQuery) {
          const searchTerm = filters.searchQuery.toLowerCase();
          filtered = filtered.filter((post) => {
            const titleMatch = post.frontMatter.title.toLowerCase().includes(searchTerm);
            const descriptionMatch = post.frontMatter.description
              ?.toLowerCase()
              .includes(searchTerm);
            const tagMatch = post.frontMatter.tags.some((tag) =>
              tag.toLowerCase().includes(searchTerm),
            );
            const categoryMatch = post.frontMatter.category.toLowerCase().includes(searchTerm);
            const excerptMatch = post.excerpt.toLowerCase().includes(searchTerm);

            return titleMatch || descriptionMatch || tagMatch || categoryMatch || excerptMatch;
          });
        }

        // タグによるフィルタリング
        if (filters.selectedTags.length > 0) {
          if (filters.tagOperator === 'AND') {
            // すべてのタグが含まれる記事のみ
            filtered = filtered.filter((post) =>
              filters.selectedTags.every((tag) => post.frontMatter.tags?.includes(tag)),
            );
          } else {
            // いずれかのタグが含まれる記事
            filtered = filtered.filter((post) =>
              filters.selectedTags.some((tag) => post.frontMatter.tags?.includes(tag)),
            );
          }
        }

        // ソート処理
        filtered.sort((a, b) => {
          let comparison = 0;

          switch (filters.sortBy) {
            case 'date':
              comparison =
                new Date(a.frontMatter.publishedAt).getTime() -
                new Date(b.frontMatter.publishedAt).getTime();
              break;
            case 'popularity':
              // タグ数でポピュラリティを判定（タグが多い = より多くのトピックに関連）
              comparison = (a.frontMatter.tags?.length || 0) - (b.frontMatter.tags?.length || 0);
              break;
            case 'category':
              comparison = a.frontMatter.category.localeCompare(b.frontMatter.category);
              break;
          }

          return filters.sortOrder === 'asc' ? comparison : -comparison;
        });

        setFilteredAndSortedPosts(filtered);
      } catch {
        // 処理失敗時は空配列のまま
      } finally {
        setIsProcessing(false);
      }
    };

    processPosts();
  }, [initialPosts, filters]);

  // ページネーション
  const totalPosts = filteredAndSortedPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredAndSortedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleFiltersChange = (newFilters: BlogFilterState) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
        {/* 左サイドバー: フィルター */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <BlogFilters tags={tags} onFiltersChange={handleFiltersChange} locale={locale} />
          </div>
        </div>

        {/* 右側: 記事一覧 */}
        <div className="lg:col-span-3">
          {/* 検索ボックス + ビュー切り替え */}
          <div className="mb-8 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={t('filters.searchPlaceholder')}
                className="border-border bg-input text-foreground placeholder:text-muted-foreground focus:ring-ring h-10 w-full rounded-lg border pr-10 pl-10 transition-colors focus:ring-2 focus:outline-none"
              />
              {filters.searchQuery && (
                <Button
                  onClick={() => handleSearchChange('')}
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-2 h-7 w-7 -translate-y-1/2"
                  aria-label={t('filters.clearSearch')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <PillSwitcher
              options={[
                { value: 'list', label: t('view.list'), icon: <List className="h-4 w-4" /> },
                { value: 'grid', label: t('view.grid'), icon: <Grid3X3 className="h-4 w-4" /> },
              ]}
              value={viewMode}
              onValueChange={setViewMode}
            />
          </div>

          {isProcessing ? (
            <BlogSkeleton />
          ) : currentPosts.length > 0 ? (
            <>
              {viewMode === 'list' ? (
                <div className="divide-border divide-y">
                  {currentPosts.map((post, index) => (
                    <PostCard
                      key={post.slug}
                      post={post}
                      priority={currentPage === 1 && index < 3}
                      layout="list"
                      locale={locale}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {currentPosts.map((post, index) => (
                    <PostCard
                      key={post.slug}
                      post={post}
                      priority={currentPage === 1 && index < 3}
                      layout="vertical"
                      locale={locale}
                    />
                  ))}
                </div>
              )}

              {/* ページネーション */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <BlogPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    basePath={locale === 'ja' ? '/ja/blog' : '/blog'}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="py-16 text-center">
              <div className="bg-muted mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full">
                <svg
                  className="text-muted-foreground h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <Heading as="h3" size="lg" className="mb-2">
                {t('list.noArticles')}
              </Heading>
              <Text variant="muted" className="mb-4">
                {t('list.noArticlesHint')}
              </Text>
              <button
                onClick={() =>
                  setFilters({
                    selectedTags: [],
                    searchQuery: '',
                    sortBy: 'date',
                    sortOrder: 'desc',
                    tagOperator: 'OR',
                  })
                }
                className="bg-primary/10 text-primary hover:bg-state-hover inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              >
                {t('list.clearAllFilters')}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
