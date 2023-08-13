import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Home } from '../../components/pages/fixed/home/HomePage'
import { readJson } from '../../lib/common/readJson'
import { HomeJson, defaultHomeJson, homeJsonPath } from '../../components/pages/fixed/home/homeJson'
import { ConfigJson, defaultConfigJson, configJsonPath } from '../../components/pages/configJson'
import { InferGetStaticPropsType, NextPage } from 'next'
import { MenuBar } from '../../components/MenuBar'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const inter = Inter({ subsets: ['latin'] })

const HomePage: NextPage<Props> = ({
  configJson,
  homeJson
}: {
  configJson: ConfigJson,
  homeJson: HomeJson
}) => {
  return (
    <>
      <Head>
        <title>{`Home | ${configJson.blog_title}`}</title>
        <meta name="description" content={`${configJson.site_introduction}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className}`}>
        <MenuBar />
        <Home
          homeJson={homeJson}
        />
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const configJson = readJson<ConfigJson>(configJsonPath, defaultConfigJson);
  const homeJson = readJson<HomeJson>(homeJsonPath, defaultHomeJson);
  return {
    props: { configJson, homeJson }
  }
};

export default HomePage;