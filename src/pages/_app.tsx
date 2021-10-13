import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { SideBarDrawerProvider } from '../contexts/SidebarDrawerContext';
import { makeServer } from '../services/mirage';

import '../styles/global.scss';
import { theme } from '../styles/theme';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <SideBarDrawerProvider>
          <Component {...pageProps} />
        </SideBarDrawerProvider>
      </ChakraProvider>
    </>
  );
}
