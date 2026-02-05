'use client';

import { Heading } from '@/components/ui/typography';
import { Link } from '@/i18n/navigation';
import { getTagColor } from '@/lib/tags-client';
import { AlertTriangle, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Local type definitions to avoid importing server-only lib
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

// Local utility functions
function isPrerelease(version: string): boolean {
  return (
    version.includes('beta') ||
    version.includes('alpha') ||
    version.includes('rc') ||
    version.includes('pre')
  );
}

function getVersionType(version: string): 'major' | 'minor' | 'patch' | 'prerelease' {
  if (isPrerelease(version)) {
    return 'prerelease';
  }

  const cleanVersion = version.replace(/^v/, '');
  const parts = cleanVersion.split('.').map(Number);

  if ((parts[2] ?? 0) > 0) return 'patch';
  if ((parts[1] ?? 0) > 0) return 'minor';
  return 'major';
}

interface ReleaseCardProps {
  release: ReleasePostMeta;
  priority?: boolean;
  layout?: 'list' | 'vertical';
  locale?: string;
}

export function ReleaseCard({ release, layout = 'vertical', locale }: ReleaseCardProps) {
  const t = useTranslations('releases');
  const { frontMatter } = release;
  const versionType = getVersionType(frontMatter.version);

  const versionBadgeStyles = {
    major: 'bg-muted text-destructive border border-destructive',
    minor: 'bg-muted text-info border border-info',
    patch: 'bg-muted text-success border border-success',
    prerelease: 'bg-muted text-warning border border-warning',
  };

  const formatDate = (dateString: string) => {
    const localeCode = locale === 'ja' ? 'ja-JP' : 'en-US';
    return new Date(dateString).toLocaleDateString(localeCode, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formattedDate = formatDate(frontMatter.date);

  // List layout (Claude blog style)
  if (layout === 'list') {
    return (
      <article className="group py-6 first:pt-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          {/* 日付 */}
          <div className="text-muted-foreground w-28 flex-shrink-0 text-sm">
            <time dateTime={frontMatter.date}>{formattedDate}</time>
          </div>

          {/* バージョン + ステータス */}
          <div className="flex w-44 flex-shrink-0 flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-lg px-2 py-1 text-xs font-bold ${versionBadgeStyles[versionType]}`}
            >
              v{frontMatter.version}
            </span>
            {frontMatter.featured && (
              <span className="bg-muted text-primary border-primary inline-flex items-center rounded-lg border px-2 py-1 text-xs">
                <Star className="size-3" />
              </span>
            )}
            {frontMatter.breaking && (
              <span className="bg-muted text-destructive border-destructive inline-flex items-center rounded-lg border px-2 py-1 text-xs">
                <AlertTriangle className="size-3" />
              </span>
            )}
          </div>

          {/* タイトル */}
          <div className="flex-1">
            <Link href={`/releases/${frontMatter.version}`} className="group/link">
              <Heading
                as="h2"
                size="md"
                className="text-foreground group-hover/link:text-primary font-bold transition-colors"
              >
                {frontMatter.title}
              </Heading>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Vertical layout (grid view)
  return (
    <article className="group bg-card overflow-hidden rounded-2xl">
      <Link href={`/releases/${frontMatter.version}`} className="block">
        <div className="p-6">
          {/* Version Badge */}
          <div className="mb-4 flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-4 py-1 text-sm font-bold ${versionBadgeStyles[versionType]}`}
            >
              v{frontMatter.version}
            </span>
            {frontMatter.featured && (
              <span className="bg-muted text-primary border-primary inline-flex items-center rounded-lg border px-2 py-1 text-xs font-bold">
                <Star className="mr-1 size-3" />
                {t('featured')}
              </span>
            )}
            {frontMatter.breaking && (
              <span className="bg-muted text-destructive border-destructive inline-flex items-center rounded-lg border px-2 py-1 text-xs font-bold">
                <AlertTriangle className="mr-1 size-3" />
                {t('breaking')}
              </span>
            )}
          </div>

          {/* Title */}
          <Heading
            as="h2"
            size="xl"
            className="mb-4 line-clamp-2 cursor-pointer transition-colors hover:underline"
          >
            {frontMatter.title}
          </Heading>

          {/* Tags (max 3) */}
          {frontMatter.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {frontMatter.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center rounded-lg px-2 py-1 text-xs font-bold ${getTagColor(tag)}`}
                >
                  #{tag}
                </span>
              ))}
              {frontMatter.tags.length > 3 && (
                <span className="text-muted-foreground text-xs">
                  +{frontMatter.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Date */}
          <div className="text-muted-foreground text-sm">
            <time dateTime={frontMatter.date}>{formattedDate}</time>
          </div>
        </div>
      </Link>
    </article>
  );
}
