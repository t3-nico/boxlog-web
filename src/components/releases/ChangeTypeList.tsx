'use client'

import { Button } from '@/components/ui/button'
import { AlertTriangle, Bug, ChevronDown, Lock, LucideIcon, PartyPopper, Wrench } from 'lucide-react'
import { useTranslations } from 'next-intl'

// Local type definitions and data
interface ChangeTypeDataItem {
  id: string
  labelKey: string
  icon: LucideIcon
  color: string
}

const changeTypeData: ChangeTypeDataItem[] = [
  {
    id: 'new-features',
    labelKey: 'newFeatures',
    icon: PartyPopper,
    color:
      'bg-[rgb(var(--release-new-bg))] text-[rgb(var(--release-new-text))] border-[rgb(var(--release-new-border))]',
  },
  {
    id: 'improvements',
    labelKey: 'improvements',
    icon: Wrench,
    color:
      'bg-[rgb(var(--release-improvement-bg))] text-[rgb(var(--release-improvement-text))] border-[rgb(var(--release-improvement-border))]',
  },
  {
    id: 'bug-fixes',
    labelKey: 'bugFixes',
    icon: Bug,
    color:
      'bg-[rgb(var(--release-bugfix-bg))] text-[rgb(var(--release-bugfix-text))] border-[rgb(var(--release-bugfix-border))]',
  },
  {
    id: 'breaking-changes',
    labelKey: 'breakingChanges',
    icon: AlertTriangle,
    color:
      'bg-[rgb(var(--release-breaking-bg))] text-[rgb(var(--release-breaking-text))] border-[rgb(var(--release-breaking-border))]',
  },
  {
    id: 'security-updates',
    labelKey: 'securityUpdates',
    icon: Lock,
    color:
      'bg-[rgb(var(--release-security-bg))] text-[rgb(var(--release-security-text))] border-[rgb(var(--release-security-border))]',
  },
]

export interface ChangeTypeListProps {
  selectedTypes: string[]
  onTypeToggle: (typeId: string) => void
  showAll?: boolean
  locale: string
}

export function ChangeTypeList({ selectedTypes, onTypeToggle, showAll = true, locale: _locale }: ChangeTypeListProps) {
  const t = useTranslations('releases.changeTypes')

  const changeTypes = changeTypeData.map((type) => ({
    ...type,
    label: t(type.labelKey as Parameters<typeof t>[0]),
  }))

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-[rgb(var(--text-secondary))]">{t('title')}</h3>

      <div className="space-y-2">
        {showAll && (
          <label className="group flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={selectedTypes.length === 0}
              onChange={() => {
                // 全て選択解除
                if (selectedTypes.length > 0) {
                  selectedTypes.forEach((type) => onTypeToggle(type))
                }
              }}
              className="h-4 w-4 rounded border-[rgb(var(--border-primary))] bg-[rgb(var(--bg-primary))] text-[rgb(var(--link-color))] focus:ring-[rgb(var(--focus-ring))]"
            />
            <span className="ml-3 text-sm text-[rgb(var(--text-secondary))] group-hover:text-[rgb(var(--text-primary))]">
              {t('showAll')}
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
  type: { id: string; label: string; icon: LucideIcon; color: string }
  isSelected: boolean
  onToggle: () => void
}

function ChangeTypeFilter({ type, isSelected, onToggle }: ChangeTypeFilterProps) {
  return (
    <label className="group flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggle}
        className="h-4 w-4 rounded border-[rgb(var(--border-primary))] bg-[rgb(var(--bg-primary))] text-[rgb(var(--link-color))] focus:ring-[rgb(var(--focus-ring))]"
      />
      <span
        className={`ml-3 flex items-center gap-2 text-sm transition-colors ${
          isSelected
            ? 'font-medium text-[rgb(var(--text-primary))]'
            : 'text-[rgb(var(--text-secondary))] group-hover:text-[rgb(var(--text-primary))]'
        }`}
      >
        <type.icon className="h-4 w-4" aria-label={type.label} />
        {type.label}
      </span>
    </label>
  )
}

// 変更タイプバッジコンポーネント
interface ChangeTypeBadgeProps {
  type: { id: string; label: string; icon: LucideIcon; color: string }
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  count?: number
}

export function ChangeTypeBadge({ type, size = 'md', showIcon = true, count }: ChangeTypeBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${type.color} ${sizeClasses[size]}`}>
      {showIcon && <type.icon className="mr-1.5 h-4 w-4" aria-label={type.label} />}
      {type.label}
      {typeof count === 'number' && <span className="ml-1.5 opacity-75">({count})</span>}
    </span>
  )
}

// 変更タイプセクション（リリース詳細ページ用）
interface ChangeTypeSectionProps {
  type: { id: string; label: string; icon: LucideIcon; color: string }
  changes: string[]
  isExpanded: boolean
  onToggle: () => void
}

export function ChangeTypeSection({ type, changes, isExpanded, onToggle }: ChangeTypeSectionProps) {
  if (changes.length === 0) return null

  return (
    <div className="overflow-hidden rounded-lg border border-[rgb(var(--border-primary))]">
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto w-full justify-start bg-[rgb(var(--bg-secondary))] px-6 py-4 hover:bg-[rgb(var(--bg-tertiary))]"
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <type.icon className="h-5 w-5" aria-label={type.label} />
            <h3 className="text-lg font-semibold text-[rgb(var(--text-primary))]">{type.label}</h3>
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${type.color}`}>
              {changes.length}
            </span>
          </div>

          <ChevronDown
            className={`h-5 w-5 text-[rgb(var(--text-tertiary))] transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </Button>

      {isExpanded && (
        <div className="bg-[rgb(var(--bg-primary))] px-6 py-4">
          <ul className="space-y-4">
            {changes.map((change, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-[rgb(var(--text-tertiary))]"></div>
                </div>
                <span className="leading-relaxed text-[rgb(var(--text-secondary))]">{change}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
