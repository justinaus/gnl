import { DEFAULT_LAT_LNG } from '@components/home/helper';
import NaverMap from '@components/home/NaverMap';
import { Stack } from '@mui/material';
import { getIsMobileDevice } from '@utils/*';
import type { NextPage } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';

import PageLayout from '../components/layout/PageLayout';

const Home: NextPage = () => {
  // eslint-disable-next-line no-undef
  const refMap = useRef<naver.maps.Map | null>(null); // TODO. namespace에서 타입 사용하는 방법?

  const [isLoadedNaverMap, setIsLoadedNaverMap] = useState(false);

  const handleLoadNaver = useCallback(() => {
    const map = new window.naver.maps.Map('map', {
      center: new window.naver.maps.LatLng(
        DEFAULT_LAT_LNG.lat,
        DEFAULT_LAT_LNG.lng,
      ),
      // zoom: 16,
      zoomControl: !getIsMobileDevice(),
    });

    refMap.current = map;

    setIsLoadedNaverMap(true);
  }, []);

  useEffect(() => {
    return () => {
      refMap.current = null;
    };
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NAVER_CLIENT_ID}`}
        onLoad={handleLoadNaver}
      ></Script>
      <PageLayout>
        <Stack
          sx={{
            display: 'flex',
            flex: 1,
          }}
        >
          <div
            id="map"
            style={{
              width: '100%',
              flex: 1,
            }}
          ></div>
          {isLoadedNaverMap && <NaverMap map={refMap.current!} />}
        </Stack>
      </PageLayout>
    </>
  );
};

export default Home;
