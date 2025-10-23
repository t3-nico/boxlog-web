export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'jp' }
  ]
}

import { OptimizedLayout } from '@/components/layout/OptimizedLayout'

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <OptimizedLayout locale={locale}>
      {children}
    </OptimizedLayout>
  )
}