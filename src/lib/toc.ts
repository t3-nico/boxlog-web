export interface TocItem {
  id: string
  title: string
  level: number
  children?: TocItem[]
}

/**
 * 文字列をアンカーIDに変換
 */
export function generateAnchorId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // 特殊文字を除去
    .replace(/\s+/g, '-') // スペースをハイフンに
    .replace(/-+/g, '-') // 連続ハイフンを単一に
    .replace(/^-|-$/g, '') // 先頭・末尾のハイフンを除去
}

/**
 * MDXコンテンツから見出しを抽出（正規表現ベース）
 */
export function extractHeadings(content: string): TocItem[] {
  const headings: TocItem[] = []
  
  // 見出しの正規表現
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  let match
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const title = match[2].trim()
    
    // コードブロック内の見出しを除外
    const beforeMatch = content.substring(0, match.index)
    const codeBlockCount = (beforeMatch.match(/```/g) || []).length
    
    // 奇数回の```がある場合はコードブロック内
    if (codeBlockCount % 2 === 0) {
      headings.push({
        id: generateAnchorId(title),
        title: title.replace(/`([^`]+)`/g, '$1'), // インラインコードを除去
        level
      })
    }
  }
  
  return headings
}

/**
 * フラットな見出しリストを階層構造に変換
 */
export function buildTocTree(headings: TocItem[]): TocItem[] {
  const tree: TocItem[] = []
  const stack: TocItem[] = []
  
  for (const heading of headings) {
    // レベル2以下の見出しのみを目次に含める（h1は除外）
    if (heading.level < 2 || heading.level > 4) {
      continue
    }
    
    const item: TocItem = {
      ...heading,
      children: []
    }
    
    // 適切な親を見つける
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop()
    }
    
    if (stack.length === 0) {
      tree.push(item)
    } else {
      const parent = stack[stack.length - 1]
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(item)
    }
    
    stack.push(item)
  }
  
  return tree
}

/**
 * MDXコンテンツから階層化された目次を生成
 */
export function generateTableOfContents(content: string): TocItem[] {
  const headings = extractHeadings(content)
  return buildTocTree(headings)
}

/**
 * 見出しタイトルを適切な長さに省略
 */
export function truncateHeading(title: string, maxLength: number = 50): string {
  if (title.length <= maxLength) {
    return title
  }
  
  return title.substring(0, maxLength - 3) + '...'
}