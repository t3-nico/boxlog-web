'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import type { PillSwitcherOption } from '@/components/ui/pill-switcher';
import { PillSwitcher } from '@/components/ui/pill-switcher';
import { Heading, Text } from '@/components/ui/typography';
import { Link } from '@/i18n/navigation';
import { getTagColor } from '@/lib/tags-client';
import type { TaggedContent } from '@/lib/tags-server';
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Grid3X3,
  Hash,
  List,
  Megaphone,
  Search,
  TrendingUp,
  X,
} from 'lucide-react';
import { useState } from 'react';

// 統一コンテンツアイテム（TaggedContentにhrefを追加）
interface UnifiedContentItem extends TaggedContent {
  href: string;
}

// アイコンを取得
function getContentIcon(type: TaggedContent['type']) {
  switch (type) {
    case 'blog':
      return <FileText className="size-5" />;
    case 'release':
      return <Megaphone className="size-5" />;
    case 'doc':
      return <BookOpen className="size-5" />;
  }
}

// タイプラベルを取得
function getTypeLabel(type: TaggedContent['type'], isJa: boolean) {
  switch (type) {
    case 'blog':
      return isJa ? 'ブログ' : 'Blog';
    case 'release':
      return isJa ? 'リリース' : 'Release';
    case 'doc':
      return isJa ? 'ドキュメント' : 'Docs';
  }
}

type CategoryFilter = 'all' | 'blog' | 'releases' | 'docs';
type ViewMode = 'list' | 'grid';

interface TagDetailClientProps {
  tag: string;
  blogContent: TaggedContent[];
  releaseContent: TaggedContent[];
  docsContent: TaggedContent[];
  popularTags: { tag: string; count: number }[];
  locale: string;
}

export function TagDetailClient({
  tag,
  blogContent,
  releaseContent,
  docsContent,
  popularTags,
  locale,
}: TagDetailClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const isJa = locale === 'ja';
  const totalCount = blogContent.length + releaseContent.length + docsContent.length;

  // フィルタリング
  const filterContent = <T extends TaggedContent>(items: T[]) => {
    if (!searchQuery) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query),
    );
  };

  const filteredBlog = filterContent(blogContent);
  const filteredReleases = filterContent(releaseContent);
  const filteredDocs = filterContent(docsContent);

  // カテゴリオプションを動的に生成（コンテンツがあるもののみ）
  const categoryOptions: PillSwitcherOption<CategoryFilter>[] = [
    { value: 'all', label: isJa ? 'すべて' : 'All' },
  ];
  if (blogContent.length > 0) {
    categoryOptions.push({
      value: 'blog',
      label: isJa ? `ブログ (${filteredBlog.length})` : `Blog (${filteredBlog.length})`,
      icon: <FileText className="size-3" />,
    });
  }
  if (releaseContent.length > 0) {
    categoryOptions.push({
      value: 'releases',
      label: isJa
        ? `リリース (${filteredReleases.length})`
        : `Releases (${filteredReleases.length})`,
      icon: <Megaphone className="size-3" />,
    });
  }
  if (docsContent.length > 0) {
    categoryOptions.push({
      value: 'docs',
      label: isJa ? `ドキュメント (${filteredDocs.length})` : `Docs (${filteredDocs.length})`,
      icon: <BookOpen className="size-3" />,
    });
  }

  // 統一コンテンツリストを作成
  const unifiedContent: UnifiedContentItem[] = [];

  if (categoryFilter === 'all' || categoryFilter === 'blog') {
    filteredBlog.forEach((item) => {
      unifiedContent.push({ ...item, href: `/blog/${item.slug}` });
    });
  }
  if (categoryFilter === 'all' || categoryFilter === 'releases') {
    filteredReleases.forEach((item) => {
      unifiedContent.push({ ...item, href: `/releases/${item.slug}` });
    });
  }
  if (categoryFilter === 'all' || categoryFilter === 'docs') {
    filteredDocs.forEach((item) => {
      unifiedContent.push({ ...item, href: `/docs/${item.slug}` });
    });
  }

  // 日付でソート（新しい順）
  unifiedContent.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const hasContent = unifiedContent.length > 0;

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
      {/* 左サイドバー */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
          {/* タグ情報 */}
          <div className="border-border bg-card rounded-2xl border p-6">
            <div className="mb-4 flex items-center gap-4">
              <div
                className={`flex size-10 items-center justify-center rounded-lg ${getTagColor(tag)}`}
              >
                <Hash className="size-5" />
              </div>
              <div>
                <h1 className="text-foreground text-lg font-bold">#{tag}</h1>
                <p className="text-muted-foreground text-sm">
                  {totalCount} {isJa ? '件' : totalCount === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            <Link
              href="/tags"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
            >
              <ArrowLeft className="size-4" />
              {isJa ? 'すべてのタグ' : 'All Tags'}
            </Link>
          </div>

          {/* 人気のタグ */}
          <div className="border-border bg-card rounded-2xl border p-6">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="text-muted-foreground size-4" />
              <h3 className="text-foreground text-sm font-bold">
                {isJa ? '人気のタグ' : 'Popular Tags'}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((t) => (
                <Link
                  key={t.tag}
                  href={`/tags/${encodeURIComponent(t.tag)}`}
                  className={`inline-flex items-center rounded-lg px-2 py-1 text-xs font-bold transition-colors ${
                    t.tag.toLowerCase() === tag.toLowerCase()
                      ? 'bg-foreground text-background'
                      : getTagColor(t.tag)
                  }`}
                >
                  #{t.tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 右メイン */}
      <div className="lg:col-span-3">
        {/* カテゴリスイッチャー */}
        <div className="mb-4">
          <PillSwitcher
            options={categoryOptions}
            value={categoryFilter}
            onValueChange={setCategoryFilter}
          />
        </div>

        {/* 検索 + ビュー切り替え */}
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isJa ? 'コンテンツを検索...' : 'Search content...'}
              className="border-border bg-input text-foreground placeholder:text-muted-foreground focus:ring-ring h-10 w-full rounded-lg border pr-12 pl-12 transition-colors focus:ring-2 focus:outline-none"
            />
            {searchQuery && (
              <Button
                onClick={() => setSearchQuery('')}
                variant="ghost"
                icon
                className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              >
                <X className="size-4" />
              </Button>
            )}
          </div>

          <PillSwitcher
            options={[
              {
                value: 'list',
                label: isJa ? 'リスト' : 'List',
                icon: <List className="size-4" />,
              },
              {
                value: 'grid',
                label: isJa ? 'グリッド' : 'Grid',
                icon: <Grid3X3 className="size-4" />,
              },
            ]}
            value={viewMode}
            onValueChange={setViewMode}
          />
        </div>

        {/* コンテンツ一覧 */}
        {hasContent ? (
          viewMode === 'list' ? (
            <div className="divide-border divide-y">
              {unifiedContent.map((item) => (
                <Link
                  key={`${item.type}-${item.slug}`}
                  href={item.href}
                  className="hover:bg-state-hover flex items-start gap-4 py-4 transition-colors first:pt-0"
                >
                  <div className="bg-muted text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-lg">
                    {getContentIcon(item.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-muted-foreground text-xs">
                        {getTypeLabel(item.type, isJa)}
                      </span>
                      <span className="text-muted-foreground text-xs">·</span>
                      <span className="text-muted-foreground text-xs">
                        {new Date(item.date).toLocaleDateString(isJa ? 'ja-JP' : 'en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="text-foreground line-clamp-1 font-bold">{item.title}</h3>
                    {item.tags.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {item.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className={`inline-flex items-center rounded px-2 py-1 text-xs ${getTagColor(t)}`}
                          >
                            #{t}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="text-muted-foreground text-xs">
                            +{item.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {unifiedContent.map((item) => (
                <Link key={`${item.type}-${item.slug}`} href={item.href} className="block">
                  <Card className="hover:bg-state-hover h-full transition-colors">
                    <CardHeader className="gap-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-lg">
                          {getContentIcon(item.type)}
                        </div>
                        <span className="text-muted-foreground text-xs">
                          {getTypeLabel(item.type, isJa)}
                        </span>
                      </div>
                      <CardTitle className="line-clamp-2 text-base">{item.title}</CardTitle>
                      {item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className={`inline-flex items-center rounded px-2 py-1 text-xs ${getTagColor(t)}`}
                            >
                              #{t}
                            </span>
                          ))}
                          {item.tags.length > 3 && (
                            <span className="text-muted-foreground text-xs">
                              +{item.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                      <p className="text-muted-foreground text-xs">
                        {new Date(item.date).toLocaleDateString(isJa ? 'ja-JP' : 'en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          )
        ) : (
          <EmptyState isJa={isJa} onClear={() => setSearchQuery('')} />
        )}
      </div>
    </div>
  );
}

function EmptyState({ isJa, onClear }: { isJa: boolean; onClear: () => void }) {
  return (
    <div className="py-16 text-center">
      <div className="bg-muted mx-auto mb-6 flex size-24 items-center justify-center rounded-full">
        <Search className="text-muted-foreground size-10" />
      </div>
      <Heading as="h3" size="lg" className="mb-2">
        {isJa ? 'コンテンツが見つかりません' : 'No content found'}
      </Heading>
      <Text variant="muted" className="mb-4">
        {isJa ? '検索条件を変更してみてください' : 'Try adjusting your search'}
      </Text>
      <button
        onClick={onClear}
        className="bg-muted text-primary border-primary hover:bg-state-hover inline-flex items-center rounded-lg border px-4 py-2 text-sm font-bold transition-colors"
      >
        {isJa ? '検索をクリア' : 'Clear search'}
      </button>
    </div>
  );
}
