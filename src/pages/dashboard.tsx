import { useContext } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Flex, SimpleGrid, Box, Text, theme } from '@chakra-ui/react';
import { ApexOptions } from 'apexcharts';

import { Header } from '../components/Header/Index';
import { Sidebar } from '../components/Sidebar';
import { AuthContext } from '../contexts/AuthContext';
import { withSSRAuth } from '../utils/withSSRAuth';
import { setupApiClient } from '../services/api';
import { AuthTokenError } from '../services/errors/AuthTokenError';
import { destroyCookie } from 'nookies';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false, // carregado apenas pelo lado do browser
});

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
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
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
} as ApexOptions;

const series = [{ name: 'series1', data: [31, 120, 10, 28, 51, 18, 109] }];

export default function Dashboard() {
  const router = useRouter();
  const { isAthenticated } = useContext(AuthContext);

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
          <Box p={['6', '8']} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Taxa de abertura
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(async (context) => {
  // exemplo de request no lado servidor
  const apiClient = await setupApiClient(context);
  const response = apiClient.get('/me');

  return {
    props: {},
  };
});
