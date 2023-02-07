import '../../styles/globals.css';

import Layout from '../components/specific/layout';
import { UserProvider } from '../contexts/auth';

import type { AppProps } from 'next/app';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
