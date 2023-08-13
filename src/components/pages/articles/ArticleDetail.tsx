import css from "styled-jsx/css"
import { Article } from "../../../lib/articles/articles"

export const ArticleDetail = ({
  article,
}: {
  article: Article
}) => {
  return (
    <>
      <h1>{article.title}</h1>
      <table>
        <tr>
          <th>投稿日</th>
          <td>{article.posted_at}</td>
        </tr>
        <tr>
          <th>更新日</th>
          <td>{article.updated_at}</td>
        </tr>
        <tr>
          <th>タグ</th>
          <td>
            {article.tags.map((tag, index) => (
              <div key={index}>
                <span style={{ color: `#${tag.color}` }}>{tag.name} … {tag.description}</span>
              </div>
            ))}
          </td>
        </tr>
        <tr>
          <th>説明</th>
          <td>{article.description}</td>
        </tr>
      </table>
      <p>
        {article.content}
      </p>
    </>
  )
}