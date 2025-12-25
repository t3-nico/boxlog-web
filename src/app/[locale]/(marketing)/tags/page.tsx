import { FilteredTagsClient } from '@/components/tags/FilteredTagsClient';
import { Container } from '@/components/ui/container';
import { routing } from '@/i18n/routing';
import { getTagsByCategory } from '@/lib/tags-server';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

interface TagsPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Tags - Browse by Topic',
  description:
    'Explore content by tags. Find blog posts, releases, and documentation organized by topics.',
};

export default async function TagsPage({ params }: TagsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Get tags by category (blog, releases, docs)
  const tagsByCategory = await getTagsByCategory();

  // Combine and deduplicate tags
  const allTagsMap = new Map<
    string,
    { count: number; blogCount: number; releaseCount: number; docsCount: number }
  >();

  tagsByCategory.blog?.forEach((t) => {
    const existing = allTagsMap.get(t.tag);
    if (existing) {
      existing.blogCount += t.count;
      existing.count += t.count;
    } else {
      allTagsMap.set(t.tag, { count: t.count, blogCount: t.count, releaseCount: 0, docsCount: 0 });
    }
  });

  tagsByCategory.releases?.forEach((t) => {
    const existing = allTagsMap.get(t.tag);
    if (existing) {
      existing.releaseCount += t.count;
      existing.count += t.count;
    } else {
      allTagsMap.set(t.tag, { count: t.count, blogCount: 0, releaseCount: t.count, docsCount: 0 });
    }
  });

  tagsByCategory.docs?.forEach((t) => {
    const existing = allTagsMap.get(t.tag);
    if (existing) {
      existing.docsCount += t.count;
      existing.count += t.count;
    } else {
      allTagsMap.set(t.tag, { count: t.count, blogCount: 0, releaseCount: 0, docsCount: t.count });
    }
  });

  const allTags = Array.from(allTagsMap.entries())
    .map(([tag, counts]) => ({ tag, ...counts }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="bg-background min-h-screen">
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-6xl">
            <FilteredTagsClient allTags={allTags} locale={locale} />
          </div>
        </Container>
      </section>
    </div>
  );
}
