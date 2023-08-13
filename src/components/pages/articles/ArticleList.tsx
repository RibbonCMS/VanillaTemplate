import Link from 'next/link'

export const ArticleList = () => {
  const articleList = ["article1", "article2", "article3"]

  return (
    <>
      <h1>Article List</h1>
      <ul>
        {articleList.map((article) => (
          <li key={article}>
            <Link href={`/articles/slug`} passHref>{article}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}