import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { cache } from 'react';
import { getAllBlogPostMetas } from './blog';
import { getAllReleaseMetas } from './releases';

export interface TagCount {
  tag: string;
  count: number;
}

export interface TaggedContent {
  type: 'blog' | 'release' | 'doc';
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category?: string;
  featured?: boolean;
  version?: string; // For releases
  breaking?: boolean; // For releases
}

export interface UnifiedTagData {
  tag: string;
  totalCount: number;
  blog: TaggedContent[];
  releases: TaggedContent[];
  docs: TaggedContent[];
}

// Get document metadata（cache()で同一リクエスト内の重複呼び出しを排除）
const getAllDocMetas = cache(async function getAllDocMetasImpl(): Promise<TaggedContent[]> {
  const docsDirectory = path.join(process.cwd(), 'content/docs');

  try {
    if (!fs.existsSync(docsDirectory)) {
      console.warn(`[Tags] Docs directory not found: ${docsDirectory}`);
      return [];
    }

    const getAllMdxFiles = (dir: string): string[] => {
      const files: string[] = [];
      try {
        const items = fs.readdirSync(dir);

        for (const item of items) {
          const fullPath = path.join(dir, item);
          try {
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
              files.push(...getAllMdxFiles(fullPath));
            } else if (item.endsWith('.mdx') || item.endsWith('.md')) {
              files.push(fullPath);
            }
          } catch (statError) {
            console.error(`[Tags] Failed to stat file: ${fullPath}`, statError);
          }
        }
      } catch (readError) {
        console.error(`[Tags] Failed to read directory: ${dir}`, readError);
      }

      return files;
    };

    const mdxFiles = getAllMdxFiles(docsDirectory);
    const docMetas: TaggedContent[] = [];
    const errors: { file: string; error: unknown }[] = [];

    for (const filePath of mdxFiles) {
      try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data: frontMatter } = matter(fileContents);

        // Skip draft content
        if (frontMatter.draft) continue;

        // Generate slug from file path
        const relativePath = path.relative(docsDirectory, filePath);
        const slug = relativePath.replace(/\.(mdx?|md)$/, '').replace(/\\/g, '/');

        docMetas.push({
          type: 'doc',
          slug: slug,
          title: (frontMatter.title as string) || 'Untitled',
          description: (frontMatter.description as string) || '',
          date:
            (frontMatter.publishedAt as string) ||
            (frontMatter.updatedAt as string) ||
            new Date().toISOString(),
          tags: (frontMatter.tags as string[]) || [],
          category: frontMatter.category as string | undefined,
          featured: (frontMatter.featured as boolean) || false,
        });
      } catch (error) {
        errors.push({ file: filePath, error });
      }
    }

    if (errors.length > 0) {
      console.error(`[Tags] Failed to process ${errors.length} document(s):`);
      errors.forEach(({ file, error }) => {
        console.error(`  - ${file}:`, error instanceof Error ? error.message : error);
      });
    }

    return docMetas.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('[Tags] Unexpected error in getAllDocMetas:', error);
    return [];
  }
});

// Get tags and usage counts from all content types
export async function getAllTags(): Promise<TagCount[]> {
  try {
    const contentErrors: string[] = [];
    const [blogPosts, releases, docs] = await Promise.all([
      getAllBlogPostMetas().catch((error) => {
        contentErrors.push(`blog: ${error instanceof Error ? error.message : String(error)}`);
        return [];
      }),
      getAllReleaseMetas().catch((error) => {
        contentErrors.push(`releases: ${error instanceof Error ? error.message : String(error)}`);
        return [];
      }),
      getAllDocMetas().catch((error) => {
        contentErrors.push(`docs: ${error instanceof Error ? error.message : String(error)}`);
        return [];
      }),
    ]);

    if (contentErrors.length > 0) {
      console.warn('[Tags] Some content sources failed:', contentErrors.join(', '));
    }

    const tagCounts = new Map<string, number>();

    // Aggregate blog post tags
    blogPosts.forEach((post) => {
      const tags = post.frontMatter?.tags || [];
      tags.forEach((tag) => {
        if (tag && typeof tag === 'string') {
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        }
      });
    });

    // Aggregate release tags
    releases.forEach((release) => {
      const tags = release.frontMatter?.tags || [];
      tags.forEach((tag) => {
        if (tag && typeof tag === 'string') {
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        }
      });
    });

    // Aggregate document tags
    docs.forEach((doc) => {
      const tags = doc.tags || [];
      tags.forEach((tag) => {
        if (tag && typeof tag === 'string') {
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        }
      });
    });

    return Array.from(tagCounts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  } catch (error) {
    console.error('[Tags] Unexpected error in getAllTags:', error);
    return [];
  }
}

// Get all content related to a specific tag
export async function getContentByTag(tag: string): Promise<UnifiedTagData> {
  const [blogPosts, releases, docs] = await Promise.all([
    getAllBlogPostMetas(),
    getAllReleaseMetas(),
    getAllDocMetas(),
  ]);

  const normalizedTag = tag.toLowerCase();

  // Filter blog posts
  const blogContent: TaggedContent[] = blogPosts
    .filter((post) => post.frontMatter.tags.some((t) => t.toLowerCase() === normalizedTag))
    .map((post) => ({
      type: 'blog' as const,
      slug: post.slug,
      title: post.frontMatter.title,
      description: post.frontMatter.description,
      date: post.frontMatter.publishedAt,
      tags: post.frontMatter.tags,
      category: post.frontMatter.category,
      featured: post.frontMatter.featured,
    }));

  // Filter releases
  const releaseContent: TaggedContent[] = releases
    .filter((release) => release.frontMatter.tags.some((t) => t.toLowerCase() === normalizedTag))
    .map((release) => ({
      type: 'release' as const,
      slug: release.frontMatter.version,
      title: release.frontMatter.title,
      description: release.frontMatter.description,
      date: release.frontMatter.date,
      tags: release.frontMatter.tags,
      featured: release.frontMatter.featured,
      version: release.frontMatter.version,
      breaking: release.frontMatter.breaking,
    }));

  // Filter documents
  const docContent: TaggedContent[] = docs.filter((doc) =>
    doc.tags.some((t) => t.toLowerCase() === normalizedTag),
  );

  const totalCount = blogContent.length + releaseContent.length + docContent.length;

  // Get original tag name (first matching found)
  const originalTag =
    [...blogContent, ...releaseContent, ...docContent]
      .flatMap((content) => content.tags)
      .find((t) => t.toLowerCase() === normalizedTag) || tag;

  return {
    tag: originalTag,
    totalCount,
    blog: blogContent,
    releases: releaseContent,
    docs: docContent,
  };
}

// Get frequently used tags
export async function getPopularTags(limit: number = 10): Promise<TagCount[]> {
  const allTags = await getAllTags();
  return allTags.slice(0, limit);
}

// Get related tags (commonly used together)
export async function getRelatedTags(currentTag: string, limit: number = 5): Promise<string[]> {
  const contentByTag = await getContentByTag(currentTag);
  const allContent = [...contentByTag.blog, ...contentByTag.releases, ...contentByTag.docs];

  const relatedTagCounts = new Map<string, number>();
  const normalizedCurrentTag = currentTag.toLowerCase();

  allContent.forEach((content) => {
    content.tags.forEach((tag) => {
      if (tag.toLowerCase() !== normalizedCurrentTag) {
        relatedTagCounts.set(tag, (relatedTagCounts.get(tag) || 0) + 1);
      }
    });
  });

  return Array.from(relatedTagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}

// Tag statistics by category
export async function getTagsByCategory(): Promise<Record<string, TagCount[]>> {
  const [blogPosts, releases, docs] = await Promise.all([
    getAllBlogPostMetas(),
    getAllReleaseMetas(),
    getAllDocMetas(),
  ]);

  const blogTagsMap = new Map<string, number>();
  const releasesTagsMap = new Map<string, number>();
  const docsTagsMap = new Map<string, number>();

  // Aggregate blog tags
  blogPosts.forEach((post) => {
    post.frontMatter.tags.forEach((tag) => {
      blogTagsMap.set(tag, (blogTagsMap.get(tag) ?? 0) + 1);
    });
  });

  // Aggregate release tags
  releases.forEach((release) => {
    release.frontMatter.tags.forEach((tag) => {
      releasesTagsMap.set(tag, (releasesTagsMap.get(tag) ?? 0) + 1);
    });
  });

  // Aggregate document tags
  docs.forEach((doc) => {
    doc.tags.forEach((tag) => {
      docsTagsMap.set(tag, (docsTagsMap.get(tag) ?? 0) + 1);
    });
  });

  const categorizedTags = {
    blog: blogTagsMap,
    releases: releasesTagsMap,
    docs: docsTagsMap,
  };

  // Convert Map to TagCount[]
  const result: Record<string, TagCount[]> = {};

  Object.entries(categorizedTags).forEach(([category, tagMap]) => {
    result[category] = Array.from(tagMap.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  });

  return result;
}
