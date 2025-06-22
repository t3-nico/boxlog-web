import type { Metadata } from 'next'
import LoginForm from '@/components/login-form'

export const metadata: Metadata = {
  title: 'ログイン',
  description: 'BoxLogのログインページです。',
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm />
    </main>
  )
} 