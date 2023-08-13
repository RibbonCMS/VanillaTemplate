import Head from 'next/head'
import { Inter } from 'next/font/google'
import { readJson } from '../../../lib/common/readJson'
import { ConfigJson, defaultConfigJson, configJsonPath } from '../../../components/pages/configJson'
import { InferGetStaticPropsType, NextPage } from "next"
import { MenuBar } from '../../../components/MenuBar'
import { ArticleDetail } from '../../../components/pages/articles/ArticleDetail'
import { Article, extractArticleLink, generateArticlesMap, readArticleBySlug, readArticlesWithTargetFields } from '../../../lib/articles/articles'
import { readRelatedJson } from '../../../lib/articles/relatedArticles'
import { RelatedArticles } from '../../../components/pages/articles/RelatedArticles'
import { Copyright } from '../../../components/Copyright'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const inter = Inter({ subsets: ['latin'] })

const ArticlePage: NextPage<Props> = ({
  config,
  article,
  relatedArticles,
}: {
  config: ConfigJson,
  article: Article,
  relatedArticles: Article[],
}) => {
  return (
    <>
      <Head>
        <title>{`${article.title} | ${config.blog_title}`}</title>
        <meta name="description" content={`${config.site_introduction}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/static/images/favicon.ico" />

        <meta
          property="og:title"
          content={`${article.title} | ${config.blog_title}`}
        />
        <meta property="og:description" content={article.description} />
        <meta
          property="og:image"
          content={`${config.root_url}/static/images/thumbnail/${article.slug}.jpg`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={config.blog_title} />
        <meta property="og:url" content={`${config.root_url}/article/${article.slug}`} />

        <meta
          name="twitter:image"
          content={`${config.root_url}/static/images/thumbnail/${article.slug}.jpg`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main className={`${inter.className}`}>
        <MenuBar />
        <ArticleDetail
          article={article}
        />
        <RelatedArticles
          relatedArticles={relatedArticles}
        />
      </main>
      <footer>
        <Copyright config={config} />
      </footer>
    </>
  )
}

export const getStaticPaths = async () => {
  const articles = readArticlesWithTargetFields(['slug'])
  return {
    paths: articles.map((article) => {
      return {
        params: {
          slug: article.slug,
        },
      }
    }),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: any) => {
  const config = readJson<ConfigJson>(configJsonPath, defaultConfigJson);
  const article = readArticleBySlug(
    params.slug,
    [
      'slug',
      'title',
      'posted_at',
      'updated_at',
      'content',
      'tags',
      'description',
    ]
  )

  // 関連記事のリストを取得
  const linkedSlugs = extractArticleLink(article.content)
  const relatedSlugs = readRelatedJson()[article.slug]
  const articlesMap = generateArticlesMap(
    readArticlesWithTargetFields(['slug', 'title', 'posted_at', 'tags']).filter(
      (_article) => linkedSlugs.includes(_article.slug) || relatedSlugs.includes(_article.slug),
    )
  )
  const relatedArticles = relatedSlugs.map((slug) => {
    return articlesMap[slug]
  })

  return {
    props: { config, article, relatedArticles }
  }
}

export default ArticlePage