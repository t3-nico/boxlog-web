export interface PricingFeature {
  name: string
  starter: boolean | string
  pro: boolean | string
  enterprise: boolean | string
}

export interface PricingPlan {
  id: string
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  popular?: boolean
  features: string[]
  ctaText: string
  ctaHref: string
}

export interface FAQItem {
  question: string
  answer: string
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small teams and personal projects',
    monthlyPrice: 9,
    yearlyPrice: 86.4, // 20% off
    features: [
      'Up to 5 team members',
      '10GB storage',
      'Basic API access',
      'Email support',
      'Standard templates',
      'Basic analytics'
    ],
    ctaText: 'Start Free Trial',
    ctaHref: '/signup?plan=starter'
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Best for growing teams and businesses',
    monthlyPrice: 29,
    yearlyPrice: 278.4, // 20% off
    popular: true,
    features: [
      'Up to 25 team members',
      '100GB storage',
      'Full API access',
      'Priority support',
      'Custom templates',
      'Advanced analytics',
      'Integrations',
      'Custom workflows',
      'Team collaboration tools'
    ],
    ctaText: 'Start Free Trial',
    ctaHref: '/signup?plan=pro'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Advanced features for large organizations',
    monthlyPrice: 0, // Custom pricing
    yearlyPrice: 0,
    features: [
      'Unlimited team members',
      'Unlimited storage',
      'Enterprise API access',
      '24/7 dedicated support',
      'Custom integrations',
      'Advanced security',
      'SSO & SAML',
      'Audit logs',
      'Custom contracts',
      'Dedicated account manager'
    ],
    ctaText: 'Contact Sales',
    ctaHref: '/contact?plan=enterprise'
  }
]

export const detailedFeatures: PricingFeature[] = [
  {
    name: 'Team members',
    starter: '5 members',
    pro: '25 members',
    enterprise: 'Unlimited'
  },
  {
    name: 'Storage',
    starter: '10GB',
    pro: '100GB',
    enterprise: 'Unlimited'
  },
  {
    name: 'API requests',
    starter: '1,000/month',
    pro: '10,000/month',
    enterprise: 'Unlimited'
  },
  {
    name: 'Projects',
    starter: '3 projects',
    pro: '25 projects',
    enterprise: 'Unlimited'
  },
  {
    name: 'Custom workflows',
    starter: false,
    pro: true,
    enterprise: true
  },
  {
    name: 'Advanced analytics',
    starter: false,
    pro: true,
    enterprise: true
  },
  {
    name: 'Priority support',
    starter: false,
    pro: true,
    enterprise: true
  },
  {
    name: '24/7 dedicated support',
    starter: false,
    pro: false,
    enterprise: true
  },
  {
    name: 'SSO & SAML',
    starter: false,
    pro: false,
    enterprise: true
  },
  {
    name: 'Audit logs',
    starter: false,
    pro: false,
    enterprise: true
  },
  {
    name: 'Custom contracts',
    starter: false,
    pro: false,
    enterprise: true
  },
  {
    name: 'Dedicated account manager',
    starter: false,
    pro: false,
    enterprise: true
  }
]

export const faqItems: FAQItem[] = [
  {
    question: 'Can I switch plans at any time?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated and reflected in your next billing cycle.'
  },
  {
    question: 'What happens if I exceed my plan limits?',
    answer: 'We\'ll notify you when you\'re approaching your limits. You can upgrade your plan or purchase additional resources as needed.'
  },
  {
    question: 'Is there a free trial available?',
    answer: 'Yes, we offer a 14-day free trial for all paid plans. No credit card required to start your trial.'
  },
  {
    question: 'How does annual billing work?',
    answer: 'Annual plans are billed once per year and include a 20% discount compared to monthly billing. You can switch between monthly and annual billing at any time.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Enterprise customers can also pay via bank transfer.'
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access to your plan features until the end of your billing period.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee for annual plans. Monthly subscriptions can be cancelled at any time without penalty.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use enterprise-grade security measures including encryption at rest and in transit, regular security audits, and SOC 2 Type II compliance.'
  }
]

export const savingsText = 'Save 20% with annual billing'