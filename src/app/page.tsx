import type { Metadata } from 'next'
import Link from "next/link";

export const metadata: Metadata = {
  title: 'BoxLog - シンプルでモダンなタスク管理アプリ',
  description: 'BoxLogは、あなたのタスク管理をシンプルで直感的にする最新のソリューションです。トップページです。',
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to BoxLog</h1>
      <p className="text-lg text-gray-600 mb-8">シンプルなタスク管理アプリです。</p>
      <div className="grid grid-cols-2 gap-4">
        <Link href="/app" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">アプリページへ</Link>
        <Link href="/blog" className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700 transition">ブログへ</Link>
        <Link href="/docs" className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition">ドキュメント</Link>
        <Link href="/release" className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition">リリースノート</Link>
        <Link href="/login" className="px-6 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 transition">ログイン</Link>
      </div>
    </main>
  )
}