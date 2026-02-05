import { Heading } from '@/components/ui/typography';
import { Link } from '@/i18n/navigation';
import { BlogPostMeta } from '@/lib/blog';
import { getTagColor } from '@/lib/tags-client';
import { BlogImage } from './BlogImage';

interface PostCardProps {
  post: BlogPostMeta;
  priority?: boolean;
  layout?: 'horizontal' | 'vertical' | 'list';
  locale?: string;
}

export function PostCard({
  post,
  priority = false,
  layout = 'horizontal',
  locale = 'en',
}: PostCardProps) {
  const formatDate = (dateString: string) => {
    const localeCode = locale === 'ja' ? 'ja-JP' : 'en-US';
    return new Date(dateString).toLocaleDateString(localeCode, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formattedDate = formatDate(post.frontMatter.publishedAt);

  // List layout (Claude blog style): date, category, title in a clean row
  if (layout === 'list') {
    return (
      <article className="group py-6 first:pt-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          {/* 日付 */}
          <div className="text-muted-foreground w-28 flex-shrink-0 text-sm">
            <time dateTime={post.frontMatter.publishedAt}>{formattedDate}</time>
          </div>

          {/* タグ（最大3つ + 残り数） */}
          <div className="flex w-44 flex-shrink-0 flex-wrap items-center gap-2">
            {post.frontMatter.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`inline-flex items-center rounded-lg px-2 py-1 text-xs font-bold ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
            {post.frontMatter.tags.length > 3 && (
              <span className="text-muted-foreground text-xs">
                +{post.frontMatter.tags.length - 3}
              </span>
            )}
          </div>

          {/* タイトル */}
          <div className="flex-1">
            <Link href={`/blog/${post.slug}`} className="group/link">
              <Heading
                as="h2"
                size="md"
                className="text-foreground group-hover/link:text-primary font-bold transition-colors"
              >
                {post.frontMatter.title}
              </Heading>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  if (layout === 'vertical') {
    // Vertical layout (for featured articles): image on top, content below
    return (
      <article className="group bg-card overflow-hidden rounded-2xl">
        {/* Cover image */}
        <Link href={`/blog/${post.slug}`} className="block">
          <BlogImage
            src={post.frontMatter.coverImage}
            alt={post.frontMatter.title}
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <Link href={`/blog/${post.slug}`}>
            <Heading
              as="h2"
              size="xl"
              className="mb-4 line-clamp-2 cursor-pointer transition-colors hover:underline"
            >
              {post.frontMatter.title}
            </Heading>
          </Link>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {post.frontMatter.tags.map((tag) => (
              <span
                key={tag}
                className={`inline-flex items-center rounded-lg px-2 py-1 text-xs font-bold ${getTagColor(tag)}`}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Meta information */}
          <div className="text-muted-foreground text-sm">
            <time dateTime={post.frontMatter.publishedAt}>{formattedDate}</time>
          </div>
        </div>
      </article>
    );
  }

  // Horizontal layout (for regular articles): image on left, content on right
  return (
    <article className="group bg-card overflow-hidden rounded-2xl">
      <div className="flex gap-6">
        {/* Left side: Cover image */}
        <Link href={`/blog/${post.slug}`} className="w-80 flex-shrink-0">
          <BlogImage
            src={post.frontMatter.coverImage}
            alt={post.frontMatter.title}
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          />
        </Link>

        {/* Right side: Content */}
        <div className="flex-1">
          <div className="my-1">
            {/* Title */}
            <Link href={`/blog/${post.slug}`}>
              <Heading
                as="h2"
                size="lg"
                className="mb-4 line-clamp-2 cursor-pointer transition-colors hover:underline"
              >
                {post.frontMatter.title}
              </Heading>
            </Link>

            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              {post.frontMatter.tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center rounded-lg px-2 py-1 text-sm font-bold ${getTagColor(tag)}`}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Meta information */}
            <div className="text-muted-foreground text-sm">
              <time dateTime={post.frontMatter.publishedAt}>{formattedDate}</time>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
