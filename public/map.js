function kakaoMap(x, y) {
  const mapContainer = document.getElementById("map");
  const mapOption = {
    center: new kakao.maps.LatLng(x, y),
    level: 4,
  };
  const map = new kakao.maps.Map(mapContainer, mapOption);
  const markerPosition = new kakao.maps.LatLng(x, y);
  const marker = new kakao.maps.Marker({
    position: markerPosition,
  });
  marker.setMap(map);
}

kakaoMap(35.23099774517053, 129.08232580812265);
