import { MDXRemote } from 'next-mdx-remote/rsc'
import { JSX, ClassAttributes, HTMLAttributes } from 'react';

const components = {
  h1: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>) => <h1 {...props} className="text-3xl font-bold mb-4 text-white" />,
  h2: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>) => <h2 {...props} className="text-2xl font-bold mt-8 mb-4 text-white" />,
  p: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLParagraphElement> & HTMLAttributes<HTMLParagraphElement>) => <p {...props} className="text-base text-zinc-300 mb-4" />,
  ul: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLUListElement> & HTMLAttributes<HTMLUListElement>) => <ul {...props} className="list-disc pl-5 mb-4 text-zinc-300" />,
  ol: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLOListElement> & HTMLAttributes<HTMLOListElement>) => <ol {...props} className="list-decimal pl-5 mb-4 text-zinc-300" />,
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose prose-invert max-w-none">
        <MDXRemote source={source} components={components} />
    </div>
  )
} 