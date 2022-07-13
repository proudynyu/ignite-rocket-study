import dynamic from 'next/dynamic'
import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'

import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { withSSRAuth } from '../utils/withSSRAuth'
import { setupApiClient } from '../services/api'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[400],
    },
    categories: [
      '2021-03-18T00:00:00.000Z',
      '2021-03-19T00:00:00.000Z',
      '2021-03-20T00:00:00.000Z',
      '2021-03-21T00:00:00.000Z',
      '2021-03-22T00:00:00.000Z',
      '2021-03-23T00:00:00.000Z',
      '2021-03-24T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
}

const series = [
  {
    name: 'series1',
    data: [31, 120, 10, 28, 51, 18, 109],
  },
]

export default function Metrics() {
  return (
    <Flex direction='column' h='100vh'>
      <Header />

      <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
        <Sidebar />
        <SimpleGrid
          flex='1'
          gap='4'
          minChildWidth='320px'
          alignItems='flex-start'
        >
          <Box p={[6, 8]} bg='gray.800' borderRadius={8}>
            <Text fontSize='lg' mb='4'>
              Inscritos da Semana
            </Text>
            <Chart
              type='area'
              height={160}
              options={{
                ...options,
                xaxis: {
                  type: 'datetime',
                },
              }}
              series={series}
            />
          </Box>
          <Box p={[6, 8]} bg='gray.800' borderRadius={8}>
            <Text fontSize='lg' mb='4'>
              Taxa de Abertura
            </Text>
            <Chart
              type='area'
              height={160}
              options={{
                ...options,
                xaxis: {
                  type: 'datetime',
                },
              }}
              series={series}
            />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupApiClient(ctx)
    const { data } = await apiClient.get('/me')

    return {
      props: {},
    }
  },
  {
    permissions: ['metrics.list'],
    roles: ['administrator'],
  }
)
