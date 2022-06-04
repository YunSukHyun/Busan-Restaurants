var mapContainer = document.getElementById('map'),
mapOption = { 
    center: new kakao.maps.LatLng(35.23099774517053, 129.08232580812265),
    level: 3
};
var map = new kakao.maps.Map(mapContainer, mapOption);
var markerPosition  = new kakao.maps.LatLng(35.23099774517053, 129.08232580812265); 
var marker = new kakao.maps.Marker({
  position: markerPosition
});
marker.setMap(map);
function kakaoMap(x,y){
  var mapContainer = document.getElementById('map'),
  mapOption = { 
      center: new kakao.maps.LatLng(x, y),
      level: 4
  };
  var map = new kakao.maps.Map(mapContainer, mapOption);
  var markerPosition  = new kakao.maps.LatLng(x, y); 
  var marker = new kakao.maps.Marker({
    position: markerPosition
  });
  marker.setMap(map);
}


