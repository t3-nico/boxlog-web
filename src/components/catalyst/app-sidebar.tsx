"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import {
  Calendar,
  Briefcase,
  MessagesSquare,
  Settings,
  Menu,
  X,
  UserCircle,
  SidebarClose,
  ChevronDown,
  Plus,
  Search
} from "lucide-react"
import { Menu as HeadlessMenu } from "@headlessui/react"

const topMenu = [
  { name: "Create", icon: Plus, href: "/create" },
  { name: "Search", icon: Search, href: "/search" },
]
const mainMenu = [
  { name: "Calendar", icon: Calendar, href: "/calendar" },
  { name: "Box", icon: Briefcase, href: "/box" },
  { name: "Review", icon: MessagesSquare, href: "/review" },
]

export function AppSidebar({ isDesktopOpen, setIsDesktopOpen, theme }: { isDesktopOpen: boolean, setIsDesktopOpen: (open: boolean) => void, theme: string }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  // メニューリストの共通部分
  const MenuList = (
    <ul className="flex flex-1 flex-col gap-y-4">
      <li>
        <ul className="-mx-2 space-y-0.5">
          {topMenu.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`group flex items-center gap-x-3 rounded-md p-3 text-sm font-semibold
                    ${isActive
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-200 hover:text-white hover:bg-zinc-800"}
                  `}
                >
                  <item.icon className="size-6 shrink-0 group-hover:text-white transition-colors" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
        <ul className="-mx-2 space-y-0.5 mt-3">
          {mainMenu.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`group flex items-center gap-x-3 rounded-md p-3 text-sm font-semibold
                    ${isActive
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-200 hover:text-white hover:bg-zinc-800"}
                  `}
                >
                  <item.icon className="size-6 shrink-0 group-hover:text-white transition-colors" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </li>
    </ul>
  )

  return (
    <>
      {/* モバイル用オフキャンバス */}
      <div className={`fixed inset-0 z-50 flex lg:hidden ${isMobileOpen ? "" : "pointer-events-none"}`} role="dialog" aria-modal="true">
        {/* オーバーレイ */}
        <div
          className={`fixed inset-0 bg-black/80 transition-opacity ${isMobileOpen ? "opacity-100" : "opacity-0"}`}
          aria-hidden="true"
          onClick={() => setIsMobileOpen(false)}
        />
        {/* サイドバー本体 */}
        <div className={`relative flex w-full max-w-xs flex-1 transform transition-transform duration-300 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-zinc-950 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center justify-between">
              <div className="flex items-center gap-x-3">
                <img
                  src="/avatar.png"
                  alt="Avatar"
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-xl font-bold text-white">tomoya</span>
                <ChevronDown className="size-5 text-zinc-400" />
              </div>
            </div>
            <nav className="flex flex-1 flex-col">{MenuList}</nav>
          </div>
          {/* 閉じるボタン */}
          <div className="absolute top-0 left-full flex w-16 justify-center pt-5">
            <button type="button" className="-m-2.5 p-2.5" onClick={() => setIsMobileOpen(false)}>
              <span className="sr-only">Close sidebar</span>
              <X className="size-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* デスクトップ用サイドバー */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col transition-all duration-300 ease-in-out"
        style={{
          opacity: isDesktopOpen ? 1 : 0,
          pointerEvents: isDesktopOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-zinc-950 px-6 pb-4">
          <div className="flex h-12 shrink-0 items-center justify-between" style={{overflow: 'visible', zIndex: 60}}>
            <HeadlessMenu as="div" className="relative z-50">
              <HeadlessMenu.Button as="button" className="flex items-center gap-x-2 focus:outline-none cursor-pointer group">
                <img
                  src="/avatar.png"
                  alt="Avatar"
                  className="h-6 w-6 rounded-full group-hover:ring-2 group-hover:ring-zinc-400 transition"
                />
                <span className="text-base font-bold text-white group-hover:text-zinc-300 transition">tomoya</span>
                <ChevronDown className="size-4 text-zinc-400 group-hover:text-zinc-200 transition" />
              </HeadlessMenu.Button>
              <HeadlessMenu.Items className="absolute left-0 mt-2 w-64 origin-top-left rounded-md bg-zinc-950 shadow-lg ring-1 ring-black/10 focus:outline-none z-50 border border-zinc-800">
                <div className="py-1">
                  <HeadlessMenu.Item>{({ active }: { active: boolean }) => (
                    <Link 
                      href="/settings"
                      className={`w-full flex items-center px-4 py-2 text-sm text-zinc-200 transition ${active ? 'bg-zinc-800 text-white' : ''}`}
                    >
                      Settings <span className="ml-auto text-xs text-zinc-400"></span>
                    </Link>
                  )}</HeadlessMenu.Item>
                  <HeadlessMenu.Item>{({ active }: { active: boolean }) => (
                    <button className={`w-full flex items-center px-4 py-2 text-sm text-zinc-200 transition ${active ? 'bg-zinc-800 text-white' : ''}`}>Invite and manage members</button>
                  )}</HeadlessMenu.Item>
                  <HeadlessMenu.Item>{({ active }: { active: boolean }) => (
                    <button className={`w-full flex items-center px-4 py-2 text-sm text-zinc-200 transition ${active ? 'bg-zinc-800 text-white' : ''}`}>Download desktop app</button>
                  )}</HeadlessMenu.Item>
                  <HeadlessMenu.Item>{({ active }: { active: boolean }) => (
                    <button className={`w-full flex items-center px-4 py-2 text-sm text-zinc-200 transition ${active ? 'bg-zinc-800 text-white' : ''}`}>Switch workspace <span className="ml-auto text-xs text-zinc-400"></span></button>
                  )}</HeadlessMenu.Item>
                  <HeadlessMenu.Item>{({ active }: { active: boolean }) => (
                    <button className={`w-full flex items-center px-4 py-2 text-sm text-red-400 transition ${active ? 'bg-zinc-800 text-red-300' : ''}`}>Log out <span className="ml-auto text-xs text-zinc-400"></span></button>
                  )}</HeadlessMenu.Item>
                </div>
              </HeadlessMenu.Items>
            </HeadlessMenu>
            <button 
              type="button" 
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              onClick={() => setIsDesktopOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <SidebarClose size={20} />
            </button>
          </div>
          <nav className="flex flex-1 flex-col">{MenuList}</nav>
        </div>
      </div>

      {/* サイドバーが閉じているときのアイコン表示 */}
      {!isDesktopOpen && (
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-16 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-zinc-950 px-2 pb-4">
            <div className="flex h-12 shrink-0 items-center justify-center">
              <button 
                type="button" 
                className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors"
                onClick={() => setIsDesktopOpen(true)}
              >
                <SidebarClose size={20} className="rotate-180" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul className="flex flex-col">
                {/* 上部グループ */}
                <li>
                  <ul className="flex flex-col gap-y-1">
                    {topMenu.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={`group flex items-center justify-center p-3 rounded-lg transition-colors
                              ${isActive
                                ? "bg-zinc-100 text-zinc-900"
                                : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}
                            `}
                            title={item.name}
                          >
                            <item.icon className="size-6 group-hover:text-zinc-900 transition-colors" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                {/* グループ間余白 */}
                <li className="my-2" aria-hidden="true" />
                {/* 下部グループ */}
                <li>
                  <ul className="flex flex-col gap-y-1">
                    {mainMenu.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={`group flex items-center justify-center p-3 rounded-lg transition-colors
                              ${isActive
                                ? "bg-zinc-100 text-zinc-900"
                                : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}
                            `}
                            title={item.name}
                          >
                            <item.icon className="size-6 group-hover:text-zinc-900 transition-colors" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* モバイル用サイドバーを開くボタン */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4 shadow-sm lg:hidden">
        <div className="flex items-center gap-x-2">
          <button type="button" className="-m-2.5 p-2.5 text-white" onClick={() => setIsMobileOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Menu className="size-5" />
          </button>
          <HeadlessMenu as="div" className="relative z-50">
            <HeadlessMenu.Button as="button" className="flex items-center gap-x-2 focus:outline-none cursor-pointer group">
              <img
                src="/avatar.png"
                alt="Avatar"
                className="h-6 w-6 rounded-full group-hover:ring-2 group-hover:ring-zinc-400 transition"
              />
              <span className="text-base font-bold text-white group-hover:text-zinc-300 transition">tomoya</span>
              <ChevronDown className="size-4 text-zinc-400 group-hover:text-zinc-200 transition" />
            </HeadlessMenu.Button>
            <HeadlessMenu.Items className="absolute left-0 mt-2 w-64 origin-top-left rounded-md bg-zinc-950 shadow-lg ring-1 ring-black/10 focus:outline-none z-50 border border-zinc-800">
              <div className="py-1">
                <HeadlessMenu.Item>{({ active }: { active: boolean }) => (
                  <Link 
                    href="/settings"
                    className={`w-full flex items-center px-4 py-2 text-sm text-zinc-200 transition ${active ? 'bg-zinc-800 text-white' : ''}`}
                  >
                    Settings <span className="ml-auto text-xs text-zinc-400">G then S</span>
                  </Link>
                )}</HeadlessMenu.Item>
                <HeadlessMenu.Item>{({ active }: { active: boolean }) => (
                  <button className={`w-full flex items-center px-4 py-2 text-sm text-zinc-200 transition ${active ? 'bg-zinc-800 text-white' : ''}`}>Invite and manage members</button>
                )}</HeadlessMenu.Item>
                <HeadlessMenu.Item>{({ active }: { active: boolean }) => (
                  <button className={`w-full flex items-center px-4 py-2 text-sm text-zinc-200 transition ${active ? 'bg-zinc-800 text-white' : ''}`}>Download desktop app</button>
                )}</HeadlessMenu.Item>
                <HeadlessMenu.Item>{({ active }: { active: boolean }) => (
                  <button className={`w-full flex items-center px-4 py-2 text-sm text-zinc-200 transition ${active ? 'bg-zinc-800 text-white' : ''}`}>Switch workspace <span className="ml-auto text-xs text-zinc-400">O then W</span></button>
                )}</HeadlessMenu.Item>
                <HeadlessMenu.Item>{({ active }: { active: boolean }) => (
                  <button className={`w-full flex items-center px-4 py-2 text-sm text-red-400 transition ${active ? 'bg-zinc-800 text-red-300' : ''}`}>Log out <span className="ml-auto text-xs text-zinc-400">⌥ Q</span></button>
                )}</HeadlessMenu.Item>
              </div>
            </HeadlessMenu.Items>
          </HeadlessMenu>
        </div>
      </div>
    </>
  )
} 