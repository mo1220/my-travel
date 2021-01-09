const login_url = '/api/users/login';

async function loginSubmitHandler (e) {
    e.preventDefault();
    e.stopPropagation();

    const emailElement = document.querySelector('#email');
    const passwordElement =document.querySelector('#psw');

    const email = emailElement.value;
    const password = passwordElement.value;

    console.log(email, password);
    try{
        const res = await axios.post(login_url, {
            email,
            password
        })
        if(res.data.loginSuccess) {
            location.href = '/';
        } else {
            alert('등록된 이메일이 없거나 비밀번호가 틀렸습니다.');
        }
    }catch(err){
        console.error(err)
    }
}

const loginHandler = () => {
    const form = document.querySelector('#login-form');
    if(form) form.addEventListener('submit', loginSubmitHandler)    
}
