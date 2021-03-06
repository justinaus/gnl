import '@styles/globals.css';

import AppLayout from '@components/layout/AppLayout';
import PopupProvider from '@context/PopupProvider';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import createEmotionCache from '@styles/createEmotionCache';
import { theme } from '@styles/theme';
import axios from 'axios';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({
  Component,
  pageProps: { ...pageProps },
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SWRConfig
          value={{
            // refreshInterval: 3000,
            fetcher: (url) => axios.get(url).then((res) => res.data),
          }}
        >
          <PopupProvider>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </PopupProvider>
        </SWRConfig>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
