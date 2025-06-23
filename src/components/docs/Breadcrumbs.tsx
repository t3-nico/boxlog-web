import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center text-sm text-zinc-400 mb-6">
      {items.map((item, index) => (
        <div key={item.name} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="h-4 w-4 mx-2 text-zinc-500" />
          )}
          {index === items.length - 1 ? (
            <span className="font-semibold text-zinc-100">{item.name}</span>
          ) : (
            <span>{item.name}</span>
          )}
        </div>
      ))}
    </nav>
  );
} 