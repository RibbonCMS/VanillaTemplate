import Head from 'next/head'
import { Inter } from 'next/font/google'
import { readJson } from '../../lib/common/readJson'
import { ConfigJson, defaultConfigJson, configJsonPath } from '../../components/pages/configJson'
import { ArticleList } from '../../components/pages/articles/ArticleList'
import { InferGetStaticPropsType, NextPage } from 'next'
import { MenuBar } from '../../components/MenuBar'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const inter = Inter({ subsets: ['latin'] })

const ArticleListPage: NextPage<Props> = ({
  configJson
}: {
  configJson: ConfigJson
}) => {
  return (
    <>
      <Head>
        <title>{`Article List | ${configJson.blog_title}`}</title>
        <meta name="description" content={`${configJson.site_introduction}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className}`}>
        <MenuBar />
        <ArticleList />
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const configJson = readJson<ConfigJson>(configJsonPath, defaultConfigJson);
  return {
    props: { configJson }
  }
};

export default ArticleListPage;