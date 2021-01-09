const submitMyTrips = async (id, name, cityName, positionX, positionY) => {
    let token = Cookies.get('x_auth');
    console.log(token);
    document.querySelector('.btn_register').addEventListener('click', () => {
        if(token){
            let myTrips = Cookies.get('MYTRIPS');
            let myTripsList = [];
            if(!myTrips){
                myTrips = [];
            } else  myTripsList = JSON.parse(myTrips);
    
            myTripsList.push(
            {
                id: id,
                name: name,
                cityName: cityName,
                x: positionX,
                y: positionY
             }
    
           );
           Cookies.set('MYTRIPS', myTripsList);
           alert('여행지가 등록되었습니다!');
        } else {
            alert('로그인 후 이용가능합니다.');
        }
    });
}

const imgError = (image) => {
    console.log(image);
    image.onerror ="";
    image.src = 'images/image-not-found.png';
    image.style.display = "block";
    return true;
}

const getDetail = (id) =>{
    const url = 'https://javascript-basic.appspot.com/locationDetail';

    $.getJSON(url, {
        id : id
    }, function(r){
        console.log(r);

        showMarker(r.position.x, r.position.y, r.name);
        submitMyTrips(id, r.name, r.cityName, r.position.x, r.position.y);

        $('.detail_header_name').html(r.name);
        $('.detail_header_city_name').html(r.cityName);
        $('.detail_desc_txt').html(r.desc);

        const $gallery = $('#detail_images');
        let images = r.subImageList;
        
        for(let i=0; i<images.length; i++){
            let $image = $(`<img src="${images[i]}" onerror="imgError(this);" />`);
            $gallery.append($image);

        }       
    
        Galleria.loadTheme('libs/galleria-1.6.1/src/themes/classic/galleria.classic.js');
        Galleria.run('#detail_images');
    });
}

var map;
const initMap = () =>{
    const container = document.getElementById('map');
    const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
    };

    map = new kakao.maps.Map(container, options); //지도생성
}

function showMarker(let, lng, title){
    const markerPos = new kakao.maps.LatLng(let, lng);

    const marker = new kakao.maps.Marker({
        position: markerPos
    });
    marker.setMap(map);
    map.panTo(markerPos);

    // 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
    const iwContent = `<div style="padding:6px;">${title}</div>`;

    // 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({
        content: iwContent
    });

    // 마커에 마우스오버 이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'mouseover', function () {
        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
        infowindow.open(map, marker);
    });

    // 마커에 마우스아웃 이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'mouseout', function () {
        // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
        infowindow.close();
    });
}

const parseId = (str) => {
    let param = str.substring(1);
    let args = param.split('&');

    for(var i=0; i<args.length; i++){
        var arg = args[i];
        var tokens = arg.split('=');

        if(tokens[0] === 'id')
            return tokens[1];
    }

    return null;
}

const main = () => {
    member();
    const id = parseId(window.location.search);
    getDetail(id);
    initMap();
}
document.addEventListener('DOMContentLoaded', main);