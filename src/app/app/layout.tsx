"use client"

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "../globals.css" // パスを修正
import { Inter } from "next/font/google"
import { AppSidebar } from "@/components/catalyst/app-sidebar"
import { SidebarLayout } from "@/components/catalyst/sidebar-layout";
import { MainContainer } from "@/components/catalyst/main-container";

export default function AppLayout({ // 関数名を変更
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState("light");
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.className = theme;
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  // settingsページでは、専用のレイアウトを使うためAppSidebarを表示しない
  if (pathname.startsWith('/app/settings')) {
    return <>{children}</>
  }

  // app内のレイアウトなので、常にサイドバーありのレイアウトを返す
  return (
    <SidebarLayout
      sidebar={
        <div className={
          (isDesktopOpen ? "w-[260px] flex-shrink-0" : "w-16") +
          " transition-all duration-300 ease-in-out overflow-hidden bg-zinc-950 h-full"
        }>
          <AppSidebar isDesktopOpen={isDesktopOpen} setIsDesktopOpen={setIsDesktopOpen} theme={theme} />
        </div>
      }
    >
      <MainContainer className="w-full">
        {children}
      </MainContainer>
    </SidebarLayout>
  );
} 