export interface Release {
  version: string;
  date: string;
  title: string;
  type: string;
  description: string;
  changes: string[];
  tags: string[];
}

export const releases: Release[] = [
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
    ],
    tags: ["feature", "release"]
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
    ],
    tags: ["improvement", "release"]
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
    ],
    tags: ["feature", "release"]
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
    ],
    tags: ["release"]
  }
];

export function getAllReleases(): Release[] {
  return releases;
}

export function getAllReleaseTags(): string[] {
  const tags = new Set<string>();
  releases.forEach(r => r.tags.forEach(t => tags.add(t)));
  return Array.from(tags);
}

export function getReleasesByTag(tag: string): Release[] {
  return releases.filter(r => r.tags.includes(tag));
}
