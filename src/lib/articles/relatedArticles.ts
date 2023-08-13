import path from 'path'
import fs from 'fs'

export type RelatedSlugs = {
  [slug: string]: string[]
}

/**
 * 記事の関連記事情報を読み込む
 * @returns どの記事がどの記事と関連しているかの情報
 */
export const readRelatedJson = (): RelatedSlugs => {
  const jsonPath = path.join(process.cwd(), 'contents', 'etc', 'related_articles.json')
  const jsonText = fs.readFileSync(jsonPath, 'utf-8')
  const relatedSlugs = JSON.parse(jsonText) as RelatedSlugs
  return relatedSlugs
}