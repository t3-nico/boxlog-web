'use client'

// Local type definitions and data
interface ChangeType {
  id: string
  label: string
  icon: string
  color: string
}

const changeTypes: ChangeType[] = [
  {
    id: 'new-features',
    label: 'New Features',
    icon: '🎉',
    color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700'
  },
  {
    id: 'improvements',
    label: 'Improvements',
    icon: '🔧',
    color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700'
  },
  {
    id: 'bug-fixes',
    label: 'Bug Fixes',
    icon: '🐛',
    color: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700'
  },
  {
    id: 'breaking-changes',
    label: 'Breaking Changes',
    icon: '⚠️',
    color: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700'
  },
  {
    id: 'security-updates',
    label: 'Security Updates',
    icon: '🔒',
    color: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700'
  }
]

interface ChangeTypeListProps {
  selectedTypes: string[]
  onTypeToggle: (typeId: string) => void
  showAll?: boolean
}

export function ChangeTypeList({ selectedTypes, onTypeToggle, showAll = true }: ChangeTypeListProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">変更タイプ</h3>
      
      <div className="space-y-2">
        {showAll && (
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={selectedTypes.length === 0}
              onChange={() => {
                // 全て選択解除
                if (selectedTypes.length > 0) {
                  selectedTypes.forEach(type => onTypeToggle(type))
                }
              }}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-blue-400"
            />
            <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-100">
              すべて表示
            </span>
          </label>
        )}
        
        {changeTypes.map((type) => (
          <ChangeTypeFilter
            key={type.id}
            type={type}
            isSelected={selectedTypes.includes(type.id)}
            onToggle={() => onTypeToggle(type.id)}
          />
        ))}
      </div>
    </div>
  )
}

interface ChangeTypeFilterProps {
  type: ChangeType
  isSelected: boolean
  onToggle: () => void
}

function ChangeTypeFilter({ type, isSelected, onToggle }: ChangeTypeFilterProps) {
  return (
    <label className="flex items-center cursor-pointer group">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggle}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <span className={`ml-3 flex items-center gap-2 text-sm transition-colors ${
        isSelected ? 'text-gray-900 font-medium dark:text-gray-100' : 'text-gray-600 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-100'
      }`}>
        <span className="text-base" role="img" aria-label={type.label}>
          {type.icon}
        </span>
        {type.label}
      </span>
    </label>
  )
}

// 変更タイプバッジコンポーネント
interface ChangeTypeBadgeProps {
  type: ChangeType
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  count?: number
}

export function ChangeTypeBadge({ 
  type, 
  size = 'md', 
  showIcon = true, 
  count 
}: ChangeTypeBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  return (
    <span className={`inline-flex items-center rounded-full font-medium border ${type.color} ${sizeClasses[size]}`}>
      {showIcon && (
        <span className="mr-1.5" role="img" aria-label={type.label}>
          {type.icon}
        </span>
      )}
      {type.label}
      {typeof count === 'number' && (
        <span className="ml-1.5 opacity-75">
          ({count})
        </span>
      )}
    </span>
  )
}

// 変更タイプグリッド（統計表示用）
interface ChangeTypeGridProps {
  stats: Record<string, number>
  onTypeClick?: (typeId: string) => void
}

export function ChangeTypeGrid({ stats, onTypeClick }: ChangeTypeGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {changeTypes.map((type) => {
        const count = stats[type.id] || 0
        
        return (
          <div
            key={type.id}
            onClick={() => onTypeClick?.(type.id)}
            className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
              onTypeClick 
                ? 'cursor-pointer hover:shadow-md hover:scale-105' 
                : ''
            } ${
              count > 0 
                ? type.color.replace('bg-', 'bg-').replace('text-', 'text-').replace('border-', 'border-')
                : 'bg-gray-50 text-gray-400 border-gray-200 dark:bg-gray-800 dark:text-gray-500 dark:border-gray-700'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2" role="img" aria-label={type.label}>
                {type.icon}
              </div>
              
              <div className="text-2xl font-bold mb-1">
                {count}
              </div>
              
              <div className="text-xs font-medium uppercase tracking-wide">
                {type.label}
              </div>
            </div>
            
            {count > 0 && (
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 bg-current rounded-full opacity-60"></div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// 変更タイプセクション（リリース詳細ページ用）
interface ChangeTypeSectionProps {
  type: ChangeType
  changes: string[]
  isExpanded: boolean
  onToggle: () => void
}

export function ChangeTypeSection({ 
  type, 
  changes, 
  isExpanded, 
  onToggle 
}: ChangeTypeSectionProps) {
  if (changes.length === 0) return null

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden dark:border-gray-700">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors dark:bg-gray-800 dark:hover:bg-gray-750"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl" role="img" aria-label={type.label}>
              {type.icon}
            </span>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {type.label}
            </h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${type.color}`}>
              {changes.length}
            </span>
          </div>
          
          <svg 
            className={`w-5 h-5 text-gray-500 transition-transform dark:text-gray-400 ${
              isExpanded ? 'rotate-180' : ''
            }`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-6 py-4 bg-white dark:bg-gray-900">
          <ul className="space-y-3">
            {changes.map((change, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full dark:bg-gray-500"></div>
                </div>
                <span className="text-gray-700 leading-relaxed dark:text-gray-300">
                  {change}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}