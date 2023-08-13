import Head from 'next/head'
import { Inter } from 'next/font/google'
import { readJson } from '../../../lib/common/readJson'
import { ConfigJson, defaultConfigJson, configJsonPath } from '../../../components/pages/configJson'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import { MenuBar } from '../../../components/MenuBar'
import { ArticleDetail } from '../../../components/pages/articles/ArticleDetail'
import { Article, readArticleBySlug, readArticlesWithTargetFields } from '../../../lib/articles/articles'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const inter = Inter({ subsets: ['latin'] })

const ArticlePage: NextPage<Props> = ({
  configJson,
  article,
}: {
  configJson: ConfigJson,
  article: Article,
}) => {
  return (
    <>
      <Head>
        <title>{`slug | ${configJson.blog_title}`}</title>
        <meta name="description" content={`${configJson.site_introduction}`} />
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

export const getStaticPaths: GetStaticPaths = async () => {
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

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const configJson = readJson<ConfigJson>(configJsonPath, defaultConfigJson);
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
    props: { configJson, article }
  }
}

export default ArticlePage