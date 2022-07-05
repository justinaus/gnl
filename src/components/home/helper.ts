import { Restaurant } from 'pages/api/restaurants';

export const DEFAULT_LAT_LNG = {
  lat: 37.5005,
  lng: 127.0309,
};

// eslint-disable-next-line no-undef
export function createMarker(map: naver.maps.Map, data: Restaurant) {
  const naver = window.naver;

  if (!naver) return null;

  const marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(data.latLng.lat, data.latLng.lng),
    map: map,
    icon: {
      size: new naver.maps.Size(32, 40),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(16, 40),
      content: `<div class="naver-marker-place"><span class="emoji">${
        data.emoji || ''
      }</span></div>`,
    },
  });

  return marker;
}

// eslint-disable-next-line no-undef
export function createNameMarker(map: naver.maps.Map, data: Restaurant) {
  const naver = window.naver;

  if (!naver) return null;

  const marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(data.latLng.lat, data.latLng.lng),
    map: map,
    clickable: false,
    icon: {
      size: new naver.maps.Size(100, 18),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(50, 0),
      content: `<span class="naver-marker-name">${data.name}</span>`,
    },
  });

  return marker;
}
