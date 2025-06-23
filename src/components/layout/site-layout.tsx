"use client"

import { usePathname } from 'next/navigation'
import Header from './header'
import Footer from './footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const show = !pathname.startsWith('/app')
  return (
    <>
      {show && <Header />}
      {children}
      {show && <Footer />}
    </>
  )
}
