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
      hero: {
        badge: string
        headline: string
        description: string
        startTrial: string
        scheduleDemo: string
      }
      grid: {
        title: string
        subtitle: string
      }
      categories: {
        integration: string
        analytics: string
        security: string
        workflow: string
        collaboration: string
        mobile: string
      }
      items: {
        apiIntegration: {
          title: string
          description: string
        }
        realTimeAnalytics: {
          title: string
          description: string
        }
        advancedSecurity: {
          title: string
          description: string
        }
        workflowAutomation: {
          title: string
          description: string
        }
        teamCollaboration: {
          title: string
          description: string
        }
        mobileOptimized: {
          title: string
          description: string
        }
      }
      details: {
        integration: {
          subtitle: string
          title: string
          description: string
          features: string[]
        }
        analytics: {
          subtitle: string
          title: string
          description: string
          features: string[]
        }
        security: {
          subtitle: string
          title: string
          description: string
          features: string[]
        }
      }
      cta: {
        title: string
        subtitle: string
        description: string
        primaryButton: {
          text: string
          href: string
        }
        secondaryButton: {
          text: string
          href: string
        }
        stats: {
          uptime: {
            value: string
            label: string
          }
          customers: {
            value: string
            label: string
          }
          support: {
            value: string
            label: string
          }
        }
      }
    }
    about: {
      title: string
      subtitle: string
      hero: {
        title: string
        description: string
        contactButton: string
        teamButton: string
      }
      mission: {
        title: string
        content: string
        description: string
      }
      vision: {
        title: string
        content: string
        description: string
      }
      values: {
        title: string
        subtitle: string
        items: {
          customerFirst: {
            title: string
            description: string
          }
          innovation: {
            title: string
            description: string
          }
          transparency: {
            title: string
            description: string
          }
          excellence: {
            title: string
            description: string
          }
        }
      }
      team: {
        title: string
        subtitle: string
        hiring: {
          title: string
          description: string
          careersButton: string
          contactButton: string
        }
      }
      cta: {
        title: string
        description: string
        startButton: string
        featuresButton: string
      }
    }
    pricing: {
      title: string
      subtitle: string
      hero: {
        title: string
        subtitle: string
        description: string
        trialNote: string
      }
      trustIndicators: {
        trial: {
          title: string
          description: string
        }
        security: {
          title: string
          description: string
        }
        support: {
          title: string
          description: string
        }
      }
      cta: {
        title: string
        description: string
        startButton: string
        salesButton: string
      }
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
      support: {
        email: {
          title: string
          description: string
        }
        phone: {
          title: string
          description: string
        }
        chat: {
          title: string
          description: string
        }
      }
      office: {
        title: string
        address: {
          label: string
          value: string
        }
        hours: {
          label: string
          value: string
        }
        access: {
          label: string
          value: string
        }
      }
      supportInfo: {
        title: string
        docs: {
          title: string
          description: string
          button: string
        }
        faq: {
          title: string
          description: string
          button: string
        }
        status: {
          title: string
          description: string
          button: string
        }
      }
      emergency: {
        title: string
        description: string
        hotline: {
          label: string
          phone: string
          availability: string
        }
        email: {
          label: string
          email: string
          priority: string
        }
      }
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
    releases: {
      title: string
      subtitle: string
    }
    tags: {
      title: string
      description: string
      breadcrumbHome: string
      allTags: string
      relatedContent: string
      noContentFound: string
      contentTypes: {
        blog: string
        releases: string
        docs: string
      }
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
      subtitle: 'Everything you need to build and scale your SaaS application',
      hero: {
        badge: 'Features',
        headline: 'Everything you need to scale your business',
        description: 'From powerful APIs to advanced analytics, YourSaaS provides all the tools you need to build, deploy, and scale your applications with confidence.',
        startTrial: 'Start Free Trial',
        scheduleDemo: 'Schedule Demo'
      },
      grid: {
        title: 'Powerful features for modern teams',
        subtitle: 'Everything you need to build, deploy, and scale your applications in one integrated platform.'
      },
      categories: {
        integration: 'Integration',
        analytics: 'Analytics',
        security: 'Security',
        workflow: 'Workflow',
        collaboration: 'Collaboration',
        mobile: 'Mobile'
      },
      items: {
        apiIntegration: {
          title: 'API Integration',
          description: 'Connect with 100+ third-party services and build custom integrations with our powerful REST API.'
        },
        realTimeAnalytics: {
          title: 'Real-time Analytics',
          description: 'Get detailed insights into your application performance with comprehensive analytics and reporting.'
        },
        advancedSecurity: {
          title: 'Advanced Security',
          description: 'Enterprise-grade security with SSL encryption, two-factor authentication, and compliance certifications.'
        },
        workflowAutomation: {
          title: 'Workflow Automation',
          description: 'Streamline your processes with powerful automation tools and custom workflow builders.'
        },
        teamCollaboration: {
          title: 'Team Collaboration',
          description: 'Work together seamlessly with real-time collaboration, comments, and team management features.'
        },
        mobileOptimized: {
          title: 'Mobile Optimized',
          description: 'Fully responsive design that works perfectly on all devices and screen sizes.'
        }
      },
      details: {
        integration: {
          subtitle: 'Seamless Integration',
          title: 'Connect everything with powerful APIs',
          description: 'Our comprehensive API ecosystem allows you to integrate with hundreds of third-party services and build custom solutions that perfectly fit your workflow.',
          features: [
            'REST API with comprehensive documentation',
            'Webhooks for real-time notifications',
            'Pre-built integrations with popular tools',
            'Custom SDK for multiple programming languages'
          ]
        },
        analytics: {
          subtitle: 'Advanced Analytics',
          title: 'Data-driven insights for better decisions',
          description: 'Get deep insights into your application performance and user behavior with our advanced analytics platform and customizable dashboards.',
          features: [
            'Real-time performance monitoring',
            'Custom dashboard creation',
            'Advanced filtering and segmentation',
            'Automated reporting and alerts'
          ]
        },
        security: {
          subtitle: 'Enterprise Security',
          title: 'Bank-level security for your peace of mind',
          description: 'Your data security is our top priority. We implement industry-leading security measures to protect your information and ensure compliance.',
          features: [
            'End-to-end encryption for all data',
            'SOC 2 Type II compliance',
            'Multi-factor authentication',
            'Regular security audits and penetration testing'
          ]
        }
      },
      cta: {
        title: 'Ready to transform your business?',
        subtitle: 'Join thousands of companies already using YourSaaS to build better products.',
        description: 'Start your free trial today and experience the power of our platform.',
        primaryButton: {
          text: 'Start Free Trial',
          href: '/signup'
        },
        secondaryButton: {
          text: 'Contact Sales',
          href: '/contact'
        },
        stats: {
          uptime: {
            value: '99.9%',
            label: 'Uptime SLA'
          },
          customers: {
            value: '10k+',
            label: 'Happy Customers'
          },
          support: {
            value: '24/7',
            label: 'Expert Support'
          }
        }
      }
    },
    about: {
      title: 'About Us',
      subtitle: 'Learn about our mission, team, and values. We create technology that empowers everyone to build a better future.',
      hero: {
        title: 'About Us',
        description: 'YourSaaS is an innovative SaaS platform that supports corporate growth through the power of technology. Our mission is to realize a world where everyone can create a better future.',
        contactButton: 'Contact Us',
        teamButton: 'Meet the Team'
      },
      mission: {
        title: 'Our Mission',
        content: 'Empowering Innovation Through Technology',
        description: 'We believe that technology should be accessible, powerful, and intuitive. Our mission is to create tools that empower businesses to innovate, grow, and succeed in the digital age.'
      },
      vision: {
        title: 'Our Vision',
        content: 'A World Where Everyone Can Create',
        description: 'We envision a future where advanced technology is within everyone\'s reach, enabling individuals and organizations to build solutions that make a positive impact on the world.'
      },
      values: {
        title: 'Our Values',
        subtitle: 'These values guide our decision-making and actions',
        items: {
          customerFirst: {
            title: 'Customer First',
            description: 'Our customers\' success is our success. We always develop products and provide services from the customer\'s perspective.'
          },
          innovation: {
            title: 'Innovation',
            description: 'We continue to follow the latest technology trends and provide innovative solutions that lead the industry.'
          },
          transparency: {
            title: 'Transparency',
            description: 'We value open and transparent communication and build trust relationships.'
          },
          excellence: {
            title: 'Excellence',
            description: 'We continuously improve and learn to provide high-quality products and services.'
          }
        }
      },
      team: {
        title: 'Our Team',
        subtitle: 'Experts from diverse backgrounds work together toward a common vision',
        hiring: {
          title: 'Want to Work With Us?',
          description: 'We are always looking for talented people. If you\'re interested in creating innovative products, please contact us.',
          careersButton: 'View Career Opportunities',
          contactButton: 'Contact Us'
        }
      },
      cta: {
        title: 'Let\'s Create the Future Together',
        description: 'Unlock your business potential with our platform. Start today and take the first step toward digital transformation.',
        startButton: 'Start Free',
        featuresButton: 'View Features'
      }
    },
    pricing: {
      title: 'Simple, Transparent Pricing',
      subtitle: 'Choose the plan that fits your needs',
      hero: {
        title: 'Simple, transparent pricing',
        subtitle: 'Choose the perfect plan for your team. All plans include a 14-day free trial.',
        description: 'Start free, scale as you grow. Cancel anytime.',
        trialNote: 'No credit card required.'
      },
      trustIndicators: {
        trial: {
          title: '14-day free trial',
          description: 'No credit card required to get started'
        },
        security: {
          title: 'Secure & compliant',
          description: 'SOC 2 Type II certified and GDPR compliant'
        },
        support: {
          title: '24/7 support',
          description: 'Expert support when you need it most'
        }
      },
      cta: {
        title: 'Ready to get started?',
        description: 'Join thousands of teams who trust our platform to scale their business. Start your free trial today.',
        startButton: 'Start Free Trial',
        salesButton: 'Talk to Sales'
      }
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
      subtitle: 'Have questions? We\'d love to hear from you. Our expert team will respond quickly.',
      support: {
        email: {
          title: 'Email Support',
          description: 'We\'ll respond within 24 hours'
        },
        phone: {
          title: 'Phone Support',
          description: 'Weekdays 9:00-18:00'
        },
        chat: {
          title: 'Chat Support',
          description: 'Real-time support'
        }
      },
      office: {
        title: 'Office Information',
        address: {
          label: 'Head Office',
          value: '100-0001\\nTokyo, Chiyoda-ku, Chiyoda 1-1-1\\nYourSaaS Building 5F'
        },
        hours: {
          label: 'Business Hours',
          value: 'Weekdays: 9:00 - 18:00\\nWeekends & Holidays: Closed'
        },
        access: {
          label: 'Access',
          value: 'Tokyo Station: 5 min walk\\nOtemachi Station: 3 min walk'
        }
      },
      supportInfo: {
        title: 'Support Information',
        docs: {
          title: 'Documentation',
          description: 'Detailed usage guide',
          button: 'View Documentation'
        },
        faq: {
          title: 'Frequently Asked Questions',
          description: 'Common questions from customers',
          button: 'View FAQ'
        },
        status: {
          title: 'Status Page',
          description: 'Service availability status',
          button: 'Check Status'
        }
      },
      emergency: {
        title: 'Emergency Contact',
        description: 'If you are experiencing critical service issues or security emergencies, please call our emergency contact.',
        hotline: {
          label: 'Emergency Hotline',
          phone: '03-1234-9999',
          availability: '24/7 Available'
        },
        email: {
          label: 'Emergency Email',
          email: 'emergency@yoursaas.com',
          priority: 'Highest Priority Response'
        }
      }
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
    },
    releases: {
      title: 'Release Notes',
      subtitle: 'Latest features, improvements, and bug fixes for the YourSaaS platform. All changes are transparently documented and delivered rapidly to our customers.'
    },
    tags: {
      title: 'Tagged Articles',
      description: 'Related blog posts, release notes, and documentation.',
      breadcrumbHome: 'Home',
      allTags: 'All Tags',
      relatedContent: 'Related Content',
      noContentFound: 'No content found for this tag.',
      contentTypes: {
        blog: 'Blog',
        releases: 'Releases',
        docs: 'Documentation'
      }
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
      subtitle: 'SaaSアプリケーションの構築とスケールに必要なすべて',
      hero: {
        badge: '機能',
        headline: 'ビジネスをスケールするために必要なすべて',
        description: '強力なAPIから高度な分析まで、YourSaaSはアプリケーションの構築、デプロイ、スケールに必要なすべてのツールを自信を持って提供します。',
        startTrial: '無料トライアル開始',
        scheduleDemo: 'デモを予約'
      },
      grid: {
        title: 'モダンチームのための強力な機能',
        subtitle: 'アプリケーションの構築、デプロイ、スケールに必要なすべてを統合プラットフォームで提供します。'
      },
      categories: {
        integration: '統合',
        analytics: '分析',
        security: 'セキュリティ',
        workflow: 'ワークフロー',
        collaboration: 'コラボレーション',
        mobile: 'モバイル'
      },
      items: {
        apiIntegration: {
          title: 'API統合',
          description: '100以上のサードパーティサービスと接続し、強力なREST APIでカスタム統合を構築できます。'
        },
        realTimeAnalytics: {
          title: 'リアルタイム分析',
          description: '包括的な分析とレポート機能により、アプリケーションのパフォーマンスに関する詳細な洞察を得られます。'
        },
        advancedSecurity: {
          title: '高度なセキュリティ',
          description: 'SSL暗号化、二要素認証、コンプライアンス認証を備えたエンタープライズグレードのセキュリティ。'
        },
        workflowAutomation: {
          title: 'ワークフロー自動化',
          description: '強力な自動化ツールとカスタムワークフロービルダーでプロセスを合理化します。'
        },
        teamCollaboration: {
          title: 'チーム コラボレーション',
          description: 'リアルタイムコラボレーション、コメント、チーム管理機能でシームレスに連携します。'
        },
        mobileOptimized: {
          title: 'モバイル最適化',
          description: 'すべてのデバイスと画面サイズで完璧に動作する完全レスポンシブデザイン。'
        }
      },
      details: {
        integration: {
          subtitle: 'シームレスな統合',
          title: '強力なAPIですべてを接続',
          description: '包括的なAPIエコシステムにより、数百のサードパーティーサービスと統合し、ワークフローに完璧に適合するカスタムソリューションを構築できます。',
          features: [
            '包括的なドキュメントを備えたREST API',
            'リアルタイム通知のためのWebhook',
            '人気ツールとの事前構築済み統合',
            '複数のプログラミング言語対応のカスタムSDK'
          ]
        },
        analytics: {
          subtitle: '高度な分析',
          title: 'より良い意思決定のためのデータ駆動型洞察',
          description: '高度な分析プラットフォームとカスタマイズ可能なダッシュボードで、アプリケーションのパフォーマンスとユーザー行動に関する深い洞察を得られます。',
          features: [
            'リアルタイムパフォーマンス監視',
            'カスタムダッシュボード作成',
            '高度なフィルタリングとセグメンテーション',
            '自動レポートとアラート'
          ]
        },
        security: {
          subtitle: 'エンタープライズセキュリティ',
          title: '安心のための銀行レベルのセキュリティ',
          description: 'データセキュリティは私たちの最優先事項です。情報を保護し、コンプライアンスを確保するために、業界最高水準のセキュリティ対策を実装しています。',
          features: [
            'すべてのデータのエンドツーエンド暗号化',
            'SOC 2 Type II準拠',
            '多要素認証',
            '定期的なセキュリティ監査と侵入テスト'
          ]
        }
      },
      cta: {
        title: 'ビジネスを変革する準備はできていますか？',
        subtitle: 'より良い製品を構築するために、すでに何千もの企業がYourSaaSを使用しています。',
        description: '今すぐ無料トライアルを開始して、私たちのプラットフォームの力を体験してください。',
        primaryButton: {
          text: '無料トライアル開始',
          href: '/signup'
        },
        secondaryButton: {
          text: '営業に問い合わせ',
          href: '/contact'
        },
        stats: {
          uptime: {
            value: '99.9%',
            label: '稼働率SLA'
          },
          customers: {
            value: '10k+',
            label: '満足いただいているお客様'
          },
          support: {
            value: '24/7',
            label: '専門サポート'
          }
        }
      }
    },
    about: {
      title: '私たちについて',
      subtitle: '私たちのミッション、チーム、価値観について学んでください。誰もがより良い未来を築けるような技術を創造しています。',
      hero: {
        title: '私たちについて',
        description: 'YourSaaSは、テクノロジーの力で企業の成長を支援する革新的なSaaSプラットフォームです。私たちのミッションは、誰もがより良い未来を創造できる世界を実現することです。',
        contactButton: 'お問い合わせ',
        teamButton: 'チームに会う'
      },
      mission: {
        title: '私たちのミッション',
        content: 'テクノロジーによるイノベーションの促進',
        description: 'テクノロジーは身近で、パワフルで、直感的であるべきだと私たちは信じています。企業がデジタル時代にイノベーションを起こし、成長し、成功できるツールを作ることが私たちのミッションです。'
      },
      vision: {
        title: '私たちのビジョン',
        content: '誰もが創造できる世界',
        description: '高度なテクノロジーが誰の手にも届く未来を描き、個人と組織が世界にポジティブな影響を与えるソリューションを構築できるようにします。'
      },
      values: {
        title: '私たちの価値観',
        subtitle: 'これらの価値観が私たちの意思決定と行動を導いています',
        items: {
          customerFirst: {
            title: 'お客様第一',
            description: 'お客様の成功こそが私たちの成功です。常にお客様の視点に立って製品開発とサービス提供を行います。'
          },
          innovation: {
            title: 'イノベーション',
            description: '最新の技術トレンドを追い続け、業界をリードする革新的なソリューションを提供します。'
          },
          transparency: {
            title: '透明性',
            description: 'オープンで透明なコミュニケーションを大切にし、信頼関係を築きます。'
          },
          excellence: {
            title: '卓越性',
            description: '継続的な改善と学習により、高品質な製品とサービスを提供します。'
          }
        }
      },
      team: {
        title: '私たちのチーム',
        subtitle: '多様な背景を持つ専門家が共通のビジョンに向かって協力しています',
        hiring: {
          title: '私たちと一緒に働きませんか？',
          description: '私たちは常に才能ある人材を求めています。革新的な製品の創造に興味がある方は、ぜひお声がけください。',
          careersButton: 'キャリア機会を見る',
          contactButton: 'お問い合わせ'
        }
      },
      cta: {
        title: '一緒に未来を創造しましょう',
        description: '私たちのプラットフォームでビジネスの可能性を解き放ちましょう。今すぐ始めて、デジタル変革への第一歩を踏み出してください。',
        startButton: '無料で始める',
        featuresButton: '機能を見る'
      }
    },
    pricing: {
      title: 'シンプルで透明な料金体系',
      subtitle: 'ニーズに合ったプランをお選びください',
      hero: {
        title: 'シンプルで透明な料金体系',
        subtitle: 'あなたのチームに最適なプランをお選びください。すべてのプランに14日間の無料トライアルが含まれています。',
        description: '無料で始めて、成長に合わせてスケールしてください。いつでもキャンセル可能です。',
        trialNote: 'クレジットカードは必要ありません。'
      },
      trustIndicators: {
        trial: {
          title: '14日間無料トライアル',
          description: '開始にはクレジットカードは必要ありません'
        },
        security: {
          title: 'セキュア＆コンプライアンス',
          description: 'SOC 2 Type II認証およびGDPR準拠'
        },
        support: {
          title: '24時間365日サポート',
          description: '必要なときに専門サポートを提供'
        }
      },
      cta: {
        title: '始める準備はできましたか？',
        description: 'ビジネスのスケールに私たちのプラットフォームを信頼する何千ものチームに参加してください。今すぐ無料トライアルを開始しましょう。',
        startButton: '無料トライアル開始',
        salesButton: '営業に相談'
      }
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
      subtitle: 'ご質問やご相談がございましたら、お気軽にお問い合わせください。専門スタッフが迅速にご対応いたします。',
      support: {
        email: {
          title: 'メールサポート',
          description: '24時間以内に返信いたします'
        },
        phone: {
          title: '電話サポート',
          description: '平日 9:00-18:00'
        },
        chat: {
          title: 'チャットサポート',
          description: 'リアルタイムでサポート'
        }
      },
      office: {
        title: 'オフィス情報',
        address: {
          label: '本社所在地',
          value: '〒100-0001\\n東京都千代田区千代田1-1-1\\nYourSaaSビル 5F'
        },
        hours: {
          label: '営業時間',
          value: '平日: 9:00 - 18:00\\n土日祝日: 休業'
        },
        access: {
          label: 'アクセス',
          value: 'JR東京駅 徒歩5分\\n地下鉄大手町駅 徒歩3分'
        }
      },
      supportInfo: {
        title: 'サポート情報',
        docs: {
          title: 'ドキュメント',
          description: '詳細な使い方ガイド',
          button: 'ドキュメントを見る'
        },
        faq: {
          title: 'よくある質問',
          description: 'お客様からよくいただく質問',
          button: 'FAQ を見る'
        },
        status: {
          title: 'ステータスページ',
          description: 'サービスの稼働状況',
          button: 'ステータスを確認'
        }
      },
      emergency: {
        title: '緊急時のお問い合わせ',
        description: 'サービスに重大な問題が発生している場合や、セキュリティに関する緊急事態の場合は、以下の緊急連絡先までお電話ください。',
        hotline: {
          label: '緊急ホットライン',
          phone: '03-1234-9999',
          availability: '24時間対応'
        },
        email: {
          label: '緊急メール',
          email: 'emergency@yoursaas.com',
          priority: '最優先で対応'
        }
      }
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
    },
    releases: {
      title: 'リリースノート',
      subtitle: '最新の機能、改善、修正について'
    },
    tags: {
      title: 'タグの記事',
      description: '関連するブログ記事、リリースノート、ドキュメントの一覧です。',
      breadcrumbHome: 'ホーム',
      allTags: 'すべてのタグ',
      relatedContent: '関連コンテンツ',
      noContentFound: 'このタグに関連するコンテンツが見つかりませんでした。',
      contentTypes: {
        blog: 'ブログ記事',
        releases: 'リリースノート',
        docs: 'ドキュメント'
      }
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