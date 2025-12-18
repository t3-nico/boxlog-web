import type { AIMetadata } from '@/types/content'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

export interface ReleaseFrontMatter {
  version: string
  date: string
  title: string
  description: string
  tags: string[]
  breaking: boolean
  featured: boolean
  prerelease?: boolean
  author?: string
  authorAvatar?: string
  coverImage?: string
  // AI/RAG用メタデータ
  ai?: AIMetadata
}

export interface ReleasePostMeta {
  frontMatter: ReleaseFrontMatter
  slug: string
  content: string
  readingTime: number
}

export interface ReleasePost {
  frontMatter: ReleaseFrontMatter
  content: string
  slug: string
  readingTime: number
}

export interface TagCount {
  tag: string
  count: number
}

export interface ChangeType {
  id: string
  label: string
  icon: string
  color: string
}

// 変更タイプの定義 - CSS変数ベースに統一
export const changeTypes: ChangeType[] = [
  {
    id: 'new-features',
    label: 'New Features',
    icon: '🎉',
    color:
      'bg-[rgb(var(--release-new-bg))] text-[rgb(var(--release-new-text))] border-[rgb(var(--release-new-border))]',
  },
  {
    id: 'improvements',
    label: 'Improvements',
    icon: '🔧',
    color:
      'bg-[rgb(var(--release-improvement-bg))] text-[rgb(var(--release-improvement-text))] border-[rgb(var(--release-improvement-border))]',
  },
  {
    id: 'bug-fixes',
    label: 'Bug Fixes',
    icon: '🐛',
    color:
      'bg-[rgb(var(--release-bugfix-bg))] text-[rgb(var(--release-bugfix-text))] border-[rgb(var(--release-bugfix-border))]',
  },
  {
    id: 'breaking-changes',
    label: 'Breaking Changes',
    icon: '⚠️',
    color:
      'bg-[rgb(var(--release-breaking-bg))] text-[rgb(var(--release-breaking-text))] border-[rgb(var(--release-breaking-border))]',
  },
  {
    id: 'security-updates',
    label: 'Security Updates',
    icon: '🔒',
    color:
      'bg-[rgb(var(--release-security-bg))] text-[rgb(var(--release-security-text))] border-[rgb(var(--release-security-border))]',
  },
]

// セマンティックバージョニングでソート
export function sortVersions(versions: string[]): string[] {
  return versions.sort((a, b) => {
    const parseVersion = (version: string) => {
      const cleanVersion = version.replace(/^v/, '') // "v"プレフィックスを削除
      const parts = cleanVersion.split('.').map(Number)
      return {
        major: parts[0] || 0,
        minor: parts[1] || 0,
        patch: parts[2] || 0,
      }
    }

    const versionA = parseVersion(a)
    const versionB = parseVersion(b)

    if (versionA.major !== versionB.major) {
      return versionB.major - versionA.major // 降順
    }
    if (versionA.minor !== versionB.minor) {
      return versionB.minor - versionA.minor
    }
    return versionB.patch - versionA.patch
  })
}

// リリース日時の計算
export function calculateReleaseTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return Math.max(1, minutes)
}

// 全てのリリースノートメタデータを取得
export async function getAllReleaseMetas(): Promise<ReleasePostMeta[]> {
  const releasesDirectory = path.join(process.cwd(), 'content', 'releases')

  if (!fs.existsSync(releasesDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(releasesDirectory)
  const mdxFiles = filenames.filter((name) => name.endsWith('.mdx'))

  const releases = mdxFiles.map((filename) => {
    const filePath = path.join(releasesDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    const frontMatter = data as ReleaseFrontMatter
    const slug = filename.replace(/\.mdx$/, '')
    const readingTime = calculateReleaseTime(content)

    return {
      frontMatter,
      slug,
      content,
      readingTime,
    }
  })

  // バージョンでソート（最新が最初）
  releases.sort((a, b) => {
    const versions = [a.frontMatter.version, b.frontMatter.version]
    const sorted = sortVersions(versions)
    return sorted.indexOf(a.frontMatter.version) - sorted.indexOf(b.frontMatter.version)
  })

  return releases
}

// 個別リリースノート取得
export async function getRelease(version: string): Promise<ReleasePost | null> {
  try {
    const releasesDirectory = path.join(process.cwd(), 'content', 'releases')
    const filePath = path.join(releasesDirectory, `${version}.mdx`)

    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    const frontMatter = data as ReleaseFrontMatter
    const readingTime = calculateReleaseTime(content)

    return {
      frontMatter,
      content,
      slug: version,
      readingTime,
    }
  } catch {
    return null
  }
}

// タグ別リリースノート取得
export async function getReleasesByTag(tag: string): Promise<ReleasePostMeta[]> {
  const allReleases = await getAllReleaseMetas()
  return allReleases.filter((release) => release.frontMatter.tags.includes(tag))
}

// 全タグとその数を取得
export async function getAllReleaseTags(): Promise<TagCount[]> {
  const allReleases = await getAllReleaseMetas()
  const tagCounts = new Map<string, number>()

  allReleases.forEach((release) => {
    release.frontMatter.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

// 注目リリース取得
export async function getFeaturedReleases(): Promise<ReleasePostMeta[]> {
  const allReleases = await getAllReleaseMetas()
  return allReleases.filter((release) => release.frontMatter.featured)
}

// 関連リリース取得
export async function getRelatedReleases(currentVersion: string, limit: number = 3): Promise<ReleasePostMeta[]> {
  const allReleases = await getAllReleaseMetas()
  const currentRelease = allReleases.find((r) => r.frontMatter.version === currentVersion)

  if (!currentRelease) {
    return []
  }

  // タグベースでの関連性スコア計算
  const relatedReleases = allReleases
    .filter((release) => release.frontMatter.version !== currentVersion)
    .map((release) => {
      const commonTags = release.frontMatter.tags.filter((tag) => currentRelease.frontMatter.tags.includes(tag))

      return {
        ...release,
        score: commonTags.length,
      }
    })
    .filter((release) => release.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return relatedReleases.map(({ score: _score, ...release }) => release)
}

// リリースノート検索
export async function searchReleases(query: string): Promise<ReleasePostMeta[]> {
  const allReleases = await getAllReleaseMetas()
  const lowercaseQuery = query.toLowerCase()

  return allReleases.filter((release) => {
    const searchText = [
      release.frontMatter.title,
      release.frontMatter.description,
      release.frontMatter.version,
      ...release.frontMatter.tags,
      release.content,
    ]
      .join(' ')
      .toLowerCase()

    return searchText.includes(lowercaseQuery)
  })
}

// プレリリース・ベータ版の判定
export function isPrerelease(version: string): boolean {
  return version.includes('beta') || version.includes('alpha') || version.includes('rc') || version.includes('pre')
}

// バージョンタイプの判定
export function getVersionType(version: string): 'major' | 'minor' | 'patch' | 'prerelease' {
  if (isPrerelease(version)) {
    return 'prerelease'
  }

  const cleanVersion = version.replace(/^v/, '')
  const parts = cleanVersion.split('.').map(Number)

  if ((parts[2] ?? 0) > 0) return 'patch'
  if ((parts[1] ?? 0) > 0) return 'minor'
  return 'major'
}

// 次期リリース予定の取得（モック）
export async function getUpcomingReleases(): Promise<
  {
    version: string
    expectedDate: string
    features: string[]
    status: 'planning' | 'development' | 'testing' | 'review'
  }[]
> {
  // 実際のプロダクションでは外部APIやデータベースから取得
  return [
    {
      version: 'v2.2.0',
      expectedDate: '2024-02-15',
      features: ['Advanced Team Analytics', 'Real-time Collaboration', 'Enhanced Mobile Experience'],
      status: 'testing',
    },
    {
      version: 'v2.3.0',
      expectedDate: '2024-03-20',
      features: ['AI-Powered Insights', 'Custom Integrations API', 'Advanced Security Features'],
      status: 'development',
    },
  ]
}

// リリースタイムライン生成
export function generateReleaseTimeline(releases: ReleasePostMeta[]): {
  year: string
  months: {
    month: string
    releases: ReleasePostMeta[]
  }[]
}[] {
  const timeline = new Map<string, Map<string, ReleasePostMeta[]>>()

  releases.forEach((release) => {
    const date = new Date(release.frontMatter.date)
    const year = date.getFullYear().toString()
    const month = date.toLocaleDateString('ja-JP', { month: 'long' })

    if (!timeline.has(year)) {
      timeline.set(year, new Map())
    }

    const yearMap = timeline.get(year)!
    if (!yearMap.has(month)) {
      yearMap.set(month, [])
    }

    yearMap.get(month)!.push(release)
  })

  return Array.from(timeline.entries())
    .map(([year, monthsMap]) => ({
      year,
      months: Array.from(monthsMap.entries())
        .map(([month, releases]) => ({ month, releases }))
        .sort((a, b) => {
          const monthOrder = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]
          return monthOrder.indexOf(b.month) - monthOrder.indexOf(a.month)
        }),
    }))
    .sort((a, b) => parseInt(b.year) - parseInt(a.year))
}
