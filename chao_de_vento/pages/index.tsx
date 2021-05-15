import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import { Footer, MainGrid, UserCard } from '../components'
import { UserFileContext, UserFileProvider } from '../components/contexts/index'
import { useContext, useEffect } from 'react'

export default function Home() {
  const { selectedEnum } = useContext(UserFileContext)

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
          {selectedEnum === 'users' && (
            <h2 className={utilStyles.headingLg}>Usuários</h2>
          )}
          {selectedEnum === 'albums' && (
            <h2 className={utilStyles.headingLg}>Albums</h2>
          )}
          {selectedEnum === 'photos' && (
            <h2 className={utilStyles.headingLg}>Fotos</h2>
          )}
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
