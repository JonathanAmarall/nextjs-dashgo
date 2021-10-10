import { AppProps } from 'next/dist/shared/lib/router/router';
import '../styles/global.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
