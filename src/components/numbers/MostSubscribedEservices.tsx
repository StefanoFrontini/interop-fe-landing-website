import React from 'react'
import { Stack, Typography, useTheme } from '@mui/material'
import { TimeframeSelectInput } from './TimeframeSelectInput'
import { ChartAndTableTabs, TableData } from './ChartAndTableTabs'
import { ChartAndTableWrapper } from './ChartAndTableWrapper'
import { MacroCategory, Timeframe } from '@/models/numbers.models'
import { MacroCategorySelectInput } from './MacroCategorySelectInput'
import * as ECharts from 'echarts'
import { MostSubscribedEServicesMetric } from '@/models/numbers.models'
import GovItLink from './GovItLink'
import { formatThousands } from '@/utils/formatters.utils'
import {
  BAR_CHART_NUMERIC_LABEL_COLOR,
  MACROCATEGORIES,
  PRIMARY_BLUE,
} from '@/configs/constants.config'
import { FiltersStack } from './FiltersStack'

const MostSubscribedEServices = ({ data }: { data: MostSubscribedEServicesMetric }) => {
  const [timeframe, setTimeframe] = React.useState<Timeframe>('lastTwelveMonths')
  const [macroCategory, setMacroCategory] = React.useState<MacroCategory['id']>('0')

  const [currentSearch, setCurrentSearch] = React.useState<{
    timeframe: Timeframe
    macroCategory: MacroCategory['id']
  }>({ timeframe, macroCategory })

  const mediaQuerySm = useTheme().breakpoints.values.sm
  const fontFamily = useTheme().typography.fontFamily
  const textColorPrimary = useTheme().palette.text.primary
  const midGrey = useTheme().palette.grey[500]

  const currentData = React.useMemo(() => {
    const macroCategoryData = data[currentSearch.timeframe].find(
      (x) => x.id === currentSearch.macroCategory
    )!
    const currentSelection = macroCategoryData.mostSubscribedEServices
    return currentSelection.filter((x) => x.subscribersCount > 0)
  }, [currentSearch, data])

  const chartOptions: ECharts.EChartsOption = React.useMemo(() => {
    const sortedData = [...currentData].reverse()
    const yAxisData = sortedData.map((x) => `${x.eserviceName} (${x.producerName})`)
    const seriesData = sortedData.map((x) => x.subscribersCount)

    return {
      media: [
        {
          query: {
            minWidth: mediaQuerySm,
          },
          option: {
            yAxis: {
              axisLabel: {
                width: 1200,
                overflow: 'none',
              },
            },
          },
        },
      ],
      tooltip: {
        show: true,
        valueFormatter: (value) => `${formatThousands(value as number)} enti abilitati`,
      },
      textStyle: {
        fontFamily: fontFamily,
      },
      yAxis: {
        type: 'category',
        data: yAxisData,
        axisTick: {
          show: false,
        },
        axisLabel: {
          backgroundColor: 'white',
          align: 'left',
          margin: -8,
          padding: [0, 0, 10, 0],
          verticalAlign: 'bottom',
          color: textColorPrimary,
          fontSize: 14,
          width: 280,
          overflow: 'truncate',
        },
      },
      xAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: midGrey,
          },
        },
        axisLabel: {
          color: midGrey,
          fontSize: 14,
        },
      },
      series: [
        {
          data: seriesData,
          type: 'bar',
          color: PRIMARY_BLUE,
          barWidth: 12,
          label: {
            show: true,
            position: 'insideRight',
            distance: -5,
            align: 'left',
            backgroundColor: 'white',
            color: BAR_CHART_NUMERIC_LABEL_COLOR,
          },
        },
      ],
      grid: {
        right: 30,
        left: 5,
        top: 20,
        bottom: 20,
      },
    }
  }, [currentData, fontFamily, textColorPrimary, mediaQuerySm, midGrey])

  const tableData: TableData = React.useMemo(() => {
    const head = ['E-service', 'Numero di richieste']
    const body = currentData.map((x) => [
      `${x.eserviceName} (${x.producerName})`,
      formatThousands(x.subscribersCount).toString(),
    ])

    return { head, body }
  }, [currentData])

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setCurrentSearch({ timeframe, macroCategory })
  }

  return (
    <ChartAndTableWrapper
      title="E-service più richiesti"
      description="I 10 e-service con più enti abilitati, filtrabili per categoria di ente fruitore"
    >
      <form onSubmit={onSubmit}>
        <FiltersStack>
          <TimeframeSelectInput value={timeframe} onChange={setTimeframe} />
          <MacroCategorySelectInput value={macroCategory} onChange={setMacroCategory} />
        </FiltersStack>
      </form>
      <ChartAndTableTabs
        chartOptions={chartOptions}
        tableData={tableData}
        info={Info}
        ariaLabel={`Grafico che mostra la top 10 filtrabile degli e-service con più enti fruitori per macrocategoria. Macrocategoria attiva: ${
          MACROCATEGORIES[macroCategory]
        }. ${tableData.body.map((i) => `${i[0]} con ${i[1]} iscritti`).join('; ')}`}
      />
      <Stack direction="row" justifyContent="space-between">
        <GovItLink metricName="eServicePiuRichiesti" timeframe={currentSearch.timeframe} />
      </Stack>
    </ChartAndTableWrapper>
  )
}

const Info = (
  <Typography color="text.secondary" variant="body2">
    I valori sono dati dal numero di enti che hanno effettuato ed ottenuto almeno 1 richiesta di
    abilitazione per ogni e-service.
  </Typography>
)

export default MostSubscribedEServices