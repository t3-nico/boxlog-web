"use client"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">エラーが発生しました</h2>
      <button className="px-4 py-2 bg-amber-600 text-white rounded" onClick={() => reset()}>リトライ</button>
      <pre className="mt-4 text-left text-red-500">{error.message}</pre>
    </div>
  )
} 