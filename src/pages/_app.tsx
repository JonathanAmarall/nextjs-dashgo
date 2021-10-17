import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GlobalContextProvider } from '../contexts/GlobalContext';
import { makeServer } from '../services/mirage';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthProvider } from '../contexts/AuthContext';

import '../styles/global.scss';
import { theme } from '../styles/theme';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <GlobalContextProvider>
            <Component {...pageProps} />
          </GlobalContextProvider>
        </ChakraProvider>
        {/* {process.env.NODE_ENV === 'development' ? <ReactQueryDevtools /> : null} */}
      </QueryClientProvider>
    </>
  );
}
