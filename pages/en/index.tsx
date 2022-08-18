import { GetStaticProps } from 'next'
import { QueryParams } from '../../src/types/global'
import { Hero, Infoblock, Showcase } from '@pagopa/mui-italia'
import MainFaq from '../../src/components/MainFaq'
import PageBottomCta from '../../src/components/PageBottomCta'
import { useContext } from 'react'
import LocaleContext from '../../src/utils/LocaleContext'
import { getCommonData, getHomeData } from '../../api'

const Home = () => {
  const { locale } = useContext(LocaleContext)
  const data = getHomeData(locale)
  const commonData = getCommonData(locale)

  return (
    <>
      <Hero {...data.hero} />
      <Infoblock {...data.infoblocks[0]} />
      <Infoblock {...data.infoblocks[1]} />
      <Infoblock {...data.infoblocks[2]} />
      <MainFaq {...data.mainFaq} />
      <Showcase {...data.showcase} />
      <PageBottomCta {...commonData.pageBottomCta} />
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps<{}, QueryParams> = async () => {
  return { props: {} }
}
