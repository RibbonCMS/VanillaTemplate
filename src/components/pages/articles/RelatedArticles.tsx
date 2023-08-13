import Link from "next/link"
import { Article } from "../../../lib/articles/articles"

export const RelatedArticles = (
  {
    relatedArticles,
  }: {
    relatedArticles: Article[]
  }
) => {
  return (
    <>
      <hr />
      <h2>関連記事</h2>
      {relatedArticles.length > 0 ? (
        <ul>
          {relatedArticles.map((article: Article, index) => (
            <li key={index}>
              <Link href={`/articles/${article.slug}`} passHref>{article.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>関連記事はありません</p>
      )}
    </>
  )
}