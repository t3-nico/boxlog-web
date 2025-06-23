import React from 'react';
import { getAllDocs, getDocBySlug } from '@/lib/docsApi';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/docs/Breadcrumbs';
import { Mdx } from '@/components/mdx';
import { docsNavigation } from '@/lib/docsNavigation';
import { extractHeadings } from '@/lib/parseHeadings';
import { TableOfContents } from '@/components/docs/TableOfContents';

type PageProps = {
  params: { slug: string[] }
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const docs = getAllDocs(['slug']);
  return docs
    .map((doc) => ({
      slug: doc.slug?.split('/'),
    }))
    .filter((doc) => doc.slug) as { slug: string[] }[];
}

function getNavigationInfo(slug: string) {
  const currentPath = `/docs/${slug}`;
  for (const section of docsNavigation) {
    const foundLink = section.links.find((link) => link.href === currentPath);
    if (foundLink) {
      return {
        sectionTitle: section.title,
        docTitle: foundLink.name,
      };
    }
  }
  // fallback for /docs root page or any other case
  const doc = getDocBySlug(slug, ['title']);
  return { sectionTitle: 'ドキュメント', docTitle: doc.title ?? 'ページ' };
}

export async function generateMetadata({ params }: PageProps): Promise<{ title: string; description: string }> {
  const slugPath = params.slug.join('/')
  const doc = getDocBySlug(slugPath, ['title', 'excerpt'])

  if (!doc || typeof doc.title !== 'string' || typeof doc.excerpt !== 'string') {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    }
  }

  return {
    title: doc.title,
    description: doc.excerpt,
  }
}

export default async function Page({ params }: PageProps): Promise<React.JSX.Element> {
  const slug = params.slug.join('/');
  const doc = getDocBySlug(slug, ['title', 'content']);

  if (!doc || typeof doc.title !== 'string' || typeof doc.content !== 'string') {
    notFound();
  }

  const { sectionTitle, docTitle } = getNavigationInfo(slug);

  const breadcrumbItems = [
    { name: sectionTitle },
    { name: docTitle, href: `/docs/${slug}` },
  ];

  const headings = extractHeadings(doc.content);

  return (
    <div className="flex gap-8 p-6">
      <div className="flex-1 min-w-0">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="prose prose-invert mt-6 max-w-none">
          <Mdx source={doc.content} />
        </div>
      </div>
      <aside className="w-64 shrink-0 hidden xl:block">
        <TableOfContents headings={headings} />
      </aside>
    </div>
  );
} 