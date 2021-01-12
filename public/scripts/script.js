
const url = 'https://javascript-basic.appspot.com/searchLocation';
const recommand = async () => {
    const httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
        alert('XMLHTTP 인스턴스를 만들 수가 없어요.');
        return false;
    }
    httpRequest.onreadystatechange = render;
    httpRequest.open('GET', url);
    httpRequest.send();

    function render() {
        const listElement = document.querySelector('#list_item_template');
        const pickId = [];
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                const response = JSON.parse(httpRequest.responseText);
                const totalLength = response.length;

                while (pickId.length < 4) {
                    const n = Math.floor(Math.random() * totalLength);
                    if (notSame(n)) pickId.push(n);
                }

                function notSame(n) {
                    return pickId.every((e) => n !== e);
                }                

                for (let num of pickId) {
                    const _item = response.filter(item => {
                        if(item.id === num) return item;
                    });
                    console.log(_item);
                    const itemElement = document.createElement('li');
                    itemElement.innerHTML = `
                    <a href=/detail?id=${_item[0].id}>
                        <img
                            class="list_item_img"
                            src=${_item[0].titleImageUrl}
                            alt=${_item[0].name}사진>
                                <div class="list_item_info">
                                    <div class="list_item_name">
                                        ${_item[0].name}
                                    </div>
                                </div>
                    </a>
                    `;
                    listElement.append(itemElement);
                }

            } else {
                console.log('request에 문제가 있어요.');
            }
        }
    }
}


const search = (from, to) => {
    location.href=`/list?from=${from}&to=${to}`;
}


 // typing Event
let typingBool = false;
let typingIdx = 0;
let liIndex = 0;
let liLength = $(".title").length;

// 타이핑될 텍스트를 가져온다 
let typingTxt = $(".title").eq(liIndex).text();
// liIndex 인덱스로 구분해 한줄씩 가져옴

typingTxt = typingTxt.split(""); // 한글자씩 잘라 배열로만든다

const repeat = setInterval(typing = () => {
    $(".typing-empty").removeClass("on");
    $(".typing-empty").eq(liIndex).addClass("on");
    //현재 타이핑되는 문장에만 커서 애니메이션을 넣어준다.

    if (typingIdx < typingTxt.length) {
        $('.typing-empty').eq(liIndex).append(typingTxt[typingIdx]);
        typingIdx++;
    } else {
        liIndex++;
        typingIdx = 0;
        typingTxt = $('.title').eq(liIndex).text();

        if (liIndex === liLength) {
            typingBool = false;
            clearInterval(repeat);

            setTimeout(() => {
                liIndex = 0;
                typingIdx = 0;

                typingTxt = $('.title').eq(liIndex).text();
                $('.typing-empty').html('');
            }, 1000)
        }
    }
}, 200);


const main = () => {
    if (!typingBool) { // 타이핑이 진행되지 않았다면 
        typingBool = true;
        setInterval(typing, 150); // 반복동작 
    }
    recommand();
    member();

    $('#main_banner').vegas({
        slides: [
            { src: '/images/main-banner/main-banner1.jpg' },
            { src: '/images/main-banner/main-banner2.jpg' },
            { src: '/images/main-banner/main-banner4.jpg' },
            { src: '/images/main-banner/main-banner5.jpg' },
            { src: '/images/main-banner/main-banner6.jpg' },
            { src: '/images/main-banner/main-banner7.jpg' },
            { src: '/images/main-banner/main-banner8.jpg' },
            { src: '/images/main-banner/main-banner9.jpg' },
            { src: '/images/main-banner/main-banner10.jpg' },
        ]
    })

    const toggleEle = document.querySelector('.toggle');
    const toggleBtn = document.getElementById('toggle-btn');
    
    toggleBtn.addEventListener('click', () => {
        toggleEle.classList.toggle('on');
    })
    window.addEventListener('resize', () => {
        if(window.innerWidth > 1024){
            console.log('ok');
            toggleEle.classList.remove('on');
        }
    })

    window.addEventListener('scroll', () => {
        let scrollLocation = document.documentElement.scrollTop;
        if (scrollLocation > 0) {
            document.querySelector('#header').classList.add('inverted');
        } else {
            document.getElementById('header').classList.remove('inverted');
        }
    })

    let dpFrom = $('#from').datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: 0,
        onSelect: function () {
            dpTo.datepicker('option', 'minDate', dpFrom.datepicker('getDate'));
        }
    });
    dpFrom.datepicker('setDate', new Date());

    let dpTo = $('#to').datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: 0,
        onSelect: function () {
            let from_date = dpFrom.datepicker('getDate');
            let to_date = dpTo.datepicker('getDate');
            let diff_date = to_date.getTime() - from_date.getTime();
            diff_date === 0 && alert('가는날짜와 오는날짜가 같습니다. 다시 선택해 주세요.');
        }
    });
    dpTo.datepicker('setDate', 4);

    document.querySelector('#form-search').addEventListener('submit', (e) => {
        e.preventDefault();
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;

        search(from, to);
    })
}

document.addEventListener('DOMContentLoaded', main);