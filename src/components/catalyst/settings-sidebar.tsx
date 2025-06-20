"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Settings,
  User,
  Bell,
  Users,
  Link2,
  ChevronLeft,
} from "lucide-react"

const sections = [
  {
    items: [
      { name: "Preferences", href: "/settings", icon: Settings },
      { name: "Profile", href: "/settings/profile", icon: User },
      { name: "Notifications", href: "/settings/notifications", icon: Bell },
      { name: "Security & access", href: "/settings/security", icon: Users },
      { name: "Connected accounts", href: "/settings/accounts", icon: Link2 },
    ],
  },
]

export function SettingsSidebar() {
  const router = useRouter()

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-[260px] lg:fixed lg:inset-y-0 bg-zinc-950 border-r border-zinc-800">
      <div className="flex flex-col grow p-4">
        {/* Back to app */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 px-2 py-2 text-zinc-400 hover:text-white rounded transition mb-3 text-sm font-normal"
        >
          <ChevronLeft className="size-5" />
          <span>Back to app</span>
        </button>
        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-col gap-y-1 p-0 m-0">
            {sections[0].items.map(item => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="group flex items-center gap-2 rounded px-2 py-2 text-sm font-normal text-zinc-100 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <item.icon className="size-5 shrink-0 text-zinc-400 group-hover:text-white transition-colors" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
} 