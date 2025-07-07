/**
 * Simplified configuration for English-only site
 */

export type Locale = 'en'

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
  }
]

export const defaultLocale: Locale = 'en'

export function getLocaleConfig(locale: Locale = 'en'): LocaleConfig {
  return locales[0]
}

export function isValidLocale(locale: string): locale is Locale {
  return locale === 'en'
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
 * Dictionary lookup for English-only site
 */
export const dictionaries = { en }

export function getDictionary(locale: Locale = 'en'): Dictionary {
  return dictionaries.en
}