'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'

// ContactFormを動的インポート
const ContactForm = dynamic(() => import('./ContactForm').then(mod => ({ default: mod.ContactForm })), {
  ssr: false,
  loading: () => (
    <section className="py-24 bg-white dark:bg-gray-900">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Heading as="h2" size="3xl" className="mb-4">
              Loading...
            </Heading>
            <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
              Please wait while we load the contact form.
            </Text>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 dark:bg-gray-800">
                <Heading as="h3" size="lg" className="mb-6">
                  Contact Information
                </Heading>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 dark:bg-gray-700" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 dark:bg-gray-700" />
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700" />
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700" />
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700" />
                <div className="h-32 bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700" />
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse dark:bg-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
})

import type { Dictionary } from '@/lib/i18n'

interface LazyContactFormProps {
  dict: Dictionary
  locale: string
}

export function LazyContactForm({ dict, locale }: LazyContactFormProps) {
  return (
    <Suspense fallback={null}>
      <ContactForm dict={dict} locale={locale} />
    </Suspense>
  )
}