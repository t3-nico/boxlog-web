import { MDXRemote } from 'next-mdx-remote/rsc'
import { JSX, ClassAttributes, HTMLAttributes } from 'react';
import { slug as slugger } from 'github-slugger';

const components = {
  h1: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>) => <h1 {...props} className="text-3xl font-bold mb-4 text-white" />,
  h2: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>) => {
    const id = props.id || (typeof props.children === 'string' ? slugger(props.children) : undefined);
    return <h2 {...props} id={id} className="text-2xl font-bold mt-8 mb-4 text-white" />;
  },
  h3: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>) => {
    const id = props.id || (typeof props.children === 'string' ? slugger(props.children) : undefined);
    return <h3 {...props} id={id} className="text-xl font-bold mt-6 mb-3 text-white" />;
  },
  p: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLParagraphElement> & HTMLAttributes<HTMLParagraphElement>) => <p {...props} className="text-base text-zinc-300 mb-4" />,
  ul: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLUListElement> & HTMLAttributes<HTMLUListElement>) => <ul {...props} className="list-disc pl-5 mb-4 text-zinc-300" />,
  ol: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLOListElement> & HTMLAttributes<HTMLUListElement>) => <ol {...props} className="list-decimal pl-5 mb-4 text-zinc-300" />,
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose prose-invert max-w-none">
        <MDXRemote source={source} components={components} />
    </div>
  )
} 