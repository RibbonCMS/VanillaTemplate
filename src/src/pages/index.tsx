import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Home } from '../../components/pages/fixed/home/HomePage'
import { readJson } from '../../lib/common/readJson'
import { HomeJson, defaultHomeJson, homeJsonPath } from '../../components/pages/fixed/home/homeJson'
import { ConfigJson, defaultConfigJson, configJsonPath } from '../../components/pages/configJson'
import { InferGetStaticPropsType, NextPage } from 'next'
import { MenuBar } from '../../components/MenuBar'
import { Copyright } from '../../components/Copyright'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const inter = Inter({ subsets: ['latin'] })

const HomePage: NextPage<Props> = ({
  config,
  homeJson
}: {
  config: ConfigJson,
  homeJson: HomeJson
}) => {
  return (
    <>
      <Head>
        <title>{`Home | ${config.blog_title}`}</title>
        <meta name="description" content={`${config.site_introduction}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/static/images/favicon.ico" />
      </Head>
      <main className={`${inter.className}`}>
        <MenuBar />
        <Home
          homeJson={homeJson}
        />
      </main>
      <footer>
        <Copyright config={config} />
      </footer>
    </>
  )
}

export const getStaticProps = async () => {
  const config = readJson<ConfigJson>(configJsonPath, defaultConfigJson);
  const homeJson = readJson<HomeJson>(homeJsonPath, defaultHomeJson);
  return {
    props: { config, homeJson }
  }
};

export default HomePage;