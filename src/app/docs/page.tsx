export default function DocsPage() {
  const categories = [
    {
      title: "はじめに",
      items: [
        { title: "BoxLogとは", href: "#", description: "BoxLogの概要と特徴について" },
        { title: "クイックスタート", href: "#", description: "5分で始めるBoxLog" },
        { title: "インストール", href: "#", description: "BoxLogのインストール方法" },
      ]
    },
    {
      title: "基本機能",
      items: [
        { title: "タスクの作成", href: "#", description: "新しいタスクを作成する方法" },
        { title: "タスクの編集", href: "#", description: "既存のタスクを編集する方法" },
        { title: "タスクの削除", href: "#", description: "タスクを削除する方法" },
      ]
    },
    {
      title: "高度な機能",
      items: [
        { title: "プロジェクト管理", href: "#", description: "プロジェクト単位でのタスク管理" },
        { title: "チーム機能", href: "#", description: "チームでの共同作業" },
        { title: "API連携", href: "#", description: "外部サービスとの連携" },
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ドキュメント</h1>
          <p className="text-gray-600">BoxLogの使い方や機能について詳しく説明します。</p>
        </div>

        {/* 検索バー */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="ドキュメントを検索..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* カテゴリ別ドキュメント */}
        <div className="space-y-8">
          {categories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{category.title}</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item, itemIndex) => (
                  <a
                    key={itemIndex}
                    href={item.href}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
} 