export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        {/* Animated logo/spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-300 dark:border-t-blue-500 rounded-full animate-spin mx-auto opacity-40" style={{ animationDelay: '0.3s', animationDuration: '1.5s' }}></div>
        </div>
        
        {/* Loading text */}
        <div className="space-y-2">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Loading...</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Please wait while we prepare your content</p>
        </div>
        
        {/* Loading skeleton */}
        <div className="mt-8 max-w-md mx-auto space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/6"></div>
        </div>
      </div>
    </div>
  )
}