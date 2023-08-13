import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Tag, getTagsJson } from './tags'
import { formatDatetime } from '../common/datetime'

export type Article = {
  slug: string
  content: string
  title: string
  posted_at: string
  updated_at: string
  tags: Tag[]
  description: string
}

export type ArticlesMap = {
  [slug: string]: Article
}

const postsDirectory = path.join(process.cwd(), 'contents', 'articles')

/**
 * slugの一覧を生成する
 * @returns slugの一覧
 */
export const generateArticleSlugList = (): string[] => {
  try {
    const allDirents = fs.readdirSync(postsDirectory, { withFileTypes: true })
    return allDirents
      .filter((dirent) => dirent.isDirectory())
      .map(({ name }) => name)
  } catch (err) {
    console.log(err)
    return []
  }
}

/**
 * slugから記事を読み込む
 * @param slug 記事のslug
 * @param targetFields 要求フィールドのリスト
 * @returns 記事の情報
 */
export const readArticleBySlug = (slug: string, targetFields: string[] = []): Article => {

  // 記事ファイルを読み込み
  const fullPath = path.join(postsDirectory, slug, 'index.md')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // 空のインスタンスを作成
  const items: Article = {
    slug: '',
    content: '',
    title: '',
    posted_at: '',
    updated_at: '',
    tags: [{ name: '', color: '', description: '' }],
    description: '',
  }

  // タグ情報を読み込み
  const tagsDict = getTagsJson()

  // 要求されているフィールドを埋める
  targetFields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug
    }
    if (field === 'content') {
      items[field] = content
    }
    if (field === 'tags') {
      const tag_ids = data['tag_ids']
      items[field] = tag_ids.map((tag_id: string) => {
        return tagsDict[tag_id]
      })
    }
    if (field === 'posted_at' || field === 'updated_at') {
      if (data[field] === undefined) {
        items[field] = ''
      } else {
        items[field] = formatDatetime(data[field])
      }
    }
    if (field === 'title' || field === 'description') {
      if (data[field] === undefined) {
        items[field] = ''
      } else {
        items[field] = data[field]
      }
    }
  })

  return items
}

/**
 * 記事のリストを読み込む
 * @param targetFields 読み込みたいフィールドのリスト
 * @returns 記事のリスト
 */
export const readArticlesWithTargetFields = (targetFields: string[] = []): Article[] => {
  const slugs = generateArticleSlugList()
  const articles = slugs
    .map((slug) => readArticleBySlug(slug, targetFields))
    .sort((a, b) => (a.posted_at > b.posted_at ? -1 : 1))
  return articles
}
/**
 * Convert Article[] into ArticlesMap
 * @param articles 記事のリスト
 * @returns 記事マップ
 */
export const generateArticlesMap = (articles: Article[]): ArticlesMap => {
  const postsMap: ArticlesMap = Object.create(null)
  articles.forEach((post, _) => {
    postsMap[post.slug] = {
      slug: post.slug,
      title: post.title,
      tags: post.tags,
      posted_at: post.posted_at,
      content: '',
      updated_at: '',
      description: '',
    }
  })
  return postsMap
}


/**
 * Extract article link (e.g. #1 ) from text.
 * @param content article content
 * @returns article link list
 */
export const extractArticleLink = (content: string): string[] => {
  const articleLinkPattern = /^#(\d+)\s*$/gm
  const slugs: string[] = Array.from(content.matchAll(articleLinkPattern)).map(
    (match) => {
      return match[1] // matched text
    },
  )
  return slugs
}
