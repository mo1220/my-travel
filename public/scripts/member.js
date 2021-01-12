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
    const loginEle = document.querySelectorAll('#navigation > li');
    if(cookie) {
        loginEle[2].className = loginEle[2].className.replace('login', '');
        loginEle[4].className = loginEle[4].className.replace('login', '');
        loginEle[1].className = 'login';
        loginEle[3].className = 'login';
    } else{
        loginEle[1].className = loginEle[1].className.replace('login', '');
        loginEle[3].className = loginEle[3].className.replace('login', '');
        loginEle[2].className = 'login';
        loginEle[4].className = 'login';
    }

    navigation.onclick = e => {
        if(e.target.matches('#navigation > li > #login') || e.target.matches('#navigation > li > #register')) {
            e.preventDefault();
            render(e.target.id, e);
        } else if(e.target.matches('#navigation > li > #mytrip')) {
            location.href = "/mytrip";
        } else if(e.target.matches('#navigation > li > #logout')) {
            logoutHandler(cookie);
        }
    }
}