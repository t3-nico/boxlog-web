import { TeamMemberData } from '@/components/about/TeamMember'
import { StatData } from '@/components/about/CompanyStats'

export const teamMembers: TeamMemberData[] = [
  {
    id: 'takeshi-yamada',
    name: 'Takeshi Yamada',
    position: 'CEO & Founder',
    bio: 'Founded YourSaaS in 2020 after engineering experience at major tech companies. Passionate about customer-centric product development and team building.',
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
    name: 'Sakura Tanaka',
    position: 'CTO',
    bio: 'Expert in scalable system design and microservices architecture. Technical leader with over 10 years of engineering experience.',
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
    name: 'Hiroshi Sato',
    position: 'Head of Design',
    bio: 'Specialist in user experience and product design. Focused on creating intuitive and beautiful interface designs.',
    avatar: '/avatars/hiroshi-sato.jpg',
    social: {
      twitter: 'https://twitter.com/hiroshi_sato',
      linkedin: 'https://linkedin.com/in/hiroshi-sato'
    },
    expertise: ['UX Design', 'Product Design', 'Design Systems']
  },
  {
    id: 'yuki-kimura',
    name: 'Yuki Kimura',
    position: 'Head of Marketing',
    bio: 'Expert in data-driven marketing strategies and customer success. Develops marketing activities with customer success as the top priority.',
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
    label: 'Active Users',
    description: 'Users worldwide using daily',
    icon: '👥',
    animationDuration: 2500
  },
  {
    id: 'enterprise-clients',
    value: 500,
    label: 'Enterprise Clients',
    description: 'Including Fortune 500 companies',
    icon: '🏢',
    animationDuration: 2000
  },
  {
    id: 'api-requests',
    value: 1000000,
    label: 'API Requests/Day',
    description: 'Stable service delivery',
    icon: '⚡',
    animationDuration: 3000
  },
  {
    id: 'uptime',
    value: '99.9%',
    label: 'Uptime',
    description: 'High reliability and performance',
    icon: '📈',
    animationDuration: 1500
  }
]

export const companyValues = [
  {
    id: 'customer-first',
    title: 'Customer First',
    description: 'Our customers\' success is our success. We always develop products and provide services from the customer\'s perspective.',
    icon: '🎯'
  },
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'We continue to follow the latest technology trends and provide innovative solutions that lead the industry.',
    icon: '💡'
  },
  {
    id: 'transparency',
    title: 'Transparency',
    description: 'We value open and transparent communication and build trust relationships.',
    icon: '🔍'
  },
  {
    id: 'excellence',
    title: 'Excellence',
    description: 'We continuously improve and learn to provide high-quality products and services.',
    icon: '⭐'
  }
]

export const companyMission = {
  title: 'Mission',
  content: 'Realize a world where everyone can create a better future through the power of technology',
  description: 'We support corporate productivity improvement and innovation through easy-to-use and reliable SaaS platforms. Our mission is to remove technical complexity and provide simple yet powerful tools so customers can focus on their core business.'
}

export const companyVision = {
  title: 'Vision',
  content: 'Become a platform used by over 100,000 companies worldwide by 2030',
  description: 'Our vision is to create a world where companies of all sizes can benefit from technology. We support all organizations, from startups to large enterprises, to succeed in digital transformation and achieve sustainable growth.'
}