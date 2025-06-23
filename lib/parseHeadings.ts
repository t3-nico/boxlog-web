import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import { slug as slugger } from 'github-slugger';

export interface Heading {
  text: string;
  level: number;
  id: string;
}

export function extractHeadings(markdown: string): Heading[] {
  const tree = unified().use(remarkParse).parse(markdown);
  const headings: Heading[] = [];

  visit(tree, 'heading', (node: any) => {
    if (node.depth === 2 || node.depth === 3) {
      const text = node.children
        .filter((child: any) => child.type === 'text')
        .map((child: any) => child.value)
        .join('');
      headings.push({
        text,
        level: node.depth,
        id: slugger(text),
      });
    }
  });

  return headings;
} 