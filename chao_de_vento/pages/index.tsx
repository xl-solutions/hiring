import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { Footer, MainGrid, UserCard, Title } from '../components'
import { UserFileProvider } from '../components/contexts/index'

export default function Home() {
  return (
    <UserFileProvider>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section>
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
          </MainGrid>
        </section>
      </Layout>
      <Footer />
    </UserFileProvider>
  )
}
