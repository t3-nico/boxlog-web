import { HeroPattern } from '@/components/HeroPattern'

export function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeroPattern />
      {children}
    </>
  )
}
