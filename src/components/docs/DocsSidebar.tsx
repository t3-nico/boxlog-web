"use client"

import { usePathname } from 'next/navigation'
import { Sidebar, SidebarBody, SidebarHeader, SidebarHeading, SidebarItem, SidebarLabel } from "@/components/catalyst/sidebar";
import clsx from 'clsx';

export function DocsSidebar() {
  const pathname = usePathname();

  const navigation = [
    {
      title: 'はじめに',
      links: [
        { name: 'ドキュメントトップ', href: '/docs' },
        { name: 'はじめに', href: '/docs/getting-started' },
      ],
    },
    {
      title: '基本ガイド',
      links: [
        { name: 'タイムボクシングガイド', href: '/docs/timeboxing-guide' },
        { name: 'タグ機能ガイド', href: '/docs/tags-guide' },
        { name: '検索とフィルタ機能', href: '/docs/search-and-filter' },
      ],
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-zinc-800 px-4">
        <h2 className="text-base font-semibold text-zinc-100">Documentation</h2>
      </SidebarHeader>
      
      <SidebarBody className="space-y-6 px-4 py-6">
        {navigation.map((section) => (
          <div key={section.title}>
            <SidebarHeading>{section.title}</SidebarHeading>
            
            <div className="relative mt-3 border-l border-zinc-800">
              <div className="space-y-2 pl-5">
                {section.links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <SidebarItem
                      key={link.href}
                      href={link.href}
                      className={clsx(
                        "!p-0 !py-1 relative",
                        isActive ? "text-white" : "text-zinc-400 hover:text-white"
                      )}
                    >
                      {isActive && (
                        <div className="absolute -left-5 top-0 h-full w-0.5 bg-white" />
                      )}
                      <SidebarLabel className="!ml-0 text-sm">
                        {link.name}
                      </SidebarLabel>
                    </SidebarItem>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </SidebarBody>
    </Sidebar>
  );
} 