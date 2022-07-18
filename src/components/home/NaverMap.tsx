// eslint-disable-next-line no-undef
import namespaceNaverMaps = naver.maps; // TODO.

import { usePopup } from '@context/PopupProvider';
import { Restaurant, RestaurantsResponse } from '@pages/api/restaurants';
import { useEffect } from 'react';
import useSWR from 'swr';

import { createMarker, createNameMarker, DEFAULT_LAT_LNG } from './helper';
import RestaurantPopupContent from './popup/RestaurantPopupContent';

type Props = {
  map: namespaceNaverMaps.Map;
};

export default function NaverMap({ map }: Props) {
  const { data } = useSWR<RestaurantsResponse>('/api/restaurants');

  const { openPopup } = usePopup();

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
      return function () {
        openPopup(<RestaurantPopupContent data={restaurant} />);
      };
    }

    let mapEventListeners: namespaceNaverMaps.MapEventListener[] = [];
    let markers: namespaceNaverMaps.Marker[] = [];
    let nameMarkers: namespaceNaverMaps.Marker[] = [];

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
      if (!nameMarker) return;
      nameMarkers.push(nameMarker);
    });

    return () => {
      markers.forEach((marker, index) => {
        marker.setMap(null);
        naver.maps.Event.removeListener(mapEventListeners[index]);
        if (index < nameMarkers.length) {
          nameMarkers[index].setMap(null);
        }
      });
    };
  }, [data, map, openPopup]);

  return null;
}
