import { getAllDocs, getDocBySlug } from '@/lib/docsApi';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/docs/Breadcrumbs';
import { Mdx } from '@/components/mdx';
import { docsNavigation } from '@/lib/docsNavigation';
import type { Doc } from '@/lib/docsApi';
import type { Metadata } from 'next'
import type { JSX } from 'react'

type PageProps = {
  params: {
    slug: string[];
  };
};

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params
  const slugPath = slug.join('/')
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

export default async function Page({ params }: PageProps) {
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

  return (
    <div className="p-6">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="prose prose-invert mt-6 max-w-none">
        <Mdx source={doc.content} />
      </div>
    </div>
  );
} 