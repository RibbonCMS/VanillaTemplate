import Head from 'next/head'
import { Inter } from 'next/font/google'
import { readJson } from '../../../lib/common/readJson'
import { ConfigJson, defaultConfigJson, configJsonPath } from '../../../components/pages/configJson'
import { InferGetStaticPropsType, NextPage } from "next"
import { MenuBar } from '../../../components/MenuBar'
import { ArticleDetail } from '../../../components/pages/articles/ArticleDetail'
import { Article, readArticleBySlug, readArticlesWithTargetFields } from '../../../lib/articles/articles'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const inter = Inter({ subsets: ['latin'] })

const ArticlePage: NextPage<Props> = ({
  config,
  article,
}: {
  config: ConfigJson,
  article: Article,
}) => {
  return (
    <>
      <Head>
        <title>{`slug | ${config.blog_title}`}</title>
        <meta name="description" content={`${config.site_introduction}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className}`}>
        <MenuBar />
        <ArticleDetail
          article={article}
        />
      </main>
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
  return {
    props: { config, article }
  }
}

export default ArticlePage