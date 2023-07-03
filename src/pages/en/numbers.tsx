import type { NextPage } from 'next'
import React from 'react'
import { useLocaleContext } from '@/contexts/locale.context'
import { getCommonData, getNumbersData } from '@/static'
import { PageBottomCta, Dtd, LineChartSection, LineChartSectionSkeleton } from '@/components'
import { Alert, AlertTitle, Container, Typography } from '@mui/material'
import Head from 'next/head'
import { InteropNumbersResponseData, NumbersEnv } from '@/models/numbers.models'
import { useFetch } from '@/hooks'
import { getInteropNumbers } from '@/services/numbers.services'

const NumbersPage: NextPage = () => {
  const { locale } = useLocaleContext()
  const data = getNumbersData(locale)
  const commonData = getCommonData(locale)
  const initialEnv: Record<keyof InteropNumbersResponseData, NumbersEnv> = {
    descriptors: 'prod',
    tenants: 'prod',
    agreements: 'prod',
    purposes: 'prod',
    tokens: 'prod',
  }
  const [activeEnv, setActiveEnv] = React.useState(initialEnv)
  const { data: numbersData, error, isLoading } = useFetch(getInteropNumbers)

  const handleEnvChange = (value: string, section: keyof InteropNumbersResponseData) => {
    setActiveEnv((prev) => ({ ...prev, [section]: value as NumbersEnv }))
  }

  const { descriptors, tenants, agreements, purposes, tokens, tabs } = data

  return (
    <>
      <Head>
        <title>{data.meta.title}</title>
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:title" name="twitter:title" content={data.meta.title} />
        <meta
          key="twitter:description"
          name="twitter:description"
          content={data.meta.description}
        />
        <meta key="twitter:image" name="twitter:image" content={data.meta.imgTw} />
        <meta key="og:locale" property="og:locale" content="en_EN" />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:title" property="og:title" content={data.meta.title} />
        <meta key="og:description" property="og:description" content={data.meta.description} />
        <meta key="og:url" property="og:url" content={data.meta.url} />
        <meta key="og:site_name" property="og:site_name" content={data.meta.sitename} />
        <meta key="og:image" property="og:image" content={data.meta.imgFb} />
      </Head>
      <Typography sx={{ textAlign: 'center', pt: 8, pb: 8, mt: 8 }} variant="h1">
        {data.title}
      </Typography>

      {error && (
        <Container sx={{ mb: 9 }}>
          <Alert severity="error">
            <AlertTitle>{data.error.title}</AlertTitle>
            {data.error.description}
          </Alert>
        </Container>
      )}

      {isLoading && (
        <>
          <LineChartSectionSkeleton />
          <LineChartSectionSkeleton withBackground />
          <LineChartSectionSkeleton />
          <LineChartSectionSkeleton withBackground />
          <LineChartSectionSkeleton />
        </>
      )}

      {numbersData && (
        <>
          <LineChartSection
            title={tokens.title}
            cards={[
              {
                Icon: tokens.cards[0].Icon,
                amount: numbersData.tokens[activeEnv.tokens].primary,
                description: tokens.cards[0].description,
              },
              {
                Icon: tokens.cards[1].Icon,
                amount: numbersData.tokens[activeEnv.tokens].secondary,
                description: tokens.cards[1].description,
              },
            ]}
            graph={{
              title: tokens.graphTitle,
              subtitle: tokens.graphDescription,
              data: numbersData.tokens[activeEnv.tokens].graph,
            }}
            tabs={tabs}
            activeEnv={activeEnv.tokens}
            onChangeEnv={handleEnvChange}
            section={'tokens'}
          />
          <LineChartSection
            title={descriptors.title}
            cards={[
              {
                Icon: descriptors.cards[0].Icon,
                amount: numbersData.descriptors[activeEnv.descriptors].primary,
                description: descriptors.cards[0].description,
              },
              {
                Icon: descriptors.cards[1].Icon,
                amount: numbersData.descriptors[activeEnv.descriptors].secondary,
                description: descriptors.cards[1].description,
              },
            ]}
            graph={{
              title: descriptors.graphTitle,
              subtitle: descriptors.graphDescription,
              data: numbersData.descriptors[activeEnv.descriptors].graph,
            }}
            withBackground
            tabs={tabs}
            activeEnv={activeEnv.descriptors}
            onChangeEnv={handleEnvChange}
            section={'descriptors'}
          />

          <LineChartSection
            title={tenants.title}
            cards={[
              {
                Icon: tenants.cards[0].Icon,
                amount: numbersData.tenants[activeEnv.tenants].primary,
                description: tenants.cards[0].description,
              },
              {
                Icon: tenants.cards[1].Icon,
                amount: numbersData.tenants[activeEnv.tenants].secondary,
                description: tenants.cards[1].description,
              },
            ]}
            graph={{
              title: tenants.graphTitle,
              subtitle: tenants.graphDescription,
              data: numbersData.tenants[activeEnv.tenants].graph,
            }}
            tabs={tabs}
            activeEnv={activeEnv.tenants}
            onChangeEnv={handleEnvChange}
            section={'tenants'}
          />

          <LineChartSection
            title={agreements.title}
            cards={[
              {
                Icon: agreements.cards[0].Icon,
                amount: numbersData.agreements[activeEnv.agreements].primary,
                description: agreements.cards[0].description,
              },
              {
                Icon: agreements.cards[1].Icon,
                amount: numbersData.agreements[activeEnv.agreements].secondary,
                description: agreements.cards[1].description,
              },
            ]}
            graph={{
              title: agreements.graphTitle,
              subtitle: agreements.graphDescription,
              data: numbersData.agreements[activeEnv.agreements].graph,
            }}
            withBackground
            tabs={tabs}
            activeEnv={activeEnv.agreements}
            onChangeEnv={handleEnvChange}
            section={'agreements'}
          />

          <LineChartSection
            title={purposes.title}
            cards={[
              {
                Icon: purposes.cards[0].Icon,
                amount: numbersData.purposes[activeEnv.purposes].primary,
                description: purposes.cards[0].description,
              },
              {
                Icon: purposes.cards[1].Icon,
                amount: numbersData.purposes[activeEnv.purposes].secondary,
                description: purposes.cards[1].description,
              },
            ]}
            graph={{
              title: purposes.graphTitle,
              subtitle: purposes.graphDescription,
              data: numbersData.purposes[activeEnv.purposes].graph,
            }}
            tabs={tabs}
            activeEnv={activeEnv.purposes}
            onChangeEnv={handleEnvChange}
            section={'purposes'}
          />
        </>
      )}

      <PageBottomCta {...commonData.pageBottomCta} />
      <Dtd {...commonData.dtd} />
    </>
  )
}

export default NumbersPage
