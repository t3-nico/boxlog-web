import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getDictionary } from '@/lib/i18n'
import { Toaster } from 'sonner'

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'jp' }]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale as 'en' | 'jp')

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main id="main-content" role="main">
        {children}
      </main>
      <Footer locale={locale} dict={dict} />
      <Toaster richColors position="top-right" />
    </>
  )
}
