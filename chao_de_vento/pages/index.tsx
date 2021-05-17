import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import { Footer, MainGrid, UserCard, Title } from '../components'
import { UserFileProvider } from '../components/contexts/index'

export default function Home() {
  return (
    <UserFileProvider>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>Chão de Vento</p>
          <p>
            Ajude-nos a contar a sua história à partir de fotos{' '}
            <a href="https://github.com/gusdecante" target="_blank">
              procure-nos no github
            </a>
            .
          </p>
        </section>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <Title />
          <MainGrid>
            <UserCard />
            {/* {JSON.stringify(users, null, 2)} */}
          </MainGrid>
        </section>
      </Layout>
      <Footer />
    </UserFileProvider>
    //Dispatch<SetStateAction<undefined>>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}
