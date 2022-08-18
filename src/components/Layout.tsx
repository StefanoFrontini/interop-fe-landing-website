import React, { ReactNode, useContext, useEffect } from 'react'
import { Box, Stack } from '@mui/material'
import { HeaderAccount, Footer } from '@pagopa/mui-italia'
import { useRouter } from 'next/router'
import {
  companyLegalInfo,
  Locale,
  LANGUAGES,
  pagoPALink,
  postLoginLinks,
  preLoginLinks,
} from '../../lib/constants'
import NavigationBar from './NavigationBar'
import { COMPARE_ROUTES, SINGLE_NEWS_ROUTE } from '../../lib/routes'
import LocaleContext from '../utils/LocaleContext'
import { getNewsData } from '../../api'
import { NewsPostProps } from '../../api/model'

interface Props {
  children?: ReactNode
}

function findNewsInOtherLang(
  currentLocale: Locale,
  targetLocale: Locale,
  postSlug: string
): NewsPostProps | undefined {
  const { news } = getNewsData(currentLocale)
  const currentNews = news.find(({ slug }) => slug === postSlug)

  if (!currentNews) {
    return
  }

  const { news: newsOtherLang } = getNewsData(targetLocale)
  const currentNewsInOtherLang = newsOtherLang.find(({ id }) => id === currentNews.id)
  return currentNewsInOtherLang
}

const Layout = ({ children }: Props) => {
  const { locale, setLocale } = useContext(LocaleContext)
  const router = useRouter()

  const handleAssistanceClick = () => {
    console.log('go to assistance')
  }

  const onLanguageChanged = (newLang: Locale) => {
    // Handle dynamic route
    if (router.pathname.includes('[')) {
      // Handle news (this needs refactor)
      if (router.pathname.includes('news')) {
        const newsInOtherLang = findNewsInOtherLang(
          locale,
          newLang,
          (router.query as { slug: string }).slug
        )

        if (newsInOtherLang) {
          const singleNewsRoute = SINGLE_NEWS_ROUTE[newLang]
          const newPath = singleNewsRoute.href.replace('[slug]', newsInOtherLang?.slug)
          router.push(newPath)
        }
      }
    } else {
      // Handle static route
      const currentRoute = Object.values(COMPARE_ROUTES).find((route) =>
        Boolean(route[locale].href === router.pathname)
      )

      if (currentRoute) {
        router.push(currentRoute[newLang].href)
      }
    }
  }

  useEffect(() => {
    const pathBits = router.pathname.split('/').filter((b) => b)
    const isEng = pathBits[0] === 'en'
    setLocale(isEng ? 'en' : 'it')
  }, [router.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{ height: '100vh' }}>
      <Stack
        direction="column"
        sx={{ minHeight: '100vh' }} // 100vh per sticky footer
      >
        <HeaderAccount
          enableLogin={false}
          rootLink={pagoPALink}
          onAssistanceClick={handleAssistanceClick}
        />
        <NavigationBar />
        <Box sx={{ flexGrow: 1 }} component="main">
          {children}
        </Box>

        <Footer
          loggedUser={false}
          companyLink={{ ...pagoPALink, onClick: () => window.open(pagoPALink.href, '_blank') }}
          legalInfo={companyLegalInfo}
          postLoginLinks={postLoginLinks}
          preLoginLinks={preLoginLinks}
          currentLangCode={locale}
          onLanguageChanged={onLanguageChanged}
          languages={LANGUAGES}
        />
      </Stack>
    </Box>
  )
}

export default Layout
