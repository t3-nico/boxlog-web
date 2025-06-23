"use client"
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { SidebarLayout } from "@/components/catalyst/sidebar-layout";
import { MainContainer } from "@/components/catalyst/main-container";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarLayout sidebar={<DocsSidebar />}>
      <MainContainer className="w-full h-screen">{children}</MainContainer>
    </SidebarLayout>
  )
} 