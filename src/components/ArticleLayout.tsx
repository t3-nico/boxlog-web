import { Prose } from '@/components/Prose'
import { HeroPattern } from '@/components/HeroPattern'

export function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeroPattern />
      <article className="mx-auto max-w-3xl py-16">
        <Prose>{children}</Prose>
      </article>
    </>
  )
}
