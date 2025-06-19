"use client"
import { SettingsSidebar } from "@/components/catalyst/settings-sidebar"
import { SidebarLayout } from "@/components/catalyst/sidebar-layout";
import { MainContainer } from "@/components/catalyst/main-container";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarLayout sidebar={<SettingsSidebar />}>
      <MainContainer className="w-full h-screen">{children}</MainContainer>
    </SidebarLayout>
  )
} 