import { getAllDocs, getDocBySlug } from '@/lib/docsApi';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/docs/Breadcrumbs';
import { Mdx } from '@/components/mdx';
import { docsNavigation } from '@/lib/docsNavigation';
import { extractHeadings } from '@/lib/parseHeadings';
import { TableOfContents } from '@/components/docs/TableOfContents';
import type { Doc } from '@/lib/docsApi';
import type { Metadata } from 'next'
import type { JSX } from 'react'

export function generateStaticParams() {
  const docs = getAllDocs(['slug']);
  return docs
    .map((doc) => ({
      slug: doc.slug?.split('/'),
    }))
    .filter((doc) => doc.slug);
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

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const slugPath = params.slug.join('/')
  const doc = getDocBySlug(slugPath, ['title', 'excerpt'])

  if (!doc) {
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

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join('/');
  // content と title はこのページで必須
  const doc = getDocBySlug(slug, ['title', 'content']);

  if (!doc || !doc.content || !doc.title) {
    notFound();
  }

  const { sectionTitle, docTitle } = getNavigationInfo(slug);

  const breadcrumbItems = [
    { name: sectionTitle },
    { name: docTitle, href: `/docs/${slug}` },
  ];

  // h2/h3見出しを抽出
  const headings = extractHeadings(doc.content);

  return (
    <div className="flex gap-8 p-6">
      {/* サイドバーは親レイアウトで表示されている想定 */}
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