/**
 * Multilingual configuration for English and Japanese
 */

export type Locale = 'en' | 'jp'

export interface LocaleConfig {
  code: Locale
  name: string
  nativeName: string
  direction: 'ltr' | 'rtl'
  country: string
  region: string
}

export const locales: LocaleConfig[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    country: 'US',
    region: 'Americas'
  },
  {
    code: 'jp',
    name: 'Japanese',
    nativeName: '日本語',
    direction: 'ltr',
    country: 'JP',
    region: 'Asia'
  }
]

export const defaultLocale: Locale = 'en'

export function getLocaleConfig(locale: Locale = 'en'): LocaleConfig {
  return locales.find(l => l.code === locale) || locales[0]
}

export function isValidLocale(locale: string): locale is Locale {
  return locale === 'en' || locale === 'jp'
}

/**
 * Dictionary type for translations
 */
export interface Dictionary {
  common: {
    home: string
    about: string
    features: string
    pricing: string
    blog: string
    docs: string
    contact: string
    releases: string
    search: string
    login: string
    signup: string
    getStarted: string
    learnMore: string
    readMore: string
    viewAll: string
    loading: string
    error: string
    notFound: string
    backToHome: string
    language: string
    theme: string
    menu: string
    close: string
  }
  metadata: {
    siteName: string
    siteDescription: string
    keywords: string[]
  }
  navigation: {
    main: string
    footer: string
    breadcrumbs: string
    pagination: string
  }
  pages: {
    home: {
      title: string
      subtitle: string
      cta: string
    }
    features: {
      title: string
      subtitle: string
    }
    pricing: {
      title: string
      subtitle: string
    }
    blog: {
      title: string
      subtitle: string
      readTime: string
      publishedOn: string
      updatedOn: string
    }
    docs: {
      title: string
      subtitle: string
      searchPlaceholder: string
    }
    contact: {
      title: string
      subtitle: string
    }
    privacy: {
      title: string
      subtitle: string
      lastUpdated: string
    }
    notFound: {
      title: string
      subtitle: string
      description: string
    }
  }
  forms: {
    name: string
    email: string
    message: string
    submit: string
    sending: string
    sent: string
    required: string
    invalid: string
  }
  footer: {
    copyright: string
    privacyPolicy: string
    termsOfService: string
    cookiePolicy: string
  }
}

/**
 * English translations
 */
export const en: Dictionary = {
  common: {
    home: 'Home',
    about: 'About',
    features: 'Features',
    pricing: 'Pricing',
    blog: 'Blog',
    docs: 'Documentation',
    contact: 'Contact',
    releases: 'Releases',
    search: 'Search',
    login: 'Login',
    signup: 'Sign up',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    readMore: 'Read More',
    viewAll: 'View All',
    loading: 'Loading...',
    error: 'Error',
    notFound: 'Not Found',
    backToHome: 'Back to Home',
    language: 'Language',
    theme: 'Theme',
    menu: 'Menu',
    close: 'Close'
  },
  metadata: {
    siteName: 'YourSaaS',
    siteDescription: 'A modern SaaS platform built with Next.js and Tailwind CSS',
    keywords: ['SaaS', 'platform', 'business', 'productivity', 'automation']
  },
  navigation: {
    main: 'Main navigation',
    footer: 'Footer navigation',
    breadcrumbs: 'Breadcrumb navigation',
    pagination: 'Pagination navigation'
  },
  pages: {
    home: {
      title: 'Modern SaaS Platform for Scalable Applications',
      subtitle: 'Build, deploy, and scale your SaaS applications with YourSaaS.',
      cta: 'Start Building Today'
    },
    features: {
      title: 'Powerful Features for Modern SaaS',
      subtitle: 'Everything you need to build and scale your SaaS application'
    },
    pricing: {
      title: 'Simple, Transparent Pricing',
      subtitle: 'Choose the plan that fits your needs'
    },
    blog: {
      title: 'SaaS Development & Tech Insights',
      subtitle: 'Latest articles on SaaS development, technology, and business strategy',
      readTime: 'min read',
      publishedOn: 'Published on',
      updatedOn: 'Updated on'
    },
    docs: {
      title: 'Documentation',
      subtitle: 'Everything you need to build amazing products with YourSaaS',
      searchPlaceholder: 'Search documentation...'
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Have questions? We\'d love to hear from you.'
    },
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'How we collect, use, and protect your information',
      lastUpdated: 'Last updated'
    },
    notFound: {
      title: 'Page Not Found',
      subtitle: '404 Error',
      description: 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
    }
  },
  forms: {
    name: 'Name',
    email: 'Email',
    message: 'Message',
    submit: 'Submit',
    sending: 'Sending...',
    sent: 'Message sent successfully!',
    required: 'This field is required',
    invalid: 'Please enter a valid value'
  },
  footer: {
    copyright: 'All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    cookiePolicy: 'Cookie Policy'
  }
}

/**
 * Japanese translations
 */
export const jp: Dictionary = {
  common: {
    home: 'ホーム',
    about: '概要',
    features: '機能',
    pricing: '料金',
    blog: 'ブログ',
    docs: 'ドキュメント',
    contact: 'お問い合わせ',
    releases: 'リリース',
    search: '検索',
    login: 'ログイン',
    signup: '新規登録',
    getStarted: '今すぐ始める',
    learnMore: '詳細を見る',
    readMore: '続きを読む',
    viewAll: 'すべて表示',
    loading: '読み込み中...',
    error: 'エラー',
    notFound: '見つかりません',
    backToHome: 'ホームに戻る',
    language: '言語',
    theme: 'テーマ',
    menu: 'メニュー',
    close: '閉じる'
  },
  metadata: {
    siteName: 'YourSaaS',
    siteDescription: 'Next.jsとTailwind CSSで構築されたモダンなSaaSプラットフォーム。スケーラブルで高性能なWebアプリケーションを簡単に構築できます。',
    keywords: ['SaaS', 'プラットフォーム', 'ビジネス', '生産性', '自動化']
  },
  navigation: {
    main: 'メインナビゲーション',
    footer: 'フッターナビゲーション',
    breadcrumbs: 'パンくずナビゲーション',
    pagination: 'ページネーションナビゲーション'
  },
  pages: {
    home: {
      title: 'スケーラブルなアプリケーションのためのモダンSaaSプラットフォーム',
      subtitle: 'YourSaaSで次世代のSaaSアプリケーションを構築、デプロイ、スケールしましょう。',
      cta: '今すぐ構築を始める'
    },
    features: {
      title: 'モダンSaaSのための強力な機能',
      subtitle: 'SaaSアプリケーションの構築とスケールに必要なすべて'
    },
    pricing: {
      title: 'シンプルで透明な料金体系',
      subtitle: 'ニーズに合ったプランをお選びください'
    },
    blog: {
      title: 'SaaS開発＆技術インサイト',
      subtitle: 'SaaS開発、技術、ビジネス戦略に関する最新記事',
      readTime: '分で読了',
      publishedOn: '公開日',
      updatedOn: '更新日'
    },
    docs: {
      title: 'ドキュメント',
      subtitle: 'YourSaaSで素晴らしい製品を構築するために必要なすべて',
      searchPlaceholder: 'ドキュメントを検索...'
    },
    contact: {
      title: 'お問い合わせ',
      subtitle: 'ご質問がございましたら、お気軽にお声がけください。'
    },
    privacy: {
      title: 'プライバシーポリシー',
      subtitle: '情報の収集、利用、保護に関する方針',
      lastUpdated: '最終更新'
    },
    notFound: {
      title: 'ページが見つかりません',
      subtitle: '404エラー',
      description: 'お探しのページは削除、名前変更、または一時的に利用できない可能性があります。'
    }
  },
  forms: {
    name: '名前',
    email: 'メールアドレス',
    message: 'メッセージ',
    submit: '送信',
    sending: '送信中...',
    sent: 'メッセージが正常に送信されました！',
    required: 'この項目は必須です',
    invalid: '有効な値を入力してください'
  },
  footer: {
    copyright: 'すべての権利を保有しています。',
    privacyPolicy: 'プライバシーポリシー',
    termsOfService: '利用規約',
    cookiePolicy: 'クッキーポリシー'
  }
}

/**
 * Dictionary lookup for multilingual site
 */
export const dictionaries = { en, jp }

export function getDictionary(locale: Locale = 'en'): Dictionary {
  // Validate locale and fallback to English if invalid
  if (!isValidLocale(locale)) {
    console.warn(`Invalid locale '${locale}', falling back to 'en'`)
    return dictionaries.en
  }
  
  return dictionaries[locale] || dictionaries.en
}

/**
 * Get localized text with fallback
 */
export function getLocalizedText(
  key: keyof Dictionary,
  locale: Locale = 'en'
): Dictionary[keyof Dictionary] {
  const dict = getDictionary(locale)
  return dict[key]
}

/**
 * Format localized date
 */
export function formatLocalizedDate(
  date: Date,
  locale: Locale = 'en',
  options?: Intl.DateTimeFormatOptions
): string {
  const localeMap = {
    en: 'en-US',
    jp: 'ja-JP'
  }
  
  return new Intl.DateTimeFormat(localeMap[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  }).format(date)
}

/**
 * Format localized number
 */
export function formatLocalizedNumber(
  number: number,
  locale: Locale = 'en',
  options?: Intl.NumberFormatOptions
): string {
  const localeMap = {
    en: 'en-US',
    jp: 'ja-JP'
  }
  
  return new Intl.NumberFormat(localeMap[locale], options).format(number)
}

/**
 * Get opposite locale
 */
export function getOppositeLocale(locale: Locale): Locale {
  return locale === 'en' ? 'jp' : 'en'
}

/**
 * Get locale display name
 */
export function getLocaleDisplayName(locale: Locale, displayLocale: Locale = locale): string {
  const config = getLocaleConfig(locale)
  return displayLocale === locale ? config.nativeName : config.name
}