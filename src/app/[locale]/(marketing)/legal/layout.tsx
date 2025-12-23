/**
 * 法的文書ページ用レイアウト
 *
 * @description
 * 法的文書ページ（/legal/privacy, /legal/terms等）で使用。
 * 親レイアウトの共通Header/Footerを使用し、ナビゲーションのみ追加。
 */
'use client'

import { Link } from '@/i18n/navigation'
import type { ReactNode } from 'react'

import { useTranslations } from 'next-intl'

interface LegalLayoutProps {
  children: ReactNode
}

export default function LegalLayout({ children }: LegalLayoutProps) {
  const t = useTranslations()

  return (
    <div className="bg-background">
      {/* 法的ページ内ナビゲーション */}
      <nav className="border-border border-b">
        <div className="container mx-auto max-w-6xl px-4 py-4 md:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors hover:underline"
            >
              {t('legal.navigation.backToApp')}
            </Link>
            <div className="border-border ml-auto flex flex-wrap gap-4 border-l pl-4">
              <Link
                href="/legal/privacy"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors hover:underline"
              >
                {t('legal.navigation.privacy')}
              </Link>
              <Link
                href="/legal/terms"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors hover:underline"
              >
                {t('legal.navigation.terms')}
              </Link>
              <Link
                href="/legal/tokushoho"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors hover:underline"
              >
                {t('legal.navigation.tokushoho')}
              </Link>
              <Link
                href="/legal/security"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors hover:underline"
              >
                {t('legal.navigation.security')}
              </Link>
              <Link
                href="/legal/cookies"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors hover:underline"
              >
                {t('legal.navigation.cookies')}
              </Link>
              <Link
                href="/legal/oss-credits"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors hover:underline"
              >
                {t('legal.navigation.ossCredits')}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* メインコンテンツ */}
      {children}
    </div>
  )
}
