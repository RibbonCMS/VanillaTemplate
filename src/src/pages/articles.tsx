import Head from 'next/head'
import { Inter } from 'next/font/google'
import { readJson } from '../../lib/common/readJson'
import { ConfigJson, defaultConfigJson, configJsonPath } from '../../components/pages/configJson'
import { ArticleList } from '../../components/pages/articles/ArticleList'
import { InferGetStaticPropsType, NextPage } from 'next'
import { MenuBar } from '../../components/MenuBar'
import { Article, readArticlesWithTargetFields } from '../../lib/articles/articles'
import { Copyright } from '../../components/Copyright'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const inter = Inter({ subsets: ['latin'] })

const ArticleListPage: NextPage<Props> = ({
  config,
  articles,
}: {
  config: ConfigJson,
  articles: Article[],
}) => {
  return (
    <>
      <Head>
        <title>{`Article List | ${config.blog_title}`}</title>
        <meta name="description" content={`${config.site_introduction}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/static/images/favicon.ico" />
      </Head>
      <main className={`${inter.className}`}>
        <MenuBar />
        <ArticleList
          articles={articles}
        />
      </main>
      <footer>
        <Copyright config={config} />
      </footer>
    </>
  )
}

export const getStaticProps = async () => {
  const config = readJson<ConfigJson>(configJsonPath, defaultConfigJson)
  const articles: Article[] = readArticlesWithTargetFields([
    'slug',
    'title',
    'posted_at',
    'tags',
  ])
  return {
    props: { config, articles }
  }
};

export default ArticleListPage;
