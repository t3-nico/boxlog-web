import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import type { Dictionary } from '@/lib/i18n'

interface FeaturesCTAProps {
  dict: Dictionary
}

export function FeaturesCTA({ dict }: FeaturesCTAProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-950 relative overflow-hidden">
      <Container>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Heading as="h2" size="4xl" className="text-white mb-6">
            {dict.pages.features.cta.title}
          </Heading>

          <Text
            size="xl"
            className="text-neutral-100 dark:text-neutral-200 mb-4 max-w-2xl mx-auto"
          >
            {dict.pages.features.cta.subtitle}
          </Text>

          <Text
            size="lg"
            className="text-neutral-200 dark:text-neutral-300 mb-12 max-w-xl mx-auto"
          >
            {dict.pages.features.cta.description}
          </Text>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white dark:bg-neutral-100 text-neutral-700 dark:text-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-200 shadow-lg"
              asChild
            >
              <a href={dict.pages.features.cta.primaryButton.href}>
                {dict.pages.features.cta.primaryButton.text}
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur"
              asChild
            >
              <a href={dict.pages.features.cta.secondaryButton.href}>
                {dict.pages.features.cta.secondaryButton.text}
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {dict.pages.features.cta.stats.uptime.value}
              </div>
              <div className="text-neutral-200 text-sm">
                {dict.pages.features.cta.stats.uptime.label}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {dict.pages.features.cta.stats.customers.value}
              </div>
              <div className="text-neutral-200 text-sm">
                {dict.pages.features.cta.stats.customers.label}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {dict.pages.features.cta.stats.support.value}
              </div>
              <div className="text-neutral-200 text-sm">
                {dict.pages.features.cta.stats.support.label}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neutral-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9ImdyaWQiIG9wYWNpdHk9IjAuMSI+CjxwYXRoIGQ9Ik0wIDQwVjBIMUwwIDQwWiIgZmlsbD0id2hpdGUiLz4KPHA+'})] opacity-20"></div>
    </section>
  )
}
