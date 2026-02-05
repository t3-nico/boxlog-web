'use client';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PillSwitcher } from '@/components/ui/pill-switcher';
import { Heading, Text } from '@/components/ui/typography';
import { Grid3X3, List, Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ReleaseCard } from './ReleaseCard';
import { ReleaseFilter } from './ReleaseFilter';
import { ReleasePagination } from './ReleasePagination';

// Define types locally to avoid importing from server-only lib
interface ReleaseFrontMatter {
  version: string;
  date: string;
  title: string;
  description: string;
  tags: string[];
  breaking: boolean;
  featured: boolean;
  prerelease?: boolean;
  author?: string;
  authorAvatar?: string;
  coverImage?: string;
}

interface ReleasePostMeta {
  frontMatter: ReleaseFrontMatter;
  slug: string;
  content: string;
  readingTime: number;
}

interface TagCount {
  tag: string;
  count: number;
}

type ViewMode = 'list' | 'grid';

const RELEASES_PER_PAGE = 12;

interface ReleasesClientProps {
  initialReleases: ReleasePostMeta[];
  initialTags: TagCount[];
  locale: string;
}

export function ReleasesClient({ initialReleases, initialTags, locale }: ReleasesClientProps) {
  const t = useTranslations('releases');
  const searchParams = useSearchParams();

  // フィルター状態
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const currentPage = Number(searchParams?.get('page')) || 1;

  // フィルター関数
  const filteredReleases = useMemo(() => {
    return initialReleases.filter((release) => {
      // 検索クエリフィルター
      if (searchQuery) {
        const searchTerm = searchQuery.toLowerCase();
        const titleMatch = release.frontMatter.title.toLowerCase().includes(searchTerm);
        const descriptionMatch = release.frontMatter.description
          ?.toLowerCase()
          .includes(searchTerm);
        const versionMatch = release.frontMatter.version.toLowerCase().includes(searchTerm);
        const tagMatch = release.frontMatter.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm),
        );

        if (!titleMatch && !descriptionMatch && !versionMatch && !tagMatch) {
          return false;
        }
      }

      // タグフィルター
      if (
        selectedTags.length > 0 &&
        !selectedTags.some((tag) => release.frontMatter.tags.includes(tag))
      ) {
        return false;
      }

      return true;
    });
  }, [initialReleases, selectedTags, searchQuery]);

  // ページネーション
  const totalReleases = filteredReleases.length;
  const totalPages = Math.ceil(totalReleases / RELEASES_PER_PAGE);
  const startIndex = (currentPage - 1) * RELEASES_PER_PAGE;
  const currentReleases = filteredReleases.slice(startIndex, startIndex + RELEASES_PER_PAGE);

  // フィルターハンドラー
  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setSearchQuery('');
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <section className="py-16">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* 左サイドバー: フィルター */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ReleaseFilter
                tags={initialTags}
                selectedTags={selectedTags}
                onTagToggle={handleTagToggle}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          {/* 右側: リリース一覧 */}
          <div className="lg:col-span-3">
            {/* 検索ボックス + ビュー切り替え */}
            <div className="mb-8 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder={t('filters.searchPlaceholder')}
                  className="border-border bg-input text-foreground placeholder:text-muted-foreground focus:ring-ring h-10 w-full rounded-lg border pr-12 pl-12 transition-colors focus:ring-2 focus:outline-none"
                />
                {searchQuery && (
                  <Button
                    onClick={() => handleSearchChange('')}
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                    aria-label={t('filters.clearSearch')}
                  >
                    <X className="size-4" />
                  </Button>
                )}
              </div>

              <PillSwitcher
                options={[
                  { value: 'list', label: t('view.list'), icon: <List className="size-4" /> },
                  { value: 'grid', label: t('view.grid'), icon: <Grid3X3 className="size-4" /> },
                ]}
                value={viewMode}
                onValueChange={setViewMode}
              />
            </div>

            {currentReleases.length > 0 ? (
              <>
                {viewMode === 'list' ? (
                  <div className="divide-border divide-y">
                    {currentReleases.map((release, index) => (
                      <ReleaseCard
                        key={release.frontMatter.version}
                        release={release}
                        priority={currentPage === 1 && index < 3}
                        layout="list"
                        locale={locale}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {currentReleases.map((release, index) => (
                      <ReleaseCard
                        key={release.frontMatter.version}
                        release={release}
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
                    <ReleasePagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      basePath={locale === 'ja' ? '/ja/releases' : '/releases'}
                    />
                  </div>
                )}
              </>
            ) : initialReleases.length === 0 ? (
              <div className="py-16 text-center">
                <div className="bg-muted mx-auto mb-6 flex size-24 items-center justify-center rounded-full">
                  <svg
                    className="text-muted-foreground size-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <Heading as="h3" size="lg" className="mb-2">
                  {t('emptyState.title')}
                </Heading>
                <Text variant="muted">{t('emptyState.description')}</Text>
              </div>
            ) : (
              <div className="py-16 text-center">
                <div className="bg-muted mx-auto mb-6 flex size-24 items-center justify-center rounded-full">
                  <svg
                    className="text-muted-foreground size-10"
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
                  {t('noResults.title')}
                </Heading>
                <Text variant="muted" className="mb-4">
                  {t('noResults.description')}
                </Text>
                <button
                  onClick={handleClearFilters}
                  className="bg-muted text-primary border-primary hover:bg-state-hover inline-flex items-center rounded-lg border px-4 py-2 text-sm font-bold transition-colors"
                >
                  {t('noResults.clearFilters')}
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
