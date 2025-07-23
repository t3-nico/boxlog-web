export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'jp' }
  ]
}

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return children
}