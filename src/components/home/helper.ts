export const DEFAULT_LAT_LNG = {
  lat: 37.5007218,
  lng: 127.0307403,
};

export function createMarker(
  // eslint-disable-next-line no-undef
  map: naver.maps.Map,
  lat: number,
  lng: number,
  text: string,
  isDefaultMarker?: boolean,
) {
  const naver = window.naver;

  if (!naver) return null;

  let classes = 'naver-marker-place';
  if (isDefaultMarker) {
    classes += ' naver-marker-place-blue-image';
  }

  const marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(lat, lng),
    map: map,
    icon: {
      size: new naver.maps.Size(32, 40),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(16, 40),
      content: `<div class="${classes}"><span class="emoji">${text}</span></div>`,
    },
  });

  return marker;
}

export function createNameMarker(
  // eslint-disable-next-line no-undef
  map: naver.maps.Map,
  lat: number,
  lng: number,
  text: string,
) {
  const naver = window.naver;

  if (!naver) return null;

  const marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(lat, lng),
    map: map,
    clickable: false,
    icon: {
      size: new naver.maps.Size(100, 18),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(50, 0),
      content: `<span class="naver-marker-name">${text}</span>`,
    },
  });

  return marker;
}
