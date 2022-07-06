import { Restaurant, RestaurantsResponse } from '@pages/api/restaurants';
import { useEffect } from 'react';
import useSWR from 'swr';

import { createMarker, createNameMarker, DEFAULT_LAT_LNG } from './helper';

type Props = {
  // eslint-disable-next-line no-undef
  map: naver.maps.Map;
};

export default function NaverMap({ map }: Props) {
  const { data } = useSWR<RestaurantsResponse>('/api/restaurants');

  useEffect(() => {
    const naver = window.naver;
    if (!naver) return;

    const defaultMarker = createMarker(
      map,
      DEFAULT_LAT_LNG.lat,
      DEFAULT_LAT_LNG.lng,
      '🥩',
      true,
    );

    return () => {
      console.log(11);
      defaultMarker?.setMap(null);
    };
  }, [map]);

  useEffect(() => {
    if (!data?.data) return;

    const naver = window.naver;
    if (!naver) return;

    // 해당 마커의 인덱스를 seq라는 클로저 변수로 저장하는 이벤트 핸들러를 반환합니다.
    function getClickHandler(restaurant: Restaurant) {
      return function (e: any) {
        console.log(111, restaurant.name);
        // var marker = markers[seq],
        //     infoWindow = infoWindows[seq];

        // if (infoWindow.getMap()) {
        //     infoWindow.close();
        // } else {
        //     infoWindow.open(map, marker);
        // }
      };
    }

    // eslint-disable-next-line no-undef
    let mapEventListeners: naver.maps.MapEventListener[] = [];
    // eslint-disable-next-line no-undef
    let markers: naver.maps.Marker[] = [];
    let nameMarkers: naver.maps.Marker[] = [];

    data.data.forEach((restaurant) => {
      const { latLng, emoji, name } = restaurant;
      const { lat, lng } = latLng;

      const marker = createMarker(map, lat, lng, emoji || '');

      if (!marker) return;

      markers.push(marker);

      const listener = getClickHandler(restaurant);

      const mapEventListener = naver.maps.Event.addListener(
        marker,
        'click',
        listener,
      );

      mapEventListeners.push(mapEventListener);

      const nameMarker = createNameMarker(map, lat, lng, name);
    });

    var infowindow = new naver.maps.InfoWindow({
      content: 'hello',
    });

    return () => {
      mapEventListeners.forEach((mapEventListener) => {
        naver.maps.Event.removeListener(mapEventListener);
      });
    };
  }, [data, map]);

  return null;
}
