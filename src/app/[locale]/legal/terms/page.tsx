import Link from 'next/link'
import { getDictionary, Locale } from '@/lib/i18n'
import { Container } from '@/components/ui/container'
import { Metadata } from 'next'

interface TermsPageProps {
  params: {
    locale: Locale
  }
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const dict = getDictionary(params.locale)
  
  return {
    title: dict.pages.terms.title,
    description: dict.pages.terms.description,
    robots: 'index, follow',
    openGraph: {
      title: dict.pages.terms.title,
      description: dict.pages.terms.description,
      type: 'website',
    },
  }
}

export default async function TermsPage({ params }: TermsPageProps) {
  const dict = getDictionary(params.locale)

  return (
    <main className="min-h-screen bg-background">
      <Container className="py-16">
        <div className="max-w-4xl mx-auto">
          {/* ヘッダー */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">
              {dict.pages.terms.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {dict.pages.terms.lastUpdated}: 2025年8月5日
            </p>
          </div>

          {/* 利用規約内容 */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                1. サービスの利用について
              </h2>
              <p className="mb-4">
                BoxLogサービス（以下「本サービス」）をご利用いただき、ありがとうございます。
                本利用規約（以下「本規約」）は、BoxLog株式会社（以下「当社」）が提供する本サービスの利用条件を定めるものです。
              </p>
              <p className="mb-4">
                本サービスをご利用になる場合には、本規約に同意していただく必要があります。
                本規約に同意いただけない場合は、本サービスをご利用いただくことはできません。
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                2. アカウント登録
              </h2>
              <p className="mb-4">
                本サービスの一部機能を利用するためには、アカウント登録が必要です。
                登録時には正確かつ最新の情報を提供していただく必要があります。
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>登録情報は常に最新の状態に保ってください</li>
                <li>アカウント情報の管理は利用者の責任において行ってください</li>
                <li>第三者によるアカウントの不正利用を防ぐため、適切なセキュリティ対策を講じてください</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                3. 利用制限・禁止事項
              </h2>
              <p className="mb-4">
                本サービスをご利用いただく際、以下の行為を禁止いたします：
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>法令、規則、条例等に違反する行為</li>
                <li>他の利用者や第三者の権利を侵害する行為</li>
                <li>本サービスの運営を妨げる行為</li>
                <li>不正アクセスやシステムへの攻撃行為</li>
                <li>虚偽の情報を登録・送信する行為</li>
                <li>商用利用を目的とした不正な利用</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                4. 知的財産権
              </h2>
              <p className="mb-4">
                本サービスに関する知的財産権は、当社または正当な権利者に帰属します。
                利用者は、本サービスを通じて得られる情報を、個人的な利用の範囲を超えて使用することはできません。
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                5. プライバシー
              </h2>
              <p className="mb-4">
                個人情報の取り扱いについては、
                <Link href={`/${params.locale}/privacy`} className="text-primary hover:underline">
                  プライバシーポリシー
                </Link>
                をご確認ください。
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                6. 料金・支払い
              </h2>
              <p className="mb-4">
                有料プランをご利用の場合、記載された料金をお支払いいただく必要があります。
                料金は事前の通知なく変更される場合があります。
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                7. サービスの変更・終了
              </h2>
              <p className="mb-4">
                当社は、利用者への事前通知を行うことで、本サービスの内容を変更、追加、削除することができるものとします。
                また、当社の都合により本サービスの提供を終了する場合があります。
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                8. 免責事項
              </h2>
              <p className="mb-4">
                当社は、本サービスの利用により生じた損害について、法律上許される範囲で責任を負わないものとします。
                ただし、当社の故意または重大な過失による場合は除きます。
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                9. 準拠法・管轄裁判所
              </h2>
              <p className="mb-4">
                本規約は日本法に準拠し、本規約に関する紛争については、
                東京地方裁判所を第一審の専属的合意管轄裁判所とします。
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                10. お問い合わせ
              </h2>
              <p className="mb-4">
                本規約に関するご質問は、
                <Link href={`/${params.locale}/contact`} className="text-primary hover:underline">
                  お問い合わせページ
                </Link>
                よりご連絡ください。
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  )
}