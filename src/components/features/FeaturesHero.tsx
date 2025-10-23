import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import type { Dictionary } from '@/lib/i18n'

interface FeaturesHeroProps {
  dict: Dictionary
}

export function FeaturesHero({ dict }: FeaturesHeroProps) {
  return (
    <section className="relative py-24 bg-gradient-to-b from-neutral-50 to-neutral-50 dark:from-neutral-900 dark:to-neutral-800">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-neutral-100 text-neutral-700 text-sm font-medium rounded-full mb-8 dark:bg-neutral-800/30 dark:text-neutral-300">
            <span className="w-2 h-2 bg-neutral-500 rounded-full mr-2"></span>
            {dict.pages.features.hero.badge}
          </div>
          
          <Heading as="h1" size="4xl" className="mb-6">
            <span className="bg-gradient-to-r from-neutral-700 to-neutral-900 dark:from-neutral-200 dark:to-neutral-50 bg-clip-text text-transparent">
              {dict.pages.features.hero.headline}
            </span>
          </Heading>
          
          <Text size="xl" variant="muted" className="mb-8 max-w-3xl mx-auto">
            {dict.pages.features.hero.description}
          </Text>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/signup">
                {dict.pages.features.hero.startTrial}
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/demo">
                {dict.pages.features.hero.scheduleDemo}
              </a>
            </Button>
          </div>
        </div>
      </Container>
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-neutral-200 rounded-full opacity-20 blur-3xl dark:bg-neutral-600 dark:opacity-10"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-neutral-300 rounded-full opacity-20 blur-3xl dark:bg-neutral-700 dark:opacity-10"></div>
      </div>
    </section>
  )
}