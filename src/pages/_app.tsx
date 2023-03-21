import '../../styles/globals.css';

import { ThemeProvider } from 'next-themes';

import Layout from '../components/specific/layout';
import { UserProvider } from '../contexts/auth';

import type { AppProps } from 'next/app';
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ThemeProvider enableSystem attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </UserProvider>
  );
}
