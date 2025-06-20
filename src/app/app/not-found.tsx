import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">ページが見つかりません</h1>
      <p className="mb-4">お探しのページは存在しないか、移動しました。</p>
      <Link href="/" className="text-blue-600 hover:underline">トップページへ戻る</Link>
    </div>
  );
} 