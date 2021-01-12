const  getParameterByName = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const getListItem = async () => {
    const url = 'https://javascript-basic.appspot.com/searchLocation';

    $.getJSON(url, (response) => {
        let list = [];
        let prevIndex = 0;
        let nextIndex = 6;

        const listElement = document.querySelector('#list_item_template');
        list = response.slice(prevIndex, nextIndex);
        list.map(item => {
            const itemElement = createListItem(item);
            listElement.append(itemElement);
        });

        document.querySelector('.more_btn').addEventListener('click', () => {
            prevIndex = nextIndex;
            nextIndex += 6;
            const lastItemElement = listElement.lastElementChild;
            getMoreList(prevIndex, nextIndex, response, lastItemElement);
        });
    });
}

const getMoreList = (prevIndex, nextIndex, res, lastItem) => {
    let list = res.slice(prevIndex, nextIndex);
    list.map(item => {
        const itemElement = createListItem(item);
        lastItem.after(itemElement);
    })
    if(nextIndex >= res.length) document.querySelector('.more_btn').style.display = 'none';
}

const createListItem = (item) => {
    const itemElement = document.createElement('li');
    itemElement.innerHTML = `
        <img src="${item.titleImageUrl}" class="list_item_img" alt="${item.name}사진">
        <div class="list_item_info">
            <div class="list_item_name">${item.name}</div>
            <div class="list_item_city">
                <img src="./images/icon_location.png" alt="지도아이콘">
                <div class="list_item_cityName">
                    ${item.cityName}
                </div>
            </div>
        </div>` 
        
        itemElement.addEventListener('click', () =>
            location.href=`/detail?id=${item.id}`
        );
        return itemElement;
}

const main = () => {
    const from_params = getParameterByName('from');
    const to_params = getParameterByName('to');
    document.querySelector('.list_title').innerHTML = `여행날짜: ${from_params} ~ ${to_params}`;

    getListItem();
    member();

    // 토글
    const toggleEle = document.querySelector('.toggle');
    const toggleBtn = document.getElementById('toggle-btn');
    
    toggleBtn.addEventListener('click', () => {
        toggleEle.classList.toggle('on');
    })
    window.addEventListener('resize', () => {
        if(window.innerWidth > 1024){
            toggleEle.classList.remove('on');
        }
    })
}

document.addEventListener('DOMContentLoaded', main);