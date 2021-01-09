const modal = document.querySelector('.modal');
const navigation = document.getElementById('navigation');

const routes = {
    login: '/login',
    register: '/register'
}

const render = async (id, e) => {
    try{
        const url = routes[id];
        if(!url) {
            alert(`${url} Not Found`);
            return;
        }
        const res = await fetch(url);

        if(res.status===200){
            const htmlText = await res.text();
            modal.innerHTML = htmlText;
            if(e.target.id === 'login') loginHandler();
            if(e.target.id === 'register') registerHandler(); 
    
        } else {
            console.error(err);
        }
    }catch(err){
        console.error(err);
    }
}

async function logoutHandler (_cookie){
    try{
        const res = await axios.get('/api/users/logout')
        console.log(res.data);
        if(res.data.success){
            Cookies.remove('x_auth');
            location.href = "/";
        } 
        else {
            alert('로그아웃을 실패하였습니다.')
        }

    }catch(err){
        console.log(err);
    }
}
const member = () => {
    const cookie = Cookies.get('x_auth');
    if(cookie) {
        document.querySelector('#login').style.display = 'none';
        document.querySelector('#register').style.display = 'none';
        document.querySelector('#mytrip').style.display = 'block';
        document.querySelector('#logout').style.display = 'block';
    } else{
        document.querySelector('#login').style.display = 'block';
        document.querySelector('#register').style.display = 'block';
        document.querySelector('#mytrip').style.display = 'none';
        document.querySelector('#logout').style.display = 'none';
    }

    navigation.onclick = e => {
        if(e.target.matches('#navigation > #login') || e.target.matches('#navigation > #register')) {
            e.preventDefault();
            render(e.target.id, e);
        } else if(e.target.matches('#navigation > #mytrip')) {
            location.href = "/mytrip";
        } else if(e.target.matches('#navigation > #logout')) {
            logoutHandler(cookie);
        }
    }
}