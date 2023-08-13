import Head from 'next/head'
import { Inter } from 'next/font/google'
import { readJson } from '../../../lib/common/readJson'
import { ConfigJson, defaultConfigJson, configJsonPath } from '../../../components/pages/configJson'
import { InferGetStaticPropsType, NextPage } from "next"
import { MenuBar } from '../../../components/MenuBar'
import { ArticleDetail } from '../../../components/pages/articles/ArticlePage'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const inter = Inter({ subsets: ['latin'] })

const ArticlePage: NextPage<Props> = ({
  configJson,
}: {
  configJson: ConfigJson
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
        <ArticleDetail />
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

export default ArticlePage