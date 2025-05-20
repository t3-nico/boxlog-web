import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import Link from "next/link";
import {
  Search,
  Pencil,
  CalendarDays,
  Box,
  NotebookText,
  Settings,
  CheckSquare,
} from "lucide-react";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "BoxLog",
  description: "王国を作る",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${notoSans.variable} antialiased bg-surface text-white`}>
        <div className="flex h-screen">
          {/* サイドバー */}
          <aside className="w-64 bg-surface text-white flex flex-col p-4 space-y-6">
            {/* 上部アイコンエリア */}
            <div className="flex items-center justify-between">
              <Link href="/settings" className="hover:text-brand-400">
                <Settings size={24} aria-label="Settings" />
              </Link>
              <div className="flex gap-3">
                <Search size={20} className="hover:text-brand-400 cursor-pointer" aria-label="Search" />
                <Pencil size={20} className="hover:text-brand-400 cursor-pointer" aria-label="Edit" />
              </div>
            </div>

            {/* メインナビ */}
            <nav className="space-y-2 text-sm">
              <Link
                href="/calendar"
                className="flex items-center gap-2 px-2 py-1 rounded bg-semantic-todayBand/20 hover:bg-semantic-todayBand"
              >
                <CalendarDays size={16} />
                <span className="text-xs text-gray-400 uppercase mb-1">Calendar</span>
              </Link>
              <Link
                href="/box"
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-zinc-800"
              >
                <Box size={16} />
                <span className="text-white">Box</span>
              </Link>
              <Link
                href="/review"
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-zinc-800"
              >
                <NotebookText size={16} />
                <span className="text-white">Review</span>
              </Link>
            </nav>

            {/* Calendar セクション */}
            <div>
              <h2 className="text-xs text-gray-400 uppercase mb-1">Calendar</h2>
              <ul className="space-y-1 pl-4">
                <li className="flex items-center gap-2 text-sm">
                  <CheckSquare size={14} className="text-brand-400" /> Plan
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckSquare size={14} className="text-brand-400" /> Log
                </li>
              </ul>
            </div>

            {/* Reflect セクション */}
            <div>
              <h2 className="text-xs text-gray-400 uppercase mb-1">Reflect</h2>
              <ul className="space-y-1 pl-4 text-sm">
                <li>Time Balance Check</li>
                <li>Find Your Happy Tags</li>
                <li>Small Wins</li>
                <li>Contribution</li>
                <li>Journal</li>
              </ul>
            </div>

            {/* Act セクション */}
            <div>
              <h2 className="text-xs text-gray-400 uppercase mb-1">Act</h2>
              <ul className="space-y-1 pl-4 text-sm">
                <li>New Try</li>
                <li>If Then</li>
                <li>Log</li>
                <li>Micro Success</li>
              </ul>
            </div>

            {/* My Compass セクション */}
            <div>
              <h2 className="text-xs text-gray-400 uppercase mb-1">My Compass</h2>
              <ul className="space-y-1 pl-4 text-sm">
                <li>Purpose</li>
                <li>Value</li>
                <li>Principles</li>
                <li>Goals</li>
              </ul>
            </div>
          </aside>

          {/* メインコンテンツ */}
          <main className="flex-1 p-8 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
