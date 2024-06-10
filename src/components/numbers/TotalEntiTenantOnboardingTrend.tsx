/* eslint-disable */
import {
  SerieDataLineChart,
  SeriesDataLineChart,
  TenantOnboardingTrendMetric,
} from '@/models/numbers.models'
import { formatThousands, toFormattedNumericDate } from '@/utils/formatters.utils'
import { Typography, useMediaQuery, useTheme } from '@mui/material'
import * as ECharts from 'echarts'
import React from 'react'
import { ChartAndTableTabs, TableData } from './ChartAndTableTabs'
// import GovItLink from './GovItLink'
import { LINE_CHART_ENTI_PRIVATI_COLOR, PRIMARY_BLUE } from '@/configs/constants.config'
import { optionLineChart } from '@/utils/charts.utils'

enum SeriesDataEnum {
  PublicTenantsData = 1,
  PrivateTenantsData = 2,
}

const TotalEntiTenantOnboardingTrend = ({ data }: { data: TenantOnboardingTrendMetric }) => {
  const fontFamily = useTheme().typography.fontFamily
  const mediaQuerySm = useTheme().breakpoints.values.sm
  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'))

  const sortedData = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const newTable: string[][] = sortedData.map((d) => [
    toFormattedNumericDate(new Date(d.date)),
    formatThousands(d.count),
  ])

  const dateForList: string[] = sortedData.map((d) => toFormattedNumericDate(new Date(d.date)))
  const totalData: number[] = sortedData.map((d) => d.count)
  const publicTenantsData = totalData.map((d) => 0.9 * d)
  const privateTenantsData = totalData.map((d) => 0.1 * d)
  // const seriesData: SeriesDataLineChart = []

  const publicTenantsChart: SerieDataLineChart = {
    id: SeriesDataEnum.PublicTenantsData,
    type: 'line',
    stack: 'Total',
    name: 'enti pubblici',
    showSymbol: false,
    data: publicTenantsData,
    color: PRIMARY_BLUE,
  }
  // seriesData.push(publicTenantsChart)
  const privateTenantsChart: SerieDataLineChart = {
    id: SeriesDataEnum.PrivateTenantsData,
    type: 'line',
    stack: 'Total',
    name: 'enti privati',
    showSymbol: false,
    data: privateTenantsData,
    color: LINE_CHART_ENTI_PRIVATI_COLOR,
  }

  const seriesData: SeriesDataLineChart = [privateTenantsChart, publicTenantsChart]

  const yAxis = {
    type: 'value',
    nameLocation: 'middle',
    name: isMobile ? '' : 'Enti aderenti',
    nameGap: 80,
    nameTextStyle: {
      fontWeight: 600,
      align: 'center',
      verticalAlign: 'middle',
    },
  }

  const grid = {
    left: isMobile ? 0 : 50,
    right: 40,
    bottom: 60,
    containLabel: true,
  }

  const chartOptions: ECharts.EChartsOption = optionLineChart(
    fontFamily,
    dateForList,
    seriesData,
    mediaQuerySm,
    grid,
    yAxis
  )

  const head = ['Data', 'Adesioni']
  const body = newTable
  const tableData: TableData = { head, body }

  return (
    <React.Fragment>
      <ChartAndTableTabs
        chartOptions={chartOptions}
        tableData={tableData}
        chartHeight={480}
        info={Info}
        ariaLabel="Grafico che mostra l'andamento nel tempo delle adesioni a PDND Interoperabilità."
      />
      {/* <Stack direction="row" justifyContent="space-between">
        <GovItLink metricName="andamentoDelleAdesioni" />
      </Stack> */}
    </React.Fragment>
  )
}

const Info = (
  <Typography color="text.secondary" variant="body2">
    Il numero degli enti aderenti è dato dalla somma degli enti pubblici e degli enti privati che
    hanno aderito alla piattaforma. Il dato è cumulativo.
  </Typography>
)

export default TotalEntiTenantOnboardingTrend
