'use client'

import { Button } from '@/components/ui/button'
import {
  PartyPopper,
  Wrench,
  Bug,
  AlertTriangle,
  Lock,
  LucideIcon,
  ChevronDown,
} from 'lucide-react'
import type { Dictionary } from '@/lib/i18n'

// Local type definitions and data
interface ChangeType {
  id: string
  label: string
  icon: LucideIcon
  color: string
}

const getChangeTypes = (dict: Dictionary): ChangeType[] => [
  {
    id: 'new-features',
    label: dict.releases.changeTypes.newFeatures,
    icon: PartyPopper,
    color:
      'bg-[rgb(var(--release-new-bg))] text-[rgb(var(--release-new-text))] border-[rgb(var(--release-new-border))]',
  },
  {
    id: 'improvements',
    label: dict.releases.changeTypes.improvements,
    icon: Wrench,
    color:
      'bg-[rgb(var(--release-improvement-bg))] text-[rgb(var(--release-improvement-text))] border-[rgb(var(--release-improvement-border))]',
  },
  {
    id: 'bug-fixes',
    label: dict.releases.changeTypes.bugFixes,
    icon: Bug,
    color:
      'bg-[rgb(var(--release-bugfix-bg))] text-[rgb(var(--release-bugfix-text))] border-[rgb(var(--release-bugfix-border))]',
  },
  {
    id: 'breaking-changes',
    label: dict.releases.changeTypes.breakingChanges,
    icon: AlertTriangle,
    color:
      'bg-[rgb(var(--release-breaking-bg))] text-[rgb(var(--release-breaking-text))] border-[rgb(var(--release-breaking-border))]',
  },
  {
    id: 'security-updates',
    label: dict.releases.changeTypes.securityUpdates,
    icon: Lock,
    color:
      'bg-[rgb(var(--release-security-bg))] text-[rgb(var(--release-security-text))] border-[rgb(var(--release-security-border))]',
  },
]

interface ChangeTypeListProps {
  selectedTypes: string[]
  onTypeToggle: (typeId: string) => void
  showAll?: boolean
  dict: Dictionary
  locale: string
}

export function ChangeTypeList({
  selectedTypes,
  onTypeToggle,
  showAll = true,
  dict,
  locale: _locale,
}: ChangeTypeListProps) {
  const changeTypes = getChangeTypes(dict)

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-[rgb(var(--text-secondary))]">
        {dict.releases.changeTypes.title}
      </h3>

      <div className="space-y-2">
        {showAll && (
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={selectedTypes.length === 0}
              onChange={() => {
                // 全て選択解除
                if (selectedTypes.length > 0) {
                  selectedTypes.forEach((type) => onTypeToggle(type))
                }
              }}
              className="w-4 h-4 text-[rgb(var(--link-color))] border-[rgb(var(--border-primary))] rounded focus:ring-[rgb(var(--focus-ring))] bg-[rgb(var(--bg-primary))]"
            />
            <span className="ml-3 text-sm text-[rgb(var(--text-secondary))] group-hover:text-[rgb(var(--text-primary))]">
              {dict.releases.changeTypes.showAll}
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

function ChangeTypeFilter({
  type,
  isSelected,
  onToggle,
}: ChangeTypeFilterProps) {
  return (
    <label className="flex items-center cursor-pointer group">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggle}
        className="w-4 h-4 text-[rgb(var(--link-color))] border-[rgb(var(--border-primary))] rounded focus:ring-[rgb(var(--focus-ring))] bg-[rgb(var(--bg-primary))]"
      />
      <span
        className={`ml-3 flex items-center gap-2 text-sm transition-colors ${
          isSelected
            ? 'text-[rgb(var(--text-primary))] font-medium'
            : 'text-[rgb(var(--text-secondary))] group-hover:text-[rgb(var(--text-primary))]'
        }`}
      >
        <type.icon className="w-4 h-4" aria-label={type.label} />
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
  count,
}: ChangeTypeBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium border ${type.color} ${sizeClasses[size]}`}
    >
      {showIcon && (
        <type.icon className="w-4 h-4 mr-1.5" aria-label={type.label} />
      )}
      {type.label}
      {typeof count === 'number' && (
        <span className="ml-1.5 opacity-75">({count})</span>
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
  // Note: This component would need dict prop to work properly with translations
  const fallbackDict = {
    releases: {
      changeTypes: {
        newFeatures: 'New Features',
        improvements: 'Improvements',
        bugFixes: 'Bug Fixes',
        breakingChanges: 'Breaking Changes',
        securityUpdates: 'Security Updates',
      },
    },
  } as Dictionary
  const changeTypes = getChangeTypes(fallbackDict)

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
                ? type.color
                : 'bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-tertiary))] border-[rgb(var(--border-primary))]'
            }`}
          >
            <div className="text-center">
              <div className="mb-2 flex justify-center">
                <type.icon className="w-8 h-8" aria-label={type.label} />
              </div>

              <div className="text-2xl font-bold mb-1">{count}</div>

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
  onToggle,
}: ChangeTypeSectionProps) {
  if (changes.length === 0) return null

  return (
    <div className="border border-[rgb(var(--border-primary))] rounded-lg overflow-hidden">
      <Button
        onClick={onToggle}
        variant="ghost"
        className="w-full px-6 py-4 h-auto bg-[rgb(var(--bg-secondary))] hover:bg-[rgb(var(--bg-tertiary))] justify-start"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <type.icon className="w-5 h-5" aria-label={type.label} />
            <h3 className="text-lg font-semibold text-[rgb(var(--text-primary))]">
              {type.label}
            </h3>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${type.color}`}
            >
              {changes.length}
            </span>
          </div>

          <ChevronDown
            className={`w-5 h-5 text-[rgb(var(--text-tertiary))] transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </Button>

      {isExpanded && (
        <div className="px-6 py-4 bg-[rgb(var(--bg-primary))]">
          <ul className="space-y-4">
            {changes.map((change, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-[rgb(var(--text-tertiary))] rounded-full"></div>
                </div>
                <span className="text-[rgb(var(--text-secondary))] leading-relaxed">
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
