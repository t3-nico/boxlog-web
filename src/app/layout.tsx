// src/app/layout.tsx
import { CalendarDays, Box, NotebookText, Settings, Search, Pencil } from "lucide-react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="flex h-screen">
        {/* 静的サイドバー */}
        <aside className="w-64 bg-zinc-900 text-white p-4 flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <Settings size={24} className="cursor-pointer hover:text-green-500" />
            <div className="flex gap-2">
              <Search size={20} className="cursor-pointer hover:text-green-500" />
              <Pencil size={20} className="cursor-pointer hover:text-green-500" />
            </div>
          </div>
          <nav className="space-y-2">
            <a href="/calendar" className="flex items-center gap-2 hover:text-green-400">
              <CalendarDays size={16} /> Calendar
            </a>
            <a href="/box" className="flex items-center gap-2 hover:text-green-400">
              <Box size={16} /> Box
            </a>
            <a href="/review" className="flex items-center gap-2 hover:text-green-400">
              <NotebookText size={16} /> Review
            </a>
          </nav>
          {/* …以下、Reflect/Act/My Compass セクション */}
        </aside>

        {/* メインコンテンツ */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
