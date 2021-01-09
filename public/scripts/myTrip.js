const mouseEventHandler = (map, marker, infowindow) => {

  const makeOverListener = (map, marker, infowindow) => {
    return function () {
      infowindow.open(map, marker);
    };
  }

  const makeOutListener = (infowindow) => {
    return function () {
      infowindow.close();
    };
  }

  kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
  kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
}

//한개 마커 생성
const markerCreateHandler = (map, trip) => {
  const markerPos = new kakao.maps.LatLng(trip.x, trip.y);

  const marker = new kakao.maps.Marker({
    position: markerPos
  });
  marker.setMap(map);
  map.panTo(markerPos);

  const iwContent = `<div style="padding:6px;">${trip.name}</div>`;
  const infowindow = new kakao.maps.InfoWindow({
    content: iwContent
  });

  mouseEventHandler(map, marker, infowindow);
}

// 여러 마커 생성
const markersCreateHandler = (map, trips) => {
  const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

  const positions = trips.map(item => {
    return { content: `<div style="padding: 6px; font-size: 1rem;">${item.name}</div>`, latlng: new kakao.maps.LatLng(item.x, item.y) }
  })

  for (let i = 0; i < positions.length; i++) {
    // 마커 이미지의 이미지 크기 입니다
    const imageSize = new kakao.maps.Size(24, 35);

    // 마커 이미지를 생성합니다    
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: positions[i].latlng, // 마커를 표시할 위치
      image: markerImage // 마커 이미지 
    });

    // 마커에 표시할 인포윈도우를 생성합니다 
    const infowindow = new kakao.maps.InfoWindow({
      content: positions[i].content // 인포윈도우에 표시할 내용
    });

    mouseEventHandler(map, marker, infowindow);
  }
}

const initTripsMap = (trips) => {
  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 11
  }

  let map = new kakao.maps.Map(container, options); //지도생성

  markersCreateHandler(map, trips);
}

const myTripMap = (myTrip) => {
  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(myTrip.x, myTrip.y),
    level: 3
  }

  let map = new kakao.maps.Map(container, options); //지도생성
  markerCreateHandler(map, myTrip);
}

const generateMyTripsList = list => {
  const listElement = $('#mytirp_list');

  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    const $item = $('#mytirp_item_templete').clone().remove('id');
    $item.find('.item_name').html(item.name);
    $item.find('.item_name').attr('id', item.id);
    $item.find('.item_city_name').html(item.cityName);

    listElement.append($item);

    //여행지 삭제
    $item.on('click', () => myTripMap(item));

    $item.find('.item_remove').on('click', function () {
      var $elem = $(this).closest('.mytirp_item');

      $elem.remove();
      console.log(list.filter(trip => trip.id !== item.id));
    });
  }
}

const main = () => {
  member();
  let myTrips = Cookies.get('MYTRIPS');
  let trips = [];
  if (!myTrips) {
    myTrips = [];
  } else trips = JSON.parse(myTrips);

  console.log(myTrips);
  trips && initTripsMap(trips);
  trips && generateMyTripsList(trips);

  document.querySelector('.btn_view_All').addEventListener('click', () => {
    initTripsMap(trips);
  })
  const allRemove_btn = document.querySelector('.all_remove_btn'); //여행지 리스트 전체 삭제
  if (!trips) {
    allRemove_btn.style.display = 'none';
  } else allRemove_btn.style.display = 'block';

  allRemove_btn.addEventListener('click', () => {
    if (confirm('전체 삭제하시겠습니까?')) {
      Cookies.remove('MYTRIPS');
      window.location.reload()
    }
  });
}
document.addEventListener('DOMContentLoaded', main);