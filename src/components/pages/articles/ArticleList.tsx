import Link from 'next/link'
import { Article } from '../../../lib/articles/articles'
import { Key } from 'react'

export const ArticleList = ({
  articles,
}: {
  articles: Article[],
}) => {

  return (
    <>
      <h1>Article List</h1>
      <ul>
        {articles.map((article: Article, index) => (
          <li key={index}>
            <Link href={`/articles/${article.slug}`} passHref>{article.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}