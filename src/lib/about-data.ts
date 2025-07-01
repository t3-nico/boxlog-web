import { TeamMemberData } from '@/components/about/TeamMember'
import { StatData } from '@/components/about/CompanyStats'

export const teamMembers: TeamMemberData[] = [
  {
    id: 'takeshi-yamada',
    name: '山田 武志',
    position: 'CEO & Founder',
    bio: '大手テック企業でのエンジニア経験を経て、2020年にYourSaaSを設立。顧客中心の製品開発とチームビルディングに情熱を注いでいます。',
    avatar: '/avatars/takeshi-yamada.jpg',
    social: {
      twitter: 'https://twitter.com/takeshi_yamada',
      linkedin: 'https://linkedin.com/in/takeshi-yamada',
      github: 'https://github.com/takeshi-yamada'
    },
    expertise: ['Product Strategy', 'Team Building', 'SaaS']
  },
  {
    id: 'sakura-tanaka',
    name: '田中 さくら',
    position: 'CTO',
    bio: 'スケーラブルなシステム設計とマイクロサービスアーキテクチャのエキスパート。10年以上のエンジニアリング経験を持つ技術リーダーです。',
    avatar: '/avatars/sakura-tanaka.jpg',
    social: {
      twitter: 'https://twitter.com/sakura_tanaka',
      linkedin: 'https://linkedin.com/in/sakura-tanaka',
      github: 'https://github.com/sakura-tanaka'
    },
    expertise: ['System Architecture', 'DevOps', 'Cloud Computing']
  },
  {
    id: 'hiroshi-sato',
    name: '佐藤 寛',
    position: 'Head of Design',
    bio: 'ユーザーエクスペリエンスとプロダクトデザインのスペシャリスト。直感的で美しいインターフェースの設計に取り組んでいます。',
    avatar: '/avatars/hiroshi-sato.jpg',
    social: {
      twitter: 'https://twitter.com/hiroshi_sato',
      linkedin: 'https://linkedin.com/in/hiroshi-sato'
    },
    expertise: ['UX Design', 'Product Design', 'Design Systems']
  },
  {
    id: 'yuki-kimura',
    name: '木村 由紀',
    position: 'Head of Marketing',
    bio: 'データドリブンなマーケティング戦略とカスタマーサクセスの専門家。顧客の成功を第一に考えたマーケティング活動を展開しています。',
    avatar: '/avatars/yuki-kimura.jpg',
    social: {
      twitter: 'https://twitter.com/yuki_kimura',
      linkedin: 'https://linkedin.com/in/yuki-kimura'
    },
    expertise: ['Digital Marketing', 'Customer Success', 'Growth Strategy']
  }
]

export const companyStats: StatData[] = [
  {
    id: 'active-users',
    value: 50000,
    label: 'アクティブユーザー',
    description: '世界中のユーザーが毎日利用',
    icon: '👥',
    animationDuration: 2500
  },
  {
    id: 'enterprise-clients',
    value: 500,
    label: '導入企業数',
    description: 'Fortune 500企業を含む',
    icon: '🏢',
    animationDuration: 2000
  },
  {
    id: 'api-requests',
    value: 1000000,
    label: 'API リクエスト/日',
    description: '安定したサービス提供',
    icon: '⚡',
    animationDuration: 3000
  },
  {
    id: 'uptime',
    value: '99.9%',
    label: '稼働率',
    description: '高い信頼性とパフォーマンス',
    icon: '📈',
    animationDuration: 1500
  }
]

export const companyValues = [
  {
    id: 'customer-first',
    title: '顧客第一',
    description: 'お客様の成功が私たちの成功です。常に顧客の視点に立って製品開発とサービス提供を行います。',
    icon: '🎯'
  },
  {
    id: 'innovation',
    title: '革新性',
    description: '最新の技術トレンドを追い続け、業界をリードする革新的なソリューションを提供します。',
    icon: '💡'
  },
  {
    id: 'transparency',
    title: '透明性',
    description: 'オープンで透明性の高いコミュニケーションを重視し、信頼関係を築きます。',
    icon: '🔍'
  },
  {
    id: 'excellence',
    title: '卓越性',
    description: '高品質な製品とサービスの提供に向けて、常に改善と学習を続けます。',
    icon: '⭐'
  }
]

export const companyMission = {
  title: 'ミッション',
  content: 'テクノロジーの力で、すべての人がより良い未来を創造できる世界を実現する',
  description: '私たちは、使いやすく信頼性の高いSaaSプラットフォームを通じて、企業の生産性向上とイノベーションを支援します。お客様が本来のビジネスに集中できるよう、技術的な複雑さを取り除き、シンプルで強力なツールを提供することを使命としています。'
}

export const companyVision = {
  title: 'ビジョン',
  content: '2030年までに、世界中の10万社以上の企業が利用するプラットフォームになる',
  description: '私たちのビジョンは、あらゆる規模の企業がテクノロジーの恩恵を受けられる世界を作ることです。スタートアップから大企業まで、すべての組織がデジタル変革を成功させ、持続可能な成長を実現できるよう支援します。'
}