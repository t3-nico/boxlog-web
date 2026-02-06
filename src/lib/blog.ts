import { createStructuredError, ErrorCategory, ErrorLevel, logError } from '@/lib/error-utils';
import type { AIMetadata } from '@/types/content';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { calculateReadingTime } from './utils';

export interface BlogPostFrontMatter {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: string;
  author: string;
  authorAvatar?: string;
  coverImage?: string;
  draft?: boolean;
  featured?: boolean;
  readingTime?: number;
  // AI/RAG用メタデータ
  ai?: AIMetadata;
}

export interface BlogPost {
  slug: string;
  frontMatter: BlogPostFrontMatter;
  content: string;
  excerpt: string;
  readingTime: number;
}

export interface BlogPostMeta {
  slug: string;
  frontMatter: BlogPostFrontMatter;
  excerpt: string;
  readingTime: number;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

// Generate article excerpt
export function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remove Markdown syntax and HTML tags
  const cleanContent = content
    .replace(/#{1,6}\s+/g, '') // Headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Bold
    .replace(/\*(.+?)\*/g, '$1') // Italic
    .replace(/`(.+?)`/g, '$1') // Code
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Links
    .replace(/!\[.*?\]\(.+?\)/g, '') // Images
    .replace(/```[\s\S]*?```/g, '') // Code blocks
    .replace(/\n+/g, ' ') // Line breaks
    .trim();

  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }

  return cleanContent.slice(0, maxLength).trim() + '...';
}

// Get all blog post metadata
export async function getAllBlogPostMetas(): Promise<BlogPostMeta[]> {
  try {
    if (!fs.existsSync(BLOG_DIR)) {
      console.warn(`[Blog] Blog directory not found: ${BLOG_DIR}`);
      return [];
    }

    let files: string[];
    try {
      files = fs.readdirSync(BLOG_DIR);
    } catch (error) {
      logError(
        createStructuredError(
          `Failed to read blog directory: ${BLOG_DIR}`,
          ErrorCategory.FILESYSTEM,
          ErrorLevel.ERROR,
          'getAllBlogPostMetas',
          error,
        ),
      );
      return [];
    }

    const mdxFiles = files.filter((file) => file.endsWith('.mdx'));
    const posts: BlogPostMeta[] = [];
    const errors: { file: string; error: unknown }[] = [];

    await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = path.join(BLOG_DIR, file);
        try {
          const slug = file.replace('.mdx', '');
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const { data, content } = matter(fileContent);

          const frontMatter = data as BlogPostFrontMatter;

          // Validate required frontmatter fields
          if (!frontMatter.title) {
            console.warn(`[Blog] Missing required 'title' in frontmatter: ${filePath}`);
          }
          if (!frontMatter.publishedAt) {
            console.warn(`[Blog] Missing required 'publishedAt' in frontmatter: ${filePath}`);
          }

          const readingTime = calculateReadingTime(content);
          const excerpt = frontMatter.description || generateExcerpt(content);

          posts.push({
            slug,
            frontMatter: {
              ...frontMatter,
              readingTime,
            },
            excerpt,
            readingTime,
          });
        } catch (error) {
          errors.push({ file: filePath, error });
        }
      }),
    );

    // Log any errors that occurred during processing
    if (errors.length > 0) {
      logError(
        createStructuredError(
          `Failed to process ${errors.length} blog post(s)`,
          ErrorCategory.FILESYSTEM,
          ErrorLevel.WARN,
          'getAllBlogPostMetas',
        ),
      );
      errors.forEach(({ file, error }) => {
        logError(
          createStructuredError(
            `Failed to process ${path.basename(file)}`,
            ErrorCategory.FILESYSTEM,
            ErrorLevel.ERROR,
            'getAllBlogPostMetas',
            error,
          ),
        );
      });
    }

    // Exclude drafts and sort by publish date (descending)
    return posts
      .filter((post) => !post.frontMatter.draft)
      .sort((a, b) => {
        const dateA = a.frontMatter.publishedAt ? new Date(a.frontMatter.publishedAt).getTime() : 0;
        const dateB = b.frontMatter.publishedAt ? new Date(b.frontMatter.publishedAt).getTime() : 0;
        return dateB - dateA;
      });
  } catch (error) {
    logError(
      createStructuredError(
        'Unexpected error in getAllBlogPostMetas',
        ErrorCategory.INTERNAL,
        ErrorLevel.ERROR,
        'getAllBlogPostMetas',
        error,
      ),
    );
    return [];
  }
}

// Get individual article
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // Validate slug to prevent path traversal
  if (!slug || slug.includes('..') || slug.includes('/')) {
    console.warn(`[Blog] Invalid slug provided: ${slug}`);
    return null;
  }

  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const frontMatter = data as BlogPostFrontMatter;

    // Return null for drafts
    if (frontMatter.draft) {
      return null;
    }

    const readingTime = calculateReadingTime(content);
    const excerpt = frontMatter.description || generateExcerpt(content);

    return {
      slug,
      frontMatter: {
        ...frontMatter,
        readingTime,
      },
      content,
      excerpt,
      readingTime,
    };
  } catch (error) {
    console.error(
      `[Blog] Failed to read blog post: ${filePath}`,
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}

// Get articles by tag
export async function getBlogPostsByTag(tag: string): Promise<BlogPostMeta[]> {
  const allPosts = await getAllBlogPostMetas();
  return allPosts.filter((post) =>
    post.frontMatter.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase()),
  );
}

// Get articles by category
export async function getBlogPostsByCategory(category: string): Promise<BlogPostMeta[]> {
  const allPosts = await getAllBlogPostMetas();
  return allPosts.filter(
    (post) => post.frontMatter.category.toLowerCase() === category.toLowerCase(),
  );
}

// Get related articles
export async function getRelatedPosts(
  currentSlug: string,
  maxPosts: number = 3,
): Promise<BlogPostMeta[]> {
  const allPosts = await getAllBlogPostMetas();
  const currentPost = allPosts.find((post) => post.slug === currentSlug);

  if (!currentPost) {
    return [];
  }

  const currentTags = currentPost.frontMatter.tags;
  const currentCategory = currentPost.frontMatter.category;

  // Sort other articles by relevance
  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      let score = 0;

      // Higher score for same category
      if (post.frontMatter.category === currentCategory) {
        score += 10;
      }

      // Add score based on common tags
      const commonTags = post.frontMatter.tags.filter((tag) => currentTags.includes(tag)).length;
      score += commonTags * 5;

      return { ...post, score };
    })
    .filter((post) => post.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxPosts);

  return relatedPosts.map(({ score: _score, ...post }) => post);
}

// Get all tags
export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const allPosts = await getAllBlogPostMetas();
  const tagCounts: Record<string, number> = {};

  allPosts.forEach((post) => {
    post.frontMatter.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

// Get all tags as simple string array
export async function getAllTagNames(): Promise<string[]> {
  const tagsWithCounts = await getAllTags();
  return tagsWithCounts.map(({ tag }) => tag);
}

// Get all categories
export async function getAllCategories(): Promise<{ category: string; count: number }[]> {
  const allPosts = await getAllBlogPostMetas();
  const categoryCounts: Record<string, number> = {};

  allPosts.forEach((post) => {
    const category = post.frontMatter.category;
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  return Object.entries(categoryCounts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

// Search articles
export async function searchBlogPosts(query: string): Promise<BlogPostMeta[]>;
export async function searchBlogPosts(
  posts: BlogPostMeta[],
  query: string,
): Promise<BlogPostMeta[]>;
export async function searchBlogPosts(
  queryOrPosts: string | BlogPostMeta[],
  query?: string,
): Promise<BlogPostMeta[]> {
  let allPosts: BlogPostMeta[];
  let searchTerm: string;

  if (typeof queryOrPosts === 'string') {
    allPosts = await getAllBlogPostMetas();
    searchTerm = queryOrPosts.toLowerCase();
  } else {
    allPosts = queryOrPosts;
    searchTerm = (query || '').toLowerCase();
  }

  if (!searchTerm) {
    return allPosts;
  }

  return allPosts.filter((post) => {
    const titleMatch = post.frontMatter.title.toLowerCase().includes(searchTerm);
    const descriptionMatch = post.frontMatter.description?.toLowerCase().includes(searchTerm);
    const tagMatch = post.frontMatter.tags.some((tag) => tag.toLowerCase().includes(searchTerm));
    const categoryMatch = post.frontMatter.category.toLowerCase().includes(searchTerm);
    const excerptMatch = post.excerpt.toLowerCase().includes(searchTerm);

    return titleMatch || descriptionMatch || tagMatch || categoryMatch || excerptMatch;
  });
}

// Get featured articles
export async function getFeaturedPosts(): Promise<BlogPostMeta[]> {
  const allPosts = await getAllBlogPostMetas();
  return allPosts.filter((post) => post.frontMatter.featured);
}

// Get latest articles
export async function getRecentPosts(limit: number = 5): Promise<BlogPostMeta[]> {
  const allPosts = await getAllBlogPostMetas();
  return allPosts.slice(0, limit);
}
