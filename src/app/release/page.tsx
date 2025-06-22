import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'リリースノート',
  description: 'BoxLogのリリースノートページです。',
}

export default function ReleasePage() {
  const releases = [
    {
      version: "1.2.0",
      date: "2024-01-15",
      title: "チーム機能の追加",
      type: "feature",
      description: "チームでの共同作業が可能になりました。",
      changes: [
        "チームメンバーの招待機能",
        "タスクの共有機能",
        "リアルタイム通知機能",
        "チーム設定の管理機能"
      ]
    },
    {
      version: "1.1.5",
      date: "2024-01-10",
      title: "パフォーマンス改善",
      type: "improvement",
      description: "アプリケーションの動作速度を向上させました。",
      changes: [
        "ページ読み込み速度の改善",
        "データベースクエリの最適化",
        "メモリ使用量の削減",
        "バグ修正"
      ]
    },
    {
      version: "1.1.0",
      date: "2024-01-05",
      title: "プロジェクト管理機能",
      type: "feature",
      description: "プロジェクト単位でのタスク管理が可能になりました。",
      changes: [
        "プロジェクトの作成・編集・削除",
        "プロジェクト内でのタスク整理",
        "プロジェクト進捗の可視化",
        "プロジェクトテンプレート機能"
      ]
    },
    {
      version: "1.0.0",
      date: "2024-01-01",
      title: "初回リリース",
      type: "release",
      description: "BoxLogの初回リリースです。",
      changes: [
        "基本的なタスク管理機能",
        "ユーザー認証機能",
        "レスポンシブデザイン",
        "ダークモード対応"
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "feature": return "bg-green-100 text-green-800";
      case "improvement": return "bg-blue-100 text-blue-800";
      case "release": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "feature": return "新機能";
      case "improvement": return "改善";
      case "release": return "リリース";
      default: return "その他";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">リリースノート</h1>
          <p className="text-gray-600">BoxLogの最新アップデートと変更履歴をご確認いただけます。</p>
        </div>

        {/* リリース一覧 */}
        <div className="space-y-6">
          {releases.map((release, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">v{release.version}</h2>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(release.type)}`}>
                      {getTypeLabel(release.type)}
                    </span>
                  </div>
                  <p className="text-gray-600">{release.date}</p>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-2">{release.title}</h3>
              <p className="text-gray-600 mb-4">{release.description}</p>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">変更内容:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {release.changes.map((change, changeIndex) => (
                    <li key={changeIndex}>{change}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
} 