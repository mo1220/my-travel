const register_api = '/api/users/register';

async function submitHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const nameElement = document.getElementById('userName');
    const emailElement = document.getElementById('userEmail');
    const passwordElement = document.getElementById('password');
    const pwCheckElement = document.getElementById('password-check');

    const name = nameElement.value;
    const email = emailElement.value;
    const password = passwordElement.value;
    const pwCheck = pwCheckElement.value;

    const pwPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}$/;

    console.log(pwPattern);

    try {
        if (pwCheck !== password) {
            pwCheckElement.nextElementSibling.classList.add('warning');
        } else {
            pwCheckElement.nextElementSibling.classList.remove('warning');
            const res = await axios.post(register_api, {
                name, email, password
            });
    
            if (res.data.success) {
                console.log(res.data);
                location.href = "/";
            }else {
                alert('회원가입을 실패하였습니다.')
            }
    
        }
        
    } catch (err) {
        console.log(err);
    }
}

const registerHandler = () => {
    const form = document.querySelector('#form-register');
    if (form) form.addEventListener('submit', submitHandler)
}

